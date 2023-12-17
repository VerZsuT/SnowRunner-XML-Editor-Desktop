<template>
  <Group
    v-for='Winch of xml.Winches'
    :label='getGameText(Winch.GameData?.UiDesc?.UiName, texts.winch, info.mod)'
  >
    <Int
      :label='texts.length'
      :utils='Winch.$Length'
      :areas='{
        yellow: [30, 50],
        red: [51, 100]
      }'
    />
    <Float
      :label='texts.strengthMult'
      :utils='Winch.$StrengthMult'
      :areas='{
        yellow: [2, 5],
        red: [5.1, 10]
      }'
    />
    <Select
      :label='texts.isEngineIgnitionRequired'
      :utils='Winch.$IsEngineIgnitionRequired'
      :options='[
        [true, texts.engine],
        [false, texts.battary]
      ]'
    />
    <UnlockPreset :element='Winch.GameData'/>
  </Group>
</template>

<script lang='ts' setup>
import { SaveUtils, provideFile } from '../../../utils'
import Group from '../../group'
import { Float, Int } from '../../input'
import Select from '../../select'
import { getGameText } from '../../utils'
import UnlockPreset from '../unlock-preset.vue'
import texts from './texts'
import { File, WinchesXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

type Props = {
  xml: WinchesXML
  file: File
}

const { xml, file } = defineProps<Props>()
const { info } = useEditorStore()

provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
