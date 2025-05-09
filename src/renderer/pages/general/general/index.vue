<template>
  <LoadingPage />
  
  <template v-if="!Loading.state.isLoading">
    <Menu />
    <EditorActions />
    <Update />
    <GameUpdate v-model="gameUpdateOpened" />
    
    <Setup v-if="page === Page.setup" />
    <Lists
      v-else-if="page === Page.lists || page !== Page.none"
      v-show="page === Page.lists"
    />
    <Editor v-if="page === Page.editor" />
  </template>
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import Editor from '../editor'
import Lists from '../lists'
import { EditorUtils } from '../lists/utils'
import Setup from '../setup'
import { useEditorStore, usePageStore } from '../store'
import Update from '../update'
import EditorActions from './editor-actions.vue'
import GameUpdate from './game-update.vue'
import texts from './texts'
import type { IFile } from '/mods/renderer'
import { Checks, DLCs, Dirs, Edited, Files, Helpers, Loading, Page, ProgramWindow, Windows } from '/mods/renderer'
import { LoadingPage, Menu } from '/rend/components'
import { useWindowReady } from '/rend/utils'
import { hasItems } from '/utils/renderer'

const pageStore = usePageStore()
const { route } = pageStore
const { page } = storeToRefs(pageStore)
const { setShowMessages } = useEditorStore()

const gameUpdateOpened = ref(false)

useWindowReady(ProgramWindow.general)
useGameUpdate()
useMainRouting()

function useGameUpdate() {
  watch(
    computed(() => Loading.state.isLoading),
    () => {
      void Checks.checkUpdate()

      setTimeout(async () => {
        if (hasItems(Edited)
          && await Dirs.backupInitialData.exists()
          && !await Files.editedFlag.exists()
        ) {
          gameUpdateOpened.value = true
        }    
      }, 2000)
    },
    { once: true }
  )
}

function useMainRouting() {
  let unsubscribe: () => void
  
  onMounted(() => {
    unsubscribe = Windows.onRoute(route)
  })
  onUnmounted(() => unsubscribe())
}

window['exportDefaults'] = async () => {
  const files: IFile[] = []
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

  setShowMessages(false)

  let count = 0

  await EditorUtils.export(
    files.map(file => ({ source: file, toExport: Files.exported })),
    () => console.log(count++)
  )
  
  setShowMessages(true)
  
  if (await Files.exported.exists()) {
    console.log(texts.exported)
    await Helpers.openFile(Files.exported.path)
  } else {
    console.error(texts.exportError)
  }
}
</script>

<style lang="scss">
body {
  background-color: #e7ebf0;
}
</style>
