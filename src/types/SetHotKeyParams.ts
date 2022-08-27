import type {KeyEventName} from './KeyEventName'

export interface SetHotKeyParams {
    key: string
    eventName?: KeyEventName
    ctrlKey?: boolean
    shiftKey?: boolean
    prevent?: boolean
}
