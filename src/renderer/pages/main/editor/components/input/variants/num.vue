<template>
  <Input
    v-bind="props"
    :type="InputType.number"
    :number-type="numberType ?? NumberType.float"
    @change="$emit('change', +$event)"
  />
</template>

<script lang='ts' setup>
import { InputType, NumberType } from '../../../enums'
import type { IInputProps, IParameterProps, NumberEmits } from '../../../types'
import Input from '../index.vue'

import type { NumUtils } from '/mods/xml/game/game-xml'
import type { EmitsToProps } from '/rend/types'

export type NumProps = Props & EmitsToProps<NumberEmits>

type Props = IParameterProps<number, NumUtils> & Omit<IInputProps, 'type' | 'value'>

const props = defineProps<Props>()
defineEmits<NumberEmits>()
</script>
