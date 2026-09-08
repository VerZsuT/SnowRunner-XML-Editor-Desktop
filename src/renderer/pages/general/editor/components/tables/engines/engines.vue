<template>
  <template
    v-for="(xml, i) of list"
    :key="files[i].path"
  >
    <FileNameInfo :file="files[i]" />
    <EngineSet
      :xml="xml"
      :file="files[i]"
      @mount="inProgress(files[i].path)"
      @ready="ready(files[i].path)"
    />
  </template>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/types'
import type { Engines as EnginesXML, FileInfo } from '@modules/xml/renderer'
import { hasItems } from '@utilities/checks/renderer'
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, shallowRef } from 'vue'
import { useEditorStore } from '../../../../store/editor'
import { filesUtils } from '../../../utilities/files'
import FileNameInfo from '../../info/file-name-info.vue'
import type { ReadyEmits, ReadyProps } from '../../utilities'
import { useFilesReady } from '../../utilities'
import EngineSet from './set.vue'

export type EnginesProps = ReadyProps & Props

type Props = {
	getter?(info: FileInfo): Promise<EnginesXML[]>
	filesGetter?(info: FileInfo): Promise<IFile[]>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { allFiles, info } = storeToRefs(useEditorStore())
const list = shallowRef<EnginesXML[]>([])
const files = shallowRef<IFile[]>([])
const { ready, inProgress } = useFilesReady(emit, true)

onMounted(init)

filesUtils.watch(update, files)
filesUtils.regFiles(files, allFiles.value.engines)

async function init() {
	const foundFiles = await props.filesGetter?.(info.value) || []
	const foundList = await props.getter?.(info.value) || []
	
	if (!hasItems(foundFiles) || !hasItems(foundList)) {
		emit('ready')
	}

	files.value = foundFiles
	list.value = foundList
}

async function update() {
	files.value = []
	list.value = []
	
	await nextTick()
	await init()
}

</script>
