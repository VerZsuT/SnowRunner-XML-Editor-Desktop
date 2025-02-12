<template>
  <div class="grid info">
    <div
      v-if="label"
      class="label"
    >
      <Text>{{ label }}</Text>
    </div>
    <div
      v-if="isActive"
      class="content"
    >
      <Text>{{ value }}</Text>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { Typography } from 'ant-design-vue'
import { useActive } from '../utils'

const { Text } = Typography

export type InfoProps = {
  label?: string
  getter(): any
}

const props = defineProps<InfoProps>()

const value = String(props.getter())
const { isActive } = useActive()
</script>
  
<style lang='scss' scoped>
.desc-image img {
  max-width: 600px;
  max-height: 500px;
}

.info {
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-content: center;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  padding-top: 10px;

  .label,
  .content {
    box-sizing: border-box;
    width: 50%;
  }

  .label {
    padding-left: 20px;
  }

  .content {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
    align-content: center;
    align-items: center;
    justify-content: space-around;
  }

  &:first-of-type {
    padding-top: 0;
  }
}
</style>
