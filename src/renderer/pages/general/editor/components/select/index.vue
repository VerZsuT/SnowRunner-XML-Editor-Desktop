<template>
  <Parameter
    :getter="getter"
    :setter="setter"
    :label="label"
    :desc="desc"
    :descriptor="descriptor"
    @change="$emit('change', $event)"
  >
    <template #default="{ onChange, value }">
      <SelectItem
        :multiple="multiple"
        :empty-is-all="emptyIsAll"
        :options="options"
        :value="<ArrOrNot<Value>> value"
        :disabled="disabled"
        @change="onChange"
      />
    </template>
  </Parameter>
</template>

<script lang='ts' setup>
import type { ArrOrNot, IParameterProps, ISelectProps, ParameterEmits } from '../../types'
import Parameter from '../parameter.vue'
import SelectItem from './item.vue'
import type { IStringConvertAttrDescriptor } from '/mods/xml/game/attributes'
import type { EmitsToProps } from '/rend/types'

export type SelectProps = Props & EmitsToProps<ParameterEmits>  

type Value = string | boolean
type Props = IParameterProps<Value, IStringConvertAttrDescriptor<Value | Value[] | boolean>> & Omit<ISelectProps, 'value'>

defineProps<Props>()
defineEmits<ParameterEmits>()
</script>
