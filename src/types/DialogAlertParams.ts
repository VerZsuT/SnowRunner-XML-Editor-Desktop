import type {DialogAlertType} from 'enums'

export interface DialogAlertParams {
    title: string
    message: string
    dialogType?: DialogAlertType
    type?: string
    noLink?: boolean
    buttons?: string[]
}
