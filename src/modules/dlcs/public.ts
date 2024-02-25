import type { MainEvent, RendererEvent } from 'emr-bridge'

import type DLCs from './main'
import type { IDLC } from './types'

export enum Keys {
  array = 'dlcs.array',
  reset = 'dlcs.reset',
  mainChangeEvent = 'dlcs.main-change-event',
  onMainChange = 'onDlcs.main-change-event',
  rendererChangeEvent = 'dlcs.renderer-change-event',
  onRendererChange = 'onDlcs.renderer-change-event'
}

export interface IPublic {
  [Keys.array]: IDLC[]
  [Keys.reset]: typeof DLCs.reset
  [Keys.onMainChange]: MainEvent<IDLC[]>
  [Keys.rendererChangeEvent]: RendererEvent<IDLC[]>
}
