/** Тексты ошибок программы. */
export enum ErrorText {
  /**
   * Ошибка исполнения команды WinRAR.  
   * 1. Исполняемая команда.
   */
  winRarCommandError = 'Error on run WinRar command "{}"',

  /**
   * Ошибка чтения файла.  
   * 1. Путь к файлу.
   */
  readFileError = 'Error on reading file "{}"',

  /**
   * Ошибка записи файла.  
   * 1. Путь к файлу.
   */
  writeFileError = 'Error on writing file "{}"',

  /**
   * Ошибка исполнения файла.  
   * 1. Путь к файлу.
   */
  executeFileError = 'Error on executing file "{}"',

  /**
   * Ошибка копирования файла.  
   * 1. Изначальный путь.  
   * 2. Конечный путь.
   */
  copyFileError = 'Error on coping file "{}" to "{}"',

  /**
   * Ошибка создания папки.  
   * 1. Путь создания.
   */
  makeFileError = 'Error on making file "{}"',

  /**
   * Ошибка удаления.  
   * 1. Путь к файлу/папке.
   */
  removeError = 'Error on removing "{}"',

  /**
   * Ошибка перемещения.  
   * 1. Изначальный путь.  
   * 2. Конечный путь.
   */
  moveError = 'Error on moving "{}" to "{}"',

  /**
   * Ошибка переименования.  
   * 1. Изначальный путь.  
   * 2. Конечный путь.
   */
  renameError = 'Error on renaming "{}" to "{}"',

  /**
   * Ошибка наличия папки.  
   * 1. Путь к папке.
  */
  dirNotFound = 'Directory "{}" not found',

  /**
   * Ошибка создания папки.  
   * 1. Путь создания.
   */
  makeDirError = 'Error on making directory "{}"',

  /**
   * Ошибка чтения папки.  
   * 1. Путь к папке.
   */
  readDirError = 'Error on reading directory "{}"',

  /**
   * Ошибка записи папки.  
   * 1. Путь к папке.
   */
  writeDirError = 'Error on writing into directory "{}"',

  /** Ошибка сохранения конфигурации. */
  saveConfigError = 'Saving configuration error',

  /** Ошибка подключения к GitHub. */
  gitHubConnectError = 'Error on connecting to GitHub for check updates'
}
