<template>
  <loadingPage />
  
  <template v-if="!loading.state.isLoading">
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
import type { IFile } from '@modules/files/renderer'
import { Page, ProgramWindow } from '@modules/windows/enums'
import LoadingPage from '@renderer/components/loading-page.vue'
import { Menu } from '@renderer/components/menu'
import { useWindowReady } from '@renderer/utilities'
import { hasItems } from '@utilities/checks/renderer'
import { di } from '@utilities/di/container'
import { CHECKS_TOKEN, DIRS_TOKEN, DLC_TOKEN, EDITED_TOKEN, FILES_TOKEN, LOADING_TOKEN, SYSTEM_TOKEN, WINDOWS_TOKEN } from '@utilities/di/renderer/tokens'
import { storeToRefs } from 'pinia'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { Editor } from '../editor'
import { Lists } from '../lists'
import { editorUtils } from '../lists/utilities/editor'
import { Setup } from '../setup'
import { useEditorStore } from '../store/editor'
import { usePageStore } from '../store/page'
import Update from '../update/update.vue'
import EditorActions from './editor-actions.vue'
import GameUpdate from './game-update.vue'
import { GENERAL_LOCALIZATION as texts } from './localization'

const loading = di.resolve(LOADING_TOKEN)
const dirs = di.resolve(DIRS_TOKEN)
const files = di.resolve(FILES_TOKEN)

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
    computed(() => loading.state.isLoading),
    () => {
      const checks = di.resolve(CHECKS_TOKEN)
      const edited = di.resolve(EDITED_TOKEN)

      void checks.checkUpdate()

      setTimeout(async () => {
        if (hasItems(edited)
          && await dirs.backupInitialData.exists()
          && !await files.editedFlag.exists()
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
    const windows = di.resolve(WINDOWS_TOKEN)

    unsubscribe = windows.onRoute(route)
  })
  onUnmounted(() => unsubscribe())
}

window['exportDefaults'] = async () => {
  const dlcs = di.resolve(DLC_TOKEN)
  const filesToExport: IFile[] = []
  const folders = ['trucks', 'trucks/trailers']

  for (const dlcItem of dlcs) {
    const classes = dlcItem.dir.dir('classes')

    for (const postfix of folders) {
      filesToExport.push(...await classes.dir(postfix).findFiles({ ext: 'xml' }))
    }
  }

  for (const postfix of folders) {
    filesToExport.push(...await dirs.classes.dir(postfix).findFiles({ ext: 'xml' }))
  }

  setShowMessages(false)

  let count = 0

  await editorUtils.export(
    filesToExport.map(file => ({ source: file, toExport: files.exported })),
    () => console.log(count++)
  )
  
  setShowMessages(true)
  
  if (await files.exported.exists()) {
    const system = di.resolve(SYSTEM_TOKEN)

    console.log(texts.exported)
    await system.openFile(files.exported.path)
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
