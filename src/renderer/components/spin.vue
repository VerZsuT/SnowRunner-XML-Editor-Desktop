<template>
  <div
    v-if="center"
    class="spin-container"
  >
    <Spin
      :indicator="indicator"
      size="large"
    />
  </div>
  <Spin
    v-else
    class="spin"
    :indicator="indicator"
    size="large"
  />
</template>

<script lang='ts' setup>
import { LoadingOutlined } from '@ant-design/icons-vue'
import { Spin } from 'ant-design-vue'
import { h } from 'vue'

export type SpinProps = {
  /** Разместить по центру доступного места. */
  center?: boolean
}

defineProps<SpinProps>()

const indicator = h(LoadingOutlined, {
  style: { fontSize: '40px' },
  spin: true
})
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
