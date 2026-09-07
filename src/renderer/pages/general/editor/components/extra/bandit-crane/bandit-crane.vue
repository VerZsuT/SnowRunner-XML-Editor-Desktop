<template>
  <Group
    v-if="isActive"
    key="bandit-crane"
    :label="action.name"
    :icon="action.icon"
  >
    <div class="content">
      <Paragraph class="warn-title">
        {{ texts.cranesWarnTitle }}
      </Paragraph>
      <Paragraph>{{ texts.banditWarnMessage }}</Paragraph>
      <div class="buttons">
        <Button
          v-if="hasCrane"
          type="primary"
          danger
          @click="removeCrane"
        >
          {{ texts.remove }}
        </Button>
        <Button
          v-else
          type="primary"
          @click="addCrane"
        >
          {{ texts.add }}
        </Button>
      </div>
    </div>
  </Group>
</template>

<script lang='ts' setup>
import type { IExportedData } from '@modules/epf/types'
import { Button, Typography } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useEditorStore } from '../../../../store/editor'
import type { IActionProps } from '../../../types'
import { exportUtils } from '../../../utilities/export'
import { importUtils } from '../../../utilities/import'
import Group from '../../group/group.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { useReady } from '../../utilities'
import { EXTRA_LOCALIZATION as texts } from '../localization'
import { BanditCraneAction } from './action'

const { Paragraph } = Typography

export type BanditCraneProps = ReadyProps & IActionProps

const { file, xml } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const action = new BanditCraneAction()
const { info } = storeToRefs(useEditorStore())
const hasCrane = ref(action.hasCrane(xml))

const isActive = action.isActive(file)

if (isActive) {
  exportUtils.onExport(exportData)
  importUtils.onImport(importData)
}
useReady(emit)

function exportData(data: IExportedData) {
  const actionsData = data.actionsData[exportUtils.getName(file, info.value.dlc, info.value.mod)] ??= {}

  actionsData[action.id] = action.export(xml)
}

function importData(data: IExportedData) {
  const actionData = data.actionsData[importUtils.getName(file, info.value.dlc, info.value.mod)]?.[action.id]

  if (actionData) {
    action.import(xml, actionData)
  }
}

function addCrane() {
  action.addCrane(xml)
  hasCrane.value = true
}

function removeCrane() {
  action.removeCrane(xml)
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
