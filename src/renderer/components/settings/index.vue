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
import { Button, Modal } from 'ant-design-vue'
import { ref, watch } from 'vue'
import BoolSetting from './bool-setting.vue'
import texts from './texts'
import { Config } from '/mods/renderer'
import { Language } from '/rend/components'

const updates = ref(Config.checkUpdates)
const mods = ref(Config.useMods)
const advanced = ref(Config.advancedMode)
const optimizeUnpack = ref(Config.optimizeUnpack)

watch(updates, () => Config.checkUpdates = updates.value)
watch(mods, () => Config.useMods = mods.value)
watch(advanced, () => Config.advancedMode = advanced.value)
watch(optimizeUnpack, () => Config.optimizeUnpack = optimizeUnpack.value)

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
