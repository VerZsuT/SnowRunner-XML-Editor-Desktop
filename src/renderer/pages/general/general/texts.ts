import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  export: new BaseLocalization()
    .ru('Экспорт')
    .en('Export')
    .de('Export')
    .ch('导出'),

  exported: new BaseLocalization()
    .ru('Экспортировано')
    .en('Exported')
    .de('Exportiert')
    .ch('出口'),

  exportError: new BaseLocalization()
    .ru('Ошибка экспорта')
    .en('Export error')
    .de('Fehler beim Exportieren')
    .ch('导出错误'),

  import: new BaseLocalization()
    .ru('Импорт')
    .en('Import')
    .de('Import')
    .ch('导入'),

  restoreInitialChanges: new BaseLocalization()
    .ru('Обнаружено обновление initial.pak, применить предыдущие изменения?')
    .en('Initial.pak update detected, apply previous changes?')
    .de('Ein initial-Update wurde gefunden.pak, übernehmen Sie die vorherigen Änderungen?')
    .ch('initial.pak更新检测到，应用以前的更改？'),
    
  recovery: new BaseLocalization()
    .ru('Восстановление')
    .en('Recovery')
    .de('Wiederherstellung')
    .ch('复苏'),

  loading: new BaseLocalization()
    .ru('Загрузка')
    .en('Loading')
    .de('Herunterladen')
    .ch('加载')
}).loadRenderer()
