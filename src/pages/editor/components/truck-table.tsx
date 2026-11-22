import type { AddonFile, GameTexts, PhysicsBody, Truck } from '@/api/bindings'
import type { DocumentSession } from '@/api/documents'
import type { AddonDocument } from './addons'
import { AddonSocketsGroup } from './addon-sockets'
import { AddonsContent } from './addons'
import { BanditCraneGroup, CranesGroup, TrailersGroup } from './actions'
import { DocumentField, InfoField } from './field'
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
	onRefreshAddon(doc: AddonDocument): Promise<void>

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

	return (
		<>
			{region && (
				<Group label={texts.texts}>
					<DocumentField session={session} field={region.uiName} />
					<DocumentField session={session} field={region.uiDesc} />
					{gameData?.uiDesc?.uiIcon328x458 && (
						<DocumentField session={session} field={gameData.uiDesc.uiIcon328x458} />
					)}
				</Group>
			)}

			{data && (
				<Group label={texts.control}>
					<DocumentField session={session} field={data.responsiveness} />
					<DocumentField session={session} field={data.backSteerSpeed} />
					<DocumentField session={session} field={data.steerSpeed} />
				</Group>
			)}

			{data && (
				<Group label={texts.winch}>
					{data.winch && (
						<>
							<DocumentField session={session} field={data.winch.length} />
							<DocumentField session={session} field={data.winch.strengthMult} />
						</>
					)}
					<WinchesField documents={related} />
				</Group>
			)}

			{data && (
				<Group label={texts.wheels}>
					{data.wheels && (
						<Group nested label={texts.wheels}>
							<DocumentField session={session} field={data.wheels.defaultWheelType} />
							{data.wheels.wheels.map((wheel, index) => (
								<Group key={index} nested label={`${texts.wheel} ${index + 1}`}>
									<DocumentField session={session} field={wheel.torque} />
									<DocumentField session={session} field={wheel.steeringAngle} />
								</Group>
							))}
						</Group>
					)}

					{data.extraWheels && (
						<Group nested label={texts.extraWheel}>
							{data.extraWheels.wheels.map((wheel, index) => (
								<Group key={index} nested label={`${texts.extraWheel} ${index + 1}`}>
									<DocumentField session={session} field={wheel.torque} />
									<DocumentField session={session} field={wheel.steeringAngle} />
								</Group>
							))}
						</Group>
					)}

					{data.compatibleWheels.length > 0 && (
						<Group nested label={texts.wheelSizes}>
							{data.compatibleWheels.map((wheels, index) => (
								<Group key={index} nested label={`${texts.wheelSet} ${index + 1}`}>
									<InfoField field={wheels.type} />
									<DocumentField session={session} field={wheels.scale} />
								</Group>
							))}
						</Group>
					)}

					<WheelsField documents={related} />
				</Group>
			)}

			{data && (
				<Group label={texts.suspensions}>
					<DocumentField session={session} field={data.diffLockType} />
					<SuspensionsField documents={related} />
				</Group>
			)}

			{data && (
				<Group label={texts.gearboxes}>
					<GearboxesField documents={related} />
				</Group>
			)}

			{data && (
				<Group label={texts.engines}>
					<DocumentField session={session} field={data.engineStartDelay} />
					<DocumentField session={session} field={data.exhaustStartTime} />
					<EnginesField documents={related} />
				</Group>
			)}

			{data && (
				<Group label={texts.fuel}>
					{data.fuelTank && <DocumentField session={session} field={data.fuelTank.damageCapacity} />}
					<DocumentField session={session} field={data.fuelCapacity} />
				</Group>
			)}

			{truck.physicsModel?.body && (
				<Group label={texts.physicsModel}>
					<PhysicsBodyFields session={session} body={truck.physicsModel.body} />
				</Group>
			)}

			{gameData && (
				<Group label={texts.unlock}>
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

			<AddonsContent
				key={session.name}
				truckName={session.name}
				docs={addons}
				gameTexts={gameTexts}
				onOpen={onOpenAddon}
				onRefresh={onRefreshAddon}
			/>

			<AddonSocketsGroup session={session} truck={truck} onRefresh={onRefresh} />
			<CranesGroup session={session} truck={truck} onRefresh={onRefresh} />
			<TrailersGroup session={session} truck={truck} onRefresh={onRefresh} />
			<BanditCraneGroup session={session} truck={truck} onRefresh={onRefresh} />

		</>
	)
}

/** Тело физической модели и вложенные тела. */
function PhysicsBodyFields({ session, body }: { session: DocumentSession, body: PhysicsBody }) {
	return (
		<>
			<DocumentField session={session} field={body.mass} />
			<DocumentField session={session} field={body.centerOfMassOffset} />
			{body.body && (
				<Group nested label={texts.physicsModel}>
					<PhysicsBodyFields session={session} body={body.body} />
				</Group>
			)}
		</>
	)
}
