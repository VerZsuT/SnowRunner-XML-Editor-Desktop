<template>
  <Group
    v-if="isActive"
    key="cranes"
    :label="action.name"
    :icon="action.icon"
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
import { CranesAction } from './action'
import { Crane } from './crane'

const { Paragraph, Text } = Typography

export type CranesProps = ReadyProps & IActionProps

const { xml, file } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const action = new CranesAction()
const hasCranes = action.hasCranes(xml)
const { info } = storeToRefs(useEditorStore())
const hasRU = ref(hasCranes[0])
const hasUS = ref(hasCranes[1])

const isActive = action.isActive(xml)

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

function addCrane(crane: Crane) {
	if (crane === Crane.RU) {
		action.addCrane(Crane.RU, Crane.US, xml, value => hasRU.value = value)
	} else {
		action.addCrane(Crane.US, Crane.RU, xml, value => hasUS.value = value)
	}
}

function removeCrane(crane: Crane) {
	if (crane === Crane.RU) {
		action.removeCrane(Crane.RU, xml, value => hasRU.value = value)
	} else {
		action.removeCrane(Crane.US, xml, value => hasUS.value = value)
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
