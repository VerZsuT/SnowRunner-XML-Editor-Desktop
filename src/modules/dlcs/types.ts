import type { IDir, IFile, IFindDirsArgs, IFindFilesArgs } from '@modules/files/types'
import type { IResettable } from '@src/types'
import type { IBaseArray, IBaseRendererArray } from '@utilities/json-arrays/types'

/** DLC. */
export interface IDLC {
	/** Имя папки в `_dlc`. */
	name: string

	/** Путь до папки в `_dlc`. */
	path: string
}

/** Работа с дополнениями игры. [main] */
export interface IMainDlc extends IBaseArray<IDLC, IDLC & { dir: IDir }>, IResettable {
	/** Инициализировать класс. */
	init(): Promise<void>

	/**
	 * Найти файлы.
	 * @param args Аргументы поиска.
	 * @returns Файлы.
	 */
	findFiles(args: IFindFilesArgs): Promise<IFile[]>

	/**
	 * Найти папки.
	 * @param args Аргументы поиска.
	 * @returns Папки.
	 */
	findDirs(args: IFindDirsArgs): Promise<IDir[]>
}

/** Работа с дополнениями игры. [renderer] */
export interface IRendererDlc extends IBaseRendererArray<IDLC, IDLC & { dir: IDir }> {
	/**
	 * Получить название DLC.
	 * @param file Файл.
	 * @returns Название DLC.
	 */
	getDLC(file: IFile): string | undefined

	/**
	 * Найти файлы.
	 * @param args Аргументы поиска.
	 * @returns Файлы.
	 */
	findFiles(args: IFindFilesArgs): Promise<IFile[]>

	/**
	 * Найти папки.
	 * @param args Аргументы поиска.
	 * @returns Папки.
	 */
	findDirs(args: IFindDirsArgs): Promise<IDir[]>
}


