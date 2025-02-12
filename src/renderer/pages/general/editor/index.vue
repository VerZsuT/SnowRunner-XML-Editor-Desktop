<template>
  <div class="container">
    <Header
      ref="header"
      :xml="xml"
      :file="file"
      :has-error="hasError"
    />

    <Table
      v-if="xml"
      :xml="xml"
      :file="file"
      @ready="$emit('ready')"
    />
    <Spin
      v-else-if="!hasError"
      center
    />
  </div>
</template>

<script lang='ts' setup>
import { storeToRefs } from 'pinia'
import { nextTick, onMounted, ref, shallowRef } from 'vue'
import { useEditorStore } from '../store'
import { Header, Table } from './components'
import type { ReadyEmits, ReadyProps } from './components/utils'
import { FilesUtils, ResetUtils, provideFile } from './utils'
import type { File } from '/mods/renderer'
import { DLCs, Dirs, Mods, TruckXML } from '/mods/renderer'
import { Spin } from '/rend/components'

export type EditorProps = Props & ReadyProps

type Props = {
  /** Файл для редактирования. */
  file?: File
}
type HeaderExpose = InstanceType<typeof Header>

const props = defineProps<Props>()
const emit = defineEmits<ReadyEmits>()
defineExpose({
  async save(...args: Parameters<HeaderExpose['save']>) {
    return header.value?.save(...args)
  },
  async export(...args: Parameters<HeaderExpose['export']>) {
    return header.value?.export(...args)
  },
  async reset(updateFiles = true) {
    await header.value?.reset()
    return header.value?.save(updateFiles)
  },
  async import(updateFiles = true, ...args: Parameters<HeaderExpose['import']>) {
    await header.value?.import(...args)
    return header.value?.save(updateFiles)
  }
})

const editorStore = useEditorStore()
const { file: prevFile, allFiles } = storeToRefs(editorStore)
const { setInfo } = editorStore

const xml = shallowRef<TruckXML | null>(null)
const header = ref<InstanceType<typeof Header> | null>(null)
const hasError = ref<boolean>(false)

const file = (props.file ?? prevFile.value)!

onMounted(init)
FilesUtils.watch(update, [file])

setInfo({
  dlc: DLCs.getDLC(file),
  mod: Mods.getModID(file),
  isBackup: file.path.includes(Dirs.backupInitialData.name)
})

regFile(file)
provideFile(file)

ResetUtils.provide(ResetUtils.globalID)

async function init() {
  const result = await TruckXML.from(file)

  if (result) {
    xml.value = result
    hasError.value = false
  } else {
    hasError.value = true
    xml.value = null
    emit('ready')
  }
}

async function update() {
  xml.value = null

  await nextTick()
  await init()
}

function regFile(file: File) {
  allFiles.value.main = file
}
</script>

<style lang='scss'>
.ant-space {
  gap: 20px !important;
}

.ant-tabs-content {
  height: 100% !important;
}

div.ant-collapse {
  border-radius: 0;

  &-header {
    height: 45px;
    background-color: #f7f7f7;
    border-radius: 0 !important;
  }

  &-content,
  &-item:last-child {
    border-radius: 0 !important;
  }
}
</style>

<style lang='scss' scoped>
@mixin header-button {
  color: white;
  font-size: 25px !important;
}

.container,
.tabs {
  height: 100%;
}

.spin-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-container {
  padding: 0 30px;
  margin-top: 100px;
  text-align: center;
}

:global(span.anticon-arrow-left) {
  @include header-button;
  position: relative;
  margin-right: -20px;
  left: 20px;
}
</style>
