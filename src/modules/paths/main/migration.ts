import { copyFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

/** Данные для миграции старых данных. */
export interface IMigrationContext {
	/** Старый каталог с json файлами (в папке установки). */
	legacyDir: string

	/** Новый каталог данных. */
	dataDir: string

	/** Проверить существование пути. */
	exists?: (path: string) => boolean

	/** Создать папку. */
	makeDir?: (path: string) => void

	/** Получить содержимое папки. */
	readDir?: (path: string) => string[]

	/** Скопировать файл. */
	copyFile?: (from: string, to: string) => void

	/** Записать сообщение в лог. */
	log?: (message: string) => void
}

/**
 * Перенести json файлы из папки установки в каталог данных.
 * Старый каталог не изменяется, миграция выполняется только один раз.
 * @param context Данные для миграции.
 * @returns Имена скопированных файлов.
 */
export function migrateLegacyData(context: IMigrationContext): string[] {
	const {
		legacyDir, dataDir,
		exists = existsSync,
		makeDir = (path: string) => mkdirSync(path, { recursive: true }),
		readDir = (path: string) => readdirSync(path),
		copyFile = (from: string, to: string) => copyFileSync(from, to),
		log = (message: string) => console.info(message)
	} = context

	if (!exists(legacyDir)) {
		return []
	}

	const existing = exists(dataDir)
		? readDir(dataDir).filter(name => name.endsWith('.json'))
		: []

	if (existing.length) {
		return []
	}

	const legacyNames = readDir(legacyDir).filter(name => name.endsWith('.json'))

	if (!legacyNames.length) {
		return []
	}

	makeDir(dataDir)

	for (const name of legacyNames) {
		copyFile(join(legacyDir, name), join(dataDir, name))
	}

	log(`Data migrated from "${legacyDir}" to "${dataDir}": ${legacyNames.join(', ')}`)

	return legacyNames
}
