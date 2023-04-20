import type { DialogAlertType } from '#g/enums'

interface IDialogAlertParams {
  title: string
  message: string
  dialogType?: DialogAlertType
  type?: string
  noLink?: boolean
  buttons?: string[]
}

export default IDialogAlertParams
