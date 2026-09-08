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
import type { IFile } from '@modules/files/renderer'
import { SubMenu, Typography } from 'ant-design-vue'
import FileItem from './file.vue'

const { Text } = Typography

type Props = {
	title: string
	value: IFile[]
}

defineProps<Props>()
</script>
