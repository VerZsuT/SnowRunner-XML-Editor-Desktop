<template>
  <Menu />
  <Header :text="texts.firstStepsDescription" />

  <Steps
    class="steps"
    :current="step"
    :items="[
      { title: texts.languageLabel },
      { title: texts.gameDataStep }
    ]"
  />
  <div class="steps-content">
    <Language
      v-if="step === 0"
      radio-mode
    />
    <InitialSelect
      v-else-if="step === 1"
      @update:model-value="onChangeGameFolder"
    />
  </div>
  <div class="steps-actions">
    <Button
      v-if="step === 0"
      type="primary"
      @click="step++"
    >
      {{ texts.next }}
    </Button>
  </div>
</template>

<script lang='ts' setup>
import { Button, Steps } from 'ant-design-vue'
import { ref } from 'vue'

import InitialSelect from './initial-select.vue'
import texts from './texts'

import type { File } from '/mods/renderer'
import { Archive, Backup, Config, Helpers, ProgramWindow } from '/mods/renderer'
import { Header, Language, Menu } from '/rend/components'
import { useWindowReady } from '/rend/utils'

const step = ref(0)

useWindowReady(ProgramWindow.setup)

async function onChangeGameFolder(file: File) {
  Config.initialPath = file.path

  await Backup.save()
  await Archive.unpackMain()
  
  Helpers.reloadApp()
}
</script>

<style lang='scss'>
body {
  text-align: center;
  background: white;
}
</style>

<style lang='scss' scoped>
.steps {
  padding: 0 55px;
  margin-top: 10px;

  &-content {
    margin-top: 20px;
  }

  &-actions {
    position: absolute;
    width: 100%;
    bottom: 10px;
  }
}
</style>
