<template>
  <Input
    v-bind="props"
    :type="InputType.text"
    @change="$emit('change', $event)"
  />
</template>

<script lang='ts' setup>
import type { EmitsToProps } from '@renderer/types'
import { InputType } from '../../../enums'
import type { IInputProps, IParameterProps, ParameterEmits } from '../../../types'
import Input from '../input.vue'

export type TextProps = Props & EmitsToProps<ParameterEmits>

type Props = IParameterProps<string> & Omit<IInputProps, 'type' | 'value'>

const props = defineProps<Props>()
defineEmits<ParameterEmits>()
</script>
