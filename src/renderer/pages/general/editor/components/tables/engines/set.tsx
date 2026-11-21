import type { IFile } from '@modules/files/renderer'
import type { Engines as EnginesXML } from '@modules/xml/renderer'
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
import { ENGINES_LOCALIZATION as texts } from './localization'

/** Параметры набора двигателей. */
export type EngineSetProps = ReadyProps & {
	/** Двигатели. */
	xml: EnginesXML

	/** Файл. */
	file: IFile
}

/** Набор двигателей. */
export function EngineSet({ xml, file, onReady, onMount }: EngineSetProps) {
	const info = useEditorStore(state => state.info)
	const config = useConfig()

	useReady({ onReady, onMount })
	useSaveListener(() => file.write(xml.baseXML))

	return (
		<FileProvider file={file}>
			<Accordion>
				{xml.Engines.map((Engine, i) => (
					<Group
						key={`engine-${i}`}
						label={getGameText(Engine.GameData?.UiDesc?.UiName, texts.engine, info.mod)}
						groups={<UnlockPreset element={Engine.GameData} />}
					>
						{config.advancedMode && <Info descriptor={Engine.$Name} />}
						<Float descriptor={Engine.$CriticalDamageThreshold} />
						<Int descriptor={Engine.$DamageCapacity} />
						<Float descriptor={Engine.$DamagedConsumptionModifier} />
						<Float descriptor={Engine.$EngineResponsiveness} />
						<Float descriptor={Engine.$FuelConsumption} />
						<Int descriptor={Engine.$Torque} />
						<Float descriptor={Engine.$DamagedMinTorqueMultiplier} />
						<Float descriptor={Engine.$DamagedMaxTorqueMultiplier} />
						<Float descriptor={Engine.$BrakesDelay} />
						<Float descriptor={Engine.$MaxDeltaAngVel} />
					</Group>
				))}
			</Accordion>
		</FileProvider>
	)
}
