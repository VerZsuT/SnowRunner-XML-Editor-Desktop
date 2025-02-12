<template>
  <Accordion v-if="xml.TruckTires">
    <Group
      v-for="(Tire, i) of xml.TruckTires.Tires"
      :key="`tire-${i}`"
      :label="getGameText(Tire.GameData?.UiDesc?.UiName, texts.tire, info.mod)"
    >
      <template v-if="Tire.WheelFriction">
        <Float
          :label="texts.bodyFriction"
          :desc="Tire.WheelFriction.BodyFrictionDesc"
          :descriptor="Tire.WheelFriction.$BodyFriction"
          :areas="{
            yellow: [7, 8],
            red: [8.1, 10]
          }"
        />
        <Float
          :label="texts.bodyFrictionAsphalt"
          :desc="Tire.WheelFriction.BodyFrictionAsphaltDesc"
          :descriptor="Tire.WheelFriction.$BodyFrictionAsphalt"
          :areas="{
            yellow: [7, 8],
            red: [8.1, 10]
          }"
        />
        <Float
          :label="texts.substanceFriction"
          :desc="Tire.WheelFriction.SubstanceFrictionDesc"
          :descriptor="Tire.WheelFriction.$SubstanceFriction"
          :areas="{
            yellow: [7, 8],
            red: [8.1, 10]
          }"
        />
        <Select
          :label="texts.ignoreIce"
          :desc="Tire.WheelFriction.IsIgnoreIceDesc"
          :descriptor="Tire.WheelFriction.$IsIgnoreIce"
          :options="[
            [true, texts.yes],
            [false, texts.no]
          ]"
        />
      </template>
      <template #groups>
        <UnlockPreset
          key="unlock"
          :element="Tire.GameData"
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
import { Float } from '../../input'
import Select from '../../select'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import UnlockPreset from '../unlock-preset'
import texts from './texts'
import type { File, WheelsXML } from '/mods/renderer'

export type WheelSetProps = ReadyProps & Props

type Props = {
  xml: WheelsXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
