<template>
  <Accordion>
    <Group
      v-for="(Engine, i) of xml.Engines"
      :key="`engine-${i}`"
      :label="getGameText(Engine.GameData?.UiDesc?.UiName, texts.engine, info.mod)"
    >
      <Info
        v-if="Config.advancedMode"
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
import { storeToRefs } from 'pinia'
import { useEditorStore } from '../../../../store'
import { SaveUtils, provideFile } from '../../../utils'
import Accordion from '../../accordion.vue'
import Group from '../../group'
import { Info } from '../../info'
import { Float, Int } from '../../input'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import UnlockPreset from '../unlock-preset'
import texts from './texts'
import { Config, type EnginesXML, type File } from '/mods/renderer'

export type EngineSetProps = ReadyProps & Props

type Props = {
  xml: EnginesXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
