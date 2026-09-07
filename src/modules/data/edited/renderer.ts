import { initMain } from '@bridge/renderer'
import type { IFile } from '@modules/files/renderer'
import { di } from '@utilities/di/container'
import { DIRS_TOKEN, DLC_TOKEN, MODS_TOKEN } from '@utilities/di/renderer/tokens'
import { RendArrayBase } from '@utilities/json-arrays/renderer'
import type { IEditedFile } from './types'

export type * from './types'

/**
 * Работа с массивом изменённых файлов.
 * _renderer process_
 */
@initMain()
export class Edited extends RendArrayBase<IEditedFile, IFile> {
  override convert({ dlc, mod, isTrailer, name }: IEditedFile): IFile {
		const dirs = di.resolve(DIRS_TOKEN)
    const folder = isTrailer
      ? 'trucks/trailers'
      : 'trucks'
    const fileName = `${name}.xml`

    return dlc
      ? dirs.dlc.file(dlc, 'classes', folder, fileName)
      : mod
        ? dirs.modsTemp.file(mod, 'classes', folder, fileName)
        : dirs.classes.file(folder, fileName)
  }

  /**
   * Пометить файл как изменённый.
   * @param file Файл.
   * @param isTrailer Является ли файл трейлером.
   */
  markAsEdited(file: IFile, isTrailer?: boolean) {
    if (this.isEdited(file)) {
      return
    }

		const dlc = di.resolve(DLC_TOKEN)
		const mods = di.resolve(MODS_TOKEN)

    this.push({
      name: file.name,
      isTrailer,
      dlc: dlc.getDLC(file),
      mod: mods.getModID(file)
    })
  }

  /**
   * Пометить файл как неизмененный.
   * @param file Файл.
   */
  markAsNotEdited(file: IFile) {
    if (!this.isEdited(file)) {
      return
    }

    for (const [i, item] of this.entries()) {
      if (item.name === file.name) {
        this.removeAt(i)

        break
      }
    }
  }

  /**
   * Помечен ли файл как изменённый.
   * @param file Файл.
   * @returns Помечен ли файл как изменённый.
   */
  isEdited(file: IFile) {
    return this.some(item => item.name === file.name)
  }
}
