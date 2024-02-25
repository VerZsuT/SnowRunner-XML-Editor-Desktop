import { publicMainEvent, publicRendererEvent } from 'emr-bridge'

import { Keys } from './public'
import type { EditedFile } from './types'

import type { File } from '/mods/files/main'
import { Dirs, Files } from '/mods/files/main'
import MainArrayBase, { initArrayPublic } from '/utils/json-arrays/main'

export type * from './types'

/**
 * Работа с массивом изменённых файлов  
 * _main process_
*/
class EditedClass extends MainArrayBase<EditedFile, File> {
  protected override emitChangeEvent = publicMainEvent<[EditedFile[]]>(Keys.mainChangeEvent)
  protected override onChangeEvent = publicRendererEvent<EditedFile[]>(Keys.onRendererChange)

  protected override jsonFile = Files.edited

  protected override convert({ dlc, mod, isTrailer, name }: EditedFile): File {
    const folder = isTrailer ? 'trucks/trailers' : 'trucks'
    const fileName = `${name}.xml`
    if (dlc) return Dirs.dlc.file(dlc, 'classes', folder, fileName)
    if (mod) return Dirs.modsTemp.file(mod, 'classes', folder, fileName)
    return Dirs.classes.file(folder, fileName)
  }
}

const Edited = new EditedClass()
await Edited._init()

initArrayPublic(Edited, Keys.array, Keys.reset, Keys.save)

export default Edited
