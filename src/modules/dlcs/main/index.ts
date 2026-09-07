import type { Dirs, IDir, IFile, IFindDirsArgs, IFindFilesArgs } from '@modules/files/main'
import { makeReactive } from '@utilities/bridge/main'
import { inject } from '@utilities/di/container'
import { DIRS_TOKEN } from '@utilities/di/main/tokens'
import { ArrayBase } from '@utilities/json-arrays/base'
import type { IDLC } from '../types'

export type * from '../types'

/**
 * Работа с дополнениями игры.
 * _main process_
 */
export class DLCs extends ArrayBase<IDLC, IDLC & { dir: IDir }> {
	/** Основные папки. */
	@inject(DIRS_TOKEN)
	private readonly dirs!: Dirs

  override accessor arr: IDLC[] = []

	constructor() {
		super()
		makeReactive(this, 'DLCs', 'arr')
	}

  protected override convert(item: IDLC): IDLC & { dir: IDir } {
    return { ...item, dir: this.dirs.new(item.path) }
  }

  /** Инициализировать класс. */
  async init() {
    const dlcs: IDLC[] = []

    for (const entry of await this.dirs.dlc.read()) {
      if (await entry.isFile()) {
        continue
      }

      dlcs.push({ name: entry.asDir().name, path: entry.path })
    }

    this.set(dlcs)
  }

  /** Сбросить массив до исходного состояния. */
  reset() {
    this.set(this.default)
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
