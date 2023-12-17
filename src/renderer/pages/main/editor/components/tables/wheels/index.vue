<template>
  <div>
    <template v-for='(xml, i) of list'>
      <WheelSet
        :xml='xml'
        :file='files[i]'
        @vue:mounted='ready(files[i].path)'
      />
    </template>
  </div>
</template>

<script lang='ts' setup>
import { onMounted, shallowRef } from 'vue'
import { ReadyEmits, useFilesReady } from '../../utils'
import WheelSet from './set.vue'
import { File, FileInfo, WheelsXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'
import { hasItems } from '/utils/renderer'

type Props = {
  getter?(info: FileInfo): Promise<WheelsXML[] | WheelsXML | undefined>
  filesGetter?(info: FileInfo): Promise<File[] | File | undefined>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info } = useEditorStore()
const { ready, inProgress } = useFilesReady(emit, true)
const list = shallowRef<WheelsXML[]>([])
const files = shallowRef<File[]>([])

onMounted(async () => {
  const listRes = await props.getter?.(info) || []
  const filesRes = await props.filesGetter?.(info) || []
  files.value = Array.isArray(filesRes) ? filesRes : [filesRes]
  list.value = Array.isArray(listRes) ? listRes : [listRes]
  if (!hasItems(files.value)) emit('ready')
  for (const file of files.value) inProgress(file.path)
})
</script>
