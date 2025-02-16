/** Массив изменённых файлов. */
export interface IEditedFile {
  /** Имя файла. */
  name: string

  /** Является ли файл трейлером. */
  isTrailer?: boolean

  /** Название DLC, к которому относится файл. */
  dlc?: string

  /** Название мода, к которому относится файл. */
  mod?: string
}
