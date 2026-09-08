import { makeReactive } from '@utilities/bridge/main'
import { di } from '@utilities/di/container'
import { FILES_TOKEN } from '@utilities/di/main/tokens'
import { BaseMainArray } from '@utilities/json-arrays/main'
import type { FavoriteTruck, IMainFavorites } from '../types'

/** Работа с массивом избранных авто. [main] */
export class Favorites extends BaseMainArray<FavoriteTruck> implements IMainFavorites {
	protected override jsonFile = di.resolve(FILES_TOKEN).favorites

	constructor() {
		super()
		makeReactive(this, 'Favorites', 'arr')
		this.init()
	}
}
