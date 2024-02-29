<template>
  <div style="width: 100%; height: 100%;">
    <template v-if="xml">
      <template v-if="hasError">
        <ErrorHeader />
        <div class="error-container">
          <Text>{{ texts.procFileError }}</Text>
        </div>
      </template>
      <template v-else>
        <MainHeader
          ref="header"
          :xml="xml"
          :file="file"
        />
        <div class="table">
          <TrailerTable
            v-if="xml.Type === TruckFileType.trailer"
            :xml="xml"
            :file="file"
            @ready="emit('ready')"
          />
          <TruckTable
            v-else
            :xml="xml"
            :file="file"
            @ready="emit('ready')"
          />
        </div>
      </template>
    </template>
    <Spin
      v-else
      center
    />
  </div>
</template>

<script lang='ts' setup>
import { Typography } from 'ant-design-vue'
import { onMounted, ref, shallowRef } from 'vue'

import { useEditorStore } from '../store'
import { ErrorHeader, MainHeader, TrailerTable, TruckTable } from './components'
import texts from './texts'
import { ResetUtils, provideFile } from './utils'

import type { File } from '/mods/renderer'
import { DLCs, Dirs, Mods, TruckFileType, TruckXML } from '/mods/renderer'
import { Spin } from '/rend/components'

const { Text } = Typography

type Props = {
  file?: File
}
type Emits = {
  ready: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()
const { file: storeFile, setInfo } = useEditorStore()
const file = (props.file ?? storeFile.value)!

const xml = shallowRef<TruckXML | null>(null)
const header = ref<InstanceType<typeof MainHeader> | null>(null)
const hasError = ref<boolean>(false)

type SaveArgs = Parameters<InstanceType<typeof MainHeader>['save']>
type ExportArgs = Parameters<InstanceType<typeof MainHeader>['export']>
type ImportArgs = Parameters<InstanceType<typeof MainHeader>['import']>

defineExpose({
  save: (...args: SaveArgs) => header.value?.save(...args),
  export: (...args: ExportArgs) => header.value?.export(...args),
  reset: async (updateFiles = true) => {
    await header.value?.reset()
    await header.value?.save(updateFiles)
  },
  import: async (updateFiles = true, ...args: ImportArgs) => {
    await header.value?.import(...args)
    await header.value?.save(updateFiles)
  }
})

setInfo({
  dlc: DLCs.getDLC(file),
  mod: Mods.getModID(file),
  isBackup: file.path.includes(Dirs.backupInitialData.name)
})

provideFile(file)
ResetUtils.provide(ResetUtils.globalID)

onMounted(async () => {
  const result = await TruckXML.fromFile(file)
  if (result) {
    xml.value = result
  }
  else {
    hasError.value = true
    emit('ready')
  }
})
</script>

<style lang='scss'>
body {
  background-color: #e7ebf0;
}

.ant-space {
  gap: 20px !important;
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

.table {
  padding: 20px;
  height: calc(100vh - 150px);
  overflow-y: auto;

  :global(.ant-input),
  :global(.ant-input-number-input) {
    width: 150px;
  }
}

:global(span.anticon-arrow-left) {
  @include header-button;
  position: relative;
  margin-right: -20px;
  left: 20px;
}
</style>
