<template>
  <Accordion>
    <Group
      v-for="(Gearbox, i) of xml.Gearboxes"
      :key="`gearbox-${i}`"
      :label="getGameText(Gearbox.GameData?.UiDesc?.UiName, texts.gearbox, info.mod)"
    >
      <Float
        :label="texts.awdConsumptionModifier"
        :utils="Gearbox.$AWDConsumptionModifier"
      />
      <Float
        :label="texts.criticalDamageThreshold"
        :utils="Gearbox.$CriticalDamageThreshold"
        :step="0.01"
      />
      <Int
        :label="texts.damageCapacity"
        :utils="Gearbox.$DamageCapacity"
        :step="10"
        :areas="{
          yellow: [1000, 10_000],
          red: [10_001, Number.POSITIVE_INFINITY]
        }"
      />
      <Float
        :label="texts.damagedConsumptionModifier"
        :utils="Gearbox.$DamagedConsumptionModifier"
        :step="0.01"
      />
      <Float
        :label="texts.fuelConsumption"
        :utils="Gearbox.$FuelConsumption"
      />
      <Float
        :label="texts.idleFuelConsumption"
        :utils="Gearbox.$IdleFuelModifier"
      />
      <Select
        v-if="Gearbox.GameData?.GearboxParams"
        :label="texts.lowerManualGear"
        :utils="Gearbox.GameData.GearboxParams.$IsManualLowGear"
        :options="[
          [true, texts.allow],
          [false, texts.notAllow]
        ]"
      />
      <template #groups>
        <Group
          v-if="Gearbox.GameData?.GearboxParams"
          key="params"
          :label="texts.gearboxParams"
        >
          <Select
            :label="texts.highGear"
            :utils="Gearbox.GameData.GearboxParams.$IsHighGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerGear"
            :utils="Gearbox.GameData.GearboxParams.$IsLowerGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerPlusGear"
            :utils="Gearbox.GameData.GearboxParams.$IsLowerPlusGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerMinusGear"
            :utils="Gearbox.GameData.GearboxParams.$IsLowerMinusGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
        </Group>
        <Group
          key="gears"
          :label="texts.gears"
        >
          <template #groups>
            <Group
              key="reverse"
              :label="texts.reverseGear"
            >
              <GearPreset :element="Gearbox.ReverseGear" />
            </Group>
            <Group
              key="high"
              :label="texts.highGear"
            >
              <GearPreset :element="Gearbox.HighGear" />
            </Group>
            <Group
              v-for="(Gear, i2) of Gearbox.Gears"
              :key="`gear-${i2}`"
              :label="String(i2 + 1)"
            >
              <GearPreset :element="Gear" />
            </Group>
          </template>
        </Group>
        <UnlockPreset
          key="unlock"
          :element="Gearbox.GameData"
        />
      </template>
    </Group>
  </Accordion>
</template>

<script lang='ts' setup>
import { SaveUtils, provideFile } from '../../../utils'
import Accordion from '../../accordion.vue'
import Group from '../../group'
import { Float, Int } from '../../input'
import Select from '../../select'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { getGameText, useReady } from '../../utils'
import GearPreset from '../gear-preset.vue'
import UnlockPreset from '../unlock-preset.vue'
import texts from './texts'

import type { File, GearboxesXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

export type GearboxSetProps = ReadyProps & Props

type Props = {
  xml: GearboxesXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info } = useEditorStore()

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
