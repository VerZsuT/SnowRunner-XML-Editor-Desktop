import { makeReactive } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import { MainArrayBase } from '@utilities/json-arrays/main'
import type { FavoriteTruck } from '../types'

export type * from '../types'

/**
 * Работа с массивом избранных авто.
 * _main process_
 */
export class Favorites extends MainArrayBase<FavoriteTruck> {
	override accessor arr: FavoriteTruck[] = []


  protected override jsonFile = di.resolve(FILES_TOKEN).favorites

  constructor() {
    super()
		makeReactive(this, 'Favorites', 'arr')
    this.init()
  }
}
