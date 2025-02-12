<template>
  <Accordion>
    <Group
      v-for="(Gearbox, i) of xml.Gearboxes"
      :key="`gearbox-${i}`"
      :label="getGameText(Gearbox.GameData?.UiDesc?.UiName, texts.gearbox, info.mod)"
    >
      <Info
        v-if="Config.advancedMode"
        :label="texts.name"
        :getter="() => Gearbox.Name"
      />
      <Float
        :label="texts.awdConsumptionModifier"
        :desc="Gearbox.AWDConsumptionModifierDesc"
        :descriptor="Gearbox.$AWDConsumptionModifier"
      />
      <Float
        :label="texts.criticalDamageThreshold"
        :desc="Gearbox.CriticalDamageThresholdDesc"
        :descriptor="Gearbox.$CriticalDamageThreshold"
        :step="0.01"
      />
      <Int
        :label="texts.damageCapacity"
        :desc="Gearbox.DamageCapacityDesc"
        :descriptor="Gearbox.$DamageCapacity"
        :step="10"
        :areas="{
          yellow: [1000, 10_000],
          red: [10_001, Number.POSITIVE_INFINITY]
        }"
      />
      <Float
        :label="texts.damagedConsumptionModifier"
        :desc="Gearbox.DamagedConsumptionModifierDesc"
        :descriptor="Gearbox.$DamagedConsumptionModifier"
        :step="0.01"
      />
      <Float
        :label="texts.fuelConsumption"
        :desc="Gearbox.FuelConsumptionDesc"
        :descriptor="Gearbox.$FuelConsumption"
      />
      <Float
        :label="texts.idleFuelConsumption"
        :desc="Gearbox.IdleFuelModifierDesc"
        :descriptor="Gearbox.$IdleFuelModifier"
      />
      <Select
        v-if="Gearbox.GameData?.GearboxParams"
        :label="texts.lowerManualGear"
        :desc="Gearbox.GameData.GearboxParams.IsManualLowGearDesc"
        :descriptor="Gearbox.GameData.GearboxParams.$IsManualLowGear"
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
            :descriptor="Gearbox.GameData.GearboxParams.$IsHighGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerGear"
            :desc="Gearbox.GameData.GearboxParams.IsLowerGearExistsDesc"
            :descriptor="Gearbox.GameData.GearboxParams.$IsLowerGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerPlusGear"
            :desc="Gearbox.GameData.GearboxParams.IsLowerPlusGearExistsDesc"
            :descriptor="Gearbox.GameData.GearboxParams.$IsLowerPlusGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :label="texts.lowerMinusGear"
            :desc="Gearbox.GameData.GearboxParams.IsLowerMinusGearExistsDesc"
            :descriptor="Gearbox.GameData.GearboxParams.$IsLowerMinusGearExists"
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
import GearPreset from '../gear-preset'
import UnlockPreset from '../unlock-preset'
import texts from './texts'
import { Config, type File, type GearboxesXML } from '/mods/renderer'

export type GearboxSetProps = ReadyProps & Props

type Props = {
  xml: GearboxesXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
