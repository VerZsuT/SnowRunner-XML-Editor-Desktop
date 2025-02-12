<template>
  <Switch
    size="small"
    :checked="value"
    @click="value = !value"
  />
  <Text class="label">
    {{ label }}
  </Text>
  <br>
</template>

<script setup lang="ts">
import { Switch, Typography } from 'ant-design-vue';

const { Text } = Typography

export type BoolSettingProps = {
	label: string
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
