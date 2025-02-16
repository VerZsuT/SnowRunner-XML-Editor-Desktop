import type { IDLC } from './types'
import type { IDir, IFile, IFindDirsArgs, IFindFilesArgs } from '/mods/files/renderer'
import { Dir, Dirs } from '/mods/files/renderer'
import { initMain, RendArrayBase } from '/utils/renderer'

export type * from './types'

/**
 * Работа с дополнениями игры.  
 * _renderer process_
 */
@initMain()
class DLCs extends RendArrayBase<IDLC, IDLC & { dir: IDir }> {
  protected override convert(item: IDLC): IDLC & { dir: IDir } {
    return { ...item, dir: new Dir(item.path) }
  }

  override save = async () => {}

  /**
   * Получить название DLC.
   * @param file Файл.
   * @returns Название DLC.
   */
  getDLC(file: IFile): string | undefined {
    return file.path.includes(Dirs.dlc.name)
      ? file.path
        .split(Dirs.dlc.name)
        .at(1)
        ?.split('\\')
        .at(1)
      : undefined
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
 * _renderer process_
 */
export default new DLCs()
