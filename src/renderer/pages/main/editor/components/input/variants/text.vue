<template>
  <Input
    v-bind="props"
    :type="InputType.text"
    @change="emit('change', $event)"
  />
</template>

<script lang='ts' setup>
import { InputType } from '../../../enums'
import type { IInputProps, IParameterProps, ParameterEmits } from '../../../types'
import Input from '../index.vue'

type Props = IParameterProps<string> & Omit<IInputProps, 'type' | 'value'>

const props = defineProps<Props>()
const emit = defineEmits<ParameterEmits>()
</script>
