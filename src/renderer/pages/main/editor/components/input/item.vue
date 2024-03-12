<template>
  <InputNumber
    v-if="type === InputType.number"
    class="input"
    size="large"
    :status="status"
    :value="value"
    :step="step"
    @change="changeValue"
    @blur="setValue"
  />
  <Input
    v-else
    class="input"
    size="large"
    :status="status"
    :value="value"
    @change="changeValue($event.target.value || '')"
    @blur="setValue"
  />
</template>

<script lang='ts' setup>
import { Input, InputNumber } from 'ant-design-vue'
import { computed, nextTick, ref, toRefs, watch } from 'vue'

import { InputType, NumberType } from '../../enums'
import type { IInputProps, ParameterEmits } from '../../types'

import type { EmitsToProps } from '/rend/types'
import { isNullable } from '/utils/renderer'

type Status = '' | 'error' | 'warning'

export type InputItemProps = IInputProps & EmitsToProps<ParameterEmits>

const props = defineProps<IInputProps>()
const emit = defineEmits<ParameterEmits>()

const {
  type, numberType, areas,
  step = numberType === NumberType.float ? 0.1 : 1
} = props
const { value: propValue } = toRefs(props)
const value = ref(props.value)

const status = computed<Status>(getStatus)

watch(propValue, () => {
  if (value.value !== propValue.value) {
    value.value = propValue.value
  }
})

function changeValue(newVal: string | number) {
  if (newVal === '') {
    value.value = ''; return
  }
  value.value = newVal
}

async function setValue() {
  if (value.value === '') return

  emit('change', value.value)
  await nextTick()
  
  if (value.value !== propValue.value) {
    value.value = propValue.value
  }
}

function getStatus(): Status {
  let newValue = +value.value
  let status: Status = ''

  if (isNullable(value.value) || Number.isNaN(+value.value)) {
    newValue = 0
  }

  if (areas) {
    for (const areaName in areas) {
      if (!Array.isArray(areas[areaName][0])) {
        areas[areaName] = [areas[areaName]]
      }
      const areaVal: [number, number][] = areas[areaName]

      for (const area of areaVal) {
        if (newValue >= area[0] && newValue <= area[1]) {
          switch (areaName) {
            case 'red': { status = 'error'; break }
            case 'green': { status = ''; break }
            case 'yellow': { status = 'warning'; break }
            default: { status = '' }
          }
        }
      }
    }
  }

  return status
}
</script>

<style lang='scss' scoped>
.input {
  min-width: 150px;
}
</style>
