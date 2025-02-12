<template>
  <div class="setup">
    <Header
      class="header"
      :text="texts.firstStepsDescription"
    />
  
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
  </div>
</template>

<script lang='ts' setup>
import { Button, Steps } from 'ant-design-vue'
import { ref } from 'vue'
import InitialSelect from './initial-select.vue'
import texts from './texts'
import type { File } from '/mods/renderer'
import { Archive, Backup, Config, Helpers } from '/mods/renderer'
import { Header, Language } from '/rend/components'

const step = ref(0)

async function onChangeGameFolder(file: File) {
  Config.initialPath = file.path
  await Backup.save()
  await Archive.unpackMain()
  Helpers.reloadApp()
}
</script>

<style lang='scss' scoped>
.setup {
  display: flex;
  width: 100%;
  height: 100%;
  text-align: center;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-wrap: wrap;
  background: white;

  .header {
    position: absolute;
    top: 30px;
    left: 0;
  }

  .steps {
    padding: 0 15%;
    margin-top: 10px;

    &-content,
    &-actions {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
