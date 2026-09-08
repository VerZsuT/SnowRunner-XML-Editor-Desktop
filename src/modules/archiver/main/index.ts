import { loadLocalization } from '@localization/main'
import type { IDir, IDirs, IFile, IFiles } from '@modules/files/types'
import { di, inject } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, FILES_TOKEN, LOADING_TOKEN, MESSAGES_TOKEN, MODS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
import { ARCHIVE_LOCALIZATION } from '../localization'
import type { IMainArchiver } from '../types'
import { WinRAR } from './archiver'
import type { ISystemArchiver } from './archiver/types'

/** Работа с архивами. [main] */
export class Archive implements IMainArchiver {
	/** Локализация. */
	private readonly texts = loadLocalization(ARCHIVE_LOCALIZATION)

	/** Архиватор. */
	private readonly archiver: ISystemArchiver = new WinRAR()

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: IDirs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: IFiles

	isInitialUnpacking?: Promise<void>

	async update(dir: IDir, archive: IFile) {
		const marker = dir.file('edited')

		await this.archiver.update(dir, archive)
		await marker.make()
		await this.archiver.add(marker, archive)
		await this.saveSize(archive)
	}

	async updateFiles(modName?: string) {
		if (!modName) {
			return this.update(this.dirs.mainTemp, this.files.initial)
		}

		const mods = di.resolve(MODS_TOKEN)
		const mod = mods.find(mod => mod.name === modName)

		if (!mod) {
			const messages = di.resolve(MESSAGES_TOKEN)

			messages.error(`Mod '${modName}' not found`)

			return
		}

		await this.update(this.dirs.modsTemp.dir(modName), this.files.newFile(mod.path))
	}

	async unpack(archivePath: string, dirPath: string) {
		const dir = this.dirs.newDir(dirPath)
		const archive = this.files.newFile(archivePath)

		await dir.remove()
		await this.archiver.unpack(archive, dir)
	}

	async unpackMain(hideLoading = true) {
		return this.isInitialUnpacking = (async() => {
			const loading = di.resolve(LOADING_TOKEN)
			const initial = this.files.initial

			loading.init(this.texts.unpacking, undefined, hideLoading)

			await this.dirs.mainTemp.clear()
			await this.unpack(initial.path, this.dirs.mainTemp.path)
			await this.saveSize(initial)

			loading.completeStage()
		})()
	}

	async unpackMod(archive: IFile, name: string) {
		const modDir = this.dirs.modsTemp.dir(name)

		await this.dirs.modsTemp.make()
		await modDir.clear()
		await this.saveSize(archive)
		await this.unpack(archive.path, modDir.path)
	}

	/**
	 * Сохранить размер архива для фиксации изменений извне.
	 * @param archive Архив, размер которого будет сохранён.
	 */
	private async saveSize(archive: IFile) {
		const sizes = di.resolve(SIZES_TOKEN)
		const config = di.resolve(CONFIG_TOKEN)
		const size = await archive.getSize()

		if (!config.initialPath || archive.path === config.initialPath) {
			sizes.initial = size
		} else {
			sizes.setModSize(archive, size)
		}
	}
}
