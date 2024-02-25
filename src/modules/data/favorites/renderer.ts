import RendArrayBase from '/utils/json-arrays/renderer'

import type { IPublic } from './public'
import { Keys } from './public'

export type * from './types'

type FavoriteTrucks = IPublic[Keys.array]

/**
 * Работа с массивом избранных авто  
 * _renderer process_
*/
class Favorites extends RendArrayBase<FavoriteTrucks[number]> {
  protected override arrayKey = Keys.array
  protected override onChangeKey = Keys.onMainChange
  protected override emitChangeKey = Keys.rendererChangeEvent
  protected override resetKey = Keys.reset
  protected override saveKey = Keys.save

  constructor() { super(); this.init() }
}

export default new Favorites() as Favorites
