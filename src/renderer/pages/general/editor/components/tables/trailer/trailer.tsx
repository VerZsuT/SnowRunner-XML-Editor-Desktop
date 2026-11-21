import type { IFile } from '@modules/files/renderer'
import type { TruckXML } from '@modules/xml/renderer'
import { useSaveListener } from '../../../utilities/hooks'
import { Accordion } from '../../accordion'
import { Coords } from '../../coords/coords'
import { Group } from '../../group/group'
import { Float } from '../../input/variants/float'
import { Int } from '../../input/variants/int'
import type { ReadyProps } from '../../utilities'
import { useReady } from '../../utilities'
import { TRAILER_LOCALIZATION as texts } from './localization'

/** Параметры таблицы прицепа. */
export type TrailerProps = ReadyProps & {
	/** XML прицепа. */
	xml: TruckXML

	/** Файл. */
	file: IFile
}

/** Таблица прицепа. */
export function Trailer({ xml, file, onReady, onMount }: TrailerProps) {
	useReady({ onReady, onMount })
	useSaveListener(() => file.write(xml.baseXML))

	const truckData = xml.TruckData
	const wheels = truckData?.Wheels
	const physicsBody = xml.PhysicsModel?.Body
	const fuelBody = xml.FuelMass?.Body
	const addonSlots = xml.GameData?.AddonSlots

	return (
		<Accordion>
			<Group
				key="inner"
				label={texts.inner}
				groups={wheels && (
					<Group
						key="wheels"
						label={texts.wheels}
						groups={wheels.Wheels.map((Wheel, i) => (
							<Group key={`wheel-${i}`} label={`${texts.wheel} ${i + 1}`}>
								<Float descriptor={Wheel.$SuspensionHeight} />
								<Float descriptor={Wheel.$SuspensionStrength} />
							</Group>
						))}
					/>
				)}
			>
				{truckData && (
					<>
						<Int descriptor={truckData.$FuelCapacity} />
						<Int descriptor={truckData.$WaterCapacity} />
						<Int descriptor={truckData.$RepairsCapacity} />
						<Int descriptor={truckData.$WheelRepairsCapacity} />
						{addonSlots && <Int descriptor={addonSlots.$Quantity} />}
					</>
				)}
			</Group>
			<Group key="mass" label={texts.mass}>
				{physicsBody && <Coords descriptor={physicsBody.$CenterOfMassOffset} />}
				{physicsBody && <Int label={texts.trailerMass} descriptor={physicsBody.$Mass} />}
				{fuelBody && <Int label={texts.fuelMass} descriptor={fuelBody.$Mass} />}
			</Group>
			{xml.GameData && (
				<Group key="other" label={texts.other}>
					<Int descriptor={xml.GameData.$Price} />
				</Group>
			)}
		</Accordion>
	)
}
