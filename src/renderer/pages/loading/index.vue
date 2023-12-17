<template>
  <div class='main'>
    <Title class='title' :level='4'>
      {{ state.title }}
    </Title>

    <Progress
      v-if='state.isDownload'
      class='progress'
      :percent='state.percent'
    />
    <Spin v-else />
  </div>
</template>

<script lang='ts' setup>
import { Progress, Typography } from 'ant-design-vue'
import { reactive } from 'vue'

import texts from './texts'
import { ProgramWindow, Windows } from '/mods/renderer'
import { Spin } from '/rend/components'
import { useWindowReady } from '/rend/utils'

import '/rend/template-script'

const { Title } = Typography
useWindowReady(ProgramWindow.loading)
useEvents()

const state = reactive({
  isDownload: false,
  percent: 0,
  title: texts.loading
})

function useEvents() {
  Windows.onLoadingSuccess(() => {
    state.percent = 0
    state.isDownload = false
  })
  Windows.onLoadingDownload(() => state.isDownload = true)
  Windows.onLoadingText(title => state.title = title)
  Windows.onLoadingPercent(percent => state.percent = Number(percent))
}
</script>

<style lang='scss' scoped>
.main {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
}

.progress {
  padding: 5px;
}

.title {
  width: 100%;
  margin-top: 0;
}

.spin {
  margin-top: 20px;

  &-icon {
    font-size: 40px;
    color: #2196f3;
  }
}
</style>
