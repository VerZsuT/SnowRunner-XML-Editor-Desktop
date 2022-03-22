import type FileType from '../enums/FileType'

/** Параметры включаемого файла. */
type FileProps = {
    attribute: string
    selector?: string
    /** Тип включаемого файла. */
    type: FileType
}

export default FileProps
