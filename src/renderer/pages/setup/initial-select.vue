<template>
  <div class="game-folder">
    <Button
      class="folder-button"
      type="primary"
      size="large"
      @click="onFolderClick"
    >
      <template #icon>
        <FolderFilled />
      </template>
      {{ texts.gameFolderLabel }}
    </Button>
    <Button
      type="primary"
      size="large"
      @click="onFileClick"
    >
      <template #icon>
        <FileFilled />
      </template>
      initial.pak
    </Button>
  </div>
</template>

<script lang='ts' setup>
import { FileFilled, FolderFilled } from '@ant-design/icons-vue'
import { Button } from 'ant-design-vue'

import texts from './texts'

import type { Dir, File } from '/mods/renderer'
import { Dialogs, Messages } from '/mods/renderer'

const model = defineModel<File>()

async function onFolderClick() {
  const file = await getFromFolder()
  if (!file) return

  model.value = file
}

async function onFileClick() {
  const file = await getInitialPak()
  if (!file) return

  model.value = file
}

async function getInitialPak(): Promise<File | undefined> {
  const initial = Dialogs.getInitial()

  if (!initial || initial.basename() !== 'initial.pak' || !await initial.exists()) {
    Messages.error(texts.invalidInitialError)
    return
  }

  return initial
}

async function getFromFolder(): Promise<File | undefined> {
  const requested = Dialogs.getDir()
  if (!requested) {
    Messages.error(texts.invalidFolderError)
    return
  }

  const existed = await findInitial(requested)
  if (!existed) {
    Messages.error(texts.invalidFolderError)
    return
  }

  return existed
}

async function findInitial(dir: Dir): Promise<File | undefined> {
  const parts = ['steamapps', 'common', 'SnowRunner', 'en_us', 'preload', 'paks', 'client', 'initial.pak']
  const len = parts.length

  for (let i = 0; i < len; i++) {
    const file = dir.file(...parts)
    
    if (await file.exists()) return file
    parts.shift()
  }
}
</script>

<style lang='scss' scoped>
.game-folder {
  margin-top: 40px;
}

.folder-button {
  margin-right: 30px;
}
</style>
