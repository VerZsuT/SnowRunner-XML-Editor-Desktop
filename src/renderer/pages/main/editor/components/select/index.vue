<template>
  <Parameter
    :getter="getter"
    :setter="setter"
    :label="label"
    :utils="utils"
    @change="$emit('change', $event)"
  >
    <template #default="{ onChange, value }">
      <SelectItem
        :multiple="multiple"
        :empty-is-all="emptyIsAll"
        :options="options"
        :value="<ArrOrNot<Value>> value"
        @change="onChange"
      />
    </template>
  </Parameter>
</template>

<script lang='ts' setup>
import type { ArrOrNot, IParameterProps, ISelectProps, ParameterEmits } from '../../types'
import Parameter from '../parameter.vue'
import SelectItem from './item.vue'

import type { StrConvertUtils, Utils } from '/mods/xml/game/game-xml'
import type { EmitsToProps } from '/rend/types'

export type SelectProps = Props & EmitsToProps<ParameterEmits>  

type Value = string | boolean
type Props = IParameterProps<Value, Utils<Value> | StrConvertUtils<Value[] | boolean>> & Omit<ISelectProps, 'value'>

defineProps<Props>()
defineEmits<ParameterEmits>()
</script>
