import type { IFile } from '@modules/files/renderer'
import type { Gearboxes as GearboxesXML } from '@modules/xml/renderer'
import { useConfig } from '@renderer/utilities/use-reactive'
import { useEditorStore } from '../../../../store/editor'
import { useSaveListener } from '../../../utilities/hooks'
import { FileProvider } from '../../../utilities/import'
import { Accordion } from '../../accordion'
import { Group } from '../../group/group'
import { Info } from '../../info/info'
import { Float } from '../../input/variants/float'
import { Int } from '../../input/variants/int'
import { Select } from '../../select/select'
import type { ReadyProps } from '../../utilities'
import { getGameText, useReady } from '../../utilities'
import { GearPreset } from '../gear-preset/gear-preset'
import { UnlockPreset } from '../unlock-preset/unlock-preset'
import { GEARBOXES_LOCALIZATION as texts } from './localization'

/** Параметры набора коробок передач. */
export type GearboxSetProps = ReadyProps & {
	/** Коробки передач. */
	xml: GearboxesXML

	/** Файл. */
	file: IFile
}

/** Набор коробок передач. */
export function GearboxSet({ xml, file, onReady, onMount }: GearboxSetProps) {
	const info = useEditorStore(state => state.info)
	const config = useConfig()

	useReady({ onReady, onMount })
	useSaveListener(() => file.write(xml.baseXML))

	return (
		<FileProvider file={file}>
			<Accordion>
				{xml.Gearboxes.map((Gearbox, i) => {
					const params = Gearbox.GameData?.GearboxParams

					return (
						<Group
							key={`gearbox-${i}`}
							label={getGameText(Gearbox.GameData?.UiDesc?.UiName, texts.gearbox, info.mod)}
							groups={[
								params && (
									<Group key="params" label={texts.gearboxParams}>
										<Select
											descriptor={params.$IsHighGearExists}
											options={[
												[true, texts.gearAllow],
												[false, texts.gearNotAllow]
											]}
										/>
										<Select
											descriptor={params.$IsLowerGearExists}
											options={[
												[true, texts.gearAllow],
												[false, texts.gearNotAllow]
											]}
										/>
										<Select
											descriptor={params.$IsLowerPlusGearExists}
											options={[
												[true, texts.gearAllow],
												[false, texts.gearNotAllow]
											]}
										/>
										<Select
											descriptor={params.$IsLowerMinusGearExists}
											options={[
												[true, texts.gearAllow],
												[false, texts.gearNotAllow]
											]}
										/>
									</Group>
								),
								<Group
									key="gears"
									label={texts.gears}
									groups={[
										<Group key="reverse" label={texts.reverseGear}>
											<GearPreset element={Gearbox.ReverseGear} />
										</Group>,
										<Group key="high" label={texts.highGear}>
											<GearPreset element={Gearbox.HighGear} />
										</Group>,
										...Gearbox.Gears.map((Gear, i2) => (
											<Group key={`gear-${i2}`} label={String(i2 + 1)}>
												<GearPreset element={Gear} />
											</Group>
										))
									]}
								/>,
								<UnlockPreset key="unlock" element={Gearbox.GameData} />
							]}
						>
							{config.advancedMode && <Info descriptor={Gearbox.$Name} />}
							<Float descriptor={Gearbox.$AWDConsumptionModifier} />
							<Float descriptor={Gearbox.$CriticalDamageThreshold} />
							<Int descriptor={Gearbox.$DamageCapacity} />
							<Float descriptor={Gearbox.$DamagedConsumptionModifier} />
							<Float descriptor={Gearbox.$FuelConsumption} />
							<Float descriptor={Gearbox.$IdleFuelModifier} />
							{params && (
								<Select
									descriptor={params.$IsManualLowGear}
									options={[
										[true, texts.allow],
										[false, texts.notAllow]
									]}
								/>
							)}
						</Group>
					)
				})}
			</Accordion>
		</FileProvider>
	)
}
