import type { MainEvent, RendererEvent } from 'emr-bridge'

import type Edited from './main'
import type { EditedFile } from './types'

export enum PubKeys {
  array = 'edited/obj',
  reset = 'edited/reset',
  save = 'edited/save',
  mainChangeEvent = '-edited/main-change-event',
  rendererChangeEvent = '-edited/renderer-change-event',
  onMainChange = `on${PubKeys.mainChangeEvent}`,
  onRendererChange = `on${PubKeys.rendererChangeEvent}`
}

export type PubType = {
  [PubKeys.array]: EditedFile[]
  [PubKeys.reset]: typeof Edited.reset
  [PubKeys.save]: typeof Edited.save
  [PubKeys.onMainChange]: MainEvent<EditedFile[]>
  [PubKeys.rendererChangeEvent]: RendererEvent<EditedFile[]>
}
