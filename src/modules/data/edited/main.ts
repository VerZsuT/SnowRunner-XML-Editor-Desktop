import type { EditedFile } from './types'
import type { File } from '/mods/files/main'
import { Dirs, Files } from '/mods/files/main'
import { providePublic } from '/utils/bridge/main'
import MainArrayBase from '/utils/json-arrays/main'

export type * from './types'

/**
 * Работа с массивом изменённых файлов  
 * _main process_
*/
@providePublic()
class Edited extends MainArrayBase<EditedFile, File> {
  protected override jsonFile = Files.edited

  constructor() {
    super()
    this.isReady = this.init()
  }

  protected override convert({ dlc, mod, isTrailer, name }: EditedFile): File {
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
}

export default await new Edited().isReady
