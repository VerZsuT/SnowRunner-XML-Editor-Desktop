<template>
  <Num
    v-bind="props"
    :number-type="NumberType.integer"
    @change="$emit('change', $event)"
  />
</template>

<script lang='ts' setup>
import type { INumberAttrDescriptor } from '@modules/xml/game/attributes'
import type { EmitsToProps } from '@renderer/types'
import { NumberType } from '../../../enums'
import type { IParameterProps, NumberEmits, NumberProps } from '../../../types'
import Num from './num.vue'

export type IntProps = Props & EmitsToProps<NumberEmits>

type Props = IParameterProps<number, INumberAttrDescriptor> & Omit<NumberProps, 'type' | 'value'>

const props = defineProps<Props>()
defineEmits<NumberEmits>()
</script>
