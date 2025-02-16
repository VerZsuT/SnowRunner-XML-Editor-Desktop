<template>
  <List
    class="content"
    size="small"
    :data-source="changes"
  >
    <template #renderItem="{ item }">
      <List.Item>
        <Text>{{ item }}.</Text>
      </List.Item>
    </template>
  </List>
</template>

<script lang='ts' setup>
import { List, Typography } from 'ant-design-vue';

const { Text } = Typography

export type VersionInfoProps = {
  /** Изменения в данной версии. */
  changes: string[]
}

defineProps<VersionInfoProps>()
</script>

<style scoped lang='scss'>
.content {
  margin-left: 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  font-size: 25px;
  font-weight: bold;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
