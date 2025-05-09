<template>
  <Accordion>
    <Group
      v-if="xml.GameData?.UiDesc"
      key="texts"
      :label="texts.textGroupName"
      icon="texts"
    >
      <Text
        v-if="xml.GameData.UiDesc.DefaultRegion"
        :descriptor="xml.GameData.UiDesc.DefaultRegion.$UiName"
      />
      <Text
        v-else
        :descriptor="xml.GameData.UiDesc.$UiName"
      />
      <Text
        v-if="xml.GameData.UiDesc.DefaultRegion"
        :descriptor="xml.GameData.UiDesc.DefaultRegion.$UiDesc"
      />
      <Text
        v-else
        :descriptor="xml.GameData.UiDesc.$UiDesc"
      />
    </Group>
    <template v-if="xml.TruckData">
      <Group
        key="control"
        :label="texts.controlGroupName"
        icon="steering-wheel"
      >
        <Float :descriptor="xml.TruckData.$Responsiveness" />
        <Float :descriptor="xml.TruckData.$BackSteerSpeed" />
        <Float :descriptor="xml.TruckData.$SteerSpeed" />
      </Group>
      <Group
        key="winch"
        :label="texts.winchGroupName"
        icon="winches"
      >
        <template v-if="xml.TruckData.Winch">
          <Float :descriptor="xml.TruckData.Winch.$Length" />
          <Float :descriptor="xml.TruckData.Winch.$StrengthMult" />
        </template>
        <Winches
          key="winches-file"
          :getter="xml.TruckData.WinchUpgradeSocket?.winches"
          :files-getter="xml.TruckData.WinchUpgradeSocket?.winchesFiles"
          @mount="inProgress(ReadyType.winches)"
          @ready="ready(ReadyType.winches)"
        />
      </Group>
      <Group
        key="wheels"
        :label="texts.wheelsGroupName"
        icon="wheels"
      >
        <template #groups>
          <Group
            key="physics"
            :label="texts.physicsWheel"
          >
            <template #groups>
              <template v-if="xml.TruckData.Wheels">
                <Group
                  v-for="(Wheel, i) of xml.TruckData.Wheels.Wheels"
                  :key="`wheel-${i}`"
                  :label="`${texts.wheel} ${i + 1}`"
                >
                  <Select
                    :descriptor="Wheel.$Torque"
                    :options="[
                      [WheelTorque.default, texts.torqueDefault],
                      [WheelTorque.full, texts.torqueFull],
                      [WheelTorque.none, texts.torqueNone],
                      [WheelTorque.connectable, texts.torqueConnectable]
                    ]"
                  />
                  <Float :descriptor="Wheel.$SteeringAngle" />
                </Group>
              </template>
              <template v-if="xml.TruckData.ExtraWheels">
                <Group
                  v-for="(ExtraWheel, i) of xml.TruckData.ExtraWheels.Wheels"
                  :key="`extra-wheel-${i}`"
                  :label="`${texts.extraWheel} ${i + 1}`"
                >
                  <Select
                    :descriptor="ExtraWheel.$Torque"
                    :options="[
                      [WheelTorque.default, texts.torqueDefault],
                      [WheelTorque.full, texts.torqueFull],
                      [WheelTorque.none, texts.torqueNone],
                      [WheelTorque.connectable, texts.torqueConnectable]
                    ]"
                  />
                  <Float :descriptor="ExtraWheel.$SteeringAngle" />
                </Group>
              </template>
            </template>
          </Group>
          <Group
            key="wheelsSizes"
            :label="texts.wheelsSizes"
          >
            <template #groups>
              <Group
                v-for="(CompatibleWheels, i) of xml.TruckData.CompatibleWheels"
                :key="`compat-wheels-${i}`"
                :label="getCompatibleWheelsLabel(i + 1, CompatibleWheels.Type)"
              >
                <Float :descriptor="CompatibleWheels.$Scale" />
              </Group>
            </template>
          </Group>
        </template>
        <Wheels
          v-for="(Wheel, i) of filterCompat(xml.TruckData.CompatibleWheels)"
          :key="`compat-wheels-file-${i}`"
          :getter="Wheel.wheelSet"
          :file-getter="Wheel.wheelsFile"
          @mount="inProgress(`${ReadyType.wheels}_${Wheel.Type}`)"
          @ready="ready(`${ReadyType.wheels}_${Wheel.Type}`)"
        />
      </Group>
      <Group
        key="suspensions"
        :label="texts.suspensionGroupName"
        icon="suspensions"
      >
        <Coords
          v-if="xml.PhysicsModel?.Body"
          :descriptor="xml.PhysicsModel.Body.$CenterOfMassOffset"
        />
        <DiffLock :descriptor="xml.TruckData.$DiffLockType" />
        <Suspensions
          key="suspensions-file"
          :getter="xml.TruckData.SuspensionSocket?.suspensions"
          :files-getter="xml.TruckData.SuspensionSocket?.suspensionsFiles"
          @mount="inProgress(ReadyType.suspensions)"
          @ready="ready(ReadyType.suspensions)"
        />
      </Group>
      <Group
        key="gearboxes"
        :label="texts.gearboxGroupName"
        icon="gearboxes"
      >
        <Gearboxes
          key="gearboxes-file"
          :getter="xml.TruckData.GearboxSocket?.gearboxes"
          :files-getter="xml.TruckData.GearboxSocket?.gearboxesFiles"
          @mount="inProgress(ReadyType.gearboxes)"
          @ready="ready(ReadyType.gearboxes)"
        />
      </Group>
      <Group
        key="engines"
        :label="texts.engineGroupName"
        icon="engines"
      >
        <Float :descriptor="xml.TruckData.$EngineStartDelay" />
        <Float :descriptor="xml.TruckData.$ExhaustStartTime" />
        <Engines
          key="engines-file"
          :getter="xml.TruckData.EngineSocket?.engines"
          :files-getter="xml.TruckData.EngineSocket?.enginesFiles"
          @mount="inProgress(ReadyType.engines)"
          @ready="ready(ReadyType.engines)"
        />
      </Group>
      <Group
        v-if="xml.TruckData.FuelTank"
        key="fuel"
        :label="texts.fuelGroupName"
        icon="fuel"
      >
        <Int :descriptor="xml.TruckData.FuelTank.$DamageCapacity" />
        <Int :descriptor="xml.TruckData.$FuelCapacity" />
      </Group>
    </template>
    <Group
      v-if="xml.GameData"
      key="unlock"
      :label="texts.unlockGroupName"
      icon="unlock"
    >
      <Select
        multiple
        empty-is-all
        :descriptor="xml.GameData.$Country"
        :options="[
          [Country.ru, texts.russia],
          [Country.us, texts.usa],
          [Country.cas, texts.cas],
          [Country.ne, texts.ne]
        ]"
      />
      <Int :descriptor="xml.GameData.$Price" />
      <Select
        :descriptor="xml.GameData.$UnlockByExploration"
        :options="[
          [true, texts.findOnMap],
          [false, texts.byRank]
        ]"
      />
      <Int :descriptor="xml.GameData.$UnlockByRank" />
    </Group>
    <Extra
      key="extra"
      :file="file"
      :xml="xml"
      @mount="inProgress(ReadyType.extra)"
      @ready="ready(ReadyType.extra)"
    />
  </Accordion>
