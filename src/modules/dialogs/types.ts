import type { MessageBoxSyncOptions } from 'electron'
import type { DialogSourceType, DialogType } from './enums'

/** Параметры диалогового окна. */
export type DialogProps = Array<'openFile' | 'openDirectory' | 'multiSelections'>

export interface IDialogAlertParams {
  title: string
  message: string
  type?: MessageBoxSyncOptions['type']
  noLink?: boolean
  buttons?: string[]
}

export interface IDialogParams {
  properties?: DialogProps
  filters?: {
    name: string
    extensions: string[]
  }[]
}

export interface IOpenDialogParams {
  type?: DialogType
  source?: DialogSourceType
  extention?: string
  defaultPath?: string
  properties?: DialogProps
}
