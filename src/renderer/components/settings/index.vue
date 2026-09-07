<template>
  <Modal
    v-model:open="isOpen"
    width="fit-content"
    :title="texts.title"
  >
    <div class="settings">
      <Language />
    
      <div class="checkboxes">
        <BoolSetting
          v-model="updates"
          :label="texts.updatesLabel"
        />
        <BoolSetting
          v-model="mods"
          :label="texts.modsLabel"
        />
        <BoolSetting
          v-model="optimizeUnpack"
          :label="texts.optimizeUnpackLabel"
          :tip="texts.optimizeUnpackTip"
        />
        <BoolSetting
          v-model="advanced"
          :label="texts.advancedModeLabel"
        />
      </div>
    </div>

    <template #footer>
      <Button
        key="submit"
        type="primary"
        @click="isOpen = false"
      >
        Ok
      </Button>
    </template>
  </Modal>
</template>

<script setup lang="ts">
import { Language } from '@renderer/components/language'
import { di } from '@utilities/di/container.js'
import { CONFIG_TOKEN } from '@utilities/di/renderer/tokens.js'
import { Button, Modal } from 'ant-design-vue'
import { ref, watch } from 'vue'
import BoolSetting from './bool-setting.vue'
import { SETTINGS_LOCALIZATION as texts } from './localization.js'

const config = di.resolve(CONFIG_TOKEN)
const updates = ref(config.checkUpdates)
const mods = ref(config.useMods)
const advanced = ref(config.advancedMode)
const optimizeUnpack = ref(config.optimizeUnpack)

watch(updates, () => config.checkUpdates = updates.value)
watch(mods, () => config.useMods = mods.value)
watch(advanced, () => config.advancedMode = advanced.value)
watch(optimizeUnpack, () => config.optimizeUnpack = optimizeUnpack.value)

/** Открыты ли настройки. */
const isOpen = defineModel<boolean>({ required: true })
</script>

<style lang='scss' scoped>
.settings {
  text-align: center;
  margin: 0 50px;

  .checkboxes {
    margin: 10px auto;
    text-align: left;
    width: fit-content;
  }
}
</style>
