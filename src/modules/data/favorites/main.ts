import type { FavoriteTruck } from './types'
import { Files } from '/mods/files/main'
import { providePublic } from '/utils/bridge/main'
import MainArrayBase from '/utils/json-arrays/main'

export type * from './types'

/**
 * Работа с массивом избранных авто.  
 * _main process_
 */
@providePublic()
class Favorites extends MainArrayBase<FavoriteTruck> {
  protected override jsonFile = Files.favorites

  constructor() {
    super()
    this.isReady = this.init()
  }
}

/**
 * Работа с массивом избранных авто.  
 * _main process_
 */
export default await new Favorites().isReady
