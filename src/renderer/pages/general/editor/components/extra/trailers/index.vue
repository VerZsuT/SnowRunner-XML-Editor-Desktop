<template>
  <Group
    v-if="isActive"
    key="trailers"
    :label="Action.name"
    :icon="Action.icon"
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
import { Button, Typography } from 'ant-design-vue'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useEditorStore } from '../../../../store'
import type { IActionProps } from '../../../types'
import { ExportUtils, ImportUtils } from '../../../utils'
import Group from '../../group'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useReady } from '../../utils'
import texts from '../texts'
import Action from './action'
import Trailer from './trailer'
import type { IExportedData } from '/mods/renderer'

export type TrailersProps = ReadyProps & IActionProps

const { Text } = Typography

const { xml, file } = defineProps<IActionProps>()
const emit = defineEmits<ReadyEmits>()

const hasTrailers = Action.hasTrailers(xml)
const { info } = storeToRefs(useEditorStore())
const hasScout = ref(hasTrailers[0])
const hasTruck = ref(hasTrailers[1])

const isActive = Action.isActive(xml)

useReady(emit)
if (isActive) {
  ExportUtils.onExport(exportData)
  ImportUtils.onImport(importData)
}

function exportData(data: IExportedData) {
  const actionsData = data.actionsData[ExportUtils.getName(file, info.value.dlc, info.value.mod)] ??= {}

  actionsData[Action.id] = Action.export(xml)
}

function importData(data: IExportedData) {
  const actionData = data.actionsData[ImportUtils.getName(file, info.value.dlc, info.value.mod)]?.[Action.id]

  if (actionData) {
    Action.import(xml, actionData)
  }
}

function addTrailer(trailer: Trailer) {
  if (trailer === Trailer.scout) {
    Action.addTrailer(Trailer.scout, Trailer.truck, xml, value => hasScout.value = value)
  } else {
    Action.addTrailer(Trailer.truck, Trailer.scout, xml, value => hasTruck.value = value)
  }
}

function removeTrailer(trailer: Trailer) {
  if (trailer === Trailer.scout) {
    Action.removeTrailer(Trailer.scout, xml, value => hasScout.value = value)
  } else {
    Action.removeTrailer(Trailer.truck, xml, value => hasTruck.value = value)
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
