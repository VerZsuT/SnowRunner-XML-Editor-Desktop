import { Bridge } from 'emr-bridge/renderer'

import type { Dir } from '/mods/files/renderer'
import { Dirs, File } from '/mods/files/renderer'
import RendArrayBase from '/utils/json-arrays/renderer'

import type { PubType } from './public'
import { PubKeys } from './public'
import type { IMod } from './types'

import Archive from '/mods/archive/renderer'
import Dialogs from '/mods/dialogs/renderer'

export type * from './types'

/** Мост main-rend */
const Main = Bridge.as<PubType>()

type ArrayType = PubType[PubKeys.array]

/**
 * Работа с массивом модификаций  
 * _renderer process_
*/
class Mods extends RendArrayBase<ArrayType[number], ArrayType[number] & { file: File }> {
  constructor() {
    super(
      PubKeys.array,
      PubKeys.onMainChange,
      PubKeys.rendererChangeEvent,
      PubKeys.reset,
      PubKeys.save
    )
  }

  protected override convert(item: IMod): IMod & { file: File } {
    return { ...item, file: new File(item.path) }
  }

  /** Находит `.pak` файл модификаций в папке */
  async findMods(dir: Dir): Promise<[file: File, name: string][]> {
    const result = await Main[PubKeys.findMods](dir.path)
    return result.map(([path, name]) => [new File(path), name])
  }

  /** Возвращает список всех модов (добавленных и в документах) */
  async getAllMods(): Promise<[file: File, name: string][]> {
    const result = await Main[PubKeys.getAllMods]()
    return result.map(([path, name]) => [new File(path), name])
  }

  /** Находит ID мода из пути к файлу */
  getModID(file: File): string | undefined {
    if (!file.path.includes(Dirs.modsTemp.name)) return
    return file.path.split(Dirs.modsTemp.name).at(1)?.split('\\').at(1)
  }

  /** Находит мод по названию */
  findByName(name: string): IMod | undefined {
    return this.find(mod => mod.name === name)
  }

  /** Находит мод по xml файлу */
  findByFile(file: File): IMod | undefined {
    const modName = this.getModID(file)
    return modName ? this.findByName(modName) : undefined
  }

  /** Запрашивает у пользователя `.pak` файлы модов */
  async request() {
    const result = await this.getModPaks()
    if (!result) return
    return result
  }

  /** Запрашивает у пользователя папки с модами */
  async requestDirs() {
    const dirs = Dialogs.getDirs()
    if (!dirs) return

    const result: [file: File, name: string][] = []
    for (const dir of dirs) {
      result.push(...await this.findMods(dir))
    }

    return result
  }

  /** Сохраняет моды из вариантов `Select` */
  saveFromSelect(keys: string[], items: [File, string][]) {
    const selected = this.fromSelectKeys(keys, items)
    this.set(selected)
  }

  /** Преобразует в варианты `Select` */
  toSelectKeys(items: [File, string][]): string[] {
    return items.map(item => item[0].path)
  }

  /** Преобразует варианты `Select` в `IMod` */
  fromSelectKeys(keys: string[], items: [File, string][]): IMod[] {
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

  /** Получить `.pak` модификаций */
  private async getModPaks(): Promise<[File, string][] | undefined> {
    const paks = Dialogs.getPaks()
    const out: [File, string][] = []
    if (!paks) return
    
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

export default new Mods()
