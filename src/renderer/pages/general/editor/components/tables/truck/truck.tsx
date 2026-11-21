import type { IFile } from '@modules/files/renderer'
import type { TruckCompatibleWheels, TruckXML } from '@modules/xml/renderer'
import { Country, WheelTorque } from '@modules/xml/renderer'
import { useConfig } from '@renderer/utilities/use-reactive'
import { useSaveListener } from '../../../utilities/hooks'
import { Accordion } from '../../accordion'
import { Coords } from '../../coords/coords'
import { Extra } from '../../extra/extra'
import { Group } from '../../group/group'
import { Float } from '../../input/variants/float'
import { Int } from '../../input/variants/int'
import { Text } from '../../input/variants/text'
import { DiffLock } from '../../select/diff-lock'
import { Select } from '../../select/select'
import type { ReadyProps } from '../../utilities'
import { useFilesReady } from '../../utilities'
import { Engines } from '../engines/engines'
import { Gearboxes } from '../gearboxes/gearboxes'
import { Suspensions } from '../suspensions/suspensions'
import { Wheels } from '../wheels/wheels'
import { Winches } from '../winches/winches'
import { ReadyType } from './enums'
import { TRUCK_LOCALIZATION as texts } from './localization'

/** Параметры таблицы автомобиля. */
export type TruckProps = ReadyProps & {
	/** XML автомобиля. */
	xml: TruckXML

	/** Файл. */
	file: IFile
}

