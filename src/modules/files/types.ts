/** Результат проверки на чтение/запись */
export interface ICheckResult {
  /** Успешно или нет */
  result: boolean
  /** Ошибка (если имеется) */
  error?: string
}

/** Аргументы поиска файлов в папке */
export interface IFindFilesArgs {
  /** По расширению файла */
  ext?: string
  /** По имени */
  name?: string
  /** Рекурсивный поиск */
  recursive?: boolean
}

/** Аргументы поиска папок в папке */
export interface IFindDirsArgs {
  /** По имени */
  name: string
  /** Рекурсивный поиск */
  recursive?: boolean
}
