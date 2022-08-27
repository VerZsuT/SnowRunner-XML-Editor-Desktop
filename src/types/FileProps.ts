import type {FileType} from 'enums'

/** Параметры включаемого файла. */
export interface FileProps {
    attribute: string
    selector?: string
    /** Тип включаемого файла. */
    type: FileType
}
