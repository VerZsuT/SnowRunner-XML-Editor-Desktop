import type { IEditedFile } from './types'
import type { IFile } from '/mods/files/main'
import { Dirs, Files } from '/mods/files/main'
import { providePublic } from '/utils/bridge/main'
import MainArrayBase from '/utils/json-arrays/main'

export type * from './types'

/**
 * Работа с массивом изменённых файлов.  
 * _main process_
 */
@providePublic()
class Edited extends MainArrayBase<IEditedFile, IFile> {
  protected override jsonFile = Files.edited

  constructor() {
    super()
    this.isReady = this.init()
  }

  protected override convert({ dlc, mod, isTrailer, name }: IEditedFile): IFile {
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
}

/**
 * Работа с массивом изменённых файлов.  
 * _main process_
 */
export default await new Edited().isReady
