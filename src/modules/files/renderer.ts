import { ProgramError } from '@modules/errors/renderer'
import type { IPaths } from '@modules/paths/renderer'
import type { XMLElement } from '@modules/xml/renderer'
import { getBridge, initMain, mainMethod } from '@utilities/bridge/renderer'
import { di, inject } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, FS_TOKEN, PATHS_TOKEN } from '@utilities/di/renderer/tokens'
import { basename, dirname, extname, joinPath } from '@utilities/paths/renderer'
import { ErrorText } from '../errors/enums'
import type { FsFailure, FsResult, IDir, IDirs, IFile, IFiles, IFindDirsArgs, IFindFilesArgs, IFs, IFSEntry, IWatcher, IWatcherEvent, WatcherListener } from './types'

export type * from './types'

/** Клиент файловой системы из main процесса. [renderer] */
@initMain()
export class Fs implements IFs {
	@mainMethod()
	list!: IFs['list']

	@mainMethod()
	scan!: IFs['scan']

	@mainMethod()
	stat!: IFs['stat']

	@mainMethod()
	readFile!: IFs['readFile']

	@mainMethod()
	readMany!: IFs['readMany']

	@mainMethod()
	writeFile!: IFs['writeFile']

	@mainMethod()
	writeMany!: IFs['writeMany']

	@mainMethod()
	makeDir!: IFs['makeDir']

	@mainMethod()
	remove!: IFs['remove']

	@mainMethod()
	move!: IFs['move']

	@mainMethod()
	copy!: IFs['copy']

	@mainMethod()
	chmod!: IFs['chmod']

	@mainMethod()
	watch!: IFs['watch']

	@mainMethod()
	unwatch!: IFs['unwatch']
}

/** Слушатели событий наблюдения по идентификаторам. */
const watcherListeners = new Map<string, Set<WatcherListener>>()

/** Отписка от события наблюдения из main процесса. */
let watcherSubscription: (() => void) | undefined

/**
 * Получить клиент файловой системы.
 * @returns Клиент файловой системы.
 */
function fsClient(): IFs {
	return di.resolve(FS_TOKEN)
}

/**
 * Развернуть результат операции.
 * @param result Результат операции.
 * @param text Текст ошибки.
 * @param formatArgs Аргументы для вставки.
 * @returns Значение результата.
 */
function unwrap<T>(result: FsResult<T>, text: ErrorText, ...formatArgs: string[]): T {
	if (result.ok) {
		return result.value
	}

	throw createError(result.error, text, ...formatArgs)
}

/**
 * Создать ошибку программы из ошибки файловой системы.
 * @param error Ошибка файловой системы.
 * @param text Текст ошибки.
 * @param formatArgs Аргументы для вставки.
 * @returns Ошибка программы.
 */
function createError(error: FsFailure, text: ErrorText, ...formatArgs: string[]): ProgramError {
	return new ProgramError(text, new Error(`[${error.code}] ${error.message}`), ...formatArgs)
}

/** Подписаться на события наблюдения из main процесса. */
function subscribeWatcherEvents() {
	if (watcherSubscription) {
		return
	}

	watcherSubscription = getBridge().on<IWatcherEvent>('Fs/watch', event => {
		const listeners = watcherListeners.get(event.id)

		if (listeners) {
			for (const listener of listeners) {
				listener(event.event, event.filename)
			}
		}
	})
}

/**
 * Создать наблюдатель за файлом.
 * @param path Путь к файлу.
 * @param listener Обработчик изменения.
 * @returns Наблюдатель.
 */
function createWatcher(path: string, listener: WatcherListener): IWatcher {
	const id = unwrap(fsClient().watch(path), ErrorText.readFileError, path)
	const listeners = new Set<WatcherListener>([listener])
	let closed = false

	watcherListeners.set(id, listeners)
	subscribeWatcherEvents()

	return {
		close() {
			if (closed) {
				return
			}

			closed = true
			watcherListeners.delete(id)
			fsClient().unwatch(id)
		},
		removeAllListeners() {
			listeners.clear()
		}
	}
}

