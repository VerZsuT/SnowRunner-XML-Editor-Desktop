<template>
  <Accordion>
    <Group
      v-for="(SuspensionSet, i) of xml.Sets"
      :key="`suspension-set-${i}`"
      :label="getGameText(SuspensionSet.GameData?.UiDesc?.UiName, texts.suspensionSet, info.mod)"
    >
      <Float
        :label="texts.criticalDamageThreshold"
        :desc="SuspensionSet.CriticalDamageThresholdDesc"
        :descriptor="SuspensionSet.$CriticalDamageThreshold"
        :step="0.01"
      />
      <Int
        :label="texts.damageCapacity"
        :desc="SuspensionSet.DamageCapacityDesc"
        :descriptor="SuspensionSet.$DamageCapacity"
        :step="10"
        :areas="{
          yellow: [1000, 10_000],
          red: [10_001, Number.POSITIVE_INFINITY]
        }"
      />
      <template #groups>
        <Group
          v-for="(Suspension, i2) of SuspensionSet.Suspensions"
          :key="`suspension-${i2}`"
          :label="`${texts.suspension} ${i2 + 1}`"
        >
          <Float
            :label="texts.height"
            :desc="Suspension.HeightDesc"
            :descriptor="Suspension.$Height"
            :areas="{
              yellow: [[-2, -1], [1, 2]],
              red: [[-1000, -2.1], [2.1, 1000]]
            }"
          />
          <Float
            :label="texts.strenght"
            :desc="Suspension.StrengthDesc"
            :descriptor="Suspension.$Strength"
            :step="0.01"
            :areas="{
              yellow: [0.5, 1.5],
              red: [1.6, Number.POSITIVE_INFINITY]
            }"
          />
          <Float
            :label="texts.damping"
            :desc="Suspension.DampingDesc"
            :descriptor="Suspension.$Damping"
            :areas="{
              yellow: [1, 3],
              red: [3, 1000]
            }"
          />
          <Float
            :label="texts.suspensionMin"
            :desc="Suspension.SuspensionMinDesc"
            :descriptor="Suspension.$SuspensionMin"
            :step="0.01"
            :areas="{
              yellow: [[-5, -2], [2, 5]],
              red: [[-1000, -5.1], [5.1, 1000]]
            }"
          />
          <Float
            :label="texts.suspensionMax"
            :desc="Suspension.SuspensionMaxDesc"
            :descriptor="Suspension.$SuspensionMax"
            :step="0.01"
            :areas="{
              yellow: [[-5, -2], [2, 5]],
              red: [[-1000, -5.1], [5.1, 1000]]
            }"
          />
          <Float
            :label="texts.brokenSuspensionMax"
            :desc="Suspension.BrokenSuspensionMaxDesc"
            :descriptor="Suspension.$BrokenSuspensionMax"
            :step="0.01"
            :areas="{
              yellow: [[-5, -2], [2, 5]],
              red: [[-1000, -5.1], [5.1, 1000]]
            }"
          />
        </Group>
        <UnlockPreset
          key="unlock"
          :element="SuspensionSet.GameData"
        />
      </template>
    </Group>
  </Accordion>
</template>

<script lang='ts' setup>
import { storeToRefs } from "pinia"
import { useEditorStore } from '../../../../store'
import { SaveUtils, provideFile } from '../../../utils'
import Accordion from '../../accordion.vue'
import Group from '../../group'
import { Float, Int } from '../../input'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import UnlockPreset from '../unlock-preset'
import texts from './texts'
import type { File, SuspensionsXML } from '/mods/renderer'

export type SuspensionSetProps = ReadyProps & Props

type Props = {
  xml: SuspensionsXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
