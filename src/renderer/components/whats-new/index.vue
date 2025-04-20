<template>
  <Modal
    v-model:open="isOpen"
    :title="`${texts.whatsNewTitle} ${PROGRAM_VERSION}`"
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
import { Button, Modal } from 'ant-design-vue'
import { computed } from 'vue'
import texts from './texts'
import VersionInfo from './version-info.vue'
import { PROGRAM_VERSION } from '/consts'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Открыто ли модальное окно. */
const isOpen = defineModel<boolean>({ required: true })
const info = computed(() => new BaseLocalization<string[]>()
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
  .get(Config)
)
</script>

<style lang='scss' scoped>
.container {
  overflow: auto;
  background-color: white;
}
</style>
