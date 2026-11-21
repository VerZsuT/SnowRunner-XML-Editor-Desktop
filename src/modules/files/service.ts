import type { FSWatcher } from 'node:fs'
import { watch } from 'node:fs'
import { chmod, copyFile, lstat, mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import type { FsErrorCode, FsFailure, FsResult, IFsEntryInfo, IFsStat, IScanArgs, IWatcherEvent } from './types'

/** Размер чанка при батч-операциях. */
const CHUNK_SIZE = 100

/** Число параллельных операций чтения/записи. */
const OPERATIONS_POOL = 16

/** Ошибка файловой системы. */
export class FsError extends Error {
	constructor(
		/** Код ошибки. */
		readonly code: FsErrorCode,
		/** Путь, на котором произошла ошибка. */
		readonly path: string,
		message: string,
		options?: ErrorOptions
	) {
		super(message, options)
		this.name = 'FsError'
	}
}

/**
 * Привести ошибку к {@link FsError}.
 * @param error Ошибка.
 * @param path Путь.
 * @returns Ошибка файловой системы.
 */
export function toFsError(error: unknown, path: string): FsError {
	if (error instanceof FsError) {
		return error
	}

	const code = (error as NodeJS.ErrnoException | undefined)?.code
	const message = error instanceof Error
		? error.message
		: String(error)

	return new FsError(toErrorCode(code), path, message, { cause: error })
}

/**
 * Привести код ошибки node:fs к коду контракта.
 * @param code Код ошибки.
 * @returns Код ошибки контракта.
 */
function toErrorCode(code: string | undefined): FsErrorCode {
	switch (code) {
		case 'ENOENT':
		case 'EACCES':
		case 'EPERM':
		case 'EBUSY':
		case 'EISDIR':
		case 'ENOTDIR':
			return code
		default:
			return 'UNKNOWN'
	}
}

/**
 * Разбить массив на чанки.
 * @param items Массив.
 * @param size Размер чанка.
 * @returns Чанки.
 */
function chunk<T>(items: T[], size: number): T[][] {
	const result: T[][] = []

	for (let index = 0; index < items.length; index += size) {
		result.push(items.slice(index, index + size))
	}

	return result
}

/**
 * Выполнить действия с ограничением параллельности.
 * Порядок результатов совпадает с порядком входного массива.
 * @param items Массив.
 * @param pool Максимальное число параллельных операций.
 * @param action Действие.
 * @returns Результаты.
 */
async function runWithPool<T, R>(
	items: T[],
	pool: number,
	action: (item: T) => Promise<R>
): Promise<R[]> {
	const result: R[] = []
	let next = 0
	const worker = async () => {
		while (next < items.length) {
			const index = next++

			result[index] = await action(items[index])
		}
	}

	await Promise.all(Array.from({ length: Math.min(pool, items.length) }, worker))

	return result
}

/**
 * Проверить соответствие имени файла фильтрам поиска.
 * @param fileName Имя файла.
 * @param ext Расширение.
 * @param name Имя без расширения.
 * @returns Подходит ли файл.
 */
function matchesFile(fileName: string, ext?: string, name?: string): boolean {
	const fileExt = extname(fileName)

	if (ext) {
		const normalized = String(ext).replace(/^\./, '').toLowerCase()

		if (normalized && fileExt.toLowerCase() === `.${normalized}`) {
			return true
		}
	}

	return Boolean(name) && basename(fileName, fileExt) === name
}

/** Файловая система main процесса: примитивы node:fs, батчи и наблюдение. */
export class FsService {
	/** Активные наблюдатели. */
	private readonly watchers = new Map<string, FSWatcher>()

	/** Счётчик идентификаторов наблюдателей. */
	private watcherId = 0

	/** Обработчик событий наблюдения. */
	private emitWatcherEvent: (event: IWatcherEvent) => void = () => {}

	/** Число активных наблюдателей. */
	get watchersCount(): number {
		return this.watchers.size
	}

	/**
	 * Установить обработчик событий наблюдения.
	 * @param handler Обработчик.
	 */
	setWatcherEvents(handler: (event: IWatcherEvent) => void): void {
		this.emitWatcherEvent = handler
	}

	/**
	 * Получить содержимое папки.
	 * @param path Путь к папке.
	 * @returns Сущности в папке.
	 */
	async list(path: string): Promise<IFsEntryInfo[]> {
		try {
			const entries = await readdir(path, { withFileTypes: true })

			return entries.map(entry => ({
				path: join(path, entry.name),
				name: entry.name,
				kind: entry.isDirectory() ? 'dir' as const : 'file' as const
			}))
		} catch (error) {
			throw toFsError(error, path)
		}
	}

	/**
	 * Найти сущности в дереве папок.
	 * Один readdir на каталог, рекурсия без stat на каждую запись.
	 * @param path Путь к папке.
	 * @param args Аргументы поиска.
	 * @returns Найденные сущности.
	 */
	async scan(path: string, args: IScanArgs): Promise<IFsEntryInfo[]> {
		const kind = args.kind ?? 'files'
		const { ext, name, recursive } = args

		if (kind !== 'all' && !name && !ext) {
			return []
		}

		const result: IFsEntryInfo[] = []
		const queue = [path]

		// Индекс вместо shift: очередь на тысячах папок не должна быть O(n^2).
		for (let index = 0; index < queue.length; index += 1) {
			const current = queue[index]
			let entries

			try {
				entries = await readdir(current, { withFileTypes: true })
			} catch {
				// Недоступная папка не должна ронять весь поиск.
				continue
			}

			for (const entry of entries) {
				const entryPath = join(current, entry.name)

				if (entry.isDirectory()) {
					if (kind === 'all' || (kind === 'dirs' && entry.name === name)) {
						result.push({ path: entryPath, name: entry.name, kind: 'dir' })
					}

					if (recursive) {
						queue.push(entryPath)
					}

					continue
				}

				if (!entry.isFile() || kind === 'dirs') {
					continue
				}

				if (kind === 'all' || matchesFile(entry.name, ext, name)) {
					result.push({ path: entryPath, name: entry.name, kind: 'file' })
				}
			}
		}

		return result
	}

	/**
	 * Найти сущности в нескольких деревьях папок чанками с ограничением параллельности.
	 * Порядок результатов совпадает с порядком входного массива путей.
	 * @param paths Пути к папкам.
	 * @param args Аргументы поиска.
	 * @returns Найденные сущности.
	 */
	async scanMany(paths: string[], args: IScanArgs): Promise<IFsEntryInfo[]> {
		const result: IFsEntryInfo[] = []

		for (const items of chunk(paths, CHUNK_SIZE)) {
			const values = await runWithPool(items, OPERATIONS_POOL, path => this.scan(path, args))

			for (const entries of values) {
				result.push(...entries)
			}
		}

		return result
	}

	/**
	 * Получить информацию о сущности.
	 * @param path Путь к сущности.
	 * @returns Информация о сущности или null, если её нет.
	 */
	async stat(path: string): Promise<IFsStat | null> {
		try {
			const info = await lstat(path)

			return {
				path,
				name: basename(path),
				kind: info.isDirectory() ? 'dir' : 'file',
				size: info.size
			}
		} catch (error) {
			if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
				return null
			}

			throw toFsError(error, path)
		}
	}

	/**
	 * Получить информацию о сущностях чанками с ограничением параллельности.
	 * Порядок результатов совпадает с порядком входного массива,
	 * ошибка отдельной сущности возвращает null.
	 * @param paths Пути к сущностям.
	 * @returns Информация о сущностях.
	 */
	async statMany(paths: string[]): Promise<Array<IFsStat | null>> {
		const result: Array<IFsStat | null> = []

		for (const items of chunk(paths, CHUNK_SIZE)) {
			const values = await runWithPool(items, OPERATIONS_POOL, async path => {
				try {
					return await this.stat(path)
				} catch {
					return null
				}
			})

			result.push(...values)
		}

		return result
	}

	/**
	 * Прочитать файл.
	 * @param path Путь к файлу.
	 * @param encoding Кодировка файла.
	 * @returns Содержимое файла.
	 */
	async readFile(path: string, encoding?: BufferEncoding): Promise<string> {
		try {
			const buffer = await readFile(path)

			return buffer.toString(encoding)
		} catch (error) {
			throw toFsError(error, path)
		}
	}

	/**
	 * Прочитать файлы чанками с ограничением параллельности.
	 * Порядок результатов совпадает с порядком входного массива,
	 * ошибка отдельного файла возвращает null.
	 * @param paths Пути к файлам.
	 * @param encoding Кодировка файлов.
	 * @returns Содержимое файлов.
	 */
	async readMany(paths: string[], encoding?: BufferEncoding): Promise<Array<string | null>> {
		const result: Array<string | null> = []

		for (const items of chunk(paths, CHUNK_SIZE)) {
			const values = await runWithPool(items, OPERATIONS_POOL, async path => {
				try {
					return await this.readFile(path, encoding)
				} catch {
					return null
				}
			})

			result.push(...values)
		}

		return result
	}

	/**
	 * Записать файл.
	 * Создаёт родительскую папку при необходимости.
	 * @param path Путь к файлу.
	 * @param data Данные.
	 * @param encoding Кодировка файла.
	 */
	async writeFile(path: string, data: string, encoding?: BufferEncoding): Promise<void> {
		try {
			await mkdir(dirname(path), { recursive: true })
			await writeFile(path, data, encoding)
		} catch (error) {
			throw toFsError(error, path)
		}
	}

	/**
	 * Записать файлы чанками с ограничением параллельности.
	 * @param items Пути и данные.
	 */
	async writeMany(items: Array<{ path: string; data: string }>): Promise<void> {
		for (const chunkItems of chunk(items, CHUNK_SIZE)) {
			await runWithPool(chunkItems, OPERATIONS_POOL, item => this.writeFile(item.path, item.data))
		}
	}

	/**
	 * Создать папку.
	 * @param path Путь к папке.
	 */
	async makeDir(path: string): Promise<void> {
		try {
			await mkdir(path, { recursive: true })
		} catch (error) {
			throw toFsError(error, path)
		}
	}

	/**
	 * Рекурсивно удалить файл/папку.
	 * Ничего не делает, если сущности нет. Повторяет попытку при занятом файле.
	 * @param path Путь.
	 */
	async remove(path: string): Promise<void> {
		if (!await this.stat(path)) {
			return
		}

		try {
			await rm(path, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 })
		} catch (error) {
			throw toFsError(error, path)
		}
	}

	/**
	 * Переместить файл/папку.
	 * @param from Исходный путь.
	 * @param to Конечный путь.
	 */
	async move(from: string, to: string): Promise<void> {
		try {
			await rename(from, to)
		} catch (error) {
			throw toFsError(error, from)
		}
	}

	/**
	 * Скопировать файл.
	 * @param from Исходный путь.
	 * @param to Конечный путь.
	 */
	async copy(from: string, to: string): Promise<void> {
		try {
			await copyFile(from, to)
		} catch (error) {
			throw toFsError(error, from)
		}
	}

	/**
	 * Изменить права доступа.
	 * @param path Путь.
	 * @param mode Новые права.
	 */
	async chmod(path: string, mode: number): Promise<void> {
		try {
			await chmod(path, mode)
		} catch (error) {
			throw toFsError(error, path)
		}
	}

	/**
	 * Наблюдать за файлом.
	 * @param path Путь к файлу.
	 * @returns Идентификатор наблюдателя.
	 */
	watch(path: string): string {
		const id = `fs-watch-${++this.watcherId}`

		try {
			const watcher = watch(path, { persistent: false }, (event, filename) => {
				this.emitWatcherEvent({
					id,
					path,
					event,
					filename: filename === null ? null : String(filename)
				})
			})

			// Ошибка наблюдения означает, что файл больше не отслеживается.
			watcher.on('error', () => this.closeWatcher(id))
			this.watchers.set(id, watcher)

			return id
		} catch (error) {
			throw toFsError(error, path)
		}
	}

	/**
	 * Прекратить наблюдение.
	 * @param id Идентификатор наблюдателя.
	 */
	unwatch(id: string): void {
		this.closeWatcher(id)
	}

	/** Прекратить все наблюдения. */
	closeAll(): void {
		for (const id of this.watchers.keys()) {
			this.closeWatcher(id)
		}
	}

	/**
	 * Закрыть наблюдатель.
	 * @param id Идентификатор наблюдателя.
	 */
	private closeWatcher(id: string): void {
		const watcher = this.watchers.get(id)

		if (!watcher) {
			return
		}

		this.watchers.delete(id)

		try {
			watcher.close()
		} catch {
			// Наблюдатель мог быть уже закрыт.
		}
	}
}

