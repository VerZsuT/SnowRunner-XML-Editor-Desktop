<template>
  <Text> X: </Text>
  <InputNumber
    :step='step'
    :value='coords.x'
    @change='value => changeCoordinate({ x: Number.parseFloat(String(value)) })'
  />
  <Text> Y: </Text>
  <InputNumber
    :step='step'
    :value='coords.y'
    @change='value => changeCoordinate({ y: Number.parseFloat(String(value)) })'
  />
  <Text> Z: </Text>
  <InputNumber
    :step='step'
    :value='coords.z'
    @change='value => changeCoordinate({ z: Number.parseFloat(String(value)) })'
  />
</template>

<script lang='ts' setup>
import { InputNumber, Typography } from 'ant-design-vue'
import { readonly, ref, toRefs, watch } from 'vue'
import { NumberType } from '../../enums'
import { ParameterEmits, PositionProps } from '../../types'
import { Position } from '/mods/renderer'

const Text = Typography.Text

const props = defineProps<PositionProps>()
const emit = defineEmits<ParameterEmits>()

const {
  step = props.numberType === NumberType.integer ? 1 : 0.1
} = props
const value = readonly(toRefs(props).value)

const defaultVal = value.value
const coords = ref(defaultVal ?? new Position())

watch(value, () => {
  coords.value = value.value ?? new Position()
})

function changeCoordinate(newCoord: Partial<Position>) {
  for (const name in newCoord) {
    if (Number.isNaN(newCoord[name])) return
  }

  coords.value = coords.value.compare(newCoord)
  emit('change', coords.value.toString())
}
</script>
