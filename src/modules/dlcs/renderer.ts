import { initMain } from '@bridge/renderer'
import type { Dirs, IDir, IFile, IFindDirsArgs, IFindFilesArgs } from '@modules/files/renderer'
import { inject } from '@utilities/di/container'
import { DIRS_TOKEN } from '@utilities/di/renderer/tokens'
import { RendArrayBase } from '@utilities/json-arrays/renderer'
import type { IDLC } from './types'

export type * from './types'

/**
 * Работа с дополнениями игры.
 * _renderer process_
 */
@initMain()
export class DLCs extends RendArrayBase<IDLC, IDLC & { dir: IDir }> {
	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

  protected override convert(item: IDLC): IDLC & { dir: IDir } {
    return { ...item, dir: this.dirs.new(item.path) }
  }

  override save = async () => {}

  /**
   * Получить название DLC.
   * @param file Файл.
   * @returns Название DLC.
   */
  getDLC(file: IFile): string | undefined {
    return file.path.includes(this.dirs.dlc.name)
      ? file.path
        .split(this.dirs.dlc.name)
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
    return this.dirs.dlc.findFiles(args)
  }

  /**
   * Найти папки.
   * @param args Аргументы поиска.
   * @returns Папки.
   */
  async findDirs(args: IFindDirsArgs): Promise<IDir[]> {
    return this.dirs.dlc.findDirs(args)
  }
}
