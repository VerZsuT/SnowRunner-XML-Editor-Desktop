import type {DialogProperties} from './DialogProperties'

export interface DialogParams {
    properties?: DialogProperties
    filters?: {
        name: string
        extensions: string[]
    }[]
}
