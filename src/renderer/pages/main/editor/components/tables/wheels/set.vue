<template>
  <Group
    v-if='xml.TruckTires'
    v-for='Tire of xml.TruckTires.Tires'
    :label='getGameText(Tire.GameData?.UiDesc?.UiName, texts.tire, info.mod)'
  >
    <template v-if='Tire.WheelFriction'>
      <Float
        :label='texts.bodyFriction'
        :utils='Tire.WheelFriction.$BodyFriction'
        :areas='{
          yellow: [7, 8],
          red: [8.1, 10]
        }'
      />
      <Float
        :label='texts.bodyFrictionAsphalt'
        :utils='Tire.WheelFriction.$BodyFrictionAsphalt'
        :areas='{
          yellow: [7, 8],
          red: [8.1, 10]
        }'
      />
      <Float
        :label='texts.substanceFriction'
        :utils='Tire.WheelFriction.$SubstanceFriction'
        :areas='{
          yellow: [7, 8],
          red: [8.1, 10]
        }'
      />
      <Select
        :label='texts.ignoreIce'
        :utils='Tire.WheelFriction.$IsIgnoreIce'
        :options='[
          [true, texts.yes],
          [false, texts.no]
        ]'
      />
    </template>
    <UnlockPreset :element='Tire.GameData'/>
  </Group>
</template>

<script lang='ts' setup>
import { SaveUtils, provideFile } from '../../../utils'
import Group from '../../group'
import { Float } from '../../input'
import Select from '../../select'
import { getGameText } from '../../utils'
import UnlockPreset from '../unlock-preset.vue'
import texts from './texts'
import { File, WheelsXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

type Props = {
  xml: WheelsXML
  file: File
}

const { xml, file } = defineProps<Props>()
const { info } = useEditorStore()

provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
