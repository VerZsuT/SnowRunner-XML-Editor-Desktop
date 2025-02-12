import type { IDLC } from './types'
import type { File, IFindDirsArgs, IFindFilesArgs } from '/mods/files/main'
import { Dir, Dirs } from '/mods/files/main'
import { providePublic, publicField, publicMethod } from '/utils/bridge/main'
import ArrayBase from '/utils/json-arrays/base'

export type * from './types'

/**
 * Работа с дополнениями игры  
 * _main process_
*/
@providePublic()
class DLCs extends ArrayBase<IDLC, IDLC & { dir: Dir }> {
  @publicField()
  protected accessor arr: IDLC[] = []

  protected override convert(item: IDLC): IDLC & { dir: Dir } {
    return { ...item, dir: new Dir(item.path) }
  }

  /** Инициализация объекта */
  async init() {
    const dlcs: IDLC[] = []

    for (const entry of await Dirs.dlc.read()) {
      if (await entry.isFile()) {
        continue
      }

      dlcs.push({ name: entry.asDir().name, path: entry.path })
    }

    this.set(dlcs)
  }

  /** Сбрасывает массив до исходного состояния */
  @publicMethod()
  reset() {
    this.set(this.default)
  }

  /** Поиск файлов */
  async findFiles(args: IFindFilesArgs): Promise<File[]> {
    return Dirs.dlc.findFiles(args)
  }

  /** Поиск папок */
  async findDirs(args: IFindDirsArgs): Promise<Dir[]> {
    return Dirs.dlc.findDirs(args)
  }
}

export default new DLCs()
