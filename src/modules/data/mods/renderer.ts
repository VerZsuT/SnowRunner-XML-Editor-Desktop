import { Bridge } from 'emr-bridge/renderer'
import type { PubType } from './public'
import { PubKeys } from './public'
import type { IMod } from './types'
import Archive from '/mods/archive/renderer'
import Dialogs from '/mods/dialogs/renderer'
import type { Dir } from '/mods/files/renderer'
import { Dirs, File } from '/mods/files/renderer'
import RendArrayBase from '/utils/json-arrays/renderer'
import { initMain } from '/utils/renderer'

export type * from './types'

/** Мост main-rend */
const Main = Bridge.as<PubType>()

/**
 * Работа с массивом модификаций  
 * _renderer process_
*/
@initMain()
class Mods extends RendArrayBase<IMod, IMod & { file: File }> {
  protected override convert(item: IMod): IMod & { file: File } {
    return { ...item, file: new File(item.path) }
  }

  /** Находит `.pak` файл модификаций в папке */
  async findMods(dir: Dir): Promise<[file: File, name: string][]> {
    return (await Main[PubKeys.findMods](dir.path))
      .map(([path, name]) => [new File(path), name])
  }

  /** Возвращает список всех модов (добавленных и в документах) */
  async getAllMods(): Promise<[file: File, name: string][]> {
    return (await Main[PubKeys.getAllMods]())
      .map(([path, name]) => [new File(path), name])
  }

  /** Находит ID мода из пути к файлу */
  getModID(file: File): string | undefined {
    return file.path.includes(Dirs.modsTemp.name)
      ? file.path
        .split(Dirs.modsTemp.name)
        .at(1)
        ?.split('\\')
        .at(1)
      : undefined
  }

  /** Находит мод по названию */
  findByName(name: string): IMod | undefined {
    return this.find(mod => mod.name === name)
  }

  /** Находит мод по xml файлу */
  findByFile(file: File): IMod | undefined {
    const modName = this.getModID(file)

    return modName
      ? this.findByName(modName)
      : undefined
  }

  /** Запрашивает у пользователя `.pak` файлы модов */
  async request() {
    return await this.getModPaks()
  }

  /** Запрашивает у пользователя папки с модами */
  async requestDirs() {
    const dirs = Dialogs.getDirs()

    if (!dirs) {
      return
    }

    const result: [file: File, name: string][] = []

    for (const dir of dirs) {
      result.push(...await this.findMods(dir))
    }

    return result
  }

  /** Сохраняет моды из вариантов `Select` */
  saveFromSelect(keys: string[], items: [File, string][]) {
    this.set(this.fromSelectKeys(keys, items))
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

export default new Mods()
