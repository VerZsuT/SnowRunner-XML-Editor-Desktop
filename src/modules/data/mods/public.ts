import type { MainEvent, RendererEvent } from 'emr-bridge'

import type Mods from './main'
import type { IMod } from './types'

export enum PubKeys {
  mainChangeEvent = '-mods/main-change-event',
  rendererChangeEvent = '-mods/renderer-change-event',
  onMainChange = `on${PubKeys.mainChangeEvent}`,
  onRendererChange = `on${PubKeys.rendererChangeEvent}`,
  array = 'mods/array',
  reset = 'mods/reset',
  save = 'mods/save',
  getAllMods = 'mods/get-all-mods',
  findMods = 'mods/find-mods'
}

export type PubType = {
  [PubKeys.array]: IMod[]
  [PubKeys.onMainChange]: MainEvent<IMod[]>
  [PubKeys.rendererChangeEvent]: RendererEvent<IMod[]>
  [PubKeys.reset]: typeof Mods.reset
  [PubKeys.save]: typeof Mods.save
  [PubKeys.getAllMods](): Promise<[path: string, name: string][]>
  [PubKeys.findMods](dirPath: string): Promise<[path: string, name: string][]>
}
