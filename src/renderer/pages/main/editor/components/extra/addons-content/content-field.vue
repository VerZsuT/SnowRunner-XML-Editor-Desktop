<template>
  <div class='grid content'>
    <Text class='text'>
      {{ props.text }}
    </Text>
    <Input
      class='input'
      type='number'
      @change='onChange'
      :value='props.value'
    />
  </div>
</template>

<script lang='ts' setup>
import { Input, Typography } from 'ant-design-vue'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'

type Props = {
  text: string
  value: number
}

type Emits = {
  change: [value: number]
}

const Text = Typography.Text
const props = defineProps<Props>()
const emit = defineEmits<Emits>()

function onChange(event: ChangeEvent) {
  const value = event.target.value
  if (!value) return

  const num = Number.parseInt(value)
  if (Number.isNaN(num)) return

  emit('change', num)
}
</script>

<style lang='scss' scoped>
.content {
  align-content: space-around;

  .text {
    margin-right: 5px;
  }

  .input {
    width: 80px;
  }
}
</style>
