<template>
  <SubMenu>
    <template #title>
      <Text>{{ texts.title }}</Text>
    </template>
    <FileItem
      v-if="allFiles.main"
      :key="allFiles.main.path"
      :value="allFiles.main"
      :title="texts.main"
    />
    <Files
      v-if="hasItems(allFiles.engines)"
      :title="texts.engines"
      :value="allFiles.engines"
    />
    <Files
      v-if="hasItems(allFiles.gearboxes)"
      :title="texts.gearboxes"
      :value="allFiles.gearboxes"
    />
    <Files
      v-if="hasItems(allFiles.suspensions)"
      :title="texts.suspensions"
      :value="allFiles.suspensions"
    />
    <Files
      v-if="hasItems(allFiles.wheels)"
      :title="texts.wheels"
      :value="allFiles.wheels"
    />
    <Files
      v-if="hasItems(allFiles.winches)"
      :title="texts.winches"
      :value="allFiles.winches"
    />
  </SubMenu>
</template>

<script lang='ts' setup>
import { SubMenu, Typography } from 'ant-design-vue'

import FileItem from './file.vue'
import Files from './files.vue'

import { hasItems } from '/utils/renderer'

import { useEditorStore } from '../../../store'
import texts from './texts'

const { Text } = Typography

const { allFiles } = useEditorStore()
</script>
