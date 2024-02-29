<template>
  <Parameter
    :getter="props.getter"
    :label="props.label"
    :utils="props.utils"
    @change="emit('change', $event)"
  >
    <template #default="{ onChange, value }">
      <CoordsItem
        :number-type="props.numberType"
        :step="props.step"
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

type Props = IParameterProps<Position, PosUtils> & Omit<IInputProps, 'value' | 'type'>

const props = defineProps<Props>()
const emit = defineEmits<ParameterEmits>()
</script>
