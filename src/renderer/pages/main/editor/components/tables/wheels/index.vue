<template>
  <div v-if='file'>
    <WheelsSet
      v-if='wheelsSet'
      :xml='wheelsSet'
      :file='file'
      @vue:mounted='ready(file.path)'
    />
  </div>
</template>

<script lang='ts' setup>
import { onMounted, shallowRef } from 'vue'
import { ReadyEmits, useFilesReady } from '../../utils'
import WheelsSet from './set.vue'
import { File, FileInfo, WheelsXML } from '/mods/renderer'
import { useEditorStore } from '/rend/pages/main/store'

type Props = {
  getter?(info: FileInfo): Promise<WheelsXML | undefined>
  fileGetter?(info: FileInfo): Promise<File | undefined>
}

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()

const { info } = useEditorStore()
const { ready, inProgress } = useFilesReady(emit, true)

const wheelsSet = shallowRef<WheelsXML | null>(null)

const file = shallowRef<File | null>(null)

onMounted(async () => {
  file.value = await props.fileGetter?.(info) || null
  wheelsSet.value = await props.getter?.(info) || null

  if (!file.value) { emit('ready'); return }
  inProgress(file.value.path)
})
</script>
