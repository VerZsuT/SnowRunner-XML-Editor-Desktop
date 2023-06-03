import type DialogProperties from './DialogProperties'

import type { DialogSourceType, DialogType } from '#g/enums'

export default interface IOpenDialogParams {
  type?: DialogType
  source?: DialogSourceType
  extention?: string
  defaultPath?: string
  properties?: DialogProperties
}
