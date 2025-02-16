import { Bridge } from 'emr-bridge/renderer'
import type MainMods from './main'
import type { PubType } from './public'
import { PubKeys } from './public'
import type { IMod } from './types'
import Archive from '/mods/archive/renderer'
import Dialogs from '/mods/dialogs/renderer'
import type { IDir, IFile } from '/mods/files/renderer'
import { Dirs, File } from '/mods/files/renderer'
import RendArrayBase from '/utils/json-arrays/renderer'
import { initMain, mainMethod } from '/utils/renderer'

export type * from './types'

/** Мост main-rend. */
const bridge = Bridge.as<PubType>()

/**
 * Работа с массивом модификаций.  
 * _renderer process_
 */
@initMain()
class Mods extends RendArrayBase<IMod, IMod & { file: IFile }> {
  protected override convert(item: IMod): IMod & { file: IFile } {
    return { ...item, file: new File(item.path) }
  }

  @mainMethod()
  procMods!: typeof MainMods.procMods

  /**
   * Найти `.pak` файлы модификаций в папке.
   * @param dir Папка.
   * @returns `.pak` файлы модификаций в папке.
   */
  async findMods(dir: IDir): Promise<[file: IFile, name: string][]> {
    return (await bridge[PubKeys.findMods](dir.path))
      .map(([path, name]) => [new File(path), name])
  }

  /**
   * Получить список всех модов (добавленных и в документах).
   * @returns Список всех модов (добавленных и в документах).
   */
  async getAllMods(): Promise<[file: IFile, name: string][]> {
    return (await bridge[PubKeys.getAllMods]())
      .map(([path, name]) => [new File(path), name])
  }

  /**
   * Получить ID мода из пути к файлу.
   * @param file Файл.
   * @returns ID мода.
   */
  getModID(file: IFile): string | undefined {
    return file.path.includes(Dirs.modsTemp.name)
      ? file.path
        .split(Dirs.modsTemp.name)
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
    const dirs = Dialogs.getDirs()

    if (!dirs) {
      return
    }

    const result: [file: IFile, name: string][] = []

    for (const dir of dirs) {
      result.push(...await this.findMods(dir))
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
    const paks = Dialogs.getPaks()
    const out: [IFile, string][] = []

    if (!paks) {
      return
    }
    
    for (const pak of paks) {
      await Archive.unpack(pak, Dirs.modsTemp.dir(pak.name))
      
      if (!await Dirs.modsTemp.dir(pak.name, 'classes').exists()) {
        return
      }

      out.push([pak, pak.name])
    }

    return out
  }
}

/**
 * Работа с массивом модификаций.  
 * _renderer process_
 */
export default new Mods()
