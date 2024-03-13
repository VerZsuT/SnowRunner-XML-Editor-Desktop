import RendArrayBase from '/utils/json-arrays/renderer'

import type { PubType } from './public'
import { PubKeys } from './public'

export type * from './types'

type FavoriteTrucks = PubType[PubKeys.array]

/**
 * Работа с массивом избранных авто  
 * _renderer process_
*/
class Favorites extends RendArrayBase<FavoriteTrucks[number]> {
  constructor() {
    super(
      PubKeys.array,
      PubKeys.onMainChange,
      PubKeys.rendererChangeEvent,
      PubKeys.reset,
      PubKeys.save
    )
  }
}

export default new Favorites()
