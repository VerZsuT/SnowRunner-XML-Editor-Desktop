<template>
  <Text> X: </Text>
  <InputNumber
    class="coordinate"
    :step="step"
    :value="coords.x"
    @change="value => changeCoord({ x: Number.parseFloat(String(value)) })"
  />

  <Text> Y: </Text>
  <InputNumber
    class="coordinate"
    :step="step"
    :value="coords.y"
    @change="value => changeCoord({ y: Number.parseFloat(String(value)) })"
  />
  
  <Text> Z: </Text>
  <InputNumber
    class="coordinate"
    :step="step"
    :value="coords.z"
    @change="value => changeCoord({ z: Number.parseFloat(String(value)) })"
  />
</template>

<script lang='ts' setup>
import { InputNumber, Typography } from 'ant-design-vue'
import { ref, toRefs, watch } from 'vue'
import { NumberType } from '../../enums'
import type { ParameterEmits, PositionProps } from '../../types'
import { Position } from '/mods/renderer'
import type { EmitsToProps } from '/rend/types'
export type { PositionProps } from '../../types'

const { Text } = Typography

export type CoordsProps = PositionProps & EmitsToProps<ParameterEmits>

const props = defineProps<PositionProps>()
const { value: propValue } = toRefs(props)
const emit = defineEmits<ParameterEmits>()

const {
  step = props.numberType === NumberType.integer
    ? 1
    : 0.1
} = props
const coords = ref(propValue.value ?? new Position())

watch(propValue, () => {
  const newPos = propValue.value ?? new Position()
  
  if (!coords.value.equals(newPos)) {
    coords.value = newPos
  }
})

function changeCoord(newCoord: Partial<Position>) {
  for (const name in newCoord) {
    if (Number.isNaN(newCoord[name])) {
      return
    }
  }

  coords.value = coords.value.toCompared(newCoord)
  emit('change', coords.value.toString())
}
</script>

<style lang="scss" scoped>
.coordinate {
  width: 70px;
}
</style>
