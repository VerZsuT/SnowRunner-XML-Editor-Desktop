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
import type { IDir, IFile } from '@modules/files/types'
import { di } from '@utilities/di/container'
import { DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN, MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { Button } from 'ant-design-vue'
import { SETUP_LOCALIZATION as texts } from './localization'

const files = di.resolve(FILES_TOKEN)
const dialogs = di.resolve(DIALOGS_TOKEN)
const messages = di.resolve(MESSAGES_TOKEN)

const file = defineModel<IFile | undefined>({default: undefined})

async function onFolderClick() {
	const selected = await getFromFolder()

	if (selected) {
		file.value = selected
	}
}

async function onFileClick() {
	const selected = await getInitialPak()

	if (selected) {
		file.value = selected
	}
}

async function getInitialPak(): Promise<IFile | undefined> {
	const selectedPath = dialogs.getInitial()

	if (!selectedPath) {
		return
	}

	const selectedFile = files.newFile(selectedPath)

	if (selectedFile.basename() !== 'initial.pak' || !await selectedFile.exists()) {
		messages.error(texts.invalidInitialError)

		return
	}

	return selectedFile
}

async function getFromFolder(): Promise<IFile | undefined> {
	const selectedPath = dialogs.getDir()

	if (!selectedPath) {
		messages.error(texts.invalidFolderError)

		return
	}

	const dirs = di.resolve(DIRS_TOKEN)
	const found = await findInitial(dirs.newDir(selectedPath))

	if (!found) {
		messages.error(texts.invalidFolderError)

		return
	}

	return found
}

async function findInitial(dir: IDir): Promise<IFile | undefined> {
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

	.folder-button {
		margin-right: 30px;
	}
}
</style>
