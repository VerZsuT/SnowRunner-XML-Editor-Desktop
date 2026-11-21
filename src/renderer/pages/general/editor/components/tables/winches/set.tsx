import type { IFile } from '@modules/files/renderer'
import type { IBooleanAttrDescriptor } from '@modules/xml/game/attributes'
import type { WinchVariants } from '@modules/xml/renderer'
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
import { UnlockPreset } from '../unlock-preset/unlock-preset'
import { WINCHES_LOCALIZATION as texts } from './localization'

/** Параметры набора лебёдок. */
export type WinchSetProps = ReadyProps & {
	/** Лебёдки. */
	xml: WinchVariants

	/** Файл. */
	file: IFile
}

/** Набор лебёдок. */
export function WinchSet({ xml, file, onReady, onMount }: WinchSetProps) {
	const info = useEditorStore(state => state.info)
	const config = useConfig()

	useReady({ onReady, onMount })
	useSaveListener(() => file.write(xml.baseXML))

	return (
		<FileProvider file={file}>
			<Accordion>
				{xml.Winches.map((Winch, i) => (
					<Group
						key={`winch-${i}`}
						label={getGameText(Winch.GameData?.UiDesc?.UiName, texts.winch, info.mod)}
						groups={<UnlockPreset element={Winch.GameData} />}
					>
						{config.advancedMode && <Info descriptor={Winch.$Name} />}
						<Int descriptor={Winch.$Length} />
						<Float descriptor={Winch.$StrengthMult} />
						<Select
							descriptor={Winch.$IsEngineIgnitionRequired as unknown as IBooleanAttrDescriptor}
							options={[
								[true, texts.engine],
								[false, texts.battery]
							]}
						/>
					</Group>
				))}
			</Accordion>
		</FileProvider>
	)
}