/** Таблица автомобиля. */
export function Truck({ xml, file, onReady, onMount }: TruckProps) {
	const config = useConfig()
	const { ready, inProgress } = useFilesReady({ onReady, onMount })

	useSaveListener(() => file.write(xml.baseXML))

	const truckData = xml.TruckData
	const gameData = xml.GameData
	const uiDesc = gameData?.UiDesc
	const physicsBody = xml.PhysicsModel?.Body
	const winch = truckData?.Winch
	const wheels = truckData?.Wheels
	const extraWheels = truckData?.ExtraWheels
	const winchSocket = truckData?.WinchUpgradeSocket
	const suspensionSocket = truckData?.SuspensionSocket
	const gearboxSocket = truckData?.GearboxSocket
	const engineSocket = truckData?.EngineSocket
	const fuelTank = truckData?.FuelTank
	const compatWheels = truckData?.CompatibleWheels

	return (
		<Accordion>
			{uiDesc && (
				<Group key="texts" label={texts.textGroupName} icon="texts">
					{uiDesc.DefaultRegion
						? (
							<>
								<Text descriptor={uiDesc.DefaultRegion.$UiName} />
								<Text descriptor={uiDesc.DefaultRegion.$UiDesc} />
							</>
						)
						: (
							<>
								<Text descriptor={uiDesc.$UiName} />
								<Text descriptor={uiDesc.$UiDesc} />
							</>
						)}
				</Group>
			)}
			{truckData && (
				<Group key="control" label={texts.controlGroupName} icon="steering-wheel">
					<Float descriptor={truckData.$Responsiveness} />
					<Float descriptor={truckData.$BackSteerSpeed} />
					<Float descriptor={truckData.$SteerSpeed} />
				</Group>
			)}
			{truckData && (
				<Group key="winch" label={texts.winchGroupName} icon="winches">
					{winch && (
						<>
							<Float descriptor={winch.$Length} />
							<Float descriptor={winch.$StrengthMult} />
						</>
					)}
					<Winches
						key="winches-file"
						getter={winchSocket?.winches}
						filesGetter={winchSocket?.winchesFiles}
						onMount={() => inProgress(ReadyType.winches)}
						onReady={() => ready(ReadyType.winches)}
					/>
				</Group>
			)}
			{truckData && (
				<Group
					key="wheels"
					label={texts.wheelsGroupName}
					icon="wheels"
					groups={[
						<Group
							key="physics"
							label={texts.physicsWheel}
							groups={[
								...(wheels?.Wheels ?? []).map((Wheel, i) => (
									<Group key={`wheel-${i}`} label={`${texts.wheel} ${i + 1}`}>
										<Select
											descriptor={Wheel.$Torque}
											options={[
												[WheelTorque.default, texts.torqueDefault],
												[WheelTorque.full, texts.torqueFull],
												[WheelTorque.none, texts.torqueNone],
												[WheelTorque.connectable, texts.torqueConnectable]
											]}
										/>
										<Float descriptor={Wheel.$SteeringAngle} />
									</Group>
								)),
								...(extraWheels?.Wheels ?? []).map((ExtraWheel, i) => (
									<Group key={`extra-wheel-${i}`} label={`${texts.extraWheel} ${i + 1}`}>
										<Select
											descriptor={ExtraWheel.$Torque}
											options={[
												[WheelTorque.default, texts.torqueDefault],
												[WheelTorque.full, texts.torqueFull],
												[WheelTorque.none, texts.torqueNone],
												[WheelTorque.connectable, texts.torqueConnectable]
											]}
										/>
										<Float descriptor={ExtraWheel.$SteeringAngle} />
									</Group>
								))
							]}
						/>,
						<Group
							key="wheelsSizes"
							label={texts.wheelsSizes}
							groups={(compatWheels ?? []).map((CompatibleWheels, i) => (
								<Group
									key={`compat-wheels-${i}`}
									label={getCompatibleWheelsLabel(config.advancedMode, i + 1, CompatibleWheels.Type)}
								>
									<Float descriptor={CompatibleWheels.$Scale} />
								</Group>
							))}
						/>
					]}
				>
					{filterCompat(compatWheels ?? []).map((Wheel, i) => (
						<Wheels
							key={`compat-wheels-file-${i}`}
							getter={Wheel.wheelSet}
							fileGetter={Wheel.wheelsFile}
							onMount={() => inProgress(`${ReadyType.wheels}_${Wheel.Type}`)}
							onReady={() => ready(`${ReadyType.wheels}_${Wheel.Type}`)}
						/>
					))}
				</Group>
			)}
			{truckData && (
				<Group key="suspensions" label={texts.suspensionGroupName} icon="suspensions">
					{physicsBody && <Coords descriptor={physicsBody.$CenterOfMassOffset} />}
					<DiffLock descriptor={truckData.$DiffLockType} />
					<Suspensions
						key="suspensions-file"
						getter={suspensionSocket?.suspensions}
						filesGetter={suspensionSocket?.suspensionsFiles}
						onMount={() => inProgress(ReadyType.suspensions)}
						onReady={() => ready(ReadyType.suspensions)}
					/>
				</Group>
			)}
			{truckData && (
				<Group key="gearboxes" label={texts.gearboxGroupName} icon="gearboxes">
					<Gearboxes
						key="gearboxes-file"
						getter={gearboxSocket?.gearboxes}
						filesGetter={gearboxSocket?.gearboxesFiles}
						onMount={() => inProgress(ReadyType.gearboxes)}
						onReady={() => ready(ReadyType.gearboxes)}
					/>
				</Group>
			)}
			{truckData && (
				<Group key="engines" label={texts.engineGroupName} icon="engines">
					<Float descriptor={truckData.$EngineStartDelay} />
					<Float descriptor={truckData.$ExhaustStartTime} />
					<Engines
						key="engines-file"
						getter={engineSocket?.engines}
						filesGetter={engineSocket?.enginesFiles}
						onMount={() => inProgress(ReadyType.engines)}
						onReady={() => ready(ReadyType.engines)}
					/>
				</Group>
			)}
			{truckData && fuelTank && (
				<Group key="fuel" label={texts.fuelGroupName} icon="fuel">
					<Int descriptor={fuelTank.$DamageCapacity} />
					<Int descriptor={truckData.$FuelCapacity} />
				</Group>
			)}
			{gameData && (
				<Group key="unlock" label={texts.unlockGroupName} icon="unlock">
					<Select
						multiple
						emptyIsAll
						descriptor={gameData.$Country}
						options={[
							[Country.ru, texts.russia],
							[Country.us, texts.usa],
							[Country.cas, texts.cas],
							[Country.ne, texts.ne]
						]}
					/>
					<Int descriptor={gameData.$Price} />
					<Select
						descriptor={gameData.$UnlockByExploration}
						options={[
							[true, texts.findOnMap],
							[false, texts.byRank]
						]}
					/>
					<Int descriptor={gameData.$UnlockByRank} />
				</Group>
			)}
			<Extra
				key="extra"
				file={file}
				xml={xml}
				onMount={() => inProgress(ReadyType.extra)}
				onReady={() => ready(ReadyType.extra)}
			/>
		</Accordion>
	)
}

/**
 * Отфильтровать дубли наборов совместимых колёс.
 * @param wheels Наборы совместимых колёс.
 */
function filterCompat(wheels: TruckCompatibleWheels[]) {
	const set = new Set<string>()

	return wheels.filter(item => {
		if (!item.Type || set.has(item.Type)) {
			return false
		}

		set.add(item.Type)

		return true
	})
}

/**
 * Получить подпись набора совместимых колёс.
 * @param advancedMode Включён ли расширенный режим.
 * @param nth Номер набора.
 * @param type Тип колёс.
 */
function getCompatibleWheelsLabel(advancedMode: boolean, nth: number, type?: string) {
	return advancedMode && type
		? type
		: `${texts.wheelsSet} ${nth}`
}
