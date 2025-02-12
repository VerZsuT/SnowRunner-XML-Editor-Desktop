import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  ok: new BaseLocalization()
    .ru('Ок')
    .en('Ok')
    .de('Ok')
    .ch('确认'),

  cancel: new BaseLocalization()
    .ru('Отменить')
    .en('Cancel')
    .de('Stornieren')
    .ch('取消'),

  savingMessage: new BaseLocalization()
    .ru('Сохранение...')
    .en('Saving...')
    .de('Speichern...')
    .ch('保存中'),

  export: new BaseLocalization()
    .ru('Экспорт')
    .en('Export')
    .de('Export')
    .ch('导出'),

  saveButton: new BaseLocalization()
    .ru('Сохранить')
    .en('Save')
    .de('Datei')
    .ch('保存'),

  resetMenuItemLabel: new BaseLocalization()
    .ru('Сбросить')
    .en('Reset')
    .de('Zurücksetzen')
    .ch('重置'),

  successSaveFiles: new BaseLocalization()
    .ru('Сохранено')
    .en('Saved')
    .de('Gespeichert')
    .ch('保存成功'),

  successReset: new BaseLocalization()
    .ru('Параметры были сброшены. Не забудьте сохранить изменения')
    .en('Parameters have been reset')
    .de('Parameter wurden zurückgesetzt')
    .ch('参数已被重置'),

  resetConfirmMessage: new BaseLocalization()
    .ru('Вы действительно хотите сбросить все параметры до исходных?')
    .en('Do you really want to reset all the parameters to the original ones?')
    .de('Möchten Sie wirklich alle Einstellungen auf die ursprünglichen zurücksetzen?')
    .ch('你真的想把所有的参数重设为原来的,设置吗？'),

  wasExported: new BaseLocalization()
    .ru('Параметры экспортированы')
    .en('The parameters are exported.')
    .de('Die Einstellungen wurden exportiert.')
    .ch('输出的参数'),

  wasImported: new BaseLocalization()
    .ru('Параметры импортированы. Не забудьте сохранить изменения!')
    .en('The parameters are imported. Don\'t forget to save the changes!')
    .de('Einstellungen importiert. Vergessen Sie nicht, die Änderungen zu speichern!')
    .ch('参数已被导入。记住要保存,你的修改!'),

  procFileError: new BaseLocalization()
    .ru('Не удалось определить файл. Скорее всего в файле ошибка.')
    .en('Failed to load file. Most likely there is an error in the file.')
    .de('Datei konnte nicht gefunden werden. Höchstwahrscheinlich liegt ein Fehler in der Datei vor.')
    .ch('该文件无法被识别。文件中一,定有一个错误。'),

  pathToSaveNotFound: new BaseLocalization()
    .ru('Не указан путь для экспорта.')
    .en('The export path is not specified.')
    .de('Es wurde kein Exportpfad angegeben.')
    .ch('没有指定输出的路径。'),

  paramsFileNotFound: new BaseLocalization()
    .ru('Файл для импорта не выбран.')
    .en('The file for import is not selected.')
    .de('Die zu importierende Datei ist nicht ausgewählt.')
    .ch('没有选择要导入的文件。'),

  breakImportInvalidName: new BaseLocalization()
    .ru('Невозможно импортировать параметры. Не найдены параметры для файла %file.')
    .en('Parameters cannot be imported. No parameters found for %file.')
    .de('Parameter können nicht importiert werden. Keine Optionen für die Datei %file gefunden.')
    .ch('无法导入参数。没有找到%file的参数。'),

  import: new BaseLocalization()
    .ru('Импорт')
    .en('Import')
    .de('Import')
    .ch('导入'),

  actionsMenu: new BaseLocalization()
    .ru('Дополнительно')
    .en('Additionally')
    .de('zusätzlich')
    .ch('锦上添花'),
    
  error: new BaseLocalization()
    .ru('Ошибка')
    .en('Error')
    .de('Fehler')
    .ch('误差'),

  inputMin: new BaseLocalization()
    .ru('Минимум: {}')
    .en('Minimum: {}')
    .de('Minimum: {}')
    .ch('最低限额: {}'),
  
  inputMax: new BaseLocalization()
    .ru('Максимум: {}')
    .en('Maximum: {}')
    .de('Maximum: {}')
    .ch('最大值: {}'),

  inputDefault: new BaseLocalization()
    .ru('По умолчанию: {}')
    .en('Default: {}')
    .de('Stillschweigend: {}')
    .ch('默认情况下: {}'),

  inputRedArea: new BaseLocalization()
    .ru('Красная зона: {}')
    .en('Red zone: {}')
    .de('Rote Zone: {}')
    .ch('红色区域: {}'),

  inputYellowArea: new BaseLocalization()
    .ru('Жёлтая зона: {}')
    .en('Yellow zone: {}')
    .de('Gelbe Zone: {}')
    .ch('黄色区域: {}'),

  inputGreenArea: new BaseLocalization()
    .ru('Зелёная зона: {}')
    .en('Green zone: {}')
    .de('Grüne Zone: {}')
    .ch('绿色地带: {}')
}).loadRenderer()
