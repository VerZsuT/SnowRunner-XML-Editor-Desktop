import type { IFile } from '@modules/files/types'
import type { IBaseMainArray, IBaseRendererArray } from '@utilities/json-arrays/types'

/** Избранный автомобиль. */
export type FavoriteTruck = string

/** Работа с массивом изменённых файлов. [main] */
export type IMainFavorites = IBaseMainArray<FavoriteTruck, FavoriteTruck>

/** Работа с массивом изменённых файлов. [renderer] */
export interface IRendererFavorites extends IBaseRendererArray<FavoriteTruck, FavoriteTruck> {
	/**
	 * Является ли файл избранным.
	 * @param file Файл.
	 * @returns Является ли файл избранным.
	 */
	isFavorite(file: IFile): boolean
}
