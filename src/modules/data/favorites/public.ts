import type { MainEvent } from 'emr-bridge'

import type Favorites from './main'
import type { FavoriteTruck } from './types'

export enum PubKeys {
  array = 'favs/array',
  reset = 'favs/reset',
  save = 'favs/save',
  mainChangeEvent = '-favs/main-change-event',
  rendererChangeEvent = '-favs/renderer-change-event',
  onMainChange = `on${PubKeys.mainChangeEvent}`,
  onRendererChange = `on${PubKeys.rendererChangeEvent}`
}

export type PubType = {
  [PubKeys.array]: FavoriteTruck[]
  [PubKeys.onMainChange]: MainEvent<FavoriteTruck[]>
  [PubKeys.reset]: typeof Favorites.reset
  [PubKeys.save]: typeof Favorites.save
}
