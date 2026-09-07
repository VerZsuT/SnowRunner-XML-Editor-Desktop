import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export const GENERAL_LOCALIZATION = loadLocalization(new Localization({
  export: new LocalizationStrings()
    .ru('Экспорт')
    .en('Export')
    .de('Export')
    .ch('导出'),

  exported: new LocalizationStrings()
    .ru('Экспортировано')
    .en('Exported')
    .de('Exportiert')
    .ch('出口'),

  exportError: new LocalizationStrings()
    .ru('Ошибка экспорта')
    .en('Export error')
    .de('Fehler beim Exportieren')
    .ch('导出错误'),

  import: new LocalizationStrings()
    .ru('Импорт')
    .en('Import')
    .de('Import')
    .ch('导入'),

  restoreInitialChanges: new LocalizationStrings()
    .ru('Обнаружено обновление initial.pak, применить предыдущие изменения?')
    .en('Initial.pak update detected, apply previous changes?')
    .de('Ein initial-Update wurde gefunden.pak, übernehmen Sie die vorherigen Änderungen?')
    .ch('initial.pak更新检测到，应用以前的更改？'),

  recovery: new LocalizationStrings()
    .ru('Восстановление')
    .en('Recovery')
    .de('Wiederherstellung')
    .ch('复苏'),

  loading: new LocalizationStrings()
    .ru('Загрузка')
    .en('Loading')
    .de('Herunterladen')
    .ch('加载')
}))
