<template>
  <Input
    v-bind="props"
    :type="InputType.number"
    :number-type="numberType ?? NumberType.float"
    @change="$emit('change', +$event)"
  />
</template>

<script lang='ts' setup>
import type { INumberAttrDescriptor } from '@modules/xml/game/attributes'
import type { EmitsToProps } from '@renderer/types'
import { InputType, NumberType } from '../../../enums'
import type { IInputProps, IParameterProps, NumberEmits } from '../../../types'
import Input from '../input.vue'

export type NumProps = Props & EmitsToProps<NumberEmits>

type Props = IParameterProps<number, INumberAttrDescriptor> & Omit<IInputProps, 'type' | 'value'>

const props = defineProps<Props>()
defineEmits<NumberEmits>()
</script>
