<template>
  <Group
    v-if="isActive"
    key="trailers"
    :label="action.name"
    :icon="action.icon"
  >
    <div class="grid trailers-grid">
      <div class="buttons">
        <Text>{{ texts.scoutTrailers }}</Text><br>
        <Button
          v-if="hasScout"
          :disabled="!(hasScout && hasTruck)"
          type="primary"
          danger
          @click="removeTrailer(Trailer.scout)"
        >
          {{ texts.remove }}
        </Button>
        <Button
          v-else
          :disabled="!(hasTruck && !hasScout)"
          type="primary"
          @click="addTrailer(Trailer.scout)"
        >
          {{ texts.add }}
        </Button>
      </div>
      <div class="buttons">
        <Text>{{ texts.truckTrailers }}</Text><br>
        <Button
          v-if="hasTruck"
          :disabled="!(hasScout && hasTruck)"
          type="primary"
          danger
          @click="removeTrailer(Trailer.truck)"
        >
          {{ texts.remove }}
        </Button>
        <Button
          v-else
          :disabled="!(hasScout && !hasTruck)"
          type="primary"
          @click="addTrailer(Trailer.truck)"
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
import { TrailersAction } from './action'
import { Trailer } from './trailer'

export type TrailersProps = ReadyProps & IActionProps

const { Text } = Typography

const { xml, file } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const action = new TrailersAction()
const hasTrailers = action.hasTrailers(xml)
const { info } = storeToRefs(useEditorStore())
const hasScout = ref(hasTrailers[0])
const hasTruck = ref(hasTrailers[1])

const isActive = action.isActive(xml)

useReady(emit)
if (isActive) {
	exportUtils.onExport(exportData)
	importUtils.onImport(importData)
}

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

function addTrailer(trailer: Trailer) {
	if (trailer === Trailer.scout) {
		action.addTrailer(Trailer.scout, Trailer.truck, xml, value => hasScout.value = value)
	} else {
		action.addTrailer(Trailer.truck, Trailer.scout, xml, value => hasTruck.value = value)
	}
}

function removeTrailer(trailer: Trailer) {
	if (trailer === Trailer.scout) {
		action.removeTrailer(Trailer.scout, xml, value => hasScout.value = value)
	} else {
		action.removeTrailer(Trailer.truck, xml, value => hasTruck.value = value)
	}
}
</script>

<style lang='scss' scoped>
.trailers-grid {
	text-align: center;
	margin-top: 10px;
	flex-wrap: nowrap;
	align-content: center;
	justify-content: space-evenly;
	align-items: center;
	width: 100%;
}

.buttons {
	text-align: center;
	margin-left: 5px;
	margin-right: 5px;
}
</style>
