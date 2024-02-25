<template>
  <Num
    v-bind='props'
    :number-type='NumberType.integer'
    @change='emit("change", $event)'
  />
</template>

<script lang='ts' setup>
import { NumberType } from '../../../enums'
import { IParameterProps, NumberEmits, NumberProps } from '../../../types'
import Num from './num.vue'
import { NumUtils } from '/mods/xml/game/game-xml'

type Props = IParameterProps<number, NumUtils> & Omit<NumberProps, 'type' | 'value'>

const props = defineProps<Props>()
const emit = defineEmits<NumberEmits>()
</script>
