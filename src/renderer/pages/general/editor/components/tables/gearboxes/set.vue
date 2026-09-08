<template>
  <Accordion>
    <Group
      v-for="(Gearbox, i) of xml.Gearboxes"
      :key="`gearbox-${i}`"
      :label="getGameText(Gearbox.GameData?.UiDesc?.UiName, texts.gearbox, info.mod)"
    >
      <Info
        v-if="config.advancedMode"
        :descriptor="Gearbox.$Name"
      />
      <Float :descriptor="Gearbox.$AWDConsumptionModifier" />
      <Float :descriptor="Gearbox.$CriticalDamageThreshold" />
      <Int :descriptor="Gearbox.$DamageCapacity" />
      <Float :descriptor="Gearbox.$DamagedConsumptionModifier" />
      <Float :descriptor="Gearbox.$FuelConsumption" />
      <Float :descriptor="Gearbox.$IdleFuelModifier" />
      <Select
        v-if="Gearbox.GameData?.GearboxParams"
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
            :descriptor="Gearbox.GameData.GearboxParams.$IsHighGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :descriptor="Gearbox.GameData.GearboxParams.$IsLowerGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
            :descriptor="Gearbox.GameData.GearboxParams.$IsLowerPlusGearExists"
            :options="[
              [true, texts.gearAllow],
              [false, texts.gearNotAllow]
            ]"
          />
          <Select
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
import type { IFile } from '@modules/files/renderer'
import type { Gearboxes as GearboxesXML } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { storeToRefs } from 'pinia'
import { useEditorStore } from '../../../../store/editor'
import { provideFile } from '../../../utilities/import'
import { saveUtils } from '../../../utilities/save'
import Accordion from '../../accordion.vue'
import Group from '../../group/group.vue'
import Info from '../../info/info.vue'
import Float from '../../input/variants/float.vue'
import Int from '../../input/variants/int.vue'
import Select from '../../select/select.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { getGameText, useReady } from '../../utilities'
import GearPreset from '../gear-preset/gear-preset.vue'
import UnlockPreset from '../unlock-preset/unlock-preset.vue'
import { GEARBOXES_LOCALIZATION as texts } from './localization'

export type GearboxSetProps = ReadyProps & Props

type Props = {
	xml: GearboxesXML
	file: IFile
}

const config = di.resolve(CONFIG_TOKEN)
const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { info } = storeToRefs(useEditorStore())

useReady(emit)
provideFile(file)
saveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
