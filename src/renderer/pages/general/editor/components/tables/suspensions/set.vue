<template>
  <Accordion>
    <Group
      v-for="(SuspensionSet, i) of xml.Sets"
      :key="`suspension-set-${i}`"
      :label="getGameText(SuspensionSet.GameData?.UiDesc?.UiName, texts.suspensionSet, info.mod)"
    >
      <Info
        v-if="Config.advancedMode"
        :descriptor="SuspensionSet.$Name"
      />
      <Float :descriptor="SuspensionSet.$CriticalDamageThreshold" />
      <Int :descriptor="SuspensionSet.$DamageCapacity" />
      <template #groups>
        <Group
          v-for="(Suspension, i2) of SuspensionSet.Suspensions"
          :key="`suspension-${i2}`"
          :label="getSuspensionLabel(i2 + 1, Suspension.WheelType)"
        >
          <Float :descriptor="Suspension.$Height" />
          <Float :descriptor="Suspension.$Strength" />
          <Float :descriptor="Suspension.$Damping" />
          <Float :descriptor="Suspension.$SuspensionMin" />
          <Float :descriptor="Suspension.$SuspensionMax" />
          <Float :descriptor="Suspension.$BrokenSuspensionMax" />
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
import type { IFile } from '/mods/renderer'
import { Config, WheelLocation, type SuspensionsXML } from '/mods/renderer'

export type SuspensionSetProps = ReadyProps & Props

type Props = {
  xml: SuspensionsXML
  file: IFile
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))

function getSuspensionLabel(nth: number, type?: WheelLocation) {
  const values: Record<WheelLocation, string> = {
    [WheelLocation.front]: texts.frontSuspension,
    [WheelLocation.middle]: texts.middleSuspension,
    [WheelLocation.rear]: texts.rearSuspension
  }
  
  return values[type!] ?? `${texts.suspension} ${nth}`
}
</script>
