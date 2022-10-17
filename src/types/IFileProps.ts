import type { FileType } from '#enums'

/** Параметры включаемого файла. */
export interface IFileProps {
  attribute: string
  selector?: string
  /** Тип включаемого файла. */
  type: FileType
}
