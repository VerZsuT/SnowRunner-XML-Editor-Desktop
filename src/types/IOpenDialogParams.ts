import type DialogProperties from './DialogProperties'

import type { DialogSourceType, DialogType } from '#g/enums'

interface IOpenDialogParams {
  type?: DialogType
  source?: DialogSourceType
  extention?: string
  defaultPath?: string
  properties?: DialogProperties
}

export default IOpenDialogParams
