import type { EditedFile } from './types'
import Mods from '/mods/data/mods/renderer'
import DLCs from '/mods/dlcs/renderer'
import type { File } from '/mods/files/renderer'
import { Dirs } from '/mods/files/renderer'
import RendArrayBase from '/utils/json-arrays/renderer'
import { initMain } from '/utils/renderer'

export type * from './types'

/**
 * Работа с массивом изменённых файлов  
 * _renderer process_
*/
@initMain()
class Edited extends RendArrayBase<EditedFile, File> {
  override convert({ dlc, mod, isTrailer, name }: EditedFile): File {
    const folder = isTrailer
      ? 'trucks/trailers'
      : 'trucks'
    const fileName = `${name}.xml`

    if (dlc) {
      return Dirs.dlc.file(dlc, 'classes', folder, fileName)
    }

    if (mod) {
      return Dirs.modsTemp.file(mod, 'classes', folder, fileName)
    }

    return Dirs.classes.file(folder, fileName)
  }

  /** Пометить файл как изменённый */
  markAsEdited(file: File, isTrailer?: boolean) {
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

  /** Пометить файл как неизмененный */
  markAsNotEdited(file: File) {
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

  /** Помечен ли файл как изменённый */
  isEdited(file: File) {
    return this.some(item => item.name === file.name)
  }
}

export default new Edited()
