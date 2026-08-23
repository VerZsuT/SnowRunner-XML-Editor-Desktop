import Modifications from '@modules/data/modifications/renderer'
import DLCs from '@modules/dlcs/renderer'
import { Dirs } from '@modules/files/renderer'
import type { IFile } from '@modules/renderer'
import RendArrayBase from '@utilities/json-arrays/renderer'
import { initMain } from '@utilities/renderer'
import type { IEditedFile } from './types'

export type * from './types'

/**
 * Работа с массивом изменённых файлов.
 * _renderer process_
 */
@initMain()
class Edited extends RendArrayBase<IEditedFile, IFile> {
  override convert({ dlc, mod, isTrailer, name }: IEditedFile): IFile {
    const folder = isTrailer
      ? 'trucks/trailers'
      : 'trucks'
    const fileName = `${name}.xml`

    return dlc
      ? Dirs.dlc.file(dlc, 'classes', folder, fileName)
      : mod
        ? Dirs.modsTemp.file(mod, 'classes', folder, fileName)
        : Dirs.classes.file(folder, fileName)
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

    this.push({
      name: file.name,
      isTrailer,
      dlc: DLCs.getDLC(file),
      mod: Modifications.getModID(file)
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

/**
 * Работа с массивом изменённых файлов.
 * _renderer process_
 */
export default new Edited()
