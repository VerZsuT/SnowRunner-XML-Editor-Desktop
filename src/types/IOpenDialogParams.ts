import type { DialogProperties } from './DialogProperties'

import type { DialogSourceType, DialogType } from '#enums'

export interface IOpenDialogParams {
  type?: DialogType
  source?: DialogSourceType
  extention?: string
  defaultPath?: string
  properties?: DialogProperties
}
