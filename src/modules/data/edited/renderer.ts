import type { IEditedFile } from './types'
import Mods from '/mods/data/mods/renderer'
import DLCs from '/mods/dlcs/renderer'
import type { IFile } from '/mods/files/renderer'
import { Dirs } from '/mods/files/renderer'
import RendArrayBase from '/utils/json-arrays/renderer'
import { initMain } from '/utils/renderer'

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
      mod: Mods.getModID(file)
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
