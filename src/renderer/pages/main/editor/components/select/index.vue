<template>
  <Parameter
    :getter="props.getter"
    :setter="props.setter"
    :label="props.label"
    :utils="props.utils"
    @change="emit('change', $event)"
  >
    <template #default="{ onChange, value }">
      <SelectItem
        :multiple="props.multiple"
        :empty-is-all="props.emptyIsAll"
        :options="props.options"
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

type Value = string | boolean
type Props = IParameterProps<Value, Utils<Value> | StrConvertUtils<Value[] | boolean>> & Omit<ISelectProps, 'value'>

const emit = defineEmits<ParameterEmits>()
const props = defineProps<Props>()
</script>