/** Сущность в файловой системе. [renderer] */
export class FSEntry implements IFSEntry {
	path = ''

	constructor(...partsToJoin: string[]) {
		if (partsToJoin.length) {
			this.path = joinPath(...partsToJoin)
		}
	}

	get dirname() {
		return dirname(this.path)
	}

	get root() {
		return new Dir(this.dirname)
	}

	basename(extname?: string) {
		return basename(this.path, extname)
	}

	async exists(): Promise<boolean> {
		return unwrap(await fsClient().stat(this.path), ErrorText.readFileError, this.path) !== null
	}

	asFile() {
		return new File(this.path)
	}

	asDir() {
		return new Dir(this.path)
	}

	async isDir(): Promise<boolean> {
		return unwrap(await fsClient().stat(this.path), ErrorText.readFileError, this.path)?.kind === 'dir'
	}

	async isFile(): Promise<boolean> {
		return unwrap(await fsClient().stat(this.path), ErrorText.readFileError, this.path)?.kind === 'file'
	}

	async remove() {
		unwrap(await fsClient().remove(this.path), ErrorText.removeError, this.path)
	}

	async move(path: string): Promise<void>
	async move(entry: IFSEntry): Promise<void>
	async move(arg: string | IFSEntry): Promise<void> {
		const path = arg instanceof FSEntry
			? arg.path
			: arg as string

		unwrap(await fsClient().move(this.path, path), ErrorText.moveError, this.path, path)
	}

	async rename(entry: IFSEntry): Promise<void>
	async rename(name: string): Promise<void>
	async rename(arg: string | IFSEntry): Promise<void> {
		const newName = arg instanceof FSEntry
			? arg.basename()
			: arg as string
		const result = await fsClient().move(this.path, joinPath(this.dirname, newName))

		if (!result.ok) {
			throw createError(result.error, ErrorText.renameError, this.basename(), newName)
		}
	}
}

/** Папка в файловой системе. [renderer] */
export class Dir extends FSEntry implements IDir {
	get name() {
		return this.basename()
	}

	dir(...path: string[]) {
		return new Dir(joinPath(this.path, ...path))
	}

	file(...path: string[]) {
		return new File(joinPath(this.path, ...path))
	}

	entry(...path: string[]) {
		return new FSEntry(joinPath(this.path, ...path))
	}

	async read(): Promise<FSEntry[]> {
		const result = await fsClient().list(this.path)

		if (!result.ok) {
			// Отсутствующая папка — как и раньше, пустой результат.
			if (result.error.code === 'ENOENT') {
				return []
			}

			throw createError(result.error, ErrorText.readDirError, this.path)
		}

		return result.value.map(info => this.entry(info.name))
	}

	async make() {
		unwrap(await fsClient().makeDir(this.path), ErrorText.makeDirError, this.path)
	}

	async clear() {
		await this.remove()
		await this.make()
	}

	async findFiles(args: IFindFilesArgs): Promise<File[]> {
		const { ext, name, recursive } = args

		if (!name && !ext) {
			return []
		}

		const found = unwrap(
			await fsClient().scan(this.path, { ext, name, recursive, kind: 'files' }),
			ErrorText.readDirError,
			this.path
		)

		return found.map(info => new File(info.path))
	}

	async findDirs(args: IFindDirsArgs): Promise<Dir[]> {
		const { name, recursive } = args
		const found = unwrap(
			await fsClient().scan(this.path, { name, recursive, kind: 'dirs' }),
			ErrorText.readDirError,
			this.path
		)

		return found.map(info => new Dir(info.path))
	}
}

/** Файл в файловой системе. [renderer] */
export class File extends FSEntry implements IFile {
	get extname() {
		return extname(this.path)
	}

	get name() {
		return basename(this.path, this.extname)
	}

	isExt(extension: string): boolean {
		const normalized = String(extension ?? '').replace(/^\./, '').toLowerCase()

		return normalized.length > 0
			&& this.extname.toLowerCase() === `.${normalized}`
	}

