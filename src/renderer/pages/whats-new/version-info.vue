<template>
  <Divider class="title">
    {{ texts.whatsNewTitle }} {{ ` v${version}` }}
  </Divider>
  <List
    class="content"
    size="small"
    :data-source="changes"
  >
    <template #renderItem="{ item }">
      <List.Item>
        <Text>{{ item }}</Text>
      </List.Item>
    </template>
  </List>
</template>

<script lang='ts' setup>
import { Divider, List, Typography } from 'ant-design-vue'

import texts from './texts'

const { Text } = Typography

export type VersionInfoProps = {
  /** Версия, для которой показывать изменения */
  version: string,
  /** Изменения в данной версии */
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
