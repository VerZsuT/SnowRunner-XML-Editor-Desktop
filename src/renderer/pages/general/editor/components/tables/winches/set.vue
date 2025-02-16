<template>
  <Accordion>
    <Group
      v-for="(Winch, i) of xml.Winches"
      :key="`winch=${i}`"
      :label="getGameText(Winch.GameData?.UiDesc?.UiName, texts.winch, info.mod)"
    >
      <Info
        v-if="Config.advancedMode"
        :descriptor="Winch.$Name"
      />
      <Int :descriptor="Winch.$Length" />
      <Float :descriptor="Winch.$StrengthMult" />
      <Select
        :descriptor="<any>Winch.$IsEngineIgnitionRequired"
        :options="[
          [true, texts.engine],
          [false, texts.battery]
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
import { Info } from '../../info'
import { Float, Int } from '../../input'
import Select from '../../select'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import UnlockPreset from '../unlock-preset'
import texts from './texts'
import type { IFile } from '/mods/renderer'
import { Config, type WinchesXML } from '/mods/renderer'

export type WinchSetProps = ReadyProps & Props

type Props = {
  xml: WinchesXML
  file: IFile
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
