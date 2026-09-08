import { initMain } from '@bridge/renderer'
import type { IFile } from '@modules/files/renderer'
import { BaseRendererArray } from '@utilities/json-arrays/renderer'
import type { FavoriteTruck, IRendererFavorites } from './types'

/** Работа с массивом избранных авто. [renderer] */
@initMain()
export class Favorites extends BaseRendererArray<FavoriteTruck> implements IRendererFavorites {
	isFavorite(file: IFile) {
		return this.includes(file.name)
	}
}
