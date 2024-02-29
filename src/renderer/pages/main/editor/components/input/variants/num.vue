<template>
  <Input
    v-bind="props"
    :type="InputType.number"
    :number-type="props.numberType ?? NumberType.float"
    @change="emit('change', +$event)"
  />
</template>

<script lang='ts' setup>
import { InputType, NumberType } from '../../../enums'
import type { IInputProps, IParameterProps, NumberEmits } from '../../../types'
import Input from '../index.vue'

import type { NumUtils } from '/mods/xml/game/game-xml'

type Props = IParameterProps<number, NumUtils> & Omit<IInputProps, 'type' | 'value'>

const props = defineProps<Props>()
const emit = defineEmits<NumberEmits>()
</script>
