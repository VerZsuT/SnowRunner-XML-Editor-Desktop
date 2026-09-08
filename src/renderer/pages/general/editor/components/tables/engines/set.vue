<template>
  <Accordion>
    <Group
      v-for="(Engine, i) of xml.Engines"
      :key="`engine-${i}`"
      :label="getGameText(Engine.GameData?.UiDesc?.UiName, texts.engine, info.mod)"
    >
      <Info
        v-if="config.advancedMode"
        :descriptor="Engine.$Name"
      />
      <Float :descriptor="Engine.$CriticalDamageThreshold" />
      <Int :descriptor="Engine.$DamageCapacity" />
      <Float :descriptor="Engine.$DamagedConsumptionModifier" />
      <Float :descriptor="Engine.$EngineResponsiveness" />
      <Float :descriptor="Engine.$FuelConsumption" />
      <Int :descriptor="Engine.$Torque" />
      <Float :descriptor="Engine.$DamagedMinTorqueMultiplier" />
      <Float :descriptor="Engine.$DamagedMaxTorqueMultiplier" />
      <Float :descriptor="Engine.$BrakesDelay" />
      <Float :descriptor="Engine.$MaxDeltaAngVel" />
      <template #groups>
        <UnlockPreset
          key="unlock"
          :element="Engine.GameData"
        />
      </template>
    </Group>
  </Accordion>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/renderer'
import type { Engines as EnginesXML } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '../../../../store/editor'
import { provideFile } from '../../../utilities/import'
import { saveUtils } from '../../../utilities/save'
import Accordion from '../../accordion.vue'
import Group from '../../group/group.vue'
import Info from '../../info/info.vue'
import Float from '../../input/variants/float.vue'
import Int from '../../input/variants/int.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { getGameText, useReady } from '../../utilities'
import UnlockPreset from '../unlock-preset/unlock-preset.vue'
import { ENGINES_LOCALIZATION as texts } from './localization'

export type EngineSetProps = ReadyProps & Props

type Props = {
	xml: EnginesXML
	file: IFile
}

const config = di.resolve(CONFIG_TOKEN)
const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
saveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
