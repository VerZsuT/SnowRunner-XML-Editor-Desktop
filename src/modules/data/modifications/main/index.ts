import type { IMainArchiver } from '@modules/archiver/types'
import type { IMainDir as IDir, IMainDirs as IDirs, IMainFile as IFile, IMainFiles as IFiles } from '@modules/files/types'
import { makeReactive } from '@utilities/bridge/main'
import { hasItems } from '@utilities/checks/main'
import { di, inject } from '@utilities/di/container'
import { ARCHIVER_TOKEN, CONFIG_TOKEN, DIRS_TOKEN, ENV_TOKEN, FILES_TOKEN, GAME_TEXTS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
import { BaseMainArray } from '@utilities/json-arrays/main'
import { processNameForFilesystem } from '@utilities/strings/main'
import { homedir, userInfo } from 'node:os'
import type { IMainMods, IMod } from '../types'

/** Работа с массивом модификаций. [main] */
export class Mods extends BaseMainArray<IMod, IMod & { file: IFile }> implements IMainMods {
	/** Архиватор. */
	@inject(ARCHIVER_TOKEN)
	private readonly archiver!: IMainArchiver

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	protected override jsonFile = this.files.mods

	constructor() {
		super()
		makeReactive(this, 'Mods', 'arr')
		this.init()
	}

	override convert(item: IMod): IMod & { file: IFile } {
		return { ...item, file: this.files.newFile(item.path) }
	}

	async procMods() {
		const config = di.resolve(CONFIG_TOKEN)

		if (!config.useMods || !hasItems(this)) {
			return
		}

		const sizes = di.resolve(SIZES_TOKEN)
		const deleteFromList = (name: string) => {
			this.findAndRemove(mod => mod.name === name)
		}

		for (const { file, name } of this.converted) {
			try {
				if (!await file.exists()) {
					deleteFromList(name)

					continue
				}

				const hasPermissions = await file.hasPermissions()

				if (!hasPermissions) {
					deleteFromList(name)

					continue
				}

				const sizeChanged = await file.getSize() !== sizes.getModSize(file)
				const hasDir = await this.dirs.modsTemp.dir(name).exists()

				if (!sizeChanged && hasDir) {
					continue
				}

				await this.archiver.unpackMod(file, name)
				const hasClasses = await this.dirs.modsTemp.dir(name, 'classes').exists()

				if (!hasClasses) {
					deleteFromList(name)
				}
			} catch (error: any) {
				// Один повреждённый мод не должен блокировать запуск программы.
				console.error(`Cannot process mod '${name}'`, error)
				deleteFromList(name)
			}
		}

		const gameTexts = di.resolve(GAME_TEXTS_TOKEN)

		await gameTexts.initFromMods()
	}

	async findMods(dir: IDir): Promise<[IFile, name: string][]> {
		const out: [IFile, string][] = []

		if (!await dir.exists()) {
			return []
		}

		const processFile = async(file: IFile, dir: IDir) => {
			if (out.some(([outFile]) => outFile.path === file.path)) {
				return
			}

			if (!file.isExt('pak')) {
				return
			}

			const tempDir = this.dirs.modsTemp.dir(file.name)

			try {
				await this.archiver.unpack(file.path, tempDir.path)

				if (!await tempDir.dir('classes').exists()) {
					await tempDir.remove()

					return
				}

				const modioFile = dir.file('modio.json')
				let name = file.name

				if (await modioFile.exists()) {
					try {
						const modioData = await modioFile.readFromJSON()
						const modIoName = modioData?.name

						if (typeof modIoName === 'string' && modIoName.trim()) {
							const procedName = processNameForFilesystem(modIoName)

							if (!out.some(([, fileName]) => fileName === procedName)) {
								name = modIoName
							}
						}
					} catch (error: any) {
						console.error(`Cannot read modio.json in '${dir.path}'`, error)
					}
				}

				out.push([file, processNameForFilesystem(name)])
			} catch (error: any) {
				console.error(`Cannot unpack mod '${file.path}'`, error)
			}
		}

		for (const entry of await dir.read()) {
			if (await entry.isFile()) {
				await processFile(entry.asFile() as IFile, dir)
			} else {
				const innerDir = entry.asDir() as IDir

				for (const innerEntry of await innerDir.read()) {
					if (await innerEntry.isDir()) {
						continue
					}

					await processFile(innerEntry.asFile() as IFile, innerDir)
				}
			}
		}

		return out
	}

	async getAllMods(): Promise<[IFile, string][]> {
		const env = di.resolve(ENV_TOKEN)
		let homeDir = ''

		try {
			homeDir = userInfo().homedir
		} catch (error: any) {
			console.error('Cannot get user info', error)
		}

		if (!homeDir) {
			try {
				homeDir = homedir()
			} catch (error: any) {
				console.error('Cannot get home directory', error)
			}
		}

		homeDir ||= env.home || ''

		const userDir = this.dirs.newDir(homeDir)
		const out: [IFile, string][] = []

		if (homeDir && await userDir.exists()) {
			let existedDir: IDir | undefined

			const getModsDir = (gamesDir: string) => `Documents/${gamesDir}/SnowRunner/base/Mods/.modio/mods`
			const dirs = [
				userDir.dir(getModsDir('My Games')),
				userDir.dir(getModsDir('my games')),
				userDir.dir(getModsDir('mygames')),
				userDir.dir(getModsDir('MyGames'))
			]

			for (const dir of dirs) {
				if (await dir.exists()) {
					existedDir = dir

					break
				}
			}

			if (existedDir) {
				out.push(...await this.findMods(existedDir))
			}
		}

		for (const mod of this) {
			let isExists = false

			for (const [foundedMod] of out) {
				if (foundedMod.path === mod.path) {
					isExists = true
				}
			}

			if (!isExists) {
				out.push([mod.file, mod.name])
			}
		}

		return out
	}
}