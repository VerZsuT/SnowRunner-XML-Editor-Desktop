import type {
	BaseGameData,
	BaseUiDesc,
	Engine,
	Field,
	GameTexts,
	Gearbox,
	SuspensionSet,
	Truck,
	Wheels,
	Winch
} from '@/api/bindings'
import type { DocumentClient, DocumentSession } from '@/api/documents'
import { DocumentSession as Session } from '@/api/documents'
import { fieldValue } from '@/api/fields'
import { translate } from '@/api/texts'
import { useConfig } from '@/config'
import { Fragment, type ReactNode } from 'react'
import { AccordionScope } from './accordion'
import { DocumentField, InfoField } from './field'
import { FileInfo } from './file-info'
import { Group } from './group'
import { texts } from '../texts'

/** Открытый связанный документ игры. */
export type RelatedDocument =
	| { kind: 'engines', session: DocumentSession, models: Engine[] }
	| { kind: 'gearboxes', session: DocumentSession, models: Gearbox[] }
	| { kind: 'suspensions', session: DocumentSession, models: SuspensionSet[] }
	| { kind: 'winches', session: DocumentSession, models: Winch[] }
	| { kind: 'wheels', session: DocumentSession, model: Wheels }

/** Вид связанного документа. */
export type RelatedKind = RelatedDocument['kind']

/** Параметры списка связанных документов. */
interface RelatedProps {
	/** Открытые документы. */
	documents: RelatedDocument[]

	/** Игровые переводы. */
	gameTexts: GameTexts | null
}

/** Имена файлов из строки сокета (`First, Second`). */
export function socketNames(field?: Field<string> | null): string[] {
	if (!field) {
		return []
	}

	return String(field.value ?? field.defaultValue ?? '')
		.split(',')
		.map(name => name.trim())
		.filter(Boolean)
}

/** Имена файлов колёс из совместимых наборов трака. */
export function wheelNames(truck: Truck): string[] {
	const names = new Set<string>()

	for (const wheels of truck.truckData?.compatibleWheels ?? []) {
		const name = fieldValue(wheels.type)

		if (name) {
			names.add(name)
		}
	}

	return [...names]
}

/**
 * Открывает связанные документы трака: двигатели, коробки, подвески, лебёдки, колёса.
 * `modName` задаёт мод, из которого открыт трак.
 */
export async function loadRelated(
	client: DocumentClient,
	truck: Truck,
	modName: string | null = null
): Promise<RelatedDocument[]> {
	const data = truck.truckData
	const sockets: Array<[RelatedKind, Field<string> | null | undefined]> = [
		['engines', data?.engineSocket?.type],
		['gearboxes', data?.gearboxSocket?.type],
		['suspensions', data?.suspensionSocket?.type],
		['winches', data?.winchUpgradeSocket?.type]
	]
	const requests: Promise<RelatedDocument | null>[] = []

	for (const [kind, field] of sockets) {
		for (const name of socketNames(field)) {
			requests.push(openRelated(client, kind, name, modName))
		}
	}

	for (const name of wheelNames(truck)) {
		requests.push(openRelated(client, 'wheels', name, modName))
	}

	const documents = await Promise.all(requests)

	return documents.filter(document => document !== null)
}

/** Открывает один связанный документ; отсутствующий файл пропускается. */
async function openRelated(
	client: DocumentClient,
	kind: RelatedKind,
	name: string,
	modName: string | null
): Promise<RelatedDocument | null> {
	try {
		const session = await Session.open(kind, name, client, modName)

		switch (kind) {
			case 'engines':
				return { kind, session, models: await session.readEngines() }
			case 'gearboxes':
				return { kind, session, models: await session.readGearboxes() }
			case 'suspensions':
				return { kind, session, models: await session.readSuspensions() }
			case 'winches':
				return { kind, session, models: await session.readWinches() }
			case 'wheels':
				return { kind, session, model: await session.readWheels() }
		}
	} catch {
		return null
	}
}

/** Документы определённого вида. */
function ofKind<K extends RelatedKind>(
	documents: RelatedDocument[],
	kind: K
): Extract<RelatedDocument, { kind: K }>[] {
	return documents.filter(
		(document): document is Extract<RelatedDocument, { kind: K }> => document.kind === kind
	)
}

/** Параметры именованного элемента файла. */
interface RelatedItemProps {
	/** Открытый документ. */
	session: DocumentSession

	/** Подпись группы. */
	label: string

	/** Поле кода элемента. */
	name: Field<string>

	/** Содержимое. */
	children?: ReactNode
}

/** Элемент связанного файла: название из игры и код в продвинутом режиме. */
function RelatedItem({ session, label, name, children }: RelatedItemProps) {
	const advanced = useConfig().advancedMode

	return (
		<Group nested label={label}>
			{advanced && <InfoField field={name} label={texts.name} />}
			{children}
		</Group>
	)
}

