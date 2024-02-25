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
        :limit='props.limit ?? props.utils?.limit'
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
import { Limit } from '/mods/renderer'
import { UtilsWithLimit } from '/mods/xml/game/game-xml'

type Value = string | number
type Props = IParameterProps<Value, UtilsWithLimit<Value, Limit>> & Omit<IInputProps, 'value'>

const props = defineProps<Props>()
const emit = defineEmits<ParameterEmits>()
</script>
