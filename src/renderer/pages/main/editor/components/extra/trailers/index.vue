<template>
  <Group
    v-if='isActive'
    :label='Action.name.value'
    :icon='Action.icon'
  >
    <div class='grid trailers-grid'>
      <div class='buttons'>
        <Text>{{ texts.scoutTrailers }}</Text><br />
        <Button
          v-if='hasScout'
          :disabled='!(hasScout && hasTruck)'
          @click='removeTrailer(Trailer.scout)'
          type='primary'
          danger
        >
          {{ texts.remove }}
        </Button>
        <Button
          v-else
          :disabled='!(hasTruck && !hasScout)'
          @click='addTrailer(Trailer.scout)'
          type='primary'
        >
          {{ texts.add }}
        </Button>
      </div>
      <div class='buttons'>
        <Text>{{ texts.truckTrailers }}</Text><br />
        <Button
          v-if='hasTruck'
          :disabled='!(hasScout && hasTruck)'
          @click='removeTrailer(Trailer.truck)'
          type='primary'
          danger
        >
          {{ texts.remove }}
        </Button>
        <Button
          v-else
          :disabled='!(hasScout && !hasTruck)'
          @click='addTrailer(Trailer.truck)'
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
import Trailer from './trailer'

import type { IActionProps } from '../../../types'
import { ExportUtils, ImportUtils } from '../../../utils'
import { ReadyEmits, useReady } from '../../utils'
import { IExportedData } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

const { Text } = Typography

const emit = defineEmits<ReadyEmits>()
const { xml, file } = defineProps<IActionProps>()
const { info } = useEditorStore()

const isActive = Action.isActive(xml)
const hasTrailers = Action.hasTrailers(xml)
const hasScout = ref(hasTrailers[0])
const hasTruck = ref(hasTrailers[1])

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

function addTrailer(trailer: Trailer) {
  if (trailer === Trailer.scout) {
    Action.addTrailer(Trailer.scout, Trailer.truck, xml, value => hasScout.value = value)
  }
  else {
    Action.addTrailer(Trailer.truck, Trailer.scout, xml, value => hasTruck.value = value)
  }
}

function removeTrailer(trailer: Trailer) {
  if (trailer === Trailer.scout) {
    Action.removeTrailer(Trailer.scout, xml, value => hasScout.value = value)
  }
  else {
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
}

.buttons {
  text-align: center;
  margin-left: 5px;
  margin-right: 5px;
}
</style>
