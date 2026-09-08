import type { IFile } from '@modules/files/types'
import type { IResettable } from '@src/types'

/** Размеры. */
export interface IFileSizes {
	/** Размер `initial.pak`. */
	initial: number

	/** Размеры модификаций. */
	mods: {
		[fileName: string]: number
	}
}

/** Работа с массивом размеров архивов. [main] */
export interface ISizes extends IResettable {
	/** Значение по умолчанию. */
	default: IFileSizes

	/** Размер initial.pak. */
	initial: number

	/**
	 * Установить размеры.
	 * @param sizes Размеры.
	 */
	set(sizes: IFileSizes): void

	/**
	 * Получить размер мода.
	 * @param modFile Файл мода.
	 * @returns Размер мода.
	 */
	getModSize(modFile: IFile): number | undefined

	/**
	 * Установить размер мода.
	 * @param modFile Файл мода.
	 * @param size Размер.
	*/
	setModSize(modFile: IFile, size: number): void

	/** Сохранить изменения размеров. */
	save(): Promise<void>
}