</template>

<script lang='ts' setup>
import { SaveUtils } from '../../../utils'
import Accordion from '../../accordion.vue'
import Coords from '../../coords'
import Extra from '../../extra'
import Group from '../../group'
import { Float, Int, Text } from '../../input'
import Select from '../../select'
import DiffLock from '../../select/diff-lock.vue'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useFilesReady } from '../../utils'
import Engines from '../engines'
import Gearboxes from '../gearboxes'
import Suspensions from '../suspensions'
import Wheels from '../wheels'
import Winches from '../winches'
import texts from './texts'
import { ReadyType } from './utils'
import type { IFile, TruckCompatibleWheels, TruckXML } from '/mods/renderer'
import { Config, Country, WheelTorque } from '/mods/renderer'

export type TruckProps = ReadyProps & Props

type Props = {
  xml: TruckXML
  file: IFile
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { ready, inProgress } = useFilesReady(emit)

SaveUtils.useOnSave(() => file.write(xml.baseXML))

function filterCompat(wheels: TruckCompatibleWheels[]) {
  const set = new Set<string>()

  return wheels.filter(item => {
    if (!item.Type || set.has(item.Type!)) {
      return false
    }
    
    set.add(item.Type)
    
    return true
  })
}

function getCompatibleWheelsLabel(nth: number, type?: string) {
  return Config.advancedMode && type
    ? type
    : `${texts.wheelsSet} ${nth}`
}
</script>
