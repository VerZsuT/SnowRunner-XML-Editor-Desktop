<template>
  <Group v-if='xml.GameData?.UiDesc' :label='texts.textGroupName' icon='texts'>
    <Text
      :label='texts.uiName'
      :utils='xml.GameData.UiDesc.$UiName'
    />
    <Text
      :label='texts.uiDesc'
      :utils='xml.GameData.UiDesc.$UiDesc'
    />
  </Group>
  <template v-if='xml.TruckData'>
    <Group :label='texts.controlGroupName' icon='steering-wheel'>
      <Float
        :label='texts.responsiveness'
        :utils='xml.TruckData.$Responsiveness'
        :step='0.01'
      />
      <Float
        :label='texts.backSteerSpeed'
        :utils='xml.TruckData.$BackSteerSpeed'
        :step='0.01'
      />
      <Float
        :label='texts.steerSpeed'
        :utils='xml.TruckData.$SteerSpeed'
        :step='0.01'
      />
    </Group>
    <Group :label='texts.winchGroupName' icon='winches'>
      <template v-if='xml.TruckData.Winch'>
        <Float
          :label='texts.winchLength'
          :utils='xml.TruckData.Winch.$Length'
          :step='1.0'
        />
        <Float
          :label='texts.winchStrength'
          :utils='xml.TruckData.Winch.$StrengthMult'
        />
      </template>
      <Winches
        v-files='ReadyType.winches'
        :getter='xml.TruckData.WinchUpgradeSocket?.winches'
        :files-getter='xml.TruckData.WinchUpgradeSocket?.winchesFiles'
        @ready='ready(ReadyType.winches)'
      />
    </Group>
    <Group :label='texts.wheelsGroupName' icon='wheels'>
      <Group :label='texts.physicsWheel'>
        <Group
          v-if='xml.TruckData.Wheels'
          v-for='(Wheel, index) of xml.TruckData.Wheels.Wheels'
          :label='`${texts.wheel} ${index + 1}`'
        >
          <Select
            :label='texts.torque'
            :utils='Wheel.$Torque'
            :options='[
              [WheelTorque.default, texts.torqueDefault],
              [WheelTorque.full, texts.torqueFull],
              [WheelTorque.none, texts.torqueNone],
              [WheelTorque.connectable, texts.torqueConnectable]
            ]'
          />
          <Float
            :label='texts.steeringAngle'
            :utils='Wheel.$SteeringAngle'
            :step='1.0'
          />
        </Group>
        <Group
          v-if='xml.TruckData.ExtraWheels'
          v-for='(ExtraWheel, index) of xml.TruckData.ExtraWheels.Wheels'
          :label='`${texts.extraWheel} ${index + 1}`'
        >
          <Select
            :label='texts.torque'
            :utils='ExtraWheel.$Torque'
            :options='[
              [WheelTorque.default, texts.torqueDefault],
              [WheelTorque.full, texts.torqueFull],
              [WheelTorque.none, texts.torqueNone],
              [WheelTorque.connectable, texts.torqueConnectable]
            ]'
          />
          <Float
            :label='texts.steeringAngle'
            :utils='ExtraWheel.$SteeringAngle'
            :step='1.0'
          />
        </Group>
      </Group>
      <Group :label='texts.wheelsSizes'>
        <Group
          v-for='(CompatibleWheels, index) of xml.TruckData.CompatibleWheels'
          :label='`${texts.wheelsSet} ${index + 1}`'
        >
          <Float
            :label='texts.wheelsScale'
            :utils='CompatibleWheels.$Scale'
          />
        </Group>
      </Group>
      <Wheels
        v-for='Wheel of filterCompat(xml.TruckData.CompatibleWheels)'
        v-files='`${ReadyType.wheels}_${Wheel.Type}`'
        :getter='Wheel.wheelSet'
        :file-getter='Wheel.wheelsFile'
        @ready='ready(`${ReadyType.wheels}_${Wheel.Type}`)'
      />
    </Group>
    <Group :label='texts.suspensionGroupName' icon='suspensions'>
      <Coords
        v-if='xml.PhysicsModel?.Body'
        :label='texts.centerOfMass'
        :utils='xml.PhysicsModel.Body.$CenterOfMassOffset'
      />
      <Select
        :label='texts.diffLock'
        :utils='xml.TruckData.$DiffLockType'
        :options='[
          [DiffLockType.none, texts.none],
          [DiffLockType.installed, texts.installed],
          [DiffLockType.uninstalled, texts.uninstalled],
          [DiffLockType.always, texts.always]
        ]'
      />
      <Suspensions
        v-files='ReadyType.suspensions'
        :getter='xml.TruckData.SuspensionSocket?.suspensions'
        :files-getter='xml.TruckData.SuspensionSocket?.suspensionsFiles'
        @ready='ready(ReadyType.suspensions)'
      />
    </Group>
    <Group :label='texts.gearboxGroupName' icon='gearboxes'>
      <Gearboxes
        v-files='ReadyType.gearboxes'
        :getter='xml.TruckData.GearboxSocket?.gearboxes'
        :files-getter='xml.TruckData.GearboxSocket?.gearboxesFiles'
        @ready='ready(ReadyType.gearboxes)'
      />
    </Group>
    <Group :label='texts.engineGroupName' icon='engines'>
      <Float
        :label='texts.engineStartDelay'
        :utils='xml.TruckData.$EngineStartDelay'
      />
      <Float
        :label='texts.exhaustStartTime'
        :utils='xml.TruckData.$ExhaustStartTime'
      />
      <Engines
        v-files='ReadyType.engines'
        :getter='xml.TruckData.EngineSocket?.engines'
        :files-getter='xml.TruckData.EngineSocket?.enginesFiles'
        @ready='ready(ReadyType.engines)'
      />
    </Group>
    <Group v-if='xml.TruckData.FuelTank' :label='texts.fuelGroupName' icon='fuel'>
      <Int
        :label='texts.damageCapacity'
        :utils='xml.TruckData.FuelTank.$DamageCapacity'
        :step='10'
        :areas='{
          yellow: [1000, 5000],
          red: [5001, Number.POSITIVE_INFINITY]
        }'
      />
      <Int
        :label='texts.fuelCapacity'
        :utils='xml.TruckData.$FuelCapacity'
        :step='10'
        :areas='{
          yellow: [1000, 5000],
          red: [5001, Number.POSITIVE_INFINITY]
        }'
      />
    </Group>
  </template>
  <Group v-if='xml.GameData' :label='texts.unlockGroupName' icon='unlock'>
    <Select
      multiple
      empty-is-all
      :label='texts.country'
      :utils='xml.GameData.$Country'
      :options='[
        [Country.ru, texts.russia],
        [Country.us, texts.usa],
        [Country.cas, texts.cas],
        [Country.ne, texts.ne]
      ]'
    />
    <Int
      :label='texts.price'
      :utils='xml.GameData.$Price'
    />
    <Select
      :label='texts.byExploration'
      :utils='xml.GameData.$UnlockByExploration'
      :options='[
        [true, texts.findOnMap],
        [false, texts.byRank]
      ]'
    />
    <Int
      :label='texts.unlockByRank'
      :utils='xml.GameData.$UnlockByRank'
    />
  </Group>
  <Extra
    v-files='ReadyType.extra'
    :file='file'
    :xml='xml'
    @ready='ready(ReadyType.extra)'
  />
</template>

<script lang='ts' setup>
import { SaveUtils } from '../../../utils'
import Coords from '../../coords'
import Extra from '../../extra'
import Group from '../../group'
import { Float, Int, Text } from '../../input'
import Select from '../../select'
import { ReadyEmits, useFilesReady } from '../../utils'
import Engines from '../engines'
import Gearboxes from '../gearboxes'
import Suspensions from '../suspensions'
import Wheels from '../wheels'
import Winches from '../winches'
import texts from './texts'
import { ReadyType } from './utils'
import { Country, DiffLockType, File, TruckCompatibleWheels, TruckXML, WheelTorque } from '/mods/renderer'

type Props = {
  xml: TruckXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { ready, vFiles } = useFilesReady(emit)
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
