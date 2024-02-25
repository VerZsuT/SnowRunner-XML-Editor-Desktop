<template>
  <Group :label='texts.inner'>
    <template v-if='xml.TruckData'>
      <Int
        :label='texts.fuelCapacity'
        :utils='xml.TruckData.$FuelCapacity'
        :step='10'
        :areas='{
          yellow: [1000, 5000],
          red: [5001, Number.POSITIVE_INFINITY]
        }'
      />
      <Int
        :label='texts.waterCapacity'
        :utils='xml.TruckData.$WaterCapacity'
        :step='10'
        :areas='{
          yellow: [1000, 5000],
          red: [5001, Number.POSITIVE_INFINITY]
        }'
      />
      <Int
        :label='texts.repairsCapacity'
        :utils='xml.TruckData.$RepairsCapacity'
        :step='10'
        :areas='{
          yellow: [1000, 5000],
          red: [5001, Number.POSITIVE_INFINITY]
        }'
      />
      <Int
        :label='texts.wheepRepairsCapacity'
        :utils='xml.TruckData.$WheelRepairsCapacity'
        :step='10'
        :areas='{
          yellow: [100, 500],
          red: [501, Number.POSITIVE_INFINITY]
        }'
      />
      <Int
        v-if='xml.GameData?.AddonSlots'
        :label='texts.quantity'
        :utils='xml.GameData.AddonSlots.$Quantity'
      />
      <Group v-if='xml.TruckData.Wheels' :label='texts.wheels'>
        <Group
          v-for='(Wheel, index) of xml.TruckData.Wheels.Wheels'
          :label='`${texts.wheel} ${index + 1}`'
        >
          <Float
            :label='texts.suspHeight'
            :utils='Wheel.$SuspensionHeight'
          />
          <Float
            :label='texts.suspStrength'
            :utils='Wheel.$SuspensionStrength'
          />
        </Group>
      </Group>
    </template>
  </Group>
  <Group :label='texts.mass'>
    <Int
      v-if='xml.PhysicsModel?.Body'
      :label='texts.trailerMass'
      :utils='xml.PhysicsModel.Body.$Mass'
    />
    <Int
      v-if='xml.FuelMass?.Body'
      :label='texts.fuelMass'
      :utils='xml.FuelMass.Body.$Mass'
    />
  </Group>
  <Group v-if='xml.GameData' :label='texts.other'>
    <Int
      :label='texts.price'
      :utils='xml.GameData.$Price'
    />
  </Group>
</template>

<script lang='ts' setup>
import { SaveUtils } from '../../../utils'
import Group from '../../group'
import { Float, Int } from '../../input'
import texts from './texts'
import { File, TruckXML } from '/mods/renderer'

type Props = {
  xml: TruckXML
  file: File
}

const { xml, file } = defineProps<Props>()

SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
