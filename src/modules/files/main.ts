import { ProgramError } from '@modules/errors/main'
import type { IPaths } from '@modules/paths/main'
import { di, inject } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, PATHS_TOKEN } from '@utilities/di/main/tokens'
import type { WatchListener } from 'node:fs'
import { accessSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, watch, writeFileSync } from 'node:fs'
import { access, constants } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import { ErrorText } from '../errors/enums'
import type { XMLElement } from '../xml/renderer'
import { FsError, fsService } from './service'
import type { ICheckResult, IFindDirsArgs, IFindFilesArgs, IFSEntry, IMainDir, IMainDirs, IMainFile, IMainFiles, IMainFSEntry } from './types'

export type * from './types'

/** Сущность в файловой системе. [main] */
export class FSEntry implements IMainFSEntry {
	path = ''

	constructor(...partsToJoin: string[]) {
		if (partsToJoin.length) {
			this.path = join(...partsToJoin)
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
		return this.existsSync()
	}

	existsSync(): boolean {
		return existsSync(this.path)
	}

	async hasPermissions(): Promise<boolean> {
		if (!await this.exists()) {
			return false
		}

		const readResult = await this.canRead()
		const writeResult = await this.canWrite()

		if (!readResult.result) {
			throw new ProgramError(ErrorText.readFileError, readResult.error, this.path)
		} else if (!writeResult.result) {
			throw new ProgramError(ErrorText.writeFileError, writeResult.error, this.path)
		}

		return true
	}

	canRead() {
		return canRead(this.path)
	}

	canWrite() {
		return canWrite(this.path)
	}

	asFile() {
		return new File(this.path)
	}

	asDir() {
		return new Dir(this.path)
	}

	async chmod(mod: number) {
		await fsService.chmod(this.path, mod)
	}

	async isDir(): Promise<boolean> {
		try {
			return (await fsService.stat(this.path))?.kind === 'dir'
		} catch {
			return false
		}
	}

	isDirSync(): boolean {
		return lstatSync(this.path).isDirectory()
	}

	async isFile(): Promise<boolean> {
		try {
			return (await fsService.stat(this.path))?.kind === 'file'
		} catch {
			return false
		}
	}

	async remove() {
		try {
			await fsService.remove(this.path)
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.removeError, this.path)
		}
	}

	removeSync() {
		if (!this.existsSync()) {
			return
		}

		try {
			rmSync(this.path, {
				recursive: true,
				force: true,
				maxRetries: 5,
				retryDelay: 100
			})
		} catch (error: any) {
			throw new ProgramError(ErrorText.removeError, error, this.path)
		}
	}

	async move(path: string): Promise<void>
	async move(entry: IFSEntry): Promise<void>
	async move(arg: string | IFSEntry): Promise<void> {
		const path = arg instanceof FSEntry
			? arg.path
			: arg as string

		try {
			await fsService.move(this.path, path)
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.moveError, this.path, path)
		}
	}

	async rename(entry: IFSEntry): Promise<void>
	async rename(name: string): Promise<void>
	async rename(arg: string | IFSEntry): Promise<void> {
		const newName = arg instanceof FSEntry
			? arg.basename()
			: arg as string

		try {
			await this.move(join(this.dirname, newName))
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.renameError, this.basename(), newName)
		}
	}
}

/** Папка в файловой системе. [main] */
export class Dir extends FSEntry implements IMainDir {
	get name() {
		return this.basename()
	}

	dir(...path: string[]) {
		return new Dir(join(this.path, ...path))
	}

	file(...path: string[]) {
		return new File(join(this.path, ...path))
	}

	entry(...path: string[]) {
		return new FSEntry(join(this.path, ...path))
	}

	async read(): Promise<FSEntry[]> {
		try {
			return (await fsService.list(this.path)).map(info => this.entry(info.name))
		} catch (error: unknown) {
			// Отсутствующая папка — как и раньше, пустой результат.
			if (error instanceof FsError && error.code === 'ENOENT') {
				return []
			}

			throw toProgramError(error, ErrorText.readDirError, this.path)
		}
	}

	async make() {
		try {
			await fsService.makeDir(this.path)
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.makeDirError, this.path)
		}
	}

	makeSync() {
		if (this.existsSync()) {
			return
		}

		try {
			mkdirSync(this.path, { recursive: true })
		} catch (error: any) {
			throw new ProgramError(ErrorText.makeDirError, error, this.path)
		}
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

		try {
			const found = await fsService.scan(this.path, { ext, name, recursive, kind: 'files' })

			return found.map(info => new File(info.path))
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.readDirError, this.path)
		}
	}

	async findDirs(args: IFindDirsArgs): Promise<Dir[]> {
		const { name, recursive } = args

		try {
			const found = await fsService.scan(this.path, { name, recursive, kind: 'dirs' })

			return found.map(info => new Dir(info.path))
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.readDirError, this.path)
		}
	}
}

/** Файл в файловой системе. [main] */
export class File extends FSEntry implements IMainFile {
	get extname(): string {
		return extname(this.path)
	}

	get name(): string {
		return basename(this.path, this.extname)
	}

	isExt(extension: string): boolean {
		const normalized = String(extension ?? '').replace(/^\./, '').toLowerCase()

		return normalized.length > 0
			&& this.extname.toLowerCase() === `.${normalized}`
	}

