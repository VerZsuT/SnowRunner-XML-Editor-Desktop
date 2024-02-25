<template>
  <Menu />
  <EditorActions />
  <GameUpdate v-model='openGameUpdate' />
  
  <Lists v-if='page === Page.lists' />
  <Editor v-else-if='page === Page.editor' />
</template>

<script lang='ts' setup>
import { onMounted, ref } from 'vue'
import Editor from '../editor'
import { Page } from '../enums'
import Lists from '../lists'
import { EditorUtils } from '../lists/utils'
import { useEditorStore, usePageStore } from '../store'
import EditorActions from './editor-actions.vue'
import GameUpdate from './game-update.vue'
import { DLCs, Dirs, Edited, File, Files, ProgramWindow } from '/mods/renderer'
import { Menu } from '/rend/components'
import { useWindowReady } from '/rend/utils'
import { hasItems } from '/utils/renderer'

useWindowReady(ProgramWindow.main)

const { page } = usePageStore()
const { setShowMessages } = useEditorStore()
const openGameUpdate = ref(false)

onMounted(() => setTimeout(checkGameUpdate, 2000))

async function checkGameUpdate() {
  if (await Dirs.backupInitialData.exists() &&
    !await Files.editedFlag.exists() &&
    hasItems(Edited)
  ) openGameUpdate.value = true
}

window['exportDefaults'] = async () => {
  const files: File[] = []
  const folders = ['trucks', 'trucks/trailers']

  for (const dlcItem of DLCs) {
    const classes = dlcItem.dir.dir('classes')
    for (const postfix of folders) {
      files.push(...await classes.dir(postfix).findFiles({ ext: 'xml' }))
    }
  }

  for (const postfix of folders) {
    files.push(...await Dirs.classes.dir(postfix).findFiles({ ext: 'xml' }))
  }

  let count = 0
  setShowMessages(false)
  await EditorUtils.export(
    files.map(file => ({ source: file, toExport: Files.exported })),
    () => console.log(count++)
  )
  setShowMessages(true)
  
  if (await Files.exported.exists()) {
    console.log('Экспортировано')
  }
  else {
    console.error('Ошибка во время экспорта')
  }
}
</script>
