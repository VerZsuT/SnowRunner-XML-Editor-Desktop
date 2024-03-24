<template>
  <Accordion>
    <Group
      v-for="(Gearbox, i) of xml.Gearboxes"
      :key="`gearbox-${i}`"
      :label="getGameText(Gearbox.GameData?.UiDesc?.UiName, texts.gearbox, info.mod)"
    >
      <Float
        :label="texts.awdConsumptionModifier"
        :desc="Gearbox.AWDConsumptionModifierDesc"
        :utils="Gearbox.$AWDConsumptionModifier"
      />
      <Float
        :label="texts.criticalDamageThreshold"
        :desc="Gearbox.CriticalDamageThresholdDesc"
        :utils="Gearbox.$CriticalDamageThreshold"
        :step="0.01"
      />
      <Int
        :label="texts.damageCapacity"
        :desc="Gearbox.DamageCapacityDesc"
        :utils="Gearbox.$DamageCapacity"
        :step="10"
        :areas="{
          yellow: [1000, 10_000],
          red: [10_001, Number.POSITIVE_INFINITY]
        }"
      />
      <Float
        :label="texts.damagedConsumptionModifier"
        :desc="Gearbox.DamagedConsumptionModifierDesc"
        :utils="Gearbox.$DamagedConsumptionModifier"
        :step="0.01"
      />
      <Float
        :label="texts.fuelConsumption"
        :desc="Gearbox.FuelConsumptionDesc"
        :utils="Gearbox.$FuelConsumption"
      />
      <Float
        :label="texts.idleFuelConsumption"
        :desc="Gearbox.IdleFuelModifierDesc"
        :utils="Gearbox.$IdleFuelModifier"
      />
      <Select
        v-if="Gearbox.GameData?.GearboxParams"
        :label="texts.lowerManualGear"
        :desc="Gearbox.GameData.GearboxParams.IsManualLowGearDesc"
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
            :desc="Gearbox.GameData.GearboxParams.IsHighGearExistsDesc"
            :utils="Gearbox.GameData.GearboxParams.$IsHighGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerGear"
            :desc="Gearbox.GameData.GearboxParams.IsLowerGearExistsDesc"
            :utils="Gearbox.GameData.GearboxParams.$IsLowerGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerPlusGear"
            :desc="Gearbox.GameData.GearboxParams.IsLowerPlusGearExistsDesc"
            :utils="Gearbox.GameData.GearboxParams.$IsLowerPlusGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerMinusGear"
            :desc="Gearbox.GameData.GearboxParams.IsLowerMinusGearExistsDesc"
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
