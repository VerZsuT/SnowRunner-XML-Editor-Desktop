<template>
  <Select
    class="select"
    size="large"
    :mode="multiple ? 'multiple' : undefined"
    :options="options"
    :value="value"
    :disabled="disabled"
    @change="onSelect($event as string | string[])"
  />
</template>

<script lang='ts' setup>
import { Select } from 'ant-design-vue'
import { computed } from 'vue'
import type { ISelectProps, SelectEmits } from '../../types'
import type { EmitsToProps } from '/rend/types'

export type SelectItemProps = ISelectProps & EmitsToProps<SelectEmits>

const props = defineProps<ISelectProps>()
const emit = defineEmits<SelectEmits>()

const options = computed(() => props.options.map(option => {
  const [value, label] = option

  return {
    label,
    value: String(value),
    key: String(value)
  }
}))

const value = computed(() => {
  if (props.multiple && Array.isArray(props.value)) {
    return props.value.length === 0 && props.emptyIsAll
      ? options.value.map(option => option.value)
      : props.value.map(String)
  }

  return String(props.value)
})

function onSelect(value: string | string[]) {
  emit('change', props.emptyIsAll && value.length === options.value.length
    ? []
    : value
  )
}
</script>

<style lang='scss' scoped>
.select {
  min-width: 150;
  text-align: left;
}
</style>
