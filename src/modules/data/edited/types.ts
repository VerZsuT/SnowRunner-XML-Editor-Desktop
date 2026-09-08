import type { IFile } from '@modules/files/types'
import type { IBaseMainArray, IBaseRendererArray } from '@utilities/json-arrays/types'

/** Массив изменённых файлов. */
export interface IEditedFile {
	/** Имя файла. */
	name: string

	/** Является ли файл трейлером. */
	isTrailer?: boolean

	/** Название DLC, к которому относится файл. */
	dlc?: string

	/** Название мода, к которому относится файл. */
	mod?: string
}

/** Работа с массивом изменённых файлов. [main] */
export type IMainEdited = IBaseMainArray<IEditedFile, IFile>

/** Работа с массивом изменённых файлов. [renderer] */
export interface IRendererEdited extends IBaseRendererArray<IEditedFile, IFile> {
	/**
	 * Пометить файл как изменённый.
	 * @param file Файл.
	 * @param isTrailer Является ли файл трейлером.
	 */
	markAsEdited(file: IFile, isTrailer?: boolean): void

	/**
	 * Пометить файл как неизмененный.
	 * @param file Файл.
	 */
	markAsNotEdited(file: IFile): void

	/**
	 * Помечен ли файл как изменённый.
	 * @param file Файл.
	 * @returns Помечен ли файл как изменённый.
	 */
	isEdited(file: IFile): boolean
}
