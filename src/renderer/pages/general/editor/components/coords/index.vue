<template>
  <Parameter
    :getter="getter"
    :label="label"
    :desc="desc"
    :descriptor="descriptor"
    @change="$emit('change', $event)"
  >
    <template #default="{ onChange, value }">
      <CoordsItem
        :number-type="numberType"
        :step="step"
        :value="<Position><unknown> value"
        @change="onChange"
      />
    </template>
  </Parameter>
</template>

<script lang='ts' setup>
import type { IInputProps, IParameterProps, ParameterEmits } from '../../types'
import Parameter from '../parameter.vue'
import CoordsItem from './item.vue'
import type { IPositionAttrDescriptor } from '/mods/xml/game/attributes'
import type Position from '/mods/xml/game/position'
import type { EmitsToProps } from '/rend/types'

export type CoordsProps = Props & EmitsToProps<ParameterEmits>

type Props = IParameterProps<Position, IPositionAttrDescriptor> & Omit<IInputProps, 'value' | 'type'>

defineProps<Props>()
defineEmits<ParameterEmits>()
</script>
