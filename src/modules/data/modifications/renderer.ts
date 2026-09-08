import type { IRendererDialogs } from '@modules/dialogs/types'
import type { IDir, IDirs, IFile, IFiles } from '@modules/files/types'
import { initMain, mainMethod } from '@utilities/bridge/renderer'
import { di, inject } from '@utilities/di/container'
import { ARCHIVER_TOKEN, DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN } from '@utilities/di/renderer/tokens'
import { BaseRendererArray } from '@utilities/json-arrays/renderer'
import { Bridge } from 'emr-bridge/renderer'
import type { Mods as ModsMain } from './main'
import type { PubType } from './public'
import { PubKeys } from './public'
import type { IMod, IRendererMods } from './types'

/** Работа с массивом модификаций. [renderer] */
@initMain()
export class Mods extends BaseRendererArray<IMod, IMod & { file: IFile }> implements IRendererMods {
	/** Мост main-rend. */
	private readonly bridge = Bridge.as<PubType>()

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	/** Диалоги. */
	@inject(DIALOGS_TOKEN)
	private readonly dialogs!: IRendererDialogs

	override convert(item: IMod): IMod & { file: IFile } {
		return { ...item, file: this.files.newFile(item.path) }
	}

	@mainMethod()
	procMods!: ModsMain['procMods']

	async findMods(dir: IDir): Promise<[file: IFile, name: string][]> {
		return (await this.bridge[PubKeys.findMods](dir.path))
			.map(([path, name]) => [this.files.newFile(path), name])
	}

	async getAllMods(): Promise<[file: IFile, name: string][]> {
		return (await this.bridge[PubKeys.getAllMods]())
			.map(([path, name]) => [this.files.newFile(path), name])
	}

	getModID(file: IFile): string | undefined {
		return file.path.includes(this.dirs.modsTemp.name)
			? file.path
				.split(this.dirs.modsTemp.name)
				.at(1)
				?.split('\\')
				.at(1)
			: undefined
	}

	findByName(name: string): IMod | undefined {
		return this.find(mod => mod.name === name)
	}

	findByFile(file: IFile): IMod | undefined {
		const modName = this.getModID(file)

		return modName
			? this.findByName(modName)
			: undefined
	}

	async requestPaks() {
		return await this.getModPaks()
	}

	async requestDirs() {
		const dirPaths = this.dialogs.getDirs()

		if (!dirPaths) {
			return
		}

		const result: [file: IFile, name: string][] = []

		for (const dirPath of dirPaths) {
			result.push(...await this.findMods(this.dirs.newDir(dirPath)))
		}

		return result
	}

	saveFromSelect(keys: string[], items: [IFile, string][]) {
		this.set(this.fromSelectKeys(keys, items))
	}

	toSelectKeys(items: [IFile, string][]): string[] {
		return items.map(item => item[0].path)
	}

	fromSelectKeys(keys: string[], items: [IFile, string][]): IMod[] {
		const out: IMod[] = []

		for (const key of keys) {
			for (const [file, name] of items) {
				if (file.path === key) {
					out.push({
						fileName: file.basename(),
						path: file.path,
						name
					})
				}
			}
		}

		return out
	}

	/**
	 * Получить `.pak` файлы модификаций.
	 * @returns `.pak` файлы модификаций.
	 */
	private async getModPaks(): Promise<[IFile, string][] | undefined> {
		const pakPaths = this.dialogs.getPaks()
		const out: [IFile, string][] = []

		if (!pakPaths) {
			return
		}

		const archiver = di.resolve(ARCHIVER_TOKEN)

		for (const pakPath of pakPaths) {
			const pakFile = this.files.newFile(pakPath)

			await archiver.unpack(pakPath, this.dirs.modsTemp.dir(pakFile.name).path)

			if (!await this.dirs.modsTemp.dir(pakFile.name, 'classes').exists()) {
				return
			}

			out.push([pakFile, pakFile.name])
		}

		return out
	}
}
