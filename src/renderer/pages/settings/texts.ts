import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  dlcLabel: new Localization()
    .ru('Редактировать DLC')
    .en('Edit DLC')
    .de('DLC bearbeiten')
    .ch('编辑DLC'),
  modsLabel: new Localization()
    .ru('Редактировать модификации')
    .en('Edit Modifications')
    .de('Änderungen bearbeiten')
    .ch('编辑修改'),
  updatesLabel: new Localization()
    .ru('Обновлять программу')
    .en('Update the program')
    .de('Aktualisieren Sie das Programm')
    .ch('更新方案'),
  advancedModeLabel: new Localization()
    .ru('Продвинутый режим')
    .en('Advanced Mode')
    .de('Fortgeschrittener Modus')
    .ch('高级模式'),
  saveButton: new Localization()
    .ru('Сохранить')
    .en('Save')
    .de('Datei')
    .ch('保存')
}).get()
