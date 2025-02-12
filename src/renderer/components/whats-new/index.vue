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

const isOpen = defineModel<boolean>({ required: true })

// TEXT version info
const info = computed(() => new BaseLocalization<string[]>()
  .ru([
    'Обновлены компоненты программы',
    'Улучшена оптимизация',
    'Добавлены картинки новых авто',
    'Добавлены описания ограничений полей при наведении',
    'Добавлены фильтры по типу авто',
    'Исправлен баг со списком файлов открытого авто',
    'Исправлено определение системного языка',
    'Обновлены стандартные параметры',
    'Изменён приоритет поиска файлов из DLC',
    'Теперь вся работа в программе в одном окне'
  ])
  .en([
    'Updated program components',
    'Improved optimization',
    'Added pictures of new cars',
    'Added descriptions of hover field restrictions',
    'Added filters by car type',
    'Fixed a bug with a list of open auto files',
    'Fixed system language definition',
    'Standard parameters have been updated',
    'The priority of searching for files from DLC has been changed',
    'Now all the work in the program is in one window'
  ])
  .de([
    'Programmkomponenten wurden aktualisiert',
    'Optimierung wurde verbessert',
    'Neue Autobilder hinzugefügt',
    'Standardeinstellungen wurden aktualisiert',
    'Fehler mit der Liste der geöffneten Autodateien behoben',
    'Definition der Systemsprache wurde korrigiert',
    'Jetzt ist die gesamte Arbeit im Programm in einem einzigen Fenster',
    'Beschreibungen für Schwebefeldeinschränkungen hinzugefügt',
    'Priorität für die Suche nach Dateien aus dem DLC wurde geändert',
    'Es wurden Filter nach Autotyp hinzugefügt'
  ])
  .ch([
    '更新的程序组件',
    '改进的优化',
    '新增新车图片',
    '标准参数已更新',
    '修正了一个打开的自动文件列表的错误',
    '固定系统语言定义',
    '现在程序中的所有工作都在一个窗口中',
    '添加了悬停字段限制的描述',
    '从DLC中搜索文件的优先级已更改',
    '按车型增加过滤器'
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