	watch(listener: WatcherListener): IWatcher {
		return createWatcher(this.path, listener)
	}

	async getSize(): Promise<number> {
		const info = unwrap(await fsClient().stat(this.path), ErrorText.readFileError, this.path)

		if (!info) {
			throw new ProgramError(ErrorText.readFileError, undefined, this.path)
		}

		return info.size
	}

	async read(encoding?: BufferEncoding): Promise<string> {
		return unwrap(await fsClient().readFile(this.path, encoding), ErrorText.readFileError, this.path)
	}

	async readFromJSON<T extends object = any>(): Promise<T> {
		// Ошибку разбора JSON не оборачиваем в ProgramError: вызывающий код
		// показывает своё сообщение и не должен получать второе.
		return <T>JSON.parse(await this.read())
	}

	async readFromXML(): Promise<XMLElement | undefined> {
		return await (await import('../xml/renderer'))
			.XMLElement.from(await this.read())
	}

	async write(data: string): Promise<void> {
		unwrap(await fsClient().writeFile(this.path, data), ErrorText.writeFileError, this.path)
	}

	async writeToJSON<T extends object>(obj: T): Promise<void> {
		await this.write(JSON.stringify(obj, undefined, '\t'))
	}

	async copyTo(entry: IFSEntry): Promise<void>
	async copyTo(path: string): Promise<void>
	async copyTo(arg: string | IFSEntry): Promise<void> {
		const path = arg instanceof FSEntry
			? arg.path
			: arg as string

		unwrap(await fsClient().copy(this.path, path), ErrorText.copyFileError, this.path, path)
	}

	async make(): Promise<void> {
		if (await this.exists()) {
			return
		}

		unwrap(await fsClient().writeFile(this.path, ''), ErrorText.makeFileError, this.path)
	}

	async clear() {
		await this.remove()
		await this.make()
	}
}

/** Основные папки. [renderer] */
export class Dirs implements IDirs {
	/** Пути приложения. */
	@inject(PATHS_TOKEN)
	private readonly paths!: IPaths

	isDir(other: any): other is Dir {
		return other instanceof Dir
	}

	newDir(...pathsToJoin: string[]) {
		return new Dir(...pathsToJoin)
	}

	root = new Dir(this.paths.root)
	winrar = new Dir(this.paths.winrar)
	pages = new Dir(this.paths.pages)
	backupFolder = new Dir(this.paths.backupFolder)
	backupInitialData = new Dir(this.paths.backupInitialData)
	mainTemp = new Dir(this.paths.mainTemp)
	modsTemp = new Dir(this.paths.modsTemp)
	updateTemp = new Dir(this.paths.updateTemp)
	strings = new Dir(this.paths.strings)
	classes = new Dir(this.paths.classes)
	templates = new Dir(this.paths.templates)
	dlc = new Dir(this.paths.dlc)
}

/** Основные файлы. [renderer] */
export class Files implements IFiles {
	/** Пути приложения. */
	@inject(PATHS_TOKEN)
	private readonly paths!: IPaths

	isFile(other: any): other is File {
		return other instanceof File
	}

	newFile(...pathsToJoin: string[]) {
		return new File(...pathsToJoin)
	}

	config = new File(this.paths.config)
	sizes = new File(this.paths.sizes)
	mods = new File(this.paths.mods)
	favorites = new File(this.paths.favorites)
	edited = new File(this.paths.edited)
	exported = new File(this.paths.exported)
	initialTexts = new File(this.paths.texts)
	icon = new File(this.paths.icon)
	backupInitial = new File(this.paths.backupInitial)
	uninstall = new File(this.paths.uninstall)

	get initial() {
		const { initialPath } = di.resolve(CONFIG_TOKEN)

		if (!initialPath) {
			throw new ProgramError('Path to initial.pak not found')
		}

		return new File(initialPath)
	}

	get editedFlag() {
		const dirs = di.resolve(DIRS_TOKEN)

		return dirs.mainTemp.file('edited')
	}

	get backupInitialWithDate() {
		return new File(this.paths.backupInitialWithDate)
	}
}
