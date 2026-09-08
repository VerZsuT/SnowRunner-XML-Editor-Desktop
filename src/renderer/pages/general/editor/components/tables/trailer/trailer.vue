<template>
  <Accordion>
    <Group
      key="inner"
      :label="texts.inner"
    >
      <template v-if="xml.TruckData">
        <Int :descriptor="xml.TruckData.$FuelCapacity" />
        <Int :descriptor="xml.TruckData.$WaterCapacity" />
        <Int :descriptor="xml.TruckData.$RepairsCapacity" />
        <Int :descriptor="xml.TruckData.$WheelRepairsCapacity" />
        <Int
          v-if="xml.GameData?.AddonSlots"
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
              <Float :descriptor="Wheel.$SuspensionHeight" />
              <Float :descriptor="Wheel.$SuspensionStrength" />
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
      <Int :descriptor="xml.GameData.$Price" />
    </Group>
  </Accordion>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/types'
import type { TruckXML } from '@modules/xml/renderer'
import { saveUtils } from '../../../utilities/save'
import Accordion from '../../accordion.vue'
import Coords from '../../coords/coords.vue'
import Group from '../../group/group.vue'
import Float from '../../input/variants/float.vue'
import Int from '../../input/variants/int.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { useReady } from '../../utilities'
import { TRAILER_LOCALIZATION as texts } from './localization'

export type TrailerProps = ReadyProps & Props

type Props = {
	xml: TruckXML
	file: IFile
}

const { xml, file } = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

useReady(emit)
saveUtils.useOnSave(() => file.write(xml.baseXML))
</script>
