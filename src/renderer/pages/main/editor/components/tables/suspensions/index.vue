<template>
  <SuspensionSet
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

import type { ReadyEmits } from '../../utils'
import { useFilesReady } from '../../utils'
import SuspensionSet from './set.vue'

import type { File, FileInfo, SuspensionsXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'
import { hasItems } from '/utils/renderer'

type Props = {
  getter?(info: FileInfo): Promise<SuspensionsXML[]>
  filesGetter?(info: FileInfo): Promise<File[]>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info } = useEditorStore()
const { ready, inProgress } = useFilesReady(emit, true)
const list = shallowRef<SuspensionsXML[]>([])
const files = shallowRef<File[]>([])

onMounted(async () => {
  files.value = await props.filesGetter?.(info) || []
  list.value = await props.getter?.(info) || []
  if (!hasItems(files.value)) emit('ready')
})
</script>
