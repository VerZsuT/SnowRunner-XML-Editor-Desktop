<template>
  <div class="grid content">
    <Text class="text">
      {{ text }}
    </Text>
    <Input
      class="input"
      type="number"
      :value="val"
      @change="onChange"
      @blur="$emit('blur')"
    />
  </div>
</template>

<script lang='ts' setup>
import type { InputProps } from 'ant-design-vue'
import { Input, Typography } from 'ant-design-vue'
import { ref, toRefs, watchEffect } from 'vue'
import type { EmitsToProps } from '/rend/types'

const { Text } = Typography

export type ContentFieldProps = Props & EmitsToProps<Emits>

type Props = {
  /** Заголовок поля для ввода. */
  text: string

  /** Значение поля для ввода. */
  value: number
}

type Emits = {
  /** Событие изменения значения. */
  change: [value: number]

  /** Событие `blur` поля ввода. */
  blur: []
}

const props = defineProps<Props>()
const { value } = toRefs(props)
const emit = defineEmits<Emits>()

const val = ref('')

watchEffect(() => val.value = String(value.value))

const onChange: InputProps['onChange'] = event => {
  const inputVal = event.target.value
  val.value = inputVal ?? ''

  if (!inputVal) {
    return
  }

  const num = Number.parseInt(inputVal)

  if (Number.isNaN(num)) {
    return
  }

  val.value = String(num)
  emit('change', num)
}
</script>

<style lang='scss' scoped>
.content {
  align-content: space-around;

  .text {
    margin-top: 3px;
    margin-right: 10px;
  }

  .input {
    width: 80px;
  }
}
</style>
