<template>
  <Accordion>
    <Group
      v-for="(SuspensionSet, i) of xml.Sets"
      :key="`suspension-set-${i}`"
      :label="getGameText(SuspensionSet.GameData?.UiDesc?.UiName, texts.suspensionSet, info.mod)"
    >
      <Info
        v-if="config.advancedMode"
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
import type { IFile } from '@modules/files/renderer'
import type { Suspensions as SuspensionsXML } from '@modules/xml/renderer'
import { WheelLocation } from '@modules/xml/renderer'
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
import { SUSPENSIONS_LOCALIZATION as texts } from './localization'

export type SuspensionSetProps = ReadyProps & Props

type Props = {
  xml: SuspensionsXML
  file: IFile
}

const config = di.resolve(CONFIG_TOKEN)
const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
saveUtils.useOnSave(() => file.write(xml.baseXML))

function getSuspensionLabel(nth: number, type?: WheelLocation) {
  const values: Record<WheelLocation, string> = {
    [WheelLocation.front]: texts.frontSuspension,
    [WheelLocation.middle]: texts.middleSuspension,
    [WheelLocation.rear]: texts.rearSuspension
  }
  
  return values[type!] ?? `${texts.suspension} ${nth}`
}
</script>
