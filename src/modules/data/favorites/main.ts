import { publicMainEvent, publicRendererEvent } from 'emr-bridge'

import MainArrayBase, { initArrayPublic } from '/utils/json-arrays/main'

import { Keys } from './public'
import type { FavoriteTruck } from './types'

import { Files } from '/mods/files/main'

export type * from './types'

/**
 * Работа с массивом избранных авто  
 * _main process_
*/
class FavoritesClass extends MainArrayBase<FavoriteTruck> {
  protected override emitChangeEvent = publicMainEvent<[FavoriteTruck[]]>(Keys.mainChangeEvent)
  protected override onChangeEvent = publicRendererEvent<FavoriteTruck[]>(Keys.onRendererChange)

  protected override jsonFile = Files.favorites
}

const Favorites = new FavoritesClass()
await Favorites._init()

initArrayPublic(Favorites, Keys.array, Keys.reset, Keys.save)

export default Favorites
