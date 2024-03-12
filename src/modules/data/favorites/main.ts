import { publicMainEvent, publicRendererEvent } from 'emr-bridge'

import MainArrayBase from '/utils/json-arrays/main'

import { PubKeys } from './public'
import type { FavoriteTruck } from './types'

import { Files } from '/mods/files/main'

export type * from './types'

/**
 * Работа с массивом избранных авто  
 * _main process_
*/
class Favorites extends MainArrayBase<FavoriteTruck> {
  protected override emitChangeEvent = publicMainEvent<[FavoriteTruck[]]>(PubKeys.mainChangeEvent)
  protected override onChangeEvent = publicRendererEvent<FavoriteTruck[]>(PubKeys.onRendererChange)

  protected override jsonFile = Files.favorites

  constructor() { super(PubKeys.array, PubKeys.reset, PubKeys.save) }
}

export default (await new Favorites()._init())
