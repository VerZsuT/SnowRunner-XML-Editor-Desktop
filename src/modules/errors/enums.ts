const postfix = '\nError: {lst}'

/** Тексты ошибок программы */
export enum ErrorText {
  /**
   * Ошибка исполнения команды WinRAR  
   * Параметры:  
   * 1. Исполняемая команда
   */
  winRarCommandError = `Error on run WinRar command "{}".${postfix}`,

  /**
   * Ошибка чтения файла  
   * Параметры:  
   * 1. Путь к файлу
   */
  readFileError = `Error on reading file "{}".${postfix}`,
  /**
   * Ошибка записи файла  
   * Параметры:  
   * 1. Путь к файлу
   */
  writeFileError = `Error on writing file "{}".${postfix}`,
  /**
   * Ошибка исполнения файла  
   * Параметры:  
   * 1. Путь к файлу
   */
  executeFileError = `Error on executing file "{}".${postfix}`,
  /**
   * Ошибка копирования файла  
   * Параметры:  
   * 1. Изначальный путь  
   * 2. Конечный путь
   */
  copyFileError = `Error on coping file "{}" to "{}".${postfix}`,
  /**
   * Ошибка создания папки  
   * Параметры:  
   * 1. Путь создания
   */
  makeFileError = `Error on making file "{}".${postfix}`,

  /**
   * Ошибка удаления  
   * Параметры:  
   * 1. Путь к файлу/папке
   */
  removeError = `Error on removing "{}".${postfix}`,
  /**
   * Ошибка перемещения  
   * Параметры:  
   * 1. Изначальный путь  
   * 2. Конечный путь
   */
  moveError = `Error on moving "{}" to "{}".${postfix}`,
  /**
   * Ошибка переименования  
   * Параметры:  
   * 1. Изначальный путь  
   * 2. Конечный путь
   */
  renameError = `Error on renaming "{}" to "{}".${postfix}`,

  /**
   * Ошибка наличия папки  
   * Параметры:  
   * 1. Путь к папке
  */
  dirNotFound = `Directory "{}" not found.${postfix}`,
  /**
   * Ошибка создания папки  
   * Параметры:  
   * 1. Путь создания
   */
  makeDirError = `Error on making directory "{}".${postfix}`,
  /**
   * Ошибка чтения папки  
   * Параметры:  
   * 1. Путь к папке
   */
  readDirError = `Error on reading directory "{}".${postfix}`,
  /**
   * Ошибка записи папки  
   * Параметры:  
   * 1. Путь к папке
   */
  writeDirError = `Error on writing into directory "{}".${postfix}`,

  /**
   * Ошибка сохранения конфигурации  
   * Параметры: нет
   */
  saveConfigError = `Saving configuration error.${postfix}`,
  /**
   * Ошибка подключения к GitHub  
   * Параметры: нет
   */
  gitHubConnectError = `Error on connecting to GitHub for check updates.${postfix}`
}
