import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  /** Заголовок. */
  title: new BaseLocalization()
    .ru('Настройки')
    .en('Settings')
    .de('Einstellungen')
    .ch('设置'),

  dlcLabel: new BaseLocalization()
    .ru('Редактировать DLC')
    .en('Edit DLC')
    .de('DLC bearbeiten')
    .ch('编辑DLC'),

  modsLabel: new BaseLocalization()
    .ru('Редактировать модификации')
    .en('Edit Modifications')
    .de('Änderungen bearbeiten')
    .ch('编辑修改'),

  updatesLabel: new BaseLocalization()
    .ru('Обновлять программу')
    .en('Update the program')
    .de('Aktualisieren Sie das Programm')
    .ch('更新方案'),

  advancedModeLabel: new BaseLocalization()
    .ru('Продвинутый режим')
    .en('Advanced Mode')
    .de('Fortgeschrittener Modus')
    .ch('高级模式'),
  
  optimizeUnpackLabel: new BaseLocalization()
    .ru('Оптимизировать распаковку')
    .en('Optimize unpacking')
    .de('Auspacken optimieren')
    .ch('优化解包'),

  optimizeUnpackTip: new BaseLocalization()
    .ru('Распаковать только определённые файлы из DLC')
    .en('Extract only certain files from DLC')
    .de('Nur bestimmte Dateien aus dem DLC entpacken')
    .ch('仅从DLC中提取某些文件'),
    
  saveButton: new BaseLocalization()
    .ru('Сохранить')
    .en('Save')
    .de('Datei')
    .ch('保存')
}).loadRenderer()
