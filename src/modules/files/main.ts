import { ProgramError } from '@modules/errors/main'
import type { IPaths } from '@modules/paths/main'
import { di, inject } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, PATHS_TOKEN } from '@utilities/di/main/tokens'
import { execFile, execSync } from 'node:child_process'
import type { WatchListener } from 'node:fs'
import { accessSync, existsSync, lstatSync, mkdirSync, readFileSync, rmSync, watch, writeFileSync } from 'node:fs'
import { access, chmod, constants, copyFile, lstat, readdir, rename } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import { ErrorText } from '../errors/enums'
import type { XMLElement } from '../xml/renderer'
import type { ICheckResult, IDir, IDirs, IFile, IFiles, IFindDirsArgs, IFindFilesArgs, IFSEntry } from './types'

export type * from './types'

/** Сущность в файловой системе. [main] */
export class FSEntry implements IFSEntry {
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
		return existsSync(this.path)
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

	chmod(mod: number) {
		return chmod(this.path, mod)
	}

	async isDir(): Promise<boolean> {
		return this.isDirSync()
	}

	isDirSync(): boolean {
		return lstatSync(this.path).isDirectory()
	}

	async isFile(): Promise<boolean> {
		return (await lstat(this.path)).isFile()
	}

	async remove() {
		return this.removeSync()
	}

	removeSync() {
		if (!this.existsSync()) {
			return
		}

		try {
			if (this.isDirSync()) {
				execSync(`rmdir /s /q "${this.path}"`)
			} else {
				rmSync(this.path, { maxRetries: 5, retryDelay: 100 })
			}
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
			await rename(this.path, path)
		} catch (error: any) {
			throw new ProgramError(ErrorText.moveError, error, this.path, path)
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
		} catch (error: any) {
			throw new ProgramError(ErrorText.renameError, error, this.basename(), newName)
		}
	}
}

/** Папка в файловой системе. [main] */
export class Dir extends FSEntry implements IDir {
	get name() {
		return this.basename()
	}

	dir(...path: string[]) {
		return new Dir(join(this.path, join(...path)))
	}

	file(...path: string[]) {
		return new File(join(this.path, join(...path)))
	}

	entry(...path: string[]) {
		return new FSEntry(join(this.path, join(...path)))
	}

	async read(): Promise<FSEntry[]> {
		if (!await this.exists()) {
			return []
		}

		try {
			return (await readdir(this.path)).map(name => this.entry(name))
		} catch (error: any) {
			throw new ProgramError(ErrorText.readDirError, error, this.path)
		}
	}

	async make() {
		return this.makeSync()
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
		const result: File[] = []

		if (!name && !ext) {
			return []
		}

		for (const entry of await this.read()) {
			if (await entry.isDir() && recursive) {
				result.push(...await entry.asDir().findFiles(args))

				continue
			}

			const file = entry.asFile()

			if (file.name === name || (ext && file.isExt(ext))) {
				result.push(file)
			}
		}

		return result
	}

	async findDirs(args: IFindDirsArgs): Promise<Dir[]> {
		const { name, recursive } = args
		const result: Dir[] = []

		for (const entry of await this.read()) {
			if (await entry.isFile()) {
				continue
			}

			const dir = entry.asDir()

			if (dir.name === name) {
				result.push(dir)
			}

			if (recursive) {
				result.push(...await dir.findDirs(args))
			}
		}

		return result
	}
}

/** Файл в файловой системе. [main] */
export class File extends FSEntry implements IFile {
	get extname(): string {
		return extname(this.path)
	}

	get name(): string {
		return basename(this.path, this.extname)
	}

	isExt(extension: string): boolean {
		return this.extname.split('.')[1] === extension
	}

	watch(listener: WatchListener<string>) {
		return watch(this.path, { persistent: false }, listener)
	}

	async exec() {
		const execResult = await canExecute(this.path)

		if (!execResult.result) {
			throw new ProgramError(ErrorText.executeFileError, execResult.error, this.path)
		}

		return execFile(this.path)
	}

	async getSize(): Promise<number> {
		return (await lstat(this.path)).size
	}

	async read(encoding?: BufferEncoding): Promise<string> {
		return this.readSync(encoding)
	}

	readSync(encoding?: BufferEncoding): string {
		const readResult = canReadSync(this.path)

		if (!readResult.result) {
			throw new ProgramError(ErrorText.readFileError, readResult.error, this.path)
		}

		return readFileSync(this.path, { encoding }).toString()
	}

	async readFromJSON<T extends object = any>() {
		return this.readFromJSONSync<T>()
	}

	readFromJSONSync<T extends object = any>() {
		return <T>JSON.parse(this.readSync())
	}

	readFromXML(): Promise<XMLElement | undefined> {
		throw new Error('Method unavailable in main process.')
	}

	async write(data: string, encoding?: BufferEncoding) {
		return this.writeSync(data, encoding)
	}

	writeSync(data: string, encoding?: BufferEncoding) {
		this.makeSync()

		const writeResult = canWriteSync(this.path)

		if (!writeResult.result) {
			throw new ProgramError(ErrorText.writeFileError, writeResult.error, this.path)
		}

		writeFileSync(this.path, data, encoding)
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
			await copyFile(this.path, path)
		} catch (error: any) {
			throw new ProgramError(ErrorText.copyFileError, error, this.path, path)
		}
	}

	async make() {
		return this.makeSync()
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

/** Основные папки. [main] */
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

/**
 * Проверить можно ли прочитать по пути.
 * @param path Путь.
 * @returns Можно ли прочитать по пути.
 */
async function canRead(path: string): Promise<ICheckResult> {
	return canReadSync(path)
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
	return canWriteSync(path)
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

/**
 * Проверить можно ли исполнить по пути.
 * @param path Путь.
 * @returns Можно ли исполнить по пути.
 */
async function canExecute(path: string): Promise<ICheckResult> {
	try {
		await access(path, constants.X_OK)
		return { result: true }
	} catch (error: any) {
		return { result: false, error }
	}
}
