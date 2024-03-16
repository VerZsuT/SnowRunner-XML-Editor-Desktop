<template>
  <MenuItem @click="Helpers.openFile(value.path)">
    <Text>{{ title ?? value.name }}</Text>
    <FileTextOutlined class="menu-item-icon" />
  </MenuItem>
</template>

<script lang='ts' setup>
import { FileTextOutlined } from '@ant-design/icons-vue'
import { MenuItem, Typography } from 'ant-design-vue'

import type { File } from '/mods/renderer'
import { Helpers } from '/mods/renderer'

const { Text } = Typography

type Props = {
  value: File
  title?: string
}

defineProps<Props>()
</script>
