<template>
  <Group
    v-for='Engine of xml.Engines'
    :label='getGameText(Engine.GameData?.UiDesc?.UiName, texts.engine, info.mod)'
  >
    <Float
      :label='texts.criticalDamageThreshold'
      :utils='Engine.$CriticalDamageThreshold'
      :step='0.01'
    />
    <Int
      :label='texts.damageCapacity'
      :utils='Engine.$DamageCapacity'
      :step='10'
      :areas='{
        yellow: [1001, 5000],
        red: [5001, Number.POSITIVE_INFINITY]
      }'
    />
    <Float
      :label='texts.damagedConsumptionModifier'
      :utils='Engine.$DamagedConsumptionModifier'
    />
    <Float
      :label='texts.responsiveness'
      :utils='Engine.$Responsiveness'
      :step='0.01'
      :areas='{
        yellow: [0.1, 0.5],
        red: [0.5, 1]
      }'
    />
    <Float
      :label='texts.fuelConsumption'
      :utils='Engine.$FuelConsumption'
    />
    <Int
      :label='texts.torque'
      :utils='Engine.$Torque'
      :step='100'
      :areas='{
        yellow: [700_000, 800_000],
        red: [800_001, Number.POSITIVE_INFINITY]
      }'
    />
    <Float
      :label='texts.damagedMinTorqueModifier'
      :utils='Engine.$DamagedMinTorqueMultiplier'
      :step='0.01'
    />
    <Float
      :label='texts.damagedMaxTorqueModifier'
      :utils='Engine.$DamagedMaxTorqueMultiplier'
      :step='0.01'
    />
    <Float
      :label='texts.brakesDelay'
      :utils='Engine.$BrakesDelay'
    />
    <Float
      :label='texts.maxDeltaAngVel'
      :utils='Engine.$MaxDeltaAngVel'
    />
    <UnlockPreset :element='Engine.GameData' />
  </Group>
</template>

<script lang='ts' setup>
import { SaveUtils, provideFile } from '../../../utils'
import Group from '../../group'
import { Float, Int } from '../../input'
import { getGameText } from '../../utils'
import UnlockPreset from '../unlock-preset.vue'
import texts from './texts'
import { EnginesXML, File } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

type Props = {
  xml: EnginesXML
  file: File
}

const { xml, file } = defineProps<Props>()
const { info } = useEditorStore()

provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
