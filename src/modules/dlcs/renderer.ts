import type { IDLC } from './types'
import type { File, IFindDirsArgs, IFindFilesArgs } from '/mods/files/renderer'
import { Dir, Dirs } from '/mods/files/renderer'
import { initMain, RendArrayBase } from '/utils/renderer'

export type * from './types'

/**
 * Работа с дополнениями игры  
 * _renderer process_
*/
@initMain()
class DLCs extends RendArrayBase<IDLC, IDLC & { dir: Dir }> {
  protected override convert(item: IDLC): IDLC & { dir: Dir } {
    return { ...item, dir: new Dir(item.path) }
  }

  override save = async () => {}

  /** Возвращает название DLC */
  getDLC(file: File): string | undefined {
    return file.path.includes(Dirs.dlc.name)
      ? file.path
        .split(Dirs.dlc.name)
        .at(1)
        ?.split('\\')
        .at(1)
      : undefined
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
