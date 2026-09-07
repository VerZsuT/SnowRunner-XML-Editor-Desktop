<template>
  <Modal
    v-model:open="isOpen"
    :title="`${texts.whatsNewTitle} ${appConstants.VERSION}`"
  >
    <div class="container">
      <VersionInfo :changes="info" />
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

<script lang='ts' setup>
import { LocalizationStrings } from '@localization'
import { di } from '@utilities/di/container'
import { APP_CONSTANTS_TOKEN, CONFIG_TOKEN } from '@utilities/di/renderer/tokens'
import { Button, Modal } from 'ant-design-vue'
import { computed } from 'vue'
import { WHATS_NEW_LOCALIZATION as texts } from './localization'
import VersionInfo from './version-info.vue'

const config = di.resolve(CONFIG_TOKEN)
const appConstants = di.resolve(APP_CONSTANTS_TOKEN)

/** Открыто ли модальное окно. */
const isOpen = defineModel<boolean>({ required: true })
const info = computed(() => new LocalizationStrings<string[]>()
  .ru([
    'Обновлены компоненты программы',
    'Добавлены картинки новых авто',
    'Обновлены стандартные параметры'
  ])
  .en([
    'Updated program components',
    'Added pictures of new cars',
    'Standard parameters have been updated'
  ])
  .de([
    'Programmkomponenten wurden aktualisiert',
    'Neue Autobilder hinzugefügt',
    'Standardeinstellungen wurden aktualisiert'
  ])
  .ch([
    '更新的程序组件',
    '新增新车图片',
    '标准参数已更新'
  ])
  .get(config)
)
</script>

<style lang='scss' scoped>
.container {
  overflow: auto;
  background-color: white;
}
</style>
