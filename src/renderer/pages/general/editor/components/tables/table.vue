<template>
  <div class="table">
    <Trailer
      v-if="xml.Type === TruckFileType.trailer"
      :xml="xml"
      :file="file"
      @ready="$emit('ready')"
    />
    <Truck
      v-else
      :xml="xml"
      :file="file"
      @ready="$emit('ready')"
    />
  </div>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/types'
import { TruckFileType, type TruckXML } from '@modules/xml/renderer'
import type { ReadyEmits } from '../utilities'
import Trailer from './trailer/trailer.vue'
import Truck from './truck/truck.vue'

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
