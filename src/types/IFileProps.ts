import type { FileType } from '#enums'

/** Параметры включаемого файла. */
interface IFileProps {
  attribute: string
  selector?: string
  /** Тип включаемого файла. */
  type: FileType
}

export default IFileProps
