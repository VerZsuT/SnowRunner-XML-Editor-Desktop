import { Localization, LocalizationStrings } from '@localization'
import { loadLocalization } from '@localization/renderer'

export default loadLocalization(new Localization({
  /** Заголовок. */
  title: new LocalizationStrings()
    .ru('Настройки')
    .en('Settings')
    .de('Einstellungen')
    .ch('设置'),

  dlcLabel: new LocalizationStrings()
    .ru('Редактировать DLC')
    .en('Edit DLC')
    .de('DLC bearbeiten')
    .ch('编辑DLC'),

  modsLabel: new LocalizationStrings()
    .ru('Редактировать модификации')
    .en('Edit Modifications')
    .de('Änderungen bearbeiten')
    .ch('编辑修改'),

  updatesLabel: new LocalizationStrings()
    .ru('Обновлять программу')
    .en('Update the program')
    .de('Aktualisieren Sie das Programm')
    .ch('更新方案'),

  advancedModeLabel: new LocalizationStrings()
    .ru('Продвинутый режим')
    .en('Advanced Mode')
    .de('Fortgeschrittener Modus')
    .ch('高级模式'),

  optimizeUnpackLabel: new LocalizationStrings()
    .ru('Оптимизировать распаковку')
    .en('Optimize unpacking')
    .de('Auspacken optimieren')
    .ch('优化解包'),

  optimizeUnpackTip: new LocalizationStrings()
    .ru('Распаковать только определённые файлы из DLC')
    .en('Extract only certain files from DLC')
    .de('Nur bestimmte Dateien aus dem DLC entpacken')
    .ch('仅从DLC中提取某些文件'),

  saveButton: new LocalizationStrings()
    .ru('Сохранить')
    .en('Save')
    .de('Datei')
    .ch('保存')
}))
