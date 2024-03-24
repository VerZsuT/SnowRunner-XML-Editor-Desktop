import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  export: new Localization()
    .ru('Экспорт')
    .en('Export')
    .de('Export')
    .ch('导出'),
  import: new Localization()
    .ru('Импорт')
    .en('Import')
    .de('Import')
    .ch('导入'),
  restoreInitialChanges: new Localization()
    .ru('Обнаружено обновление initial.pak, применить предыдущие изменения?')
    .en('Initial.pak update detected, apply previous changes?')
    .de('Ein initial-Update wurde gefunden.pak, übernehmen Sie die vorherigen Änderungen?')
    .ch('initial.pak更新检测到，应用以前的更改？'),
  recovery: new Localization()
    .ru('Восстановление')
    .en('Recovery')
    .de('Wiederherstellung')
    .ch('复苏')
}).get()
