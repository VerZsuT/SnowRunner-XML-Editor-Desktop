<template>
  <Select
    class='select'
    size='large'
    :mode='props.multiple ? "multiple" : undefined'
    :options='options'
    :value='value'
    @change='onChange($event as string | string[])'
  />
</template>

<script lang='ts' setup>
import { Select } from 'ant-design-vue'
import { computed } from 'vue'
import { ISelectProps, SelectEmits } from '../../types'

const emit = defineEmits<SelectEmits>()
const props = defineProps<ISelectProps>()

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
    if (props.value.length === 0 && props.emptyIsAll) {
      return options.value.map(option => option.value)
    }
    return props.value.map(item => String(item))
  }
  return String(props.value)
})

function onChange(value: string | string[]) {
  if (props.emptyIsAll && value.length === options.value.length) {
    emit('change', [])
  }
  else {
    emit('change', value)
  }
}
</script>

<style lang='scss' scoped>
.select {
  min-width: 150;
  text-align: left;
}
</style>
