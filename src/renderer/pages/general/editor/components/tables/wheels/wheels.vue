<template>
  <template
    v-for="(file, i) of files"
    :key="file.path"
  >
    <FileNameInfo :file="files[i]" />
    <WheelsSet
      :xml="wheelsSets[i]"
      :file="file"
      @mount="inProgress(file.path)"
      @ready="ready(file.path)"
    />
  </template>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/renderer'
import type { FileInfo, Wheels as WheelsXML } from '@modules/xml/renderer'
import { hasItems } from '@utilities/checks/renderer'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, shallowRef } from 'vue'
import { useEditorStore } from '../../../../store/editor'
import { filesUtils } from '../../../utilities/files'
import FileNameInfo from '../../info/file-name-info.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { useFilesReady } from '../../utilities'
import WheelsSet from './set.vue'

export type WheelsProps = ReadyProps & Props

type Props = {
	getter?(info: FileInfo): Promise<WheelsXML | undefined>
	fileGetter?(info: FileInfo): Promise<IFile | undefined>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { allFiles, info } = storeToRefs(useEditorStore())
const wheelsSets = shallowRef<WheelsXML[]>([])
const files = shallowRef<IFile[]>([])

const { ready, inProgress } = useFilesReady(emit, true)

onMounted(init)

filesUtils.watch(update, files)
filesUtils.regFiles(files, allFiles.value.wheels)

async function init() {
	const file = await props.fileGetter?.(info.value)
	const set = await props.getter?.(info.value)

	files.value = file
		? [file]
		: []
	wheelsSets.value = set
		? [set]
		: []

	if (!hasItems(files.value) || !hasItems(wheelsSets.value)) {
		emit('ready')
	}
}

async function update() {
	files.value = []
	wheelsSets.value = []

	await nextTick()
	await init()
}
</script>
