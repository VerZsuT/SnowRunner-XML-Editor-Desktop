<template>
  <Accordion>
    <Group
      v-for="(Engine, i) of xml.Engines"
      :key="`engine-${i}`"
      :label="getGameText(Engine.GameData?.UiDesc?.UiName, texts.engine, info.mod)"
    >
      <Info
        v-if="Config.advancedMode"
        :label="texts.name"
        :getter="() => Engine.Name"
      />
      <Float
        :label="texts.criticalDamageThreshold"
        :desc="Engine.CriticalDamageThresholdDesc"
        :descriptor="Engine.$CriticalDamageThreshold"
        :step="0.01"
      />
      <Int
        :label="texts.damageCapacity"
        :desc="Engine.DamageCapacityDesc"
        :descriptor="Engine.$DamageCapacity"
        :step="10"
        :areas="{
          yellow: [1001, 5000],
          red: [5001, Number.POSITIVE_INFINITY]
        }"
      />
      <Float
        :label="texts.damagedConsumptionModifier"
        :desc="Engine.DamagedConsumptionModifierDesc"
        :descriptor="Engine.$DamagedConsumptionModifier"
      />
      <Float
        :label="texts.responsiveness"
        :desc="Engine.EngineResponsivenessDesc"
        :descriptor="Engine.$EngineResponsiveness"
        :step="0.01"
        :areas="{
          yellow: [0.1, 0.5],
          red: [0.5, 1]
        }"
      />
      <Float
        :label="texts.fuelConsumption"
        :desc="Engine.FuelConsumptionDesc"
        :descriptor="Engine.$FuelConsumption"
      />
      <Int
        :label="texts.torque"
        :desc="Engine.TorqueDesc"
        :descriptor="Engine.$Torque"
        :step="100"
        :areas="{
          yellow: [700_000, 800_000],
          red: [800_001, Number.POSITIVE_INFINITY]
        }"
      />
      <Float
        :label="texts.damagedMinTorqueModifier"
        :desc="Engine.DamagedMinTorqueMultiplierDesc"
        :descriptor="Engine.$DamagedMinTorqueMultiplier"
        :step="0.01"
      />
      <Float
        :label="texts.damagedMaxTorqueModifier"
        :desc="Engine.DamagedMaxTorqueMultiplierDesc"
        :descriptor="Engine.$DamagedMaxTorqueMultiplier"
        :step="0.01"
      />
      <Float
        :label="texts.brakesDelay"
        :desc="Engine.BrakesDelayDesc"
        :descriptor="Engine.$BrakesDelay"
      />
      <Float
        :label="texts.maxDeltaAngVel"
        :desc="Engine.MaxDeltaAngVelDesc"
        :descriptor="Engine.$MaxDeltaAngVel"
      />
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
