<template>
  <div class="table">
    <TrailerTable
      v-if="xml.Type === TruckFileType.trailer"
      :xml="xml"
      :file="file"
      @ready="$emit('ready')"
    />
    <TruckTable
      v-else
      :xml="xml"
      :file="file"
      @ready="$emit('ready')"
    />
  </div>
</template>

<script lang='ts' setup>
import type { IFile, TruckXML } from '@modules/renderer'
import { TruckFileType } from '@modules/renderer'
import type { ReadyEmits } from '../utilities'
import TrailerTable from './trailer'
import TruckTable from './truck'

type Props = {
  xml: TruckXML
  file: IFile
}

defineProps<Props>()
defineEmits<ReadyEmits>()
</script>

<style lang='scss' scoped>
.table {
  padding: 20px;
  height: calc(100vh - 150px);
  overflow-y: auto;

  :global(.ant-input),
  :global(.ant-input-number-input) {
    width: 150px;
  }
}
</style>
