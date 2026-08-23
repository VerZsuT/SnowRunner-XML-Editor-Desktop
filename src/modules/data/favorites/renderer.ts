import type { IFile } from '@modules/renderer'
import RendArrayBase from '@utilities/json-arrays/renderer'
import { initMain } from '@utilities/renderer'
import type { FavoriteTruck } from './types'

export type * from './types'

/**
 * Работа с массивом избранных авто.
 * _renderer process_
 */
@initMain()
class Favorites extends RendArrayBase<FavoriteTruck> {
  /**
   * Является ли файл избранным.
   * @param file Файл.
   * @returns Является ли файл избранным.
   */
  isFavorite(file: IFile) {
    return this.includes(file.name)
  }
}

/**
 * Работа с массивом избранных авто.
 * _renderer process_
 */
export default new Favorites()
