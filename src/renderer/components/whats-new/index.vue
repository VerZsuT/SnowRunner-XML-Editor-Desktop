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
    'Улучшена оптимизация',
    'Добавлены картинки новых авто',
    'Добавлены описания ограничений полей при наведении',
    'Добавлены фильтры по типу авто',
    'Добавлены кнопки для обновления/распаковки/показа файлов',
    'Добавлен фильтр изменённого',
    'Добавлен общий фильтр источника',
    'Добавлен компактный режим списка',
    'Добавлен параметр названия элементов авто',
    'Добавлен адаптивный вид списка и таблицы для больших экранов',
    'Добавлен множественный бэкап',
    'Добавлена группировка элементов авто по файлам',
    'Добавлена оптимизация распаковки',
    'Добавлена сортировка по алфавиту в списке',
    'Изменены названия элементов подвесок',
    'Изменены названия наборов колёс',
    'Исправлен баг со списком файлов открытого авто',
    'Исправлено определение системного языка',
    'Исправлено определение игровых текстов',
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
    'Added buttons for updating/unpacking/displaying files',
    'Added a modified filter',
    'Added a common source filter',
    'Added compact list mode',
    'Added the auto element name parameter',
    'Added adaptive list and table view for large screens',
    'Added multiple backup',
    'Added grouping of auto elements by files',
    'Added unpacking optimization',
    'Added alphabetical sorting in the list',
    'Changed names of suspension elements',
    'Changed names of the wheel sets',
    'Fixed a bug with the list of open auto files',
    'Fixed system language definition',
    'Updated standard parameters',
    'Changed priority of searching for files from DLC',
    'Now all the work in the program is in one window'
  ])
  .de([
    'Programmkomponenten wurden aktualisiert',
    'Optimierung wurde verbessert',
    'Neue Autobilder hinzugefügt',
    'Beschreibungen für Schwebefeldeinschränkungen hinzugefügt',
    'Filter nach Auto-Typ hinzugefügt',
    'Schaltflächen zum Aktualisieren/Entpacken/Anzeigen von Dateien hinzugefügt',
    'Geänderter Filter hinzugefügt',
    'Gemeinsamer Quellfilter hinzugefügt',
    'Kompakter Listenmodus hinzugefügt',
    'Elementnamen-Option Automatisch hinzugefügt',
    'Adaptive Listen- und Tabellenansicht für große Bildschirme hinzugefügt',
    'Mehrere Sicherungen hinzugefügt',
    'Auto-Elemente nach Dateien gruppieren hinzugefügt',
    'Entpackungsoptimierung hinzugefügt',
    'Alphabetische Sortierung in der Liste hinzugefügt',
    'Namen der Aufhängeelemente geändert',
    'Namen der Radsätze wurden geändert',
    'Fehler mit der Liste der geöffneten Autodateien behoben',
    'Definition der Systemsprache wurde korrigiert',
    'Standardeinstellungen wurden aktualisiert',
    'Priorität für die Suche nach Dateien aus dem DLC wurde geändert',
    'Jetzt ist die gesamte Arbeit im Programm in einem einzigen Fenster'
  ])
  .ch([
    '更新的程序组件',
    '改进优化',
    '新增新车图片',
    '添加了悬停字段限制的描述',
    '按车型增加过滤器',
    '添加了用于更新/解压缩/显示文件的按钮',
    '添加了一个修改过的过滤器',
    '添加了一个公共源过滤器',
    '增加了紧凑列表模式',
    '添加了auto元素名称参数',
    '为大屏幕添加自适应列表和表格视图',
    '添加多个备份',
    '按文件添加自动元素分组',
    '添加解包优化',
    '在列表中添加字母排序',
    '悬挂元件名称已更改',
    '轮组的名称已更改',
    '修复了打开的自动文件列表的错误',
    '固定系统语言定义',
    '标准参数已更新',
    '从DLC中搜索文件的优先级已更改',
    '现在程序中的所有工作都在一个窗口中'
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
