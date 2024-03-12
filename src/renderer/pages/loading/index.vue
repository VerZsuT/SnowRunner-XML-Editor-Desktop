<template>
  <div class="main">
    <Title
      class="title"
      :level="4"
    >
      {{ title }}
    </Title>

    <Progress
      v-if="isDownload"
      class="progress"
      :percent="percent"
    />
    <Spin v-else />
  </div>
</template>

<script lang='ts' setup>
import { Progress, Typography } from 'ant-design-vue'
import { ref } from 'vue'

import texts from './texts'

import { ProgramWindow, Windows } from '/mods/renderer'
import { Spin } from '/rend/components'
import { useWindowReady } from '/rend/utils'

import '/rend/template-script'

const { Title } = Typography

const isDownload = ref(false)
const percent = ref(0)
const title = ref(texts.loading)

useWindowReady(ProgramWindow.loading)
useEvents()

function useEvents() {
  Windows.onLoadingSuccess(() => {
    percent.value = 0
    isDownload.value = false
    title.value = texts.loading
  })
  Windows.onLoadingDownload(() => {
    isDownload.value = true
    title.value = texts.download
  })
  Windows.onLoadingText(value => title.value = value)
  Windows.onLoadingPercent(value => percent.value = Number(value))
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
