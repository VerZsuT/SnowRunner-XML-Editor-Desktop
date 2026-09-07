<template>
  <div
    v-if="isActive && config.advancedMode"
    class="grid info"
  >
    <div
      class="content"
      @click="system.openFile(file.path)"
    >
      <Text>{{ file.basename() }}</Text>
    </div>
  </div>
</template>

<script lang='ts' setup>
import type { IFile } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { CONFIG_TOKEN, SYSTEM_TOKEN } from '@utilities/di/renderer/tokens'
import { Typography } from 'ant-design-vue'
import { useActive } from '../utilities'

const { Text } = Typography

export type FileInfoProps = {
	file: IFile
}

defineProps<FileInfoProps>()
const { isActive } = useActive()
const config = di.resolve(CONFIG_TOKEN)
const system = di.resolve(SYSTEM_TOKEN)
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
  
