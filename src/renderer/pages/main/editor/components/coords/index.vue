<template>
  <Parameter
    :getter="getter"
    :label="label"
    :desc="desc"
    :utils="utils"
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

import type { PosUtils } from '/mods/xml/game/game-xml'
import type Position from '/mods/xml/game/position'
import type { EmitsToProps } from '/rend/types'

export type CoordsProps = Props & EmitsToProps<ParameterEmits>

type Props = IParameterProps<Position, PosUtils> & Omit<IInputProps, 'value' | 'type'>

defineProps<Props>()
defineEmits<ParameterEmits>()
</script>
