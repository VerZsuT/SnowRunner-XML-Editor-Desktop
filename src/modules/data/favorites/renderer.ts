import type { FavoriteTruck } from './types'
import type { File } from '/mods/renderer'
import RendArrayBase from '/utils/json-arrays/renderer'
import { initMain } from '/utils/renderer'

export type * from './types'

/**
 * Работа с массивом избранных авто  
 * _renderer process_
*/
@initMain()
class Favorites extends RendArrayBase<FavoriteTruck> {
  isFavorite(file: File) {
    return this.includes(file.name)
  }
}

export default new Favorites()
