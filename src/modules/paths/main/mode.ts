import { dirname, join } from 'node:path'
import type { DataMode } from '../types'

/** Имя файла-маркера портативного режима. */
export const PORTABLE_MARKER = 'portable.txt'

/** Результат выбора каталога данных. */
export interface IDataLocation {
	/** Режим хранения данных. */
	mode: DataMode

	/** Абсолютный путь к каталогу данных. */
	dataRoot: string
}

/** Данные для выбора каталога. */
export interface IDataLocationContext {
	/** Собрано ли приложение (установленная или портативная сборка). */
	isPackaged: boolean

	/** Путь к исполняемому файлу приложения. */
	exePath: string

	/** Путь `userData` из Electron. */
	userDataPath: string

	/** Проверить существование файла. */
	exists?: (path: string) => boolean
}

/**
 * Выбрать каталог данных программы.
 * Установленная и dev сборки хранят данные в `userData`,
 * портативная — в `<папка exe>/data` при наличии маркера `portable.txt`.
 * @param context Данные для выбора.
 * @returns Режим и каталог данных.
 */
export function resolveDataLocation(context: IDataLocationContext): IDataLocation {
	const { isPackaged, exePath, userDataPath, exists = () => false } = context

	if (!isPackaged) {
		return { mode: 'dev', dataRoot: userDataPath }
	}

	const exeDir = dirname(exePath)

	if (exists(join(exeDir, PORTABLE_MARKER))) {
		return { mode: 'portable', dataRoot: join(exeDir, 'data') }
	}

	return { mode: 'installed', dataRoot: userDataPath }
}
