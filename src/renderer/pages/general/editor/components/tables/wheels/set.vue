<template>
  <Accordion v-if="xml.TruckTires">
    <Group
      v-for="(Tire, i) of xml.TruckTires.Tires"
      :key="`tire-${i}`"
      :label="getGameText(Tire.GameData?.UiDesc?.UiName, texts.tire, info.mod)"
    >
      <Info
        v-if="config.advancedMode"
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
import type { IFile } from '@modules/files/renderer'
import type { Wheels as WheelsXML } from '@modules/xml/renderer'
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
import Select from '../../select/select.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { getGameText, useReady } from '../../utilities'
import UnlockPreset from '../unlock-preset/unlock-preset.vue'
import { WHEELS_LOCALIZATION as texts } from './localization'

export type WheelSetProps = ReadyProps & Props

type Props = {
  xml: WheelsXML
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
