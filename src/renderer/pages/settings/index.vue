<template>
  <Language />
  
  <div class="checkboxes">
    <Switch
      size="small"
      :checked="updates"
      @click="updates = !updates"
    />
    <Text class="label">
      {{ texts.updatesLabel }}
    </Text>
    <br>

    <Switch
      size="small"
      :checked="mods"
      @click="mods = !mods"
    />
    <Text class="label">
      {{ texts.modsLabel }}
    </Text>
    <br>

    <Switch
      size="small"
      :checked="advanced"
      @click="advanced = !advanced"
    />
    <Text class="label">
      {{ texts.advancedModeLabel }}
    </Text>
  </div>
</template>

<script lang='ts' setup>
import { Switch, Typography } from 'ant-design-vue'
import { ref, watch } from 'vue'

import texts from './texts'

import { Config, ProgramWindow } from '/mods/renderer'
import { Language } from '/rend/components'
import { useWindowReady } from '/rend/utils'

const { Text } = Typography

const updates = ref(Config.checkUpdates)
const mods = ref(Config.useMods)
const advanced = ref(Config.advancedMode)

useWindowReady(ProgramWindow.settings)

watch(updates, () => Config.checkUpdates = updates.value)
watch(mods, () => Config.useMods = mods.value)
watch(advanced, () => Config.advancedMode = advanced.value)
</script>

<style lang='scss'>
body {
  text-align: center;
  background-color: #fff;
  padding-top: 27px;
}
</style>

<style lang='scss' scoped>
.checkboxes {
  margin: 10px auto;
  text-align: left;
  width: fit-content;

  .label {
    display: inline-block;
    margin-bottom: 10px;
    margin-left: 10px;
  }
}
</style>
