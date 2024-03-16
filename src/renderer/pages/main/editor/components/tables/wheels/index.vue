<template>
  <WheelsSet
    v-for="(file, i) of files"
    :key="file.path"
    :xml="wheelsSets[i]"
    :file="file"
    @mount="inProgress(file.path)"
    @ready="ready(file.path)"
  />
</template>

<script lang='ts' setup>
import { nextTick, onMounted, shallowRef } from 'vue'

import type { ReadyEmits, ReadyProps } from '../../utils'
import { useFilesReady } from '../../utils'
import WheelsSet from './set.vue'

import type { File, FileInfo, WheelsXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

import { FilesUtils } from '../../../utils'

import { hasItems } from '/utils/renderer'

export type WheelsProps = ReadyProps & Props

type Props = {
  getter?(info: FileInfo): Promise<WheelsXML | undefined>
  fileGetter?(info: FileInfo): Promise<File | undefined>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info, allFiles } = useEditorStore()
const wheelsSets = shallowRef<WheelsXML[]>([])
const files = shallowRef<File[]>([])

const { ready, inProgress } = useFilesReady(emit, true)

onMounted(init)

FilesUtils.watch(update, files)
FilesUtils.regFiles(files, allFiles.wheels)

async function init() {
  const file = await props.fileGetter?.(info)
  const set = await props.getter?.(info)

  files.value = file ? [file] : []
  wheelsSets.value = set ? [set] : []

  if (!hasItems(wheelsSets.value)) emit('ready')
}

async function update() {
  files.value = []
  wheelsSets.value = []

  await nextTick()
  await init()
}
</script>
