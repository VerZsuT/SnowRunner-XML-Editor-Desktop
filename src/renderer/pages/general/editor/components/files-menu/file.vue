<template>
  <MenuItem @click="System.openFile(value.path)">
    <Text>{{ title ?? value.name }}</Text>
    <FileTextOutlined class="menu-item-icon" />
  </MenuItem>
</template>

<script lang='ts' setup>
import { FileTextOutlined } from '@ant-design/icons-vue'
import type { IFile } from '@modules/renderer'
import { System } from '@modules/renderer'
import { MenuItem, Typography } from 'ant-design-vue'

const { Text } = Typography

type Props = {
  value: IFile
  title?: string
}

defineProps<Props>()
</script>
