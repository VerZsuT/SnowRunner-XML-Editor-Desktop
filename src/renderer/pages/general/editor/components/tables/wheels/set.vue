<template>
  <Accordion v-if="xml.TruckTires">
    <Group
      v-for="(Tire, i) of xml.TruckTires.Tires"
      :key="`tire-${i}`"
      :label="getGameText(Tire.GameData?.UiDesc?.UiName, texts.tire, info.mod)"
    >
      <Info
        v-if="Config.advancedMode"
        :descriptor="Tire.$Name"
      />
      <template v-if="Tire.WheelFriction">
        <Float :descriptor="Tire.WheelFriction.$BodyFriction" />
        <Float :descriptor="Tire.WheelFriction.$BodyFrictionAsphalt" />
        <Float :descriptor="Tire.WheelFriction.$SubstanceFriction" />
        <Select
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
import { Info } from '../../info'
import { Float } from '../../input'
import Select from '../../select'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import UnlockPreset from '../unlock-preset'
import texts from './texts'
import type { IFile } from '/mods/renderer'
import { Config, type WheelsXML } from '/mods/renderer'

export type WheelSetProps = ReadyProps & Props

type Props = {
  xml: WheelsXML
  file: IFile
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
