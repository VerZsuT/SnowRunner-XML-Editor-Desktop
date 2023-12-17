import type { MainEvent } from 'emr-bridge'

import type Favorites from './main'
import type { FavoriteTruck } from './types'

export enum Keys {
  array = 'favorites.array',
  mainChangeEvent = 'favorites.main-change-event',
  rendererChangeEvent = 'favorites.renderer-change-event',
  onMainChange = 'onFavorites.main-change-event',
  onRendererChange = 'onFavorites.renderer-change-event',
  reset = 'favorites.reset',
  save = 'favorites.save'
}

export interface IPublic {
  [Keys.array]: FavoriteTruck[]
  [Keys.onMainChange]: MainEvent<FavoriteTruck[]>
  [Keys.reset]: typeof Favorites.reset
  [Keys.save]: typeof Favorites.save
}
