import type { MainEvent, RendererEvent } from 'emr-bridge'

import type Mods from './main'
import type { IMod } from './types'

export enum Keys {
  mainChangeEvent = 'mods.main-change-event',
  rendererChangeEvent = 'mods.renderer-change-event',
  onMainChange = 'onMods.main-change-event',
  onRendererChange = 'onMods.renderer-change-event',
  array = 'mods.array',
  reset = 'mods.reset',
  save = 'mods.save',
  getAllMods = 'mods.get-all-mods',
  findMods = 'mods.find-mods'
}

export interface IPublic {
  [Keys.array]: IMod[]
  [Keys.onMainChange]: MainEvent<IMod[]>
  [Keys.rendererChangeEvent]: RendererEvent<IMod[]>
  [Keys.reset]: typeof Mods.reset
  [Keys.save]: typeof Mods.save
  [Keys.getAllMods](): Promise<[path: string, name: string][]>
  [Keys.findMods](dirPath: string): Promise<[path: string, name: string][]>
}
