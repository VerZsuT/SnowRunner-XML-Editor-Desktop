<template>
  <div
    v-if="props.center"
    class="spin-container"
  >
    <Spin size="large" />
  </div>
  <Spin
    v-else
    class="spin"
    size="large"
  />
</template>

<script lang='ts' setup>
import { Spin } from 'ant-design-vue'

type Props = {
  center?: boolean
}

const props = defineProps<Props>()
</script>

<style lang='scss' scoped>
.spin {
  width: 100%;
  margin-top: 20px;
  text-align: center;

  &-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
  }
}
</style>
