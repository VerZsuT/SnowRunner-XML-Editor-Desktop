<template>
  <Group
    v-for='SuspensionSet of xml.Sets'
    :label='getGameText(SuspensionSet.GameData?.UiDesc?.UiName, texts.suspensionSet, info.mod)'
  >
    <Float
      :label='texts.criticalDamageThreshold'
      :utils='SuspensionSet.$CriticalDamageThreshold'
      :step='0.01'
    />
    <Int
      :label='texts.damageCapacity'
      :utils='SuspensionSet.$DamageCapacity'
      :step='10'
      :areas='{
        yellow: [1000, 10_000],
        red: [10_001, Number.POSITIVE_INFINITY]
      }'
    />
    <template v-for='(Suspension, index) of SuspensionSet.Suspensions'>
      <Group :label='`${texts.suspension} ${index + 1}`'>
        <Float
          :label='texts.height'
          :utils='Suspension.$Height'
          :areas='{
            yellow: [[-2, -1], [1, 2]],
            red: [[-1000, -2.1], [2.1, 1000]]
          }'
        />
        <Float
          :label='texts.strenght'
          :utils='Suspension.$Strength'
          :step='0.01'
          :areas='{
            yellow: [0.5, 1.5],
            red: [1.6, Number.POSITIVE_INFINITY]
          }'
        />
        <Float
          :label='texts.damping'
          :utils='Suspension.$Damping'
          :areas='{
            yellow: [1, 3],
            red: [3, 1000]
          }'
        />
        <Float
          :label='texts.suspensionMin'
          :utils='Suspension.$SuspensionMin'
          :step='0.01'
          :areas='{
            yellow: [[-5, -2], [2, 5]],
            red: [[-1000, -5.1], [5.1, 1000]]
          }'
        />
        <Float
          :label='texts.suspensionMax'
          :utils='Suspension.$SuspensionMax'
          :step='0.01'
          :areas='{
            yellow: [[-5, -2], [2, 5]],
            red: [[-1000, -5.1], [5.1, 1000]]
          }'
        />
        <Float
          :label='texts.brokenSuspensionMax'
          :utils='Suspension.$BrokenSuspensionMax'
          :step='0.01'
          :areas='{
            yellow: [[-5, -2], [2, 5]],
            red: [[-1000, -5.1], [5.1, 1000]]
          }'
        />
      </Group>
    </template>
    <UnlockPreset :element='SuspensionSet.GameData'/>
  </Group>
</template>

<script lang='ts' setup>
import { SaveUtils, provideFile } from '../../../utils'
import Group from '../../group'
import { Float, Int } from '../../input'
import { getGameText } from '../../utils'
import UnlockPreset from '../unlock-preset.vue'
import texts from './texts'
import { File, SuspensionsXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

type Props = {
  xml: SuspensionsXML
  file: File
}

const { xml, file } = defineProps<Props>()
const { info } = useEditorStore()

provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
