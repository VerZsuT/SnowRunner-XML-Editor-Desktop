import type DialogProperties from './DialogProperties'

export default interface IDialogParams {
  properties?: DialogProperties
  filters?: {
    name: string
    extensions: string[]
  }[]
}