/** Название элемента из игровых переводов. */
function gameName(
	gameData: { uiDesc: BaseUiDesc | null } | null | undefined,
	gameTexts: GameTexts | null,
	modName: string | null,
	fallback: string
): string {
	const key = gameData?.uiDesc
		? fieldValue(gameData.uiDesc.uiName)
		: null

	return translate(gameTexts, key, modName) ?? fallback
}

/** Двигатели. */
export function EnginesField({ documents, gameTexts }: RelatedProps) {
	return ofKind(documents, 'engines').map(document => (
		<Fragment key={document.session.docId}>
			<FileInfo session={document.session} />
			<AccordionScope>
				{document.models.map((engine, index) => (
					<RelatedItem
						key={index}
						session={document.session}
						label={gameName(engine.gameData, gameTexts, document.session.modName, texts.engine)}
						name={engine.name}
					>
						<DocumentField session={document.session} field={engine.criticalDamageThreshold} />
						<DocumentField session={document.session} field={engine.damageCapacity} />
						<DocumentField session={document.session} field={engine.damagedConsumptionModifier} />
						<DocumentField session={document.session} field={engine.engineResponsiveness} />
						<DocumentField session={document.session} field={engine.fuelConsumption} />
						<DocumentField session={document.session} field={engine.torque} />
						<DocumentField session={document.session} field={engine.damagedMinTorqueMultiplier} />
						<DocumentField session={document.session} field={engine.damagedMaxTorqueMultiplier} />
						<DocumentField session={document.session} field={engine.brakesDelay} />
						<DocumentField session={document.session} field={engine.maxDeltaAngVel} />
						<UnlockFields session={document.session} gameData={engine.gameData} />
					</RelatedItem>
				))}
			</AccordionScope>
		</Fragment>
	))
}

/** Коробки передач. */
export function GearboxesField({ documents, gameTexts }: RelatedProps) {
	const options = { true: texts.available, false: texts.notAvailable }

	return ofKind(documents, 'gearboxes').map(document => (
		<Fragment key={document.session.docId}>
			<FileInfo session={document.session} />
			<AccordionScope>
				{document.models.map((gearbox, index) => (
					<RelatedItem
						key={index}
						session={document.session}
						label={gameName(gearbox.gameData, gameTexts, document.session.modName, texts.gearbox)}
						name={gearbox.name}
					>
						<DocumentField session={document.session} field={gearbox.awdConsumptionModifier} />
						<DocumentField session={document.session} field={gearbox.criticalDamageThreshold} />
						<DocumentField session={document.session} field={gearbox.damageCapacity} />
						<DocumentField session={document.session} field={gearbox.damagedConsumptionModifier} />
						<DocumentField session={document.session} field={gearbox.fuelConsumption} />
						<DocumentField session={document.session} field={gearbox.idleFuelModifier} />
						<DocumentField session={document.session} field={gearbox.minBreakFreq} />
						<DocumentField session={document.session} field={gearbox.maxBreakFreq} />

						{gearbox.gameData?.gearboxParams && (
							<Group nested label={texts.gearboxParams}>
								<DocumentField
									session={document.session}
									field={gearbox.gameData.gearboxParams.isHighGearExists}
									labels={options}
								/>
								<DocumentField
									session={document.session}
									field={gearbox.gameData.gearboxParams.isLowerPlusGearExists}
									labels={options}
								/>
								<DocumentField
									session={document.session}
									field={gearbox.gameData.gearboxParams.isLowerGearExists}
									labels={options}
								/>
								<DocumentField
									session={document.session}
									field={gearbox.gameData.gearboxParams.isManualLowGear}
									labels={options}
								/>
								<DocumentField
									session={document.session}
									field={gearbox.gameData.gearboxParams.isLowerMinusGearExists}
									labels={options}
								/>
							</Group>
						)}

						<Group nested label={texts.gears}>
							{gearbox.reverseGear && (
								<Group nested label={texts.reverseGear}>
									<DocumentField session={document.session} field={gearbox.reverseGear.angVel} />
									<DocumentField session={document.session} field={gearbox.reverseGear.fuelModifier} />
								</Group>
							)}
							{gearbox.highGear && (
								<Group nested label={texts.highGear}>
									<DocumentField session={document.session} field={gearbox.highGear.angVel} />
									<DocumentField session={document.session} field={gearbox.highGear.fuelModifier} />
								</Group>
							)}
							{gearbox.gears.map((gear, gearIndex) => (
								<Group key={gearIndex} nested label={`${texts.gear} ${gearIndex + 1}`}>
									<DocumentField session={document.session} field={gear.angVel} />
									<DocumentField session={document.session} field={gear.fuelModifier} />
								</Group>
							))}
						</Group>

						<UnlockFields session={document.session} gameData={gearbox.gameData} />
					</RelatedItem>
				))}
			</AccordionScope>
		</Fragment>
	))
}

