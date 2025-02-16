<template>
  <template
    v-for="(xml, i) of list"
    :key="files[i].path"
  >
    <FileNameInfo :file="files[i]" />
    <GearboxSet
      :xml="xml"
      :file="files[i]"
      @mount="inProgress(files[i].path)"
      @ready="ready(files[i].path)"
    />
  </template>
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, shallowRef } from 'vue'
import { useEditorStore } from '../../../../store'
import { FilesUtils } from '../../../utils'
import { FileNameInfo } from '../../info'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useFilesReady } from '../../utils'
import GearboxSet from './set.vue'
import type { FileInfo, GearboxesXML, IFile } from '/mods/renderer'
import { hasItems } from '/utils/renderer'

export type GearboxesProps = ReadyProps & Props

type Props = {
  getter?(info: FileInfo): Promise<GearboxesXML[]>
  filesGetter?(info: FileInfo): Promise<IFile[]>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
const { allFiles, info } = storeToRefs(useEditorStore())
const list = shallowRef<GearboxesXML[]>([])
const files = shallowRef<IFile[]>([])
const { ready, inProgress } = useFilesReady(emit, true)

onMounted(init)

FilesUtils.watch(update, files)
FilesUtils.regFiles(files, allFiles.value.gearboxes)

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
