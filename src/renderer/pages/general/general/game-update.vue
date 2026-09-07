<template>
  <Modal
    v-model:open="open"
    :title="texts.recovery"
    :confirm-loading="loading"
    @ok="onOk"
  >
    <p><Text>{{ texts.restoreInitialChanges }}</Text></p>
    <Text v-if="action">
      {{ action }}: {{ current }} / {{ allCount }}
    </Text>
  </Modal>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, EDITED_TOKEN, FILES_TOKEN } from '@utilities/di/renderer/tokens'
import { Modal, Typography } from 'ant-design-vue'
import { ref } from 'vue'
import { editorUtils } from '../lists/utilities/editor'
import { useEditorStore } from '../store/editor'
import { GENERAL_LOCALIZATION as texts } from './localization'

const { Text } = Typography

const { setShowMessages } = useEditorStore()

const open = defineModel<boolean>({ required: true })
const loading = ref(false)
const action = ref<string | null>(null)
const current = ref(0)
const allCount = ref(0)

async function onOk() {
  const filesToExport: IFile[] = []
  const edited = di.resolve(EDITED_TOKEN)
  const dirs = di.resolve(DIRS_TOKEN)
  const files = di.resolve(FILES_TOKEN)

  loading.value = true

  for (const { name, dlc, mod, isTrailer } of edited.get()) {
    if (mod) {
      continue
    }

    const dlcFolder = dlc
      ? `_dlc/${dlc}`
      : ''
    const truckFolder = isTrailer
      ? 'trucks/trailers'
      : 'trucks'
    const file = dirs.backupInitialData.file('[media]', dlcFolder, 'classes', truckFolder, `${name}.xml`)

    if (!await file.exists()) {
      continue
    }
    
    filesToExport.push(file)
  }
  
  setShowMessages(false)
  action.value = texts.export
  allCount.value = filesToExport.length

  void editorUtils.export(
    filesToExport.map(file => ({ source: file, toExport: files.exported })),
    () => void current.value++
  ).then(() => {
    const nonMods = edited.filter(item => !item.mod)

    current.value = 0
    allCount.value = nonMods.length
    action.value = texts.import

    return editorUtils.import(
      nonMods.map(item => ({ file: edited.convert(item), toImport: files.exported })),
      () => void current.value++
    )
  }).then(() => {
    setShowMessages(true)
    loading.value = false
    open.value = false

    void dirs.backupInitialData.remove()
  })
}
</script>
