<template>
  <Parameter
    :label="label"
    :getter="getter"
    :utils="utils"
    @change="$emit('change', $event)"
  >
    <template #default="{ onChange, value }">
      <InputItem
        :type="type"
        :number-type="numberType"
        :areas="areas"
        :step="step"
        :value="<any> value"
        @change="onChange"
      />
    </template>
  </Parameter>
</template>

<script lang='ts' setup>
import type { IInputProps, IParameterProps, ParameterEmits } from '../../types'
import Parameter from '../parameter.vue'
import InputItem from './item.vue'

import type { EmitsToProps } from '/rend/types'

export type InputProps = Props & EmitsToProps<ParameterEmits>

type Value = string | number
type Props = IParameterProps<Value> & Omit<IInputProps, 'value'>

defineProps<Props>()
defineEmits<ParameterEmits>()
</script>
