<template>
  <Group
    v-for='Gearbox of xml.Gearboxes'
    :label='getGameText(Gearbox.GameData?.UiDesc?.UiName, texts.gearbox, info.mod)'
  >
    <Float
      :label='texts.awdConsumptionModifier'
      :utils='Gearbox.$AWDConsumptionModifier'
    />
    <Float
      :label='texts.criticalDamageThreshold'
      :utils='Gearbox.$CriticalDamageThreshold'
      :step='0.01'
    />
    <Int
      :label='texts.damageCapacity'
      :utils='Gearbox.$DamageCapacity'
      :step='10'
      :areas='{
        yellow: [1000, 10_000],
        red: [10_001, Number.POSITIVE_INFINITY]
      }'
    />
    <Float
      :label='texts.damagedConsumptionModifier'
      :utils='Gearbox.$DamagedConsumptionModifier'
      :step='0.01'
    />
    <Float
      :label='texts.fuelConsumption'
      :utils='Gearbox.$FuelConsumption'
    />
    <Float
      :label='texts.idleFuelConsumption'
      :utils='Gearbox.$IdleFuelModifier'
    />
    <template v-if='Gearbox.GameData?.GearboxParams'>
      <Select
        :label='texts.lowerManualGear'
        :utils='Gearbox.GameData.GearboxParams.$IsManualLowGear'
        :options='[
          [true, texts.allow],
          [false, texts.notAllow]
        ]'
      />
      <Group :label='texts.gearboxParams'>
        <Select
          :label='texts.highGear'
          :utils='Gearbox.GameData.GearboxParams.$IsHighGearExists'
          :options='[
            [true, texts.gearAllow],
            [false, texts.gearNotAllow]
          ]'
        />
        <Select
          :label='texts.lowerGear'
          :utils='Gearbox.GameData.GearboxParams.$IsLowerGearExists'
          :options='[
            [true, texts.gearAllow],
            [false, texts.gearNotAllow]
          ]'
        />
        <Select
          :label='texts.lowerPlusGear'
          :utils='Gearbox.GameData.GearboxParams.$IsLowerPlusGearExists'
          :options='[
            [true, texts.gearAllow],
            [false, texts.gearNotAllow]
          ]'
        />
        <Select
          :label='texts.lowerMinusGear'
          :utils='Gearbox.GameData.GearboxParams.$IsLowerMinusGearExists'
          :options='[
            [true, texts.gearAllow],
            [false, texts.gearNotAllow]
          ]'
        />
      </Group>
    </template>
    <Group :label='texts.gears'>
      <Group :label='texts.reverseGear'>
        <GearPreset :element='Gearbox.ReverseGear'/>
      </Group>
      <Group :label='texts.highGear'>
        <GearPreset :element='Gearbox.HighGear' />
      </Group>
      <Group v-for='(Gear, index) of Gearbox.Gears' :label='String(index + 1)'>
        <GearPreset :element='Gear' />
      </Group>
    </Group>
    <UnlockPreset :element='Gearbox.GameData'/>
  </Group>
</template>

<script lang='ts' setup>
import { SaveUtils, provideFile } from '../../../utils'
import Group from '../../group'
import { Float, Int } from '../../input'
import Select from '../../select'
import { getGameText } from '../../utils'
import GearPreset from '../gear-preset.vue'
import UnlockPreset from '../unlock-preset.vue'
import texts from './texts'
import { File, GearboxesXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

type Props = {
  xml: GearboxesXML
  file: File
}

const { xml, file } = defineProps<Props>()
const { info } = useEditorStore()

provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
