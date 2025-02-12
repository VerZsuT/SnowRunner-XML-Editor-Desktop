<template>
  <Wrap
    :wrap="!!tip"
    :wrapper="popover"
  >
    <template #content>
      <Text>{{ tip }}</Text>
    </template>
    <Switch
      size="small"
      :checked="value"
      @click="value = !value"
    />
    <Text class="label">
      {{ label }}
    </Text>
  </Wrap>
  <br>
</template>

<script setup lang="ts">
import { Popover, Switch, Typography } from 'ant-design-vue'
import { h } from 'vue'
import Wrap from '../wrap.vue'

const { Text } = Typography
const popover = h(Popover, { placement: 'topLeft' })

export type BoolSettingProps = {
	label: string
  tip?: string
}

defineProps<BoolSettingProps>()
const value = defineModel<boolean>({ required: true })
</script>

<style lang="scss" scoped>
.label {
  display: inline-block;
  margin-bottom: 10px;
  margin-left: 10px;
}
</style>
