import type { DialogProperties } from './DialogProperties'

export interface IDialogParams {
  properties?: DialogProperties
  filters?: {
    name: string
    extensions: string[]
  }[]
}
