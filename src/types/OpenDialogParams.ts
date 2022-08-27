import type {DialogSourceType, DialogType} from 'enums'

import type {DialogProperties} from './DialogProperties'

export interface OpenDialogParams {
    type?: DialogType
    source?: DialogSourceType
    extention?: string
    defaultPath?: string
    properties?: DialogProperties
}
