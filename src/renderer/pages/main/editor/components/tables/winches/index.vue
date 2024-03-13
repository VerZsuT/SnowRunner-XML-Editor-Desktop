<template>
  <WinchSet
    v-for="(xml, i) of list"
    :key="files[i].path"
    :xml="xml"
    :file="files[i]"
    @mount="inProgress(files[i].path)"
    @ready="ready(files[i].path)"
  />
</template>

<script lang='ts' setup>
import { onMounted, shallowRef } from 'vue'

import type { ReadyEmits, ReadyProps } from '../../utils'
import { useFilesReady } from '../../utils'
import WinchSet from './set.vue'

import type { File, FileInfo, WinchesXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'
import { hasItems } from '/utils/renderer'

export type WinchesProps = ReadyProps & Props

type Props = {
  getter?(info: FileInfo): Promise<WinchesXML[]>
  filesGetter?(info: FileInfo): Promise<File[]>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info } = useEditorStore()
const list = shallowRef<WinchesXML[]>([])
const files = shallowRef<File[]>([])

const { ready, inProgress } = useFilesReady(emit, true)

onMounted(async () => {
  files.value = await props.filesGetter?.(info) || []
  list.value = await props.getter?.(info) || []
  
  if (!hasItems(files.value)) emit('ready')
})
</script>
