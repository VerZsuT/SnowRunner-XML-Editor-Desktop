import { loadLocalization } from '@localization/main'
import type { Config, IConfig } from '@modules/data/config/main'
import type { Dirs, Files, IDir, IFile } from '@modules/files/main'
import { di, inject } from '@utilities/di/container'
import { CONFIG_TOKEN, DIRS_TOKEN, FILES_TOKEN, LOADING_TOKEN, MESSAGES_TOKEN, MODS_TOKEN, SIZES_TOKEN } from '@utilities/di/main/tokens'
import { ARCHIVE_LOCALIZATION } from '../localization'
import { WinRAR } from './archiver'

/**
 * Работа с архивами.
 * _main process_
*/
export class Archive {
	/** Локализация. */
	private readonly texts = loadLocalization(ARCHIVE_LOCALIZATION)

	/** Архиватор. */
	private readonly archiver = new WinRAR()

	/** Конфигурация программы. */
	@inject(CONFIG_TOKEN)
	private readonly config!: Config & IConfig

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

  /** Выполняется распаковка */
  isInitialUnpacking?: Promise<void>

  /**
   * Обновить файлы в архиве.
   * @param dir Папка с файлами.
   * @param archive Обновляемый архив.
   */
  async update(dir: IDir, archive: IFile) {
    const marker = dir.file('edited')

    await this.archiver.update(dir, archive)
    await marker.make()
    await this.archiver.add(marker, archive)
    await this.saveSize(archive)
  }

  /**
   * Обновить файлы в архиве.
   * @param modName Название мода.
   */
  async updateFiles(modName?: string) {
    if (!modName) {
      return this.update(this.dirs.mainTemp, this.config.initial)
    }

		const mods = di.resolve(MODS_TOKEN)
    const mod = mods.find(mod => mod.name === modName)

    if (!mod) {
			const messages = di.resolve(MESSAGES_TOKEN)

      messages.error(`Mod '${modName}' not found`)

      return
    }

    await this.update(this.dirs.modsTemp.dir(modName), this.files.new(mod.path))
  }

  /**
   * Распаковать файлы из архива в папку.
   * @param archive Распаковываемый архив.
   * @param dir Папка, в которую будет распаковываться архив.
   */
  async unpack(archivePath: string, dirPath: string) {
		const dir = this.dirs.new(dirPath)
		const archive = this.files.new(archivePath)

    await dir.remove()
    await this.archiver.unpack(archive, dir)
  }

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak`.
   * @param hideLoading Скрывать окно загрузки после окончания.
   */
  async unpackMain(hideLoading = true) {
    return this.isInitialUnpacking = (async() => {
			const loading = di.resolve(LOADING_TOKEN)

      loading.init(this.texts.unpacking, undefined, hideLoading)

      await this.dirs.mainTemp.clear()
      await this.unpack(this.config.initial.path, this.dirs.mainTemp.path)
      await this.saveSize(this.config.initial)

      loading.completeStage()
    })()
  }

  /**
   * Распаковать XML файлы из архива модификации.
   * @param archive Архив модификации.
   * @param name Название модификации.
   */
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
    const size = await archive.getSize()

    if (!this.config.initialPath || archive.path === this.config.initialPath) {
      sizes.initial = size
    } else {
      sizes.setModSize(archive, size)
    }
  }
}
