<template>
  <EngineSet
    v-for="(xml, i) of list"
    :key="files[i].path"
    :xml="xml"
    :file="files[i]"
    @mount="inProgress(files[i].path)"
    @ready="ready(files[i].path)"
  />
</template>

<script lang='ts' setup>
import { nextTick, onMounted, shallowRef } from 'vue'

import { FilesUtils } from '../../../utils'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useFilesReady } from '../../utils'
import EngineSet from './set.vue'

import type { EnginesXML, File, FileInfo } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'
import { hasItems } from '/utils/renderer'

export type EnginesProps = ReadyProps & Props

type Props = {
  getter?(info: FileInfo): Promise<EnginesXML[]>
  filesGetter?(info: FileInfo): Promise<File[]>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info, allFiles } = useEditorStore()
const list = shallowRef<EnginesXML[]>([])
const files = shallowRef<File[]>([])

const { ready, inProgress } = useFilesReady(emit, true)

onMounted(init)

FilesUtils.watch(update, files)
FilesUtils.regFiles(files, allFiles.engines)

async function init() {
  files.value = await props.filesGetter?.(info) || []
  list.value = await props.getter?.(info) || []

  if (!hasItems(list.value)) emit('ready')
}

async function update() {
  files.value = []
  list.value = []
  
  await nextTick()
  await init()
}

</script>
