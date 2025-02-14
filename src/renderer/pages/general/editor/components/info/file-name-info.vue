<template>
  <div
    v-if="isActive && Config.advancedMode"
    class="grid info"
  >
    <div
      class="content"
      @click="Helpers.openFile(file.path)"
    >
      <Text>{{ file.basename() }}</Text>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Typography } from 'ant-design-vue'
import { useActive } from '../utils'
import { Config, Helpers, type File } from '/mods/renderer'

const { Text } = Typography

export type FileInfoProps = {
	file: File
}

defineProps<FileInfoProps>()
const { isActive } = useActive()
</script>

<style lang='scss' scoped>
.wrapper {
  width: 100%;
}

.info {
  position: relative;
  top: 10px;
  flex-wrap: nowrap;
  box-sizing: border-box;
  justify-content: flex-start;
  align-items: center;
  border: 1px solid lightgray;
  border-bottom: 0;
  padding: 5px 0;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding-left: 20px;
  width: 100%;
  
  .content {
    font-weight: normal;
    transition: font-weight 0.1s ease-in-out;

    &:hover {
      cursor: pointer;
      font-weight: bold;
    }
  }

  &:first-of-type {
    margin-top: -10px;
  }
}
</style>
  
