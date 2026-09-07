import type { Dialogs } from '@modules/dialogs/renderer'
import type { Dirs, Files, IDir, IFile } from '@modules/files/renderer'
import { initMain, mainMethod } from '@utilities/bridge/renderer'
import { di, inject } from '@utilities/di/container'
import { ARCHIVE_TOKEN, DIALOGS_TOKEN, DIRS_TOKEN, FILES_TOKEN } from '@utilities/di/renderer/tokens'
import { RendArrayBase } from '@utilities/json-arrays/renderer'
import { Bridge } from 'emr-bridge/renderer'
import type { Mods as ModsMain } from './main'
import type { PubType } from './public'
import { PubKeys } from './public'
import type { IMod } from './types'

export type * from './types'

/**
 * Работа с массивом модификаций.
 * _renderer process_
 */
@initMain()
export class Mods extends RendArrayBase<IMod, IMod & { file: IFile }> {
	/** Мост main-rend. */
	private readonly bridge = Bridge.as<PubType>()

	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

	/** Основные файлы. */
	@inject(FILES_TOKEN)
	private readonly files!: Files

	/** Диалоги. */
	@inject(DIALOGS_TOKEN)
	private readonly dialogs!: Dialogs

  protected override convert(item: IMod): IMod & { file: IFile } {
    return { ...item, file: this.files.new(item.path) }
  }

	/** Обработать добавленные моды. */
  @mainMethod()
  procMods!: ModsMain['procMods']

  /**
   * Найти `.pak` файлы модификаций в папке.
   * @param dir Папка.
   * @returns `.pak` файлы модификаций в папке.
   */
  async findMods(dir: IDir): Promise<[file: IFile, name: string][]> {
    return (await this.bridge[PubKeys.findMods](dir.path))
      .map(([path, name]) => [this.files.new(path), name])
  }

  /**
   * Получить список всех модов (добавленных и в документах).
   * @returns Список всех модов (добавленных и в документах).
   */
  async getAllMods(): Promise<[file: IFile, name: string][]> {
    return (await this.bridge[PubKeys.getAllMods]())
      .map(([path, name]) => [this.files.new(path), name])
  }

  /**
   * Получить ID мода из пути к файлу.
   * @param file Файл.
   * @returns ID мода.
   */
  getModID(file: IFile): string | undefined {
    return file.path.includes(this.dirs.modsTemp.name)
      ? file.path
        .split(this.dirs.modsTemp.name)
        .at(1)
        ?.split('\\')
        .at(1)
      : undefined
  }

  /**
   * Найти мод по названию.
   * @param name Название.
   * @returns Мод.
   */
  findByName(name: string): IMod | undefined {
    return this.find(mod => mod.name === name)
  }

  /**
   * Найти мод по XML файлу.
   * @param file XML файл.
   * @returns Мод.
   */
  findByFile(file: IFile): IMod | undefined {
    const modName = this.getModID(file)

    return modName
      ? this.findByName(modName)
      : undefined
  }

  /**
   * Запросить у пользователя `.pak` файлы модов.
   * @returns Выбранные `.pak` файлы модов.
   */
  async requestPaks() {
    return await this.getModPaks()
  }

  /**
   * Запросить у пользователя папки с модами.
   * @returns Выбранные папки с модами.
  */
  async requestDirs() {
    const dirPaths = this.dialogs.getDirs()

    if (!dirPaths) {
      return
    }

    const result: [file: IFile, name: string][] = []

    for (const dirPath of dirPaths) {
      result.push(...await this.findMods(this.dirs.new(dirPath)))
    }

    return result
  }

  /**
   * Сохранить моды из вариантов `Select`.
   * @param keys Ключи.
   * @param items Элементы.
   */
  saveFromSelect(keys: string[], items: [IFile, string][]) {
    this.set(this.fromSelectKeys(keys, items))
  }

  /**
   * Преобразовать в варианты `Select`.
   * @param items Элементы.
   * @returns Варианты `Select`.
   */
  toSelectKeys(items: [IFile, string][]): string[] {
    return items.map(item => item[0].path)
  }

  /**
   * Преобразовать варианты `Select` в `IMod`.
   * @param keys Ключи.
   * @param items Элементы.
   * @returns Модификации.
   */
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

		const archive = di.resolve(ARCHIVE_TOKEN)

    for (const pakPath of pakPaths) {
			const pakFile = this.files.new(pakPath)

      await archive.unpack(pakPath, this.dirs.modsTemp.dir(pakFile.name).path)

      if (!await this.dirs.modsTemp.dir(pakFile.name, 'classes').exists()) {
        return
      }

      out.push([pakFile, pakFile.name])
    }

    return out
  }
}
