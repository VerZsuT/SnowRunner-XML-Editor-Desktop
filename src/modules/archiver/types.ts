import type { IDir, IFile } from '@modules/files/types'

/** Работа с архивами. [public] */
export interface IPublicArchiver {
	/**
	 * Обновить файлы в архиве.
	 * @param modName Название мода.
	 */
	updateFiles(modName?: string): Promise<void>

	/**
	 * Распаковать файлы из архива в папку.
	 * @param archive Распаковываемый архив.
	 * @param dir Папка, в которую будет распаковываться архив.
	 */
	unpack(archivePath: string, dirPath: string): Promise<void>

	/**
	 * Распаковать основные XML файлы (+DLC) из `initial.pak`.
	 * @param hideLoading Скрывать окно загрузки после окончания.
	 */
	unpackMain(hideLoading?: boolean): Promise<void>
}

/** Работа с архивами. [main] */
export interface IMainArchiver extends IPublicArchiver {
	/** Выполняется распаковка */
	isInitialUnpacking?: Promise<void>

	/**
	 * Обновить файлы в архиве.
	 * @param dir Папка с файлами.
	 * @param archive Обновляемый архив.
	 */
	update(dir: IDir, archive: IFile): Promise<void>

	/**
	 * Распаковать XML файлы из архива модификации.
	 * @param archive Архив модификации.
	 * @param name Название модификации.
	 */
	unpackMod(archive: IFile, name: string): Promise<void>
}

/** Работа с архивами. [renderer] */
export type IRendererArchiver = IPublicArchiver
