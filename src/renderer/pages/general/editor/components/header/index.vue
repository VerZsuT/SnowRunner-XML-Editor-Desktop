<template>
  <header>
    <template v-if="hasError">
      <ErrorHeader />
      <div class="error-container">
        <Text>{{ texts.procFileError }}</Text>
      </div>
    </template>
    <MainHeader
      v-else-if="xml && file"
      ref="header"
      :xml="xml"
      :file="file"
    />
  </header>
</template>

<script lang='ts' setup>
import { Typography } from 'ant-design-vue'
import { ref } from 'vue'
import texts from '../../texts'
import ErrorHeader from './error-header.vue'
import MainHeader from './main-header.vue'
import type { IFile, TruckXML } from '/mods/renderer'

const { Text } = Typography

type Props = {
  xml?: TruckXML | null
  file?: IFile | null
  hasError: boolean
}
type MainHeaderExpose = InstanceType<typeof MainHeader>

defineProps<Props>()
defineExpose({
  async save(...args: Parameters<MainHeaderExpose['save']>) {
    return header.value?.save(...args)
  },
  async reset() {
    return header.value?.reset()
  },
  async import(...args: Parameters<MainHeaderExpose['import']>) {
    return header.value?.import(...args)
  },
  async export(...args: Parameters<MainHeaderExpose['export']>) {
    return header.value?.export(...args)
  }
})

const header = ref<MainHeaderExpose | null>(null)
</script>

<style lang='scss'>
.menu {
  &-item-icon {
    float: right;
    margin-left: 10px;
    margin-top: 5px;
  }

  &-save-button {
    color: white;
    margin-right: 20px;
    margin-bottom: 4px;
  }

  &-button {
    color: white;
    font-size: 25px !important;
  }
}
</style>

<style lang='scss' scoped>
.error-container {
  text-align: center;
  margin-top: 20px;
}
</style>
