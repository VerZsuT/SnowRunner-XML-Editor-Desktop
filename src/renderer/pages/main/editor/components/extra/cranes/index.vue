<template>
  <Group
    v-if="isActive"
    key="cranes"
    :label="Action.name"
    :icon="Action.icon"
  >
    <div class="content">
      <Paragraph class="warn-title">
        {{ texts.cranesWarnTitle }}
      </Paragraph>
      <Paragraph class="warn-content">
        {{ texts.cranesWarnMessage }}
      </Paragraph>

      <div class="grid cranes-grid">
        <div class="buttons">
          <Text>
            US {{ texts.crane }}
          </Text><br>
          <Button
            v-if="hasUS"
            :disabled="!(hasRU && hasUS)"
            type="primary"
            danger
            @click="removeCrane(Crane.US)"
          >
            {{ texts.remove }}
          </Button>
          <Button
            v-else
            :disabled="!(hasRU && !hasUS)"
            type="primary"
            @click="addCrane(Crane.US)"
          >
            {{ texts.add }}
          </Button>
        </div>
        <div class="buttons">
          <Text>
            RU {{ texts.crane }}
          </Text><br>
          <Button
            v-if="hasRU"
            :disabled="!(hasRU && hasUS)"
            type="primary"
            danger
            @click="removeCrane(Crane.RU)"
          >
            {{ texts.remove }}
          </Button>
          <Button
            v-else
            :disabled="!(hasUS && !hasRU)"
            type="primary"
            @click="addCrane(Crane.RU)"
          >
            {{ texts.add }}
          </Button>
        </div>
      </div>
    </div>
  </Group>
</template>

<script lang='ts' setup>
import { Button, Typography } from 'ant-design-vue'
import { ref } from 'vue'

import type { IActionProps } from '../../../types'
import { ExportUtils, ImportUtils } from '../../../utils'
import Group from '../../group'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useReady } from '../../utils'
import texts from '../texts'
import Action from './action'
import Crane from './crane'

import type { IExportedData } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

const { Paragraph, Text } = Typography

export type CranesProps = ReadyProps & IActionProps

const { xml, file } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const hasCranes = Action.hasCranes(xml)
const { info } = useEditorStore()
const hasRU = ref(hasCranes[0])
const hasUS = ref(hasCranes[1])

const isActive = Action.isActive(xml)

if (isActive) {
  ExportUtils.onExport(exportData)
  ImportUtils.onImport(importData)
}
useReady(emit)

function exportData(data: IExportedData) {
  const actionsData = data.actionsData[ExportUtils.getName(file, info.dlc, info.mod)] ??= {}
  actionsData[Action.id] = Action.export(xml)
}

function importData(data: IExportedData) {
  const actionData = data.actionsData[ImportUtils.getName(file, info.dlc, info.mod)]?.[Action.id]
  if (actionData) Action.import(xml, actionData)
}

function addCrane(crane: Crane) {
  if (crane === Crane.RU) {
    Action.addCrane(Crane.RU, Crane.US, xml, value => hasRU.value = value)
  }
  else {
    Action.addCrane(Crane.US, Crane.RU, xml, value => hasUS.value = value)
  }
}

function removeCrane(crane: Crane) {
  if (crane === Crane.RU) {
    Action.removeCrane(Crane.RU, xml, value => hasRU.value = value)
  }
  else {
    Action.removeCrane(Crane.US, xml, value => hasUS.value = value)
  }
}
</script>

<style lang='scss' scoped>
.content {
  text-align: center;
}

.cranes-grid {
  flex-wrap: nowrap;
  align-content: center;
  justify-content: space-evenly;
  align-items: center;
}

.warn-title {
  color: red;
}

.warn-content {
  padding: 0 10px;
  margin-top: 0;
}

.buttons {
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
