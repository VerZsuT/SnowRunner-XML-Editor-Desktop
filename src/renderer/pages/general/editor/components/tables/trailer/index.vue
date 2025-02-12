<template>
  <Accordion>
    <Group
      key="inner"
      :label="texts.inner"
    >
      <template v-if="xml.TruckData">
        <Int
          :label="texts.fuelCapacity"
          :desc="xml.TruckData.FuelCapacityDesc"
          :descriptor="xml.TruckData.$FuelCapacity"
          :step="10"
          :areas="{
            yellow: [1000, 5000],
            red: [5001, Number.POSITIVE_INFINITY]
          }"
        />
        <Int
          :label="texts.waterCapacity"
          :desc="xml.TruckData.WaterCapacityDesc"
          :descriptor="xml.TruckData.$WaterCapacity"
          :step="10"
          :areas="{
            yellow: [1000, 5000],
            red: [5001, Number.POSITIVE_INFINITY]
          }"
        />
        <Int
          :label="texts.repairsCapacity"
          :desc="xml.TruckData.RepairsCapacityDesc"
          :descriptor="xml.TruckData.$RepairsCapacity"
          :step="10"
          :areas="{
            yellow: [1000, 5000],
            red: [5001, Number.POSITIVE_INFINITY]
          }"
        />
        <Int
          :label="texts.wheelRepairsCapacity"
          :desc="xml.TruckData.WheelRepairsCapacityDesc"
          :descriptor="xml.TruckData.$WheelRepairsCapacity"
          :step="10"
          :areas="{
            yellow: [100, 500],
            red: [501, Number.POSITIVE_INFINITY]
          }"
        />
        <Int
          v-if="xml.GameData?.AddonSlots"
          :label="texts.quantity"
          :desc="xml.GameData.AddonSlots.QuantityDesc"
          :descriptor="xml.GameData.AddonSlots.$Quantity"
        />
      </template>
      <template #groups>
        <Group
          v-if="xml.TruckData?.Wheels"
          key="wheels"
          :label="texts.wheels"
        >
          <template #groups>
            <Group
              v-for="(Wheel, i) of xml.TruckData.Wheels.Wheels"
              :key="`wheel-${i}`"
              :label="`${texts.wheel} ${i + 1}`"
            >
              <Float
                :label="texts.suspHeight"
                :desc="Wheel.SuspensionHeightDesc"
                :descriptor="Wheel.$SuspensionHeight"
              />
              <Float
                :label="texts.suspStrength"
                :desc="Wheel.SuspensionStrengthDesc"
                :descriptor="Wheel.$SuspensionStrength"
              />
            </Group>
          </template>
        </Group>
      </template>
    </Group>
    <Group
      key="mass"
      :label="texts.mass"
    >
      <Coords
        v-if="xml.PhysicsModel?.Body"
        :label="texts.centerOfMass"
        :descriptor="xml.PhysicsModel.Body.$CenterOfMassOffset"
      />
      <Int
        v-if="xml.PhysicsModel?.Body"
        :label="texts.trailerMass"
        :descriptor="xml.PhysicsModel.Body.$Mass"
      />
      <Int
        v-if="xml.FuelMass?.Body"
        :label="texts.fuelMass"
        :descriptor="xml.FuelMass.Body.$Mass"
      />
    </Group>
    <Group
      v-if="xml.GameData"
      key="other"
      :label="texts.other"
    >
      <Int
        :label="texts.price"
        :desc="xml.GameData.PriceDesc"
        :descriptor="xml.GameData.$Price"
      />
    </Group>
  </Accordion>
</template>

<script lang='ts' setup>
import { SaveUtils } from '../../../utils'
import Accordion from '../../accordion.vue'
import Coords from '../../coords'
import Group from '../../group'
import { Float, Int } from '../../input'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useReady } from '../../utils'
import texts from './texts'
import type { File, TruckXML } from '/mods/renderer'

export type TrailerProps = ReadyProps & Props

type Props = {
  xml: TruckXML
  file: File
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

useReady(emit)
SaveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
