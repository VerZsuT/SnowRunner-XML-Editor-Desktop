import { compareWithGlobal } from '#g/texts/renderer'

const $ = compareWithGlobal({
  RU: {
    SAVING_MESSAGE: 'Сохранение...',
    SUCCESS_SAVE_FILES: 'Сохранено',
    SUCCESS_RESET: 'Параметры были сброшены',
    RESET_CONFIRM_MESSAGE: 'Вы действительно хотите сбросить все параметры до исходных?',
    WAS_EXPORTED: 'Параметры экспортированы',
    WAS_IMPORTED: 'Параметры импортированы. Не забудьте сохранить изменения!',
    PROC_FILE_ERROR: 'Не удалось определить файл. Скорее всего в файле ошибка.',
    PATH_TO_SAVE_NOT_FOUND: 'Не указан путь для экспорта.',
    PARAMS_FILE_NOT_FOUND: 'Файл для импорта не выбран.',
    BREAK_IMPORT_INVALID_NAME: 'Невозможно импортировать параметры. Не найдены параметры для файла %file.',
    IMPORT: 'Импорт',
    ACTIONS_MENU: 'Дополнительно'
  },
  EN: {
    SAVING_MESSAGE: 'Saving...',
    SUCCESS_SAVE_FILES: 'Saved',
    SUCCESS_RESET: 'Parameters have been reset',
    RESET_CONFIRM_MESSAGE: 'Do you really want to reset all the parameters to the original ones?',
    WAS_EXPORTED: 'The parameters are exported.',
    WAS_IMPORTED: 'The parameters are imported. Don\'t forget to save the changes!',
    PROC_FILE_ERROR: 'Failed to load file. Most likely there is an error in the file.',
    PATH_TO_SAVE_NOT_FOUND: 'The export path is not specified.',
    PARAMS_FILE_NOT_FOUND: 'The file for import is not selected.',
    BREAK_IMPORT_INVALID_NAME: 'Parameters cannot be imported. No parameters found for %file.',
    IMPORT: 'Import',
    ACTIONS_MENU: 'Additionally'
  },
  DE: {
    SAVING_MESSAGE: 'Speichern...',
    SUCCESS_SAVE_FILES: 'Gespeichert',
    SUCCESS_RESET: 'Parameter wurden zurückgesetzt',
    RESET_CONFIRM_MESSAGE: 'Möchten Sie wirklich alle Einstellungen auf die ursprünglichen zurücksetzen?',
    WAS_EXPORTED: 'Die Einstellungen wurden exportiert.',
    WAS_IMPORTED: 'Einstellungen importiert. Vergessen Sie nicht, die Änderungen zu speichern!',
    PROC_FILE_ERROR: 'Datei konnte nicht gefunden werden. Höchstwahrscheinlich liegt ein Fehler in der Datei vor.',
    PATH_TO_SAVE_NOT_FOUND: 'Es wurde kein Exportpfad angegeben.',
    PARAMS_FILE_NOT_FOUND: 'Die zu importierende Datei ist nicht ausgewählt.',
    BREAK_IMPORT_INVALID_NAME: 'Parameter können nicht importiert werden. Keine Optionen für die Datei %file gefunden.',
    IMPORT: 'Import',
    ACTIONS_MENU: 'zusätzlich'
  },
  CH: {
    SAVING_MESSAGE: '保存中',
    SUCCESS_SAVE_FILES: '保存成功',
    SUCCESS_RESET: '参数已被重置',
    RESET_CONFIRM_MESSAGE: '你真的想把所有的参数重设为原来的设置吗？',
    WAS_EXPORTED: '输出的参数',
    WAS_IMPORTED: '参数已被导入。记住要保存你的修改!',
    PROC_FILE_ERROR: '该文件无法被识别。文件中一定有一个错误。',
    PATH_TO_SAVE_NOT_FOUND: '没有指定输出的路径。',
    PARAMS_FILE_NOT_FOUND: '没有选择要导入的文件。',
    BREAK_IMPORT_INVALID_NAME: '无法导入参数。没有找到%file的参数。',
    IMPORT: '导入',
    ACTIONS_MENU: '锦上添花'
  }
})

export default $
