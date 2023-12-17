<template>
  <Modal
    v-model:open='open'
    title='Восстановление'
    :confirm-loading='loading'
    @ok='onOk'
  >
    <p><Text>Обнаружено обновление initial.pak. Восстановить изменённые параметры?</Text></p>
    <Text v-if='action'>{{ action }}: {{ current }} / {{ allCount }}</Text>
  </Modal>
</template>

<script lang='ts' setup>
import { Modal, Typography } from 'ant-design-vue'
import { ref } from 'vue'
import { EditorUtils } from '../lists/utils'
import { useEditorStore } from '../store'
import texts from './texts'
import { Dirs, Edited, File, Files } from '/mods/renderer'

const { Text } = Typography

const open = defineModel<boolean>({ required: true })
const { setShowMessages } = useEditorStore()

const loading = ref(false)
const action = ref<string | null>(null)
const current = ref(0)
const allCount = ref(0)

async function onOk() {
  loading.value = true

  const files: File[] = []
  for (const { name, dlc, mod, isTrailer } of Edited.get()) {
    if (mod) continue
    const dlcFolder = dlc ? `_dlc/${dlc}` : ''
    const truckFolder = isTrailer ? 'trailers/trucks' : 'trucks'
    const file = Dirs.backupInitialData.file('[media]', dlcFolder, 'classes', truckFolder, `${name}.xml`)
    if (!await file.exists()) continue
    files.push(file)
  }
  
  setShowMessages(false)
  action.value = texts.export
  allCount.value = files.length
  EditorUtils.export(
    files.map(file => ({ source: file, toExport: Files.exported })),
    () => { current.value++ }
  ).then(() => {
    const nonMods = Edited.filter(item => !item.mod)
    current.value = 0
    allCount.value = nonMods.length
    action.value = texts.import
    return EditorUtils.import(
      nonMods.map(item => ({ file: Edited.convert(item), toImport: Files.exported })),
      () => { current.value++ }
    )
  }).then(() => {
    setShowMessages(true)
    loading.value = false
    open.value = false
    Dirs.backupInitialData.remove()
  })
}
</script>
