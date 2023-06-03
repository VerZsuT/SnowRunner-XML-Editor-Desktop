import type KeyEventName from './KeyEventName'

export default interface ISetHotKeyParams {
  key: string
  eventName?: KeyEventName
  ctrlKey?: boolean
  shiftKey?: boolean
  prevent?: boolean
}