/** Наборы подвесок. */
export function SuspensionsField({ documents, gameTexts }: RelatedProps) {
	return ofKind(documents, 'suspensions').map(document => (
		<Fragment key={document.session.docId}>
			<FileInfo session={document.session} />
			<AccordionScope>
				{document.models.map((set, index) => (
					<RelatedItem
						key={index}
						session={document.session}
						label={gameName(set.gameData, gameTexts, document.session.modName, texts.suspensionSet)}
						name={set.name}
					>
						<DocumentField session={document.session} field={set.criticalDamageThreshold} />
						<DocumentField session={document.session} field={set.damageCapacity} />
						<DocumentField session={document.session} field={set.brokenWheelDamageMultiplier} />

						{set.suspensions.map((suspension, suspensionIndex) => (
							<Group
								key={suspensionIndex}
								nested
								label={getSuspensionLabel(fieldValue(suspension.wheelType), suspensionIndex)}
							>
								<DocumentField session={document.session} field={suspension.height} />
								<DocumentField session={document.session} field={suspension.strength} />
								<DocumentField session={document.session} field={suspension.damping} />
								<DocumentField session={document.session} field={suspension.suspensionMin} />
								<DocumentField session={document.session} field={suspension.suspensionMax} />
								<DocumentField session={document.session} field={suspension.brokenSuspensionMax} />
							</Group>
						))}

						<UnlockFields session={document.session} gameData={set.gameData} />
					</RelatedItem>
				))}
			</AccordionScope>
		</Fragment>
	))
}

/** Лебёдки. */
export function WinchesField({ documents, gameTexts }: RelatedProps) {
	return ofKind(documents, 'winches').map(document => (
		<Fragment key={document.session.docId}>
			<FileInfo session={document.session} />
			<AccordionScope>
				{document.models.map((winch, index) => (
					<RelatedItem
						key={index}
						session={document.session}
						label={gameName(winch.gameData, gameTexts, document.session.modName, texts.winch)}
						name={winch.name}
					>
						<DocumentField session={document.session} field={winch.length} />
						<DocumentField session={document.session} field={winch.strengthMult} />
						<DocumentField
							session={document.session}
							field={winch.isEngineIgnitionRequired}
							labels={{ true: texts.engineDriven, false: texts.batteryDriven }}
						/>
						<UnlockFields session={document.session} gameData={winch.gameData} />
					</RelatedItem>
				))}
			</AccordionScope>
		</Fragment>
	))
}

/** Наборы шин и дисков. */
export function WheelsField({ documents, gameTexts }: RelatedProps) {
	return ofKind(documents, 'wheels').map(document => (
		<Fragment key={document.session.docId}>
			<FileInfo session={document.session} />
			<AccordionScope>
				{document.model.tires.map((tire, index) => (
					<RelatedItem
						key={index}
						session={document.session}
						label={gameName(tire.gameData, gameTexts, document.session.modName, texts.tire)}
						name={tire.name}
					>
						{tire.wheelFriction && (
							<>
								<DocumentField session={document.session} field={tire.wheelFriction.bodyFriction} />
								<DocumentField session={document.session} field={tire.wheelFriction.bodyFrictionAsphalt} />
								<DocumentField session={document.session} field={tire.wheelFriction.substanceFriction} />
								<DocumentField session={document.session} field={tire.wheelFriction.isIgnoreIce} />
							</>
						)}
						<UnlockFields session={document.session} gameData={tire.gameData} />
					</RelatedItem>
				))}
			</AccordionScope>
		</Fragment>
	))
}

/** Поля разблокировки сущности. */
export function UnlockFields({
	session,
	gameData
}: {
	session: DocumentSession
	gameData: BaseGameData | null
}) {
	if (!gameData) {
		return null
	}

	return (
		<Group nested label={texts.unlock}>
			<DocumentField session={session} field={gameData.price} />
			<DocumentField
				session={session}
				field={gameData.unlockByExploration}
				labels={{ true: texts.findOnMap, false: texts.byRank }}
			/>
			<DocumentField session={session} field={gameData.unlockByRank} />
		</Group>
	)
}

/** Подпись подвески по типу колеса. */
function getSuspensionLabel(type: string | null, index: number): string {
	switch (type) {
		case 'front':
			return texts.frontSuspension
		case 'middle':
			return texts.middleSuspension
		case 'rear':
			return texts.rearSuspension
		default:
			return `${texts.suspension} ${index + 1}`
	}
}
