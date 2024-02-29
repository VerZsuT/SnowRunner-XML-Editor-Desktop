<template>
  <Divider class="title">
    {{ texts.whatsNewTitle }} {{ ` v${props.version}` }}
  </Divider>
  <List
    class="content"
    size="small"
    :data-source="props.changes"
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

type Props = {
  version: string,
  changes: string[]
}

const props = defineProps<Props>()
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
