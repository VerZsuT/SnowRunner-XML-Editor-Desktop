<template>
  <Group
    v-if='isActive'
    :label='Action.name.value'
    :icon='Action.icon'
  >
    <div class='content'>
      <Paragraph class='warn-title'>
        {{ texts.cranesWarnTitle }}
      </Paragraph>
      <Paragraph>{{ texts.banditWarnMessage }}</Paragraph>
      <div class='buttons'>
        <Button
          v-if='hasCrane'
          type='primary'
          @click='removeCrane'
          danger
        >
          {{ texts.remove }}
        </Button>
        <Button
          v-else
          @click='addCrane'
          type='primary'
        >
          {{ texts.add }}
        </Button>
      </div>
    </div>
  </Group>
</template>

<script lang='ts' setup>
import { Button, Typography } from 'ant-design-vue'
import { ref } from 'vue'

import Group from '../../group'
import texts from '../texts'
import Action from './action'

import type { IActionProps } from '../../../types'
import { ExportUtils, ImportUtils } from '../../../utils'
import { ReadyEmits, useReady } from '../../utils'
import { IExportedData } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

const { Paragraph } = Typography

const emit = defineEmits<ReadyEmits>()
const { file, xml } = defineProps<IActionProps>()
const { info } = useEditorStore()

const isActive = Action.isActive(file)
const hasCrane = ref(Action.hasCrane(xml))

useReady(emit)
if (isActive) {
  ExportUtils.onExport(exportData)
  ImportUtils.onImport(importData)
}

function exportData(data: IExportedData) {
  const actionsData = data.actionsData[ExportUtils.getName(file, info.dlc, info.mod)] ??= {}
  actionsData[Action.id] = Action.export(xml)
}

function importData(data: IExportedData) {
  const actionData = data.actionsData[ImportUtils.getName(file, info.dlc, info.mod)]?.[Action.id]
  if (actionData) Action.import(xml, actionData)
}

function addCrane() {
  Action.addCrane(xml)
  hasCrane.value = true
}

function removeCrane() {
  Action.removeCrane(xml)
  hasCrane.value = false
}
</script>

<style lang='scss' scoped>
.buttons {
  padding-top: 10px;
  text-align: center;
}

.content {
  text-align: center;
}

.warn-title {
  color: red;
}
</style>
