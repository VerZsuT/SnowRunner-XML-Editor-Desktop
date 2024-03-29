import { publicFunction, publicMainEvent, publicRendererEvent, publicVariable } from 'emr-bridge'

import ArrayBase from '/utils/json-arrays/base'

import { PubKeys } from './public'
import type { IDLC } from './types'

import type { File, IFindDirsArgs, IFindFilesArgs } from '/mods/files/main'
import { Dir, Dirs } from '/mods/files/main'

export type * from './types'

/**
 * Работа с дополнениями игры  
 * _main process_
*/
class DLCs extends ArrayBase<IDLC, IDLC & { dir: Dir }> {
  protected override emitChangeEvent = publicMainEvent<[IDLC[]]>(PubKeys.mainChangeEvent)
  protected override onChangeEvent = publicRendererEvent<IDLC[]>(PubKeys.onRendererChange)

  protected override convert(item: IDLC): IDLC & { dir: Dir } {
    return { ...item, dir: new Dir(item.path) }
  }

  constructor() { super(); this.initPublic() }

  /** Инициализация объекта */
  async init() {
    const dlcs: IDLC[] = []

    for (const entry of await Dirs.dlc.read()) {
      if (await entry.isFile()) continue
      dlcs.push({ name: entry.asDir().name, path: entry.path })
    }

    this.set(dlcs)
  }

  /** Сбрасывает массив до исходного состояния */
  reset() {
    this.set(this.default)
  }

  /** Поиск файлов */
  async findFiles(args: IFindFilesArgs): Promise<File[]> {
    return await Dirs.dlc.findFiles(args)
  }

  /** Поиск папок */
  async findDirs(args: IFindDirsArgs): Promise<Dir[]> {
    return await Dirs.dlc.findDirs(args)
  }

  /** Инициализация публичных объектов/методов */
  private initPublic() {
    publicVariable(PubKeys.array, {
      get: this.get.bind(this),
      set: this.set.bind(this)
    })
    publicFunction(PubKeys.reset, this.reset.bind(this))
  }
}

export default new DLCs()
