<template>
  <MenuItem @click="system.openFile(value.path)">
    <Text>{{ title ?? value.name }}</Text>
    <FileTextOutlined class="menu-item-icon" />
  </MenuItem>
</template>

<script lang='ts' setup>
import { FileTextOutlined } from '@ant-design/icons-vue'
import type { IFile } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import { MenuItem, Typography } from 'ant-design-vue'

const { Text } = Typography

type Props = {
	value: IFile
	title?: string
}

defineProps<Props>()

const system = di.resolve(SYSTEM_TOKEN)
</script>
