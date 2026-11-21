import type { IFile } from '@modules/files/renderer'
import type { Wheels as WheelsXML } from '@modules/xml/renderer'
import { useConfig } from '@renderer/utilities/use-reactive'
import { useEditorStore } from '../../../../store/editor'
import { useSaveListener } from '../../../utilities/hooks'
import { FileProvider } from '../../../utilities/import'
import { Accordion } from '../../accordion'
import { Group } from '../../group/group'
import { Info } from '../../info/info'
import { Float } from '../../input/variants/float'
import { Select } from '../../select/select'
import type { ReadyProps } from '../../utilities'
import { getGameText, useReady } from '../../utilities'
import { UnlockPreset } from '../unlock-preset/unlock-preset'
import { WHEELS_LOCALIZATION as texts } from './localization'

/** Параметры набора колёс. */
export type WheelSetProps = ReadyProps & {
	/** Набор колёс. */
	xml: WheelsXML

	/** Файл. */
	file: IFile
}

/** Набор колёс. */
export function WheelSet({ xml, file, onReady, onMount }: WheelSetProps) {
	const info = useEditorStore(state => state.info)
	const config = useConfig()

	useReady({ onReady, onMount })
	useSaveListener(() => file.write(xml.baseXML))

	if (!xml.TruckTires) {
		return null
	}

	return (
		<FileProvider file={file}>
			<Accordion>
				{xml.TruckTires.Tires.map((Tire, i) => (
					<Group
						key={`tire-${i}`}
						label={getGameText(Tire.GameData?.UiDesc?.UiName, texts.tire, info.mod)}
						groups={<UnlockPreset element={Tire.GameData} />}
					>
						{config.advancedMode && <Info descriptor={Tire.$Name} />}
						{Tire.WheelFriction && (
							<>
								<Float descriptor={Tire.WheelFriction.$BodyFriction} />
								<Float descriptor={Tire.WheelFriction.$BodyFrictionAsphalt} />
								<Float descriptor={Tire.WheelFriction.$SubstanceFriction} />
								<Select
									descriptor={Tire.WheelFriction.$IsIgnoreIce}
									options={[
										[true, texts.yes],
										[false, texts.no]
									]}
								/>
							</>
						)}
					</Group>
				))}
			</Accordion>
		</FileProvider>
	)
}
