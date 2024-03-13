/** Тип выбираемого файла в диалоге */
export enum DialogSourceType {
  /** Выбором является файл */
  file = 'file',
  /** Выбором является папка */
  dir = 'dir'
}

/** Тип диалога */
export enum DialogType {
  /** Диалог выбора */
  open = 'open',
  /** Диалог сохранения */
  save = 'save'
}
