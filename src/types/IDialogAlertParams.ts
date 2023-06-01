import type { MessageBoxSyncOptions } from 'electron'

import type { DialogAlertType } from '#g/enums'

interface IDialogAlertParams {
  title: string
  message: string
  dialogType?: DialogAlertType
  type?: MessageBoxSyncOptions['type']
  noLink?: boolean
  buttons?: string[]
}

export default IDialogAlertParams
