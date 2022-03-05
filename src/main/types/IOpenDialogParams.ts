import type DialogSourceType from 'main/enums/DialogSourceType'
import type DialogType from 'main/enums/DialogType'
import type DialogProperties from './DialogProperties'

interface IOpenDialogParams {
    type?: DialogType
    source?: DialogSourceType
    extention?: string
    defaultPath?: string
    properties?: DialogProperties
}

export default IOpenDialogParams
