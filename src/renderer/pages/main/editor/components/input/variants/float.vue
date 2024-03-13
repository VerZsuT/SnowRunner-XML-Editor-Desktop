<template>
  <Num
    v-bind="props"
    :number-type="NumberType.float"
    @change="$emit('change', $event)"
  />
</template>

<script lang='ts' setup>
import { NumberType } from '../../../enums'
import type { IParameterProps, NumberEmits, NumberProps } from '../../../types'
import Num from './num.vue'

import type { NumUtils } from '/mods/xml/game/game-xml'
import type { EmitsToProps } from '/rend/types'

export type FloatProps = Props & EmitsToProps<NumberEmits>

type Props = IParameterProps<number, NumUtils> & Omit<NumberProps, 'type' | 'value'>

const props = defineProps<Props>()
defineEmits<NumberEmits>()
</script>
