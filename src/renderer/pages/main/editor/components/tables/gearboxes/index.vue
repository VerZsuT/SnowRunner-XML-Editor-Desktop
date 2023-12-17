<template>
  <div>
    <template v-for='(xml, i) of list'>
      <GearboxSet
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
import GearboxSet from './set.vue'
import { File, FileInfo, GearboxesXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'
import { hasItems } from '/utils/renderer'

type Props = {
  getter?(info: FileInfo): Promise<GearboxesXML[]>
  filesGetter?(info: FileInfo): Promise<File[]>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info } = useEditorStore()
const { ready, inProgress } = useFilesReady(emit, true)
const list = shallowRef<GearboxesXML[]>([])
const files = shallowRef<File[]>([])

onMounted(async () => {
  files.value = await props.filesGetter?.(info) || []
  list.value = await props.getter?.(info) || []
  if (!hasItems(files.value)) emit('ready')
  for (const file of files.value) inProgress(file.path)
})
</script>
