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

const file = defineModel<File>()

async function onFolderClick() {
  const selected = await getFromFolder()

  if (!selected) {
    return
  }

  file.value = selected
}

async function onFileClick() {
  const selected = await getInitialPak()

  if (!selected) {
    return
  }

  file.value = selected
}

async function getInitialPak(): Promise<File | undefined> {
  const selected = Dialogs.getInitial()

  if (!selected || selected.basename() !== 'initial.pak' || !await selected.exists()) {
    Messages.error(texts.invalidInitialError)

    return
  }

  return selected
}

async function getFromFolder(): Promise<File | undefined> {
  const selected = Dialogs.getDir()

  if (!selected) {
    Messages.error(texts.invalidFolderError)

    return
  }

  const found = await findInitial(selected)

  if (!found) {
    Messages.error(texts.invalidFolderError)

    return
  }

  return found
}

async function findInitial(dir: Dir): Promise<File | undefined> {
  const parts = ['steamapps', 'common', 'SnowRunner', 'en_us', 'preload', 'paks', 'client', 'initial.pak']
  const len = parts.length

  for (let i = 0; i < len; i++) {
    const file = dir.file(...parts)
    
    if (await file.exists()) {
      return file
    }
    
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