/** Файловая система main процесса. */
export const fsService = new FsService()

/**
 * Выполнить операцию и привести ошибку к результату.
 * @param path Путь операции.
 * @param action Операция.
 * @returns Результат операции.
 */
export async function toResult<T>(path: string, action: () => Promise<T>): Promise<FsResult<T>> {
	try {
		return { ok: true, value: await action() }
	} catch (error: unknown) {
		return { ok: false, error: toFailure(error, path) }
	}
}

/**
 * Выполнить синхронную операцию и привести ошибку к результату.
 * @param path Путь операции.
 * @param action Операция.
 * @returns Результат операции.
 */
export function toSyncResult<T>(path: string, action: () => T): FsResult<T> {
	try {
		return { ok: true, value: action() }
	} catch (error: unknown) {
		return { ok: false, error: toFailure(error, path) }
	}
}

/**
 * Привести ошибку к описанию.
 * @param error Ошибка.
 * @param path Путь операции.
 * @returns Описание ошибки.
 */
export function toFailure(error: unknown, path: string): FsFailure {
	if (error instanceof FsError) {
		return {
			code: error.code,
			path: error.path,
			message: error.message
		}
	}

	return {
		code: 'UNKNOWN',
		path,
		message: error instanceof Error ? error.message : String(error)
	}
}
