<template>
  <div class='game-folder'>
    <Button
      class='folder-button'
      type='primary'
      size='large'
      @click='onFolderClick'
    >
      <template #icon>
        <FolderFilled />
      </template>
      {{ texts.gameFolderLabel }}
    </Button>
    <Button
      type='primary'
      size='large'
      @click='onFileClick'
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
import type { IFolder } from './types'
import { Dialogs, Dir, File, Messages } from '/mods/renderer'

type Emits = {
  change: [path: string]
}

const emit = defineEmits<Emits>()

async function onFolderClick() {
  const data = await getGameFolder()
  if (!data) return
  emit('change', data.initial.path)
}

async function onFileClick() {
  const data = await getInitialPak()
  if (!data) return
  emit('change', data.initial.path)
}

async function getInitialPak(): Promise<IFolder | undefined> {
  const initial = Dialogs.getInitial()

  if (!initial || initial.basename() !== 'initial.pak' || !await initial.exists()) {
    Messages.error(texts.invalidInitialError)
    return
  }
  return { initial, dir: initial.root }
}

async function getGameFolder(): Promise<IFolder | undefined> {
  const requested = Dialogs.getDir()
  let existed: File | undefined

  if (!requested) {
    Messages.error(texts.invalidFolderError)
    return
  }
  existed = await findInitial(requested)

  if (!existed) {
    Messages.error(texts.invalidFolderError)
    return
  }

  return {
    dir: existed.root,
    initial: existed
  }
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
