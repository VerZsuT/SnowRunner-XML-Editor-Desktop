import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export default localize({
  ok: {
    [Lang.ru]: 'Ок',
    [Lang.en]: 'Ok',
    [Lang.de]: 'Ok',
    [Lang.ch]: '确认'
  },
  cancel: {
    [Lang.ru]: 'Отменить',
    [Lang.en]: 'Cancel',
    [Lang.de]: 'Stornieren',
    [Lang.ch]: '取消'
  },
  savingMessage: {
    [Lang.ru]: 'Сохранение...',
    [Lang.en]: 'Saving...',
    [Lang.de]: 'Speichern...',
    [Lang.ch]: '保存中'
  },
  export: {
    [Lang.ru]: 'Экспорт',
    [Lang.en]: 'Export',
    [Lang.de]: 'Export',
    [Lang.ch]: '导出'
  },
  saveButton: {
    [Lang.ru]: 'Сохранить',
    [Lang.en]: 'Save',
    [Lang.de]: 'Datei',
    [Lang.ch]: '保存'
  },
  resetMenuItemLabel: {
    [Lang.ru]: 'Сбросить',
    [Lang.en]: 'Reset',
    [Lang.de]: 'Zurücksetzen',
    [Lang.ch]: '重置'
  },
  successSaveFiles: {
    [Lang.ru]: 'Сохранено',
    [Lang.en]: 'Saved',
    [Lang.de]: 'Gespeichert',
    [Lang.ch]: '保存成功'
  },
  successReset: {
    [Lang.ru]: 'Параметры были сброшены. Не забудьте сохранить изменения',
    [Lang.en]: 'Parameters have been reset',
    [Lang.de]: 'Parameter wurden zurückgesetzt',
    [Lang.ch]: '参数已被重置'
  },
  resetConfirmMessage: {
    [Lang.ru]: 'Вы действительно хотите сбросить все параметры до исходных?',
    [Lang.en]: 'Do you really want to reset all the parameters to the original ones?',
    [Lang.de]: 'Möchten Sie wirklich alle Einstellungen auf die ursprünglichen zurücksetzen?',
    [Lang.ch]: '你真的想把所有的参数重设为原来的设置吗？'
  },
  wasExported: {
    [Lang.ru]: 'Параметры экспортированы',
    [Lang.en]: 'The parameters are exported.',
    [Lang.de]: 'Die Einstellungen wurden exportiert.',
    [Lang.ch]: '输出的参数'
  },
  wasImported: {
    [Lang.ru]: 'Параметры импортированы. Не забудьте сохранить изменения!',
    [Lang.en]: 'The parameters are imported. Don\'t forget to save the changes!',
    [Lang.de]: 'Einstellungen importiert. Vergessen Sie nicht, die Änderungen zu speichern!',
    [Lang.ch]: '参数已被导入。记住要保存你的修改!'
  },
  procFileError: {
    [Lang.ru]: 'Не удалось определить файл. Скорее всего в файле ошибка.',
    [Lang.en]: 'Failed to load file. Most likely there is an error in the file.',
    [Lang.de]: 'Datei konnte nicht gefunden werden. Höchstwahrscheinlich liegt ein Fehler in der Datei vor.',
    [Lang.ch]: '该文件无法被识别。文件中一定有一个错误。'
  },
  pathToSaveNotFound: {
    [Lang.ru]: 'Не указан путь для экспорта.',
    [Lang.en]: 'The export path is not specified.',
    [Lang.de]: 'Es wurde kein Exportpfad angegeben.',
    [Lang.ch]: '没有指定输出的路径。'
  },
  paramsFileNotFound: {
    [Lang.ru]: 'Файл для импорта не выбран.',
    [Lang.en]: 'The file for import is not selected.',
    [Lang.de]: 'Die zu importierende Datei ist nicht ausgewählt.',
    [Lang.ch]: '没有选择要导入的文件。'
  },
  breakImportInvalidName: {
    [Lang.ru]: 'Невозможно импортировать параметры. Не найдены параметры для файла %file.',
    [Lang.en]: 'Parameters cannot be imported. No parameters found for %file.',
    [Lang.de]: 'Parameter können nicht importiert werden. Keine Optionen für die Datei %file gefunden.',
    [Lang.ch]: '无法导入参数。没有找到%file的参数。'
  },
  import: {
    [Lang.ru]: 'Импорт',
    [Lang.en]: 'Import',
    [Lang.de]: 'Import',
    [Lang.ch]: '导入'
  },
  actionsMenu: {
    [Lang.ru]: 'Дополнительно',
    [Lang.en]: 'Additionally',
    [Lang.de]: 'zusätzlich',
    [Lang.ch]: '锦上添花'
  },
  error: {
    [Lang.ru]: 'Ошибка',
    [Lang.en]: 'Error',
    [Lang.de]: 'Fehler',
    [Lang.ch]: '误差'
  }
})
