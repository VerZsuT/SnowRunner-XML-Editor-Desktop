<template>
  <Parameter
    :getter='props.getter'
    :label='props.label'
    :utils='props.utils'
    @change='emit("change", $event)'
  >
    <template #default='{ onChange, value }'>
      <CoordsItem
        :limit='props.limit ?? props.utils?.limit'
        :number-type='props.numberType'
        :step='props.step'
        :value='<Position><unknown> value'
        @change='onChange'
      />
    </template>
  </Parameter>
</template>

<script lang='ts' setup>
import { IInputProps, IParameterProps, ParameterEmits } from '../../types'
import Parameter from '../parameter.vue'
import CoordsItem from './item.vue'
import { PosUtils } from '/mods/xml/game/game-xml'
import Position, { PosLimits } from '/mods/xml/game/position'

type Props = IParameterProps<Position, PosUtils> & Omit<IInputProps<PosLimits>, 'value' | 'type'>

const props = defineProps<Props>()
const emit = defineEmits<ParameterEmits>()
</script>
