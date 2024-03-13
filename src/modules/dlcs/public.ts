import type { MainEvent, RendererEvent } from 'emr-bridge'

import type DLCs from './main'
import type { IDLC } from './types'

export enum PubKeys {
  array = 'dlcs/array',
  reset = 'dlcs/reset',
  mainChangeEvent = '-dlcs/main-change-event',
  rendererChangeEvent = '-dlcs/renderer-change-event',
  onMainChange = `on${PubKeys.mainChangeEvent}`,
  onRendererChange = `on${PubKeys.rendererChangeEvent}`
}

export type PubType = {
  [PubKeys.array]: IDLC[]
  [PubKeys.reset]: typeof DLCs.reset
  [PubKeys.onMainChange]: MainEvent<IDLC[]>
  [PubKeys.rendererChangeEvent]: RendererEvent<IDLC[]>
}
