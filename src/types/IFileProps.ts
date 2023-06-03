import type { FileType } from '#g/enums'

/** Параметры включаемого файла. */
export default interface IFileProps {
  attribute: string
  selector?: string
  /** Тип включаемого файла. */
  type: FileType
}