	watch(listener: WatchListener<string>) {
		return watch(this.path, { persistent: false }, listener)
	}

	async getSize(): Promise<number> {
		try {
			const info = await fsService.stat(this.path)

			if (!info) {
				throw new FsError('ENOENT', this.path, `File not found: ${this.path}`)
			}

			return info.size
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.readFileError, this.path)
		}
	}

	async read(encoding?: BufferEncoding): Promise<string> {
		try {
			return await fsService.readFile(this.path, encoding)
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.readFileError, this.path)
		}
	}

	readSync(encoding?: BufferEncoding): string {
		const readResult = canReadSync(this.path)

		if (!readResult.result) {
			throw new ProgramError(ErrorText.readFileError, readResult.error, this.path)
		}

		try {
			return readFileSync(this.path, { encoding }).toString()
		} catch (error: any) {
			throw new ProgramError(ErrorText.readFileError, error, this.path)
		}
	}

	async readFromJSON<T extends object = any>() {
		return this.readFromJSONSync<T>()
	}

	readFromJSONSync<T extends object = any>() {
		// Ошибку разбора JSON не оборачиваем в ProgramError: иначе вместе с ней
		// показывалось бы лишнее уведомление, а вызывающий код отчитывается сам.
		return <T>JSON.parse(this.readSync())
	}

	readFromXML(): Promise<XMLElement | undefined> {
		throw new Error('Method unavailable in main process.')
	}

	async write(data: string, encoding?: BufferEncoding) {
		try {
			await fsService.writeFile(this.path, data, encoding)
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.writeFileError, this.path)
		}
	}

	writeSync(data: string, encoding?: BufferEncoding) {
		this.makeSync()

		const writeResult = canWriteSync(this.path)

		if (!writeResult.result) {
			throw new ProgramError(ErrorText.writeFileError, writeResult.error, this.path)
		}

		try {
			writeFileSync(this.path, data, encoding)
		} catch (error: any) {
			throw new ProgramError(ErrorText.writeFileError, error, this.path)
		}
	}

	async writeToJSON(data: any) {
		return this.writeToJSONSync(data)
	}

	writeToJSONSync(data: any) {
		this.writeSync(JSON.stringify(data, undefined, '\t'))
	}

	async copyTo(file: IFSEntry): Promise<void>
	async copyTo(path: string): Promise<void>
	async copyTo(arg: string | IFSEntry): Promise<void> {
		const path = arg instanceof FSEntry
			? arg.path
			: arg as string

		try {
			await fsService.copy(this.path, path)
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.copyFileError, this.path, path)
		}
	}

	async make() {
		if (await this.exists()) {
			return
		}

		try {
			await fsService.writeFile(this.path, '')
		} catch (error: unknown) {
			throw toProgramError(error, ErrorText.makeFileError, this.path)
		}
	}

	makeSync() {
		if (this.existsSync()) {
			return
		}

		try {
			this.root.makeSync()
			writeFileSync(this.path, '')
		} catch (error: any) {
			throw new ProgramError(ErrorText.makeFileError, error, this.path)
		}
	}

	async clear() {
		await this.remove()
		await this.make()
	}
}

/** Основные файлы. [main] */
export class Files implements IMainFiles {
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

/** Основные папки. [main] */
export class Dirs implements IMainDirs {
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

/**
 * Привести ошибку файловой системы к ошибке программы.
 * @param error Ошибка.
 * @param text Текст ошибки.
 * @param formatArgs Аргументы для вставки.
 * @returns Ошибка программы.
 */
function toProgramError(error: unknown, text: ErrorText, ...formatArgs: string[]): ProgramError {
	if (error instanceof ProgramError) {
		return error
	}

	const cause = error instanceof Error
		? error
		: new Error(String(error))

	return new ProgramError(text, cause, ...formatArgs)
}

/**
 * Проверить можно ли прочитать по пути.
 * @param path Путь.
 * @returns Можно ли прочитать по пути.
 */
async function canRead(path: string): Promise<ICheckResult> {
	try {
		await access(path, constants.R_OK)

		return { result: true }
	} catch (error: any) {
		return {
			result: false,
			error
		}
	}
}

/**
 * Проверить можно ли прочитать по пути.
 * @param path Путь.
 * @returns Можно ли прочитать по пути.
 */
function canReadSync(path: string): ICheckResult {
	try {
		accessSync(path, constants.R_OK)

		return { result: true }
	} catch (error: any) {
		return {
			result: false,
			error
		}
	}
}

/**
 * Проверить можно ли записать по пути.
 * @param path Путь.
 * @returns Можно ли записать по пути.
 */
async function canWrite(path: string): Promise<ICheckResult> {
	try {
		await access(path, constants.W_OK)

		return { result: true }
	} catch (error: any) {
		return { result: false, error }
	}
}

/**
 * Проверить можно ли записать по пути.
 * @param path Путь.
 * @returns Можно ли записать по пути.
 */
function canWriteSync(path: string): ICheckResult {
	try {
		accessSync(path, constants.W_OK)

		return { result: true }
	} catch (error: any) {
		return { result: false, error }
	}
}
