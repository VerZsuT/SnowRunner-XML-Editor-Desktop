<template>
  <div class="grid content">
    <Text class="text">
      {{ text }}
    </Text>
    <Input
      class="input"
      type="number"
      :default-value="value"
      @change="onChange"
    />
  </div>
</template>

<script lang='ts' setup>
import type { InputProps } from 'ant-design-vue'
import { Input, Typography } from 'ant-design-vue'

const { Text } = Typography

export type ContentFieldProps = {
  /** Заголовок поля для ввода */
  text: string
}

const value = defineModel<number>({ required: true })
defineProps<ContentFieldProps>()

const onChange: InputProps['onChange'] = event => {
  const inputVal = event.target.value
  if (!inputVal) return

  const num = Number.parseInt(inputVal)
  if (Number.isNaN(num)) return

  value.value = num
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
