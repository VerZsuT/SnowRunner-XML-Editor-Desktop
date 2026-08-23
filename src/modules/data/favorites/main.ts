import { providePublic } from '@bridge/main'
import { Files } from '@modules/files/main'
import MainArrayBase from '@utilities/json-arrays/main'
import type { FavoriteTruck } from './types'

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
