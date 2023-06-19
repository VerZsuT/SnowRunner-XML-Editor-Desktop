import type { MessageBoxSyncOptions } from 'electron'

import type { DialogAlertType } from '#g/enums'

export default interface IDialogAlertParams {
  title: string
  message: string
  dialogType?: DialogAlertType
  type?: MessageBoxSyncOptions['type']
  noLink?: boolean
  buttons?: string[]
}
