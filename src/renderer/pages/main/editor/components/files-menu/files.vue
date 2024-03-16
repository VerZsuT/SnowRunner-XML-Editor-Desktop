<template>
  <SubMenu>
    <template #title>
      <Text>{{ title }}</Text>
    </template>
    <FileItem
      v-for="file of value"
      :key="file.path"
      :value="file"
    />
  </SubMenu>
</template>

<script lang='ts' setup>
import { SubMenu, Typography } from 'ant-design-vue'

import type { File } from '/mods/renderer'

import FileItem from './file.vue'

const { Text } = Typography

type Props = {
  title: string
  value: File[]
}

defineProps<Props>()
</script>
