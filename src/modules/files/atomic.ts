import { renameSync, rmSync, writeFileSync } from 'node:fs'

/** Операции записи, необходимые для атомарной записи файла. */
export interface IAtomicWriteOps {
	/** Записать данные по пути. */
	write: (path: string, data: string) => void

	/** Переименовать файл. */
	rename: (from: string, to: string) => void

	/** Удалить файл, не бросая исключение. */
	remove: (path: string) => void
}

/** Операции по умолчанию. */
const defaultOps: IAtomicWriteOps = {
	write: (path, data) => writeFileSync(path, data),
	rename: (from, to) => renameSync(from, to),
	remove: path => rmSync(path, { force: true })
}

/**
 * Атомарно записать файл: временный файл в том же каталоге, затем `rename`.
 * При ошибке временный файл удаляется, старый файл остаётся нетронутым.
 * @param path Путь к файлу.
 * @param data Данные.
 * @param ops Операции записи.
 */
export function writeFileAtomic(path: string, data: string, ops: IAtomicWriteOps = defaultOps): void {
	const temporaryPath = `${path}.tmp`

	try {
		ops.write(temporaryPath, data)
		ops.rename(temporaryPath, path)
	} catch (error: unknown) {
		try {
			ops.remove(temporaryPath)
		} catch {
			// Временный файл уже удалён или недоступен.
		}

		throw error
	}
}
