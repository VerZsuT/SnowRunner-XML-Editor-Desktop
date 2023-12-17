import type { MainEvent, RendererEvent } from 'emr-bridge'

import type Edited from './main'
import type { EditedFile } from './types'

export enum Keys {
  array = 'edited.obj',
  reset = 'edited.reset',
  save = 'edited.save',
  mainChangeEvent = 'edited.main-change-event',
  onMainChange = 'onEdited.main-change-event',
  rendererChangeEvent = 'edited.renderer-change-event',
  onRendererChange = 'onEdited.renderer-change-event'
}

export interface IPublic {
  [Keys.array]: EditedFile[]
  [Keys.reset]: typeof Edited.reset
  [Keys.save]: typeof Edited.save
  [Keys.onMainChange]: MainEvent<EditedFile[]>
  [Keys.rendererChangeEvent]: RendererEvent<EditedFile[]>
}
