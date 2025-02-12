<template>
  <Accordion>
    <Group
      v-for="(Winch, i) of xml.Winches"
      :key="`winch=${i}`"
      :label="getGameText(Winch.GameData?.UiDesc?.UiName, texts.winch, info.mod)"
    >
      <Int
        :label="texts.length"
        :desc="Winch.LengthDesc"
        :descriptor="Winch.$Length"
        :areas="{
          yellow: [30, 50],
          red: [51, 100]
        }"
      />
      <Float
        :label="texts.strengthMult"
        :descriptor="Winch.$StrengthMult"
        :areas="{
          yellow: [2, 5],
          red: [5.1, 10]
        }"
      />
      <Select
        :label="texts.isEngineIgnitionRequired"
        :desc="Winch.IsEngineIgnitionRequiredDesc"
        :descriptor="<any>Winch.$IsEngineIgnitionRequired"
        :options="[
          [true, texts.engine],
          [false, texts.battary]
        ]"
      />
      <template #groups>
        <UnlockPreset
          key="unlock"
          :element="Winch.GameData"
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
import { Float, Int } from '../../input'
import Select from '../../select'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import UnlockPreset from '../unlock-preset'
import texts from './texts'
import type { File, WinchesXML } from '/mods/renderer'

export type WinchSetProps = ReadyProps & Props

type Props = {
  xml: WinchesXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
