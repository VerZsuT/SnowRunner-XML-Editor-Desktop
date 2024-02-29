<template>
  <Accordion>
    <Group
      v-if="xml.GameData?.UiDesc"
      key="texts"
      :label="texts.textGroupName"
      icon="texts"
    >
      <Text
        :label="texts.uiName"
        :utils="xml.GameData.UiDesc.$UiName"
      />
      <Text
        :label="texts.uiDesc"
        :utils="xml.GameData.UiDesc.$UiDesc"
      />
    </Group>
    <template v-if="xml.TruckData">
      <Group
        key="control"
        :label="texts.controlGroupName"
        icon="steering-wheel"
      >
        <Float
          :label="texts.responsiveness"
          :utils="xml.TruckData.$Responsiveness"
          :step="0.01"
        />
        <Float
          :label="texts.backSteerSpeed"
          :utils="xml.TruckData.$BackSteerSpeed"
          :step="0.01"
        />
        <Float
          :label="texts.steerSpeed"
          :utils="xml.TruckData.$SteerSpeed"
          :step="0.01"
        />
      </Group>
      <Group
        key="winch"
        :label="texts.winchGroupName"
        icon="winches"
      >
        <template v-if="xml.TruckData.Winch">
          <Float
            :label="texts.winchLength"
            :utils="xml.TruckData.Winch.$Length"
            :step="1.0"
          />
          <Float
            :label="texts.winchStrength"
            :utils="xml.TruckData.Winch.$StrengthMult"
          />
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
                    :label="texts.torque"
                    :utils="Wheel.$Torque"
                    :options="[
                      [WheelTorque.default, texts.torqueDefault],
                      [WheelTorque.full, texts.torqueFull],
                      [WheelTorque.none, texts.torqueNone],
                      [WheelTorque.connectable, texts.torqueConnectable]
                    ]"
                  />
                  <Float
                    :label="texts.steeringAngle"
                    :utils="Wheel.$SteeringAngle"
                    :step="1.0"
                  />
                </Group>
              </template>
              <template v-if="xml.TruckData.ExtraWheels">
                <Group
                  v-for="(ExtraWheel, i) of xml.TruckData.ExtraWheels.Wheels"
                  :key="`extra-wheel-${i}`"
                  :label="`${texts.extraWheel} ${i + 1}`"
                >
                  <Select
                    :label="texts.torque"
                    :utils="ExtraWheel.$Torque"
                    :options="[
                      [WheelTorque.default, texts.torqueDefault],
                      [WheelTorque.full, texts.torqueFull],
                      [WheelTorque.none, texts.torqueNone],
                      [WheelTorque.connectable, texts.torqueConnectable]
                    ]"
                  />
                  <Float
                    :label="texts.steeringAngle"
                    :utils="ExtraWheel.$SteeringAngle"
                    :step="1.0"
                  />
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
                :label="`${texts.wheelsSet} ${i + 1}`"
              >
                <Float
                  :label="texts.wheelsScale"
                  :utils="CompatibleWheels.$Scale"
                />
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
          :label="texts.centerOfMass"
          :utils="xml.PhysicsModel.Body.$CenterOfMassOffset"
        />
        <Select
          :label="texts.diffLock"
          :utils="xml.TruckData.$DiffLockType"
          :options="[
            [DiffLockType.none, texts.none],
            [DiffLockType.installed, texts.installed],
            [DiffLockType.uninstalled, texts.uninstalled],
            [DiffLockType.always, texts.always]
          ]"
        />
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
        <Float
          :label="texts.engineStartDelay"
          :utils="xml.TruckData.$EngineStartDelay"
        />
        <Float
          :label="texts.exhaustStartTime"
          :utils="xml.TruckData.$ExhaustStartTime"
        />
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
        <Int
          :label="texts.damageCapacity"
          :utils="xml.TruckData.FuelTank.$DamageCapacity"
          :step="10"
          :areas="{
            yellow: [1000, 5000],
            red: [5001, Number.POSITIVE_INFINITY]
          }"
        />
        <Int
          :label="texts.fuelCapacity"
          :utils="xml.TruckData.$FuelCapacity"
          :step="10"
          :areas="{
            yellow: [1000, 5000],
            red: [5001, Number.POSITIVE_INFINITY]
          }"
        />
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
        :label="texts.country"
        :utils="xml.GameData.$Country"
        :options="[
          [Country.ru, texts.russia],
          [Country.us, texts.usa],
          [Country.cas, texts.cas],
          [Country.ne, texts.ne]
        ]"
      />
      <Int
        :label="texts.price"
        :utils="xml.GameData.$Price"
      />
      <Select
        :label="texts.byExploration"
        :utils="xml.GameData.$UnlockByExploration"
        :options="[
          [true, texts.findOnMap],
          [false, texts.byRank]
        ]"
      />
      <Int
        :label="texts.unlockByRank"
        :utils="xml.GameData.$UnlockByRank"
      />
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
import type { ReadyEmits } from '../../utils'
import { useFilesReady } from '../../utils'
import Engines from '../engines'
import Gearboxes from '../gearboxes'
import Suspensions from '../suspensions'
import Wheels from '../wheels'
import Winches from '../winches'
import texts from './texts'
import { ReadyType } from './utils'

import type { File, TruckCompatibleWheels, TruckXML } from '/mods/renderer'
import { Country, DiffLockType, WheelTorque } from '/mods/renderer'

type Props = {
  xml: TruckXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { ready, inProgress } = useFilesReady(emit)
SaveUtils.useOnSave(() => file.write(xml.baseXML))

function filterCompat(wheels: TruckCompatibleWheels[]) {
  const set = new Set<string>()
  return wheels.filter(item => {
    if (!item.Type || set.has(item.Type!)) return false
    set.add(item.Type)
    return true
  })
}
</script>
