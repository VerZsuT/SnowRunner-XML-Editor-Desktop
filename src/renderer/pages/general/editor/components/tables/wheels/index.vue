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
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, shallowRef } from 'vue'
import { useEditorStore } from '../../../../store'
import { FilesUtils } from '../../../utils'
import { FileNameInfo } from '../../info'
import type { ReadyEmits, ReadyProps } from '../../utils'
import { useFilesReady } from '../../utils'
import WheelsSet from './set.vue'
import { type File, type FileInfo, type WheelsXML } from '/mods/renderer'
import { hasItems } from '/utils/renderer'

export type WheelsProps = ReadyProps & Props

type Props = {
  getter?(info: FileInfo): Promise<WheelsXML | undefined>
  fileGetter?(info: FileInfo): Promise<File | undefined>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { allFiles, info } = storeToRefs(useEditorStore())
const wheelsSets = shallowRef<WheelsXML[]>([])
const files = shallowRef<File[]>([])

const { ready, inProgress } = useFilesReady(emit, true)

onMounted(init)

FilesUtils.watch(update, files)
FilesUtils.regFiles(files, allFiles.value.wheels)

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
