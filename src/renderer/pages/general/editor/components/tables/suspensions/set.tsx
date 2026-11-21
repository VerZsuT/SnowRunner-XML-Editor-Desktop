import type { IFile } from '@modules/files/renderer'
import { WheelLocation } from '@modules/xml/renderer'
import type { Suspensions as SuspensionsXML } from '@modules/xml/renderer'
import { useConfig } from '@renderer/utilities/use-reactive'
import { useEditorStore } from '../../../../store/editor'
import { useSaveListener } from '../../../utilities/hooks'
import { FileProvider } from '../../../utilities/import'
import { Accordion } from '../../accordion'
import { Group } from '../../group/group'
import { Info } from '../../info/info'
import { Float } from '../../input/variants/float'
import { Int } from '../../input/variants/int'
import type { ReadyProps } from '../../utilities'
import { getGameText, useReady } from '../../utilities'
import { UnlockPreset } from '../unlock-preset/unlock-preset'
import { SUSPENSIONS_LOCALIZATION as texts } from './localization'

/** Параметры набора подвесок. */
export type SuspensionSetProps = ReadyProps & {
	/** Подвески. */
	xml: SuspensionsXML

	/** Файл. */
	file: IFile
}

/** Набор подвесок. */
export function SuspensionSet({ xml, file, onReady, onMount }: SuspensionSetProps) {
	const info = useEditorStore(state => state.info)
	const config = useConfig()

	useReady({ onReady, onMount })
	useSaveListener(() => file.write(xml.baseXML))

	return (
		<FileProvider file={file}>
			<Accordion>
				{xml.Sets.map((SuspensionSet, i) => (
					<Group
						key={`suspension-set-${i}`}
						label={getGameText(SuspensionSet.GameData?.UiDesc?.UiName, texts.suspensionSet, info.mod)}
						groups={[
							...SuspensionSet.Suspensions.map((Suspension, i2) => (
								<Group
									key={`suspension-${i2}`}
									label={getSuspensionLabel(i2 + 1, Suspension.WheelType)}
								>
									<Float descriptor={Suspension.$Height} />
									<Float descriptor={Suspension.$Strength} />
									<Float descriptor={Suspension.$Damping} />
									<Float descriptor={Suspension.$SuspensionMin} />
									<Float descriptor={Suspension.$SuspensionMax} />
									<Float descriptor={Suspension.$BrokenSuspensionMax} />
								</Group>
							)),
							<UnlockPreset key="unlock" element={SuspensionSet.GameData} />
						]}
					>
						{config.advancedMode && <Info descriptor={SuspensionSet.$Name} />}
						<Float descriptor={SuspensionSet.$CriticalDamageThreshold} />
						<Int descriptor={SuspensionSet.$DamageCapacity} />
					</Group>
				))}
			</Accordion>
		</FileProvider>
	)
}

/**
 * Получить подпись подвески.
 * @param nth Номер подвески.
 * @param type Тип колеса.
 */
function getSuspensionLabel(nth: number, type?: WheelLocation) {
	const values: Record<WheelLocation, string> = {
		[WheelLocation.front]: texts.frontSuspension,
		[WheelLocation.middle]: texts.middleSuspension,
		[WheelLocation.rear]: texts.rearSuspension
	}

	return values[type!] ?? `${texts.suspension} ${nth}`
}
