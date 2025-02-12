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
import { Modal, Typography } from 'ant-design-vue'
import { ref } from 'vue'
import { EditorUtils } from '../lists/utils'
import { useEditorStore } from '../store'
import texts from './texts'
import type { File } from '/mods/renderer'
import { Dirs, Edited, Files } from '/mods/renderer'

const { Text } = Typography

const { setShowMessages } = useEditorStore()

const open = defineModel<boolean>({ required: true })
const loading = ref(false)
const action = ref<string | null>(null)
const current = ref(0)
const allCount = ref(0)

async function onOk() {
  const files: File[] = []

  loading.value = true

  for (const { name, dlc, mod, isTrailer } of Edited.get()) {
    if (mod) {
      continue
    }

    const dlcFolder = dlc
      ? `_dlc/${dlc}`
      : ''
    const truckFolder = isTrailer
      ? 'trucks/trailers'
      : 'trucks'
    const file = Dirs.backupInitialData.file('[media]', dlcFolder, 'classes', truckFolder, `${name}.xml`)

    if (!await file.exists()) {
      continue
    }
    
    files.push(file)
  }
  
  setShowMessages(false)
  action.value = texts.export
  allCount.value = files.length

  void EditorUtils.export(
    files.map(file => ({ source: file, toExport: Files.exported })),
    () => void current.value++
  ).then(() => {
    const nonMods = Edited.filter(item => !item.mod)

    current.value = 0
    allCount.value = nonMods.length
    action.value = texts.import

    return EditorUtils.import(
      nonMods.map(item => ({ file: Edited.convert(item), toImport: Files.exported })),
      () => void current.value++
    )
  }).then(() => {
    setShowMessages(true)
    loading.value = false
    open.value = false

    void Dirs.backupInitialData.remove()
  })
}
</script>
