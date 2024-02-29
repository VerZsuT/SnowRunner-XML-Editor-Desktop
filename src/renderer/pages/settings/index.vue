<template>
  <Language />
  <div class="checkboxes">
    <Switch
      size="small"
      :checked="settings.updates"
      @click="settings.updates = !settings.updates"
    />
    <Text class="label">
      {{ texts.updatesLabel }}
    </Text>
    <br>

    <Switch
      size="small"
      :checked="settings.mods"
      @click="settings.mods = !settings.mods"
    />
    <Text class="label">
      {{ texts.modsLabel }}
    </Text>
    <br>

    <Switch
      size="small"
      :checked="settings.advancedMode"
      @click="settings.advancedMode = !settings.advancedMode"
    />
    <Text class="label">
      {{ texts.advancedModeLabel }}
    </Text>
  </div>
</template>

<script lang='ts' setup>
import { Switch, Typography } from 'ant-design-vue'
import { reactive, watch } from 'vue'

import texts from './texts'

import { Config, ProgramWindow } from '/mods/renderer'
import { Language } from '/rend/components'
import { useWindowReady } from '/rend/utils'

const { Text } = Typography
useWindowReady(ProgramWindow.settings)

const settings = reactive({
  updates: Config.checkUpdates,
  mods: Config.useMods,
  advancedMode: Config.advancedMode
})

watch(settings, () => {
  Config.set({
    checkUpdates: settings.updates,
    useMods: settings.mods,
    advancedMode: settings.advancedMode
  })
})
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
