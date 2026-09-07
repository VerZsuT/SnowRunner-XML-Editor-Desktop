import { initMain } from '@bridge/renderer'
import type { IFile } from '@modules/files/renderer'
import { RendArrayBase } from '@utilities/json-arrays/renderer'
import type { FavoriteTruck } from './types'

export type * from './types'

/**
 * Работа с массивом избранных авто.
 * _renderer process_
 */
@initMain()
export class Favorites extends RendArrayBase<FavoriteTruck> {
  /**
   * Является ли файл избранным.
   * @param file Файл.
   * @returns Является ли файл избранным.
   */
  isFavorite(file: IFile) {
    return this.includes(file.name)
  }
}
