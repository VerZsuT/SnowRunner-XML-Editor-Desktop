<template>
  <Parameter
    :label='props.label'
    :getter='props.getter'
    :utils='props.utils'
    @change='emit("change", $event)'
  >
    <template #default='{ onChange, value }'>
      <InputItem
        :type='props.type'
        :number-type='props.numberType'
        :areas='props.areas'
        :step='props.step'
        :value='<string | number> value'
        @change='onChange'
      />
    </template>
  </Parameter>
</template>

<script lang='ts' setup>
import { IInputProps, IParameterProps, ParameterEmits } from '../../types'
import Parameter from '../parameter.vue'
import InputItem from './item.vue'

type Value = string | number
type Props = IParameterProps<Value> & Omit<IInputProps, 'value'>

const props = defineProps<Props>()
const emit = defineEmits<ParameterEmits>()
</script>
