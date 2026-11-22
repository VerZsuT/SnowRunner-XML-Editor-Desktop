import type { AddonFile, GameTexts, Truck, TruckAddon } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import { fieldValue } from '@/api/fields'
import { EditorTable } from './accordion'
import type { AddonDocument } from './addons'
import { AddonsContent } from './addons'
import { BanditCraneGroup, CranesGroup, TrailersGroup } from './actions'
import { DocumentField } from './field'
import { Group } from './group'
import type { RelatedDocument } from './related'
import { EnginesField, GearboxesField, SuspensionsField, WheelsField, WinchesField } from './related'
import { texts } from '../texts'

/** Параметры таблицы трака. */
export interface TruckTableProps {
	/** Документ трака. */
	session: DocumentSession

	/** Модель трака. */
	truck: Truck

	/** Открытые связанные документы. */
	related: RelatedDocument[]

	/** Открытые аддоны. */
	addons: AddonDocument[]

	/** Игровые переводы. */
	gameTexts: GameTexts | null

	/** Открывает аддон. */
	onOpenAddon(addon: AddonFile): Promise<void>

	/** Перечитывает модель открытого аддона. */
	onRefreshAddon(doc: AddonDocument): Promise<TruckAddon | null>

	/** Перечитывает модель трака. */
	onRefresh(): Promise<void>
}

/** Таблица параметров трака. */
export function TruckTable({
	session,
	truck,
	related,
	addons,
	gameTexts,
	onOpenAddon,
	onRefreshAddon,
	onRefresh
}: TruckTableProps) {
	const data = truck.truckData
	const gameData = truck.gameData
	const region = gameData?.uiDesc?.defaultRegion ?? gameData?.uiDesc
	const centerOfMass = truck.physicsModel?.body?.centerOfMassOffset

	return (
		<EditorTable>
			{region && (
				<Group groupKey="texts" icon="texts" label={texts.texts}>
					<DocumentField session={session} field={region.uiName} />
					<DocumentField session={session} field={region.uiDesc} />
				</Group>
			)}

			{data && (
				<Group groupKey="control" icon="steering-wheel" label={texts.control}>
					<DocumentField session={session} field={data.responsiveness} />
					<DocumentField session={session} field={data.backSteerSpeed} />
					<DocumentField session={session} field={data.steerSpeed} />
				</Group>
			)}

			{data && (
				<Group groupKey="winch" icon="winches" label={texts.winch}>
					{data.winch && (
						<>
							<DocumentField session={session} field={data.winch.length} />
							<DocumentField session={session} field={data.winch.strengthMult} />
						</>
					)}
					<WinchesField documents={related} gameTexts={gameTexts} />
				</Group>
			)}

			{data && (
				<Group groupKey="wheels" icon="wheels" label={texts.wheels}>
					<WheelsField documents={related} gameTexts={gameTexts} />

					{(data.wheels || data.extraWheels) && (
						<Group nested label={texts.wheelExtra}>
							{data.wheels?.wheels.map((wheel, index) => (
								<Group key={`wheel-${index}`} nested label={`${texts.wheel} ${index + 1}`}>
									<DocumentField session={session} field={wheel.torque} />
									<DocumentField session={session} field={wheel.steeringAngle} />
								</Group>
							))}
							{data.extraWheels?.wheels.map((wheel, index) => (
								<Group key={`extra-wheel-${index}`} nested label={`${texts.extraWheel} ${index + 1}`}>
									<DocumentField session={session} field={wheel.torque} />
									<DocumentField session={session} field={wheel.steeringAngle} />
								</Group>
							))}
						</Group>
					)}

					{data.compatibleWheels.length > 0 && (
						<Group nested label={texts.wheelSizes}>
							{data.compatibleWheels.map((wheels, index) => (
								<Group
									key={index}
									nested
									label={fieldValue(wheels.type) ?? `${texts.wheelSet} ${index + 1}`}
								>
									<DocumentField session={session} field={wheels.scale} />
								</Group>
							))}
						</Group>
					)}
				</Group>
			)}

			{data && (
				<Group groupKey="suspensions" icon="suspensions" label={texts.suspensions}>
					{centerOfMass && <DocumentField session={session} field={centerOfMass} />}
					<DocumentField session={session} field={data.diffLockType} />
					<SuspensionsField documents={related} gameTexts={gameTexts} />
				</Group>
			)}

			{data && (
				<Group groupKey="gearboxes" icon="gearboxes" label={texts.gearboxes}>
					<GearboxesField documents={related} gameTexts={gameTexts} />
				</Group>
			)}

			{data && (
				<Group groupKey="engines" icon="engines" label={texts.engines}>
					<DocumentField session={session} field={data.engineStartDelay} />
					<DocumentField session={session} field={data.exhaustStartTime} />
					<EnginesField documents={related} gameTexts={gameTexts} />
				</Group>
			)}

			{data && (
				<Group groupKey="fuel" icon="fuel" label={texts.fuel}>
					{data.fuelTank && <DocumentField session={session} field={data.fuelTank.damageCapacity} />}
					<DocumentField session={session} field={data.fuelCapacity} />
				</Group>
			)}

			{gameData && (
				<Group groupKey="unlock" icon="unlock" label={texts.unlock}>
					<DocumentField session={session} field={gameData.country} />
					<DocumentField session={session} field={gameData.price} />
					<DocumentField
						session={session}
						field={gameData.unlockByExploration}
						labels={{ true: texts.findOnMap, false: texts.byRank }}
					/>
					<DocumentField session={session} field={gameData.unlockByRank} />
				</Group>
			)}

			<Group groupKey="extra" label={texts.extra}>
				<AddonsContent
					key={session.name}
					truckName={session.name}
					docs={addons}
					gameTexts={gameTexts}
					onOpen={onOpenAddon}
					onRefresh={onRefreshAddon}
				/>

				<CranesGroup session={session} truck={truck} onRefresh={onRefresh} />
				<TrailersGroup session={session} truck={truck} onRefresh={onRefresh} />
				<BanditCraneGroup session={session} truck={truck} onRefresh={onRefresh} />
			</Group>
		</EditorTable>
	)
}
