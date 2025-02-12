<template>
  <Parameter
    :label="label"
    :desc="desc"
    :getter="getter"
    :descriptor="descriptor"
    @change="$emit('change', $event)"
  >
    <template #default="{ onChange, value }">
      <InputTip
        :descriptor="descriptor"
        :areas="areas"
      >
        <InputItem
          :type="type"
          :number-type="numberType"
          :areas="areas"
          :step="step"
          :value="<any> value"
          :min="descriptor.limit?.minValue"
          :max="descriptor.limit?.maxValue"
          @change="onChange"
        />
      </InputTip>
    </template>
  </Parameter>
</template>

<script lang='ts' setup>
import type { IInputProps, IParameterProps, ParameterEmits } from '../../types'
import Parameter from '../parameter.vue'
import InputTip from './input-tip.vue'
import InputItem from './item.vue'
import type { EmitsToProps } from '/rend/types'

export type InputProps = Props & EmitsToProps<ParameterEmits>

type Value = string | number
type Props = IParameterProps<Value> & Omit<IInputProps, 'value'>

defineProps<Props>()
defineEmits<ParameterEmits>()
</script>
