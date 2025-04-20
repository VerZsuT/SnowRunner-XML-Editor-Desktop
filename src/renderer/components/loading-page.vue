<template>
  <div
    v-if="Loading.state.isLoading"
    class="wrapper"
  >
    <Title
      class="title"
      :level="4"
    >
      {{ Loading.state.text }}
    </Title>

    <AntProgress
      v-if="Loading.state.stagesCount !== 1"
      class="progress"
      type="line"
      :percent="Loading.percent.value"
      :status="progressStatus"
      :show-info="progressStatus !== 'success'"
    />
    <Spin
      v-else
      center
    />
  </div>
</template>

<script setup lang="ts">
import type { ProgressProps } from 'ant-design-vue'
import { Progress as AntProgress, Typography } from 'ant-design-vue'
import { computed } from 'vue'
import Spin from './spin.vue'
import { Loading, Messages } from '/mods/renderer'

const { Title } = Typography

const progressStatus = computed<ProgressProps['status']>(() => {
  if (Loading.state.hasError) {
    Messages.error(Loading.state.error)

    return 'exception'
  }
  
  if (Loading.state.completedCount >= Loading.state.stagesCount) {
    return 'success'
  }

  return 'active'
})
</script>

<style lang='scss' scoped>
.wrapper {
  display: flex;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  background-color: white;

  .progress {
    width: 50%;
    margin-top: 0;
  }

  .title {
    width: 100%;
    margin-top: 0;
    margin-bottom: 20px;
  }
}
</style>
