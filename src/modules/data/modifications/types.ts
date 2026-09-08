import type { IDir, IFile } from '@modules/files/types'
import type { IBaseMainArray, IBaseRendererArray } from '@utilities/json-arrays/types'

/** Модификация. */
export interface IMod {
	/** Имя `.pak` файла. */
	fileName: string

	/** Название. */
	name: string

	/** Путь к `.pak` файлу. */
	path: string
}

/** Работа с массивом модификаций. [main] */
export interface IMainMods extends IBaseMainArray<IMod, IMod & { file: IFile }>, IPublicMods {}

/** Работа с массивом модификаций. [public] */
export interface IPublicMods {
	/** обработать добавленные моды. */
	procMods(): Promise<void>

	/**
	 * Найти `.pak` файлы модификаций в папке.
	 * @param dir Папка.
	 * @returns `.pak` файлы модификаций в папке.
	 */
	findMods(dir: IDir): Promise<[IFile, name: string][]>

	/**
	 * Получить список всех модов (добавленных и в документах).
	 * @returns Список всех модов (добавленных и в документах).
	 */
	getAllMods(): Promise<[IFile, string][]>
}

/** Работа с массивом модификаций. [renderer] */
export interface IRendererMods extends IBaseRendererArray<IMod, IMod & { file: IFile }>, IPublicMods {
	/**
	 * Получить ID мода из пути к файлу.
	 * @param file Файл.
	 * @returns ID мода.
	 */
	getModID(file: IFile): string | undefined

	/**
	 * Найти мод по названию.
	 * @param name Название.
	 * @returns Мод.
	 */
	findByName(name: string): IMod | undefined

	/**
	 * Найти мод по XML файлу.
	 * @param file XML файл.
	 * @returns Мод.
	 */
	findByFile(file: IFile): IMod | undefined

	/**
	 * Запросить у пользователя `.pak` файлы модов.
	 * @returns Выбранные `.pak` файлы модов.
	 */
	requestPaks(): Promise<[IFile, string][] | undefined>

	/**
	 * Запросить у пользователя папки с модами.
	 * @returns Выбранные папки с модами.
	*/
	requestDirs(): Promise<[file: IFile, name: string][] | undefined>

	/**
	 * Сохранить моды из вариантов `Select`.
	 * @param keys Ключи.
	 * @param items Элементы.
	 */
	saveFromSelect(keys: string[], items: [IFile, string][]): void

	/**
	 * Преобразовать в варианты `Select`.
	 * @param items Элементы.
	 * @returns Варианты `Select`.
	 */
	toSelectKeys(items: [IFile, string][]): string[]

	/**
	 * Преобразовать варианты `Select` в `IMod`.
	 * @param keys Ключи.
	 * @param items Элементы.
	 * @returns Модификации.
	 */
	fromSelectKeys(keys: string[], items: [IFile, string][]): IMod[]
}


