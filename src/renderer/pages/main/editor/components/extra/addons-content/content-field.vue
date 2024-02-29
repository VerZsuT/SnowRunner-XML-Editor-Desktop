<template>
  <div class="grid content">
    <Text class="text">
      {{ props.text }}
    </Text>
    <Input
      class="input"
      type="number"
      :value="props.value"
      @change="onChange"
    />
  </div>
</template>

<script lang='ts' setup>
import type { InputProps } from 'ant-design-vue'
import { Input, Typography } from 'ant-design-vue'

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

const onChange: InputProps['onChange'] = event => {
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
