<template>
  <Accordion>
    <Group
      v-for="(SuspensionSet, i) of xml.Sets"
      :key="`suspension-set-${i}`"
      :label="getGameText(SuspensionSet.GameData?.UiDesc?.UiName, texts.suspensionSet, info.mod)"
    >
      <Float
        :label="texts.criticalDamageThreshold"
        :utils="SuspensionSet.$CriticalDamageThreshold"
        :step="0.01"
      />
      <Int
        :label="texts.damageCapacity"
        :utils="SuspensionSet.$DamageCapacity"
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
            :utils="Suspension.$Height"
            :areas="{
              yellow: [[-2, -1], [1, 2]],
              red: [[-1000, -2.1], [2.1, 1000]]
            }"
          />
          <Float
            :label="texts.strenght"
            :utils="Suspension.$Strength"
            :step="0.01"
            :areas="{
              yellow: [0.5, 1.5],
              red: [1.6, Number.POSITIVE_INFINITY]
            }"
          />
          <Float
            :label="texts.damping"
            :utils="Suspension.$Damping"
            :areas="{
              yellow: [1, 3],
              red: [3, 1000]
            }"
          />
          <Float
            :label="texts.suspensionMin"
            :utils="Suspension.$SuspensionMin"
            :step="0.01"
            :areas="{
              yellow: [[-5, -2], [2, 5]],
              red: [[-1000, -5.1], [5.1, 1000]]
            }"
          />
          <Float
            :label="texts.suspensionMax"
            :utils="Suspension.$SuspensionMax"
            :step="0.01"
            :areas="{
              yellow: [[-5, -2], [2, 5]],
              red: [[-1000, -5.1], [5.1, 1000]]
            }"
          />
          <Float
            :label="texts.brokenSuspensionMax"
            :utils="Suspension.$BrokenSuspensionMax"
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
import { SaveUtils, provideFile } from '../../../utils'
import Accordion from '../../accordion.vue'
import Group from '../../group'
import { Float, Int } from '../../input'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import UnlockPreset from '../unlock-preset.vue'
import texts from './texts'

import type { File, SuspensionsXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

export type SuspensionSetProps = ReadyProps & Props

type Props = {
  xml: SuspensionsXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info } = useEditorStore()

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
