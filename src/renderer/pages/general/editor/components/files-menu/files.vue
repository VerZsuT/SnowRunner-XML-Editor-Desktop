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
import FileItem from './file.vue'
import type { IFile } from '/mods/renderer'

const { Text } = Typography

type Props = {
  title: string
  value: IFile[]
}

defineProps<Props>()
</script>
