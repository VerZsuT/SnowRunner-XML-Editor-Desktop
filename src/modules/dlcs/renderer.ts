import { reactive } from 'vue'

import type { File, IFindDirsArgs, IFindFilesArgs } from '/mods/files/renderer'
import { Dir, Dirs } from '/mods/files/renderer'

import { Keys } from './public'
import type { IDLC } from './types'

import { RendArrayBase } from '/utils/renderer'

export type * from './types'

/**
 * Работа с дополнениями игры  
 * _renderer process_
*/
class DLCs extends RendArrayBase<IDLC, IDLC & { dir: Dir }> {
  protected override arrayKey = Keys.array
  protected override onChangeKey = Keys.onMainChange
  protected override emitChangeKey = Keys.rendererChangeEvent
  protected override resetKey = Keys.reset
  protected override saveKey = 'unavailable'

  constructor() { super(); this.init() }

  protected override convert(item: IDLC): IDLC & { dir: Dir } {
    return { ...item, dir: new Dir(item.path) }
  }

  override async save() {}

  getDLC(file: File): string | undefined {
    if (!file.path.includes(Dirs.dlc.name)) return
    return file.path.split(Dirs.dlc.name).at(1)?.split('\\').at(1)
  }

  /** Поиск файлов */
  async findFiles(args: IFindFilesArgs): Promise<File[]> {
    return await Dirs.dlc.findFiles(args)
  }

  /** Поиск папок */
  async findDirs(args: IFindDirsArgs): Promise<Dir[]> {
    return await Dirs.dlc.findDirs(args)
  }
}

export default reactive(new DLCs()) as DLCs
