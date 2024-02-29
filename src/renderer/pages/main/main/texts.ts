import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export default localize({
  export: {
    [Lang.ru]: 'Экспорт',
    [Lang.en]: 'Export',
    [Lang.de]: 'Export',
    [Lang.ch]: '导出'
  },
  import: {
    [Lang.ru]: 'Импорт',
    [Lang.en]: 'Import',
    [Lang.de]: 'Import',
    [Lang.ch]: '导入'
  },
  restoreInitialChanges: {
    [Lang.ru]: 'Обнаружено обновление initial.pak, применить предыдущие изменения?',
    [Lang.en]: 'Initial.pak update detected, apply previous changes?',
    [Lang.de]: 'Ein initial-Update wurde gefunden.pak, übernehmen Sie die vorherigen Änderungen?',
    [Lang.ch]: 'initial.pak更新检测到，应用以前的更改？'
  },
  recovery: {
    [Lang.ru]: 'Восстановление',
    [Lang.en]: 'Recovery',
    [Lang.de]: 'Wiederherstellung',
    [Lang.ch]: '复苏'
  }
})
