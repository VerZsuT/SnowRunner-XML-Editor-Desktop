import { providePublic, publicField, publicMethod } from '@bridge/main'
import { Dir, Dirs } from '@modules/files/main'
import type { IDir, IFile, IFindDirsArgs, IFindFilesArgs } from '@modules/main'
import ArrayBase from '@utilities/json-arrays/base'
import type { IDLC } from './types'

export type * from './types'

/**
 * Работа с дополнениями игры.
 * _main process_
 */
@providePublic()
class DLCs extends ArrayBase<IDLC, IDLC & { dir: IDir }> {
  @publicField()
  protected accessor arr: IDLC[] = []

  protected override convert(item: IDLC): IDLC & { dir: IDir } {
    return { ...item, dir: new Dir(item.path) }
  }

  /** Инициализировать класс. */
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

  /** Сбросить массив до исходного состояния. */
  @publicMethod()
  reset() {
    this.set(this.default)
  }

  /**
   * Найти файлы.
   * @param args Аргументы поиска.
   * @returns Файлы.
   */
  async findFiles(args: IFindFilesArgs): Promise<IFile[]> {
    return Dirs.dlc.findFiles(args)
  }

  /**
   * Найти папки.
   * @param args Аргументы поиска.
   * @returns Папки.
   */
  async findDirs(args: IFindDirsArgs): Promise<IDir[]> {
    return Dirs.dlc.findDirs(args)
  }
}

/**
 * Работа с дополнениями игры.
 * _main process_
 */
export default new DLCs()
