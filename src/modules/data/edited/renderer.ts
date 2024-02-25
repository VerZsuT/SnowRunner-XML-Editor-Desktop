import type { File } from '/mods/files/renderer'
import { Dirs } from '/mods/files/renderer'
import RendArrayBase from '/utils/json-arrays/renderer'

import type { IPublic } from './public'
import { Keys } from './public'
import type { EditedFile } from './types'

import Mods from '/mods/data/mods/renderer'
import DLCs from '/mods/dlcs/renderer'


export type * from './types'

type EditedFiles = IPublic[Keys.array]

/**
 * Работа с массивом изменённых файлов  
 * _renderer process_
*/
class Edited extends RendArrayBase<EditedFiles[number], File> {
  protected override arrayKey = Keys.array
  protected override onChangeKey = Keys.onMainChange
  protected override emitChangeKey = Keys.rendererChangeEvent
  protected override resetKey = Keys.reset
  protected override saveKey = Keys.save

  override convert({ dlc, mod, isTrailer, name }: EditedFile): File {
    const folder = isTrailer ? 'trucks/trailers' : 'trucks'
    const fileName = `${name}.xml`
    if (dlc) return Dirs.dlc.file(dlc, 'classes', folder, fileName)
    if (mod) return Dirs.modsTemp.file(mod, 'classes', folder, fileName)
    return Dirs.classes.file(folder, fileName)
  }

  add(file: File, isTrailer?: boolean) {
    if (this.hasFile(file)) return
    this.push({
      name: file.name,
      isTrailer,
      dlc: DLCs.getDLC(file),
      mod: Mods.getModID(file)
    })
  }

  files() {
    const result: File[] = []
    for (const file of this) result.push(file)
    return result
  }

  remove(file: File) {
    if (!this.hasFile(file)) return
    let index: number | undefined
    for (const [i, item] of this.entries()) {
      if (item.name === file.name) index = i
    }
    if (index !== undefined) this.removeAt(index)
  }

  hasFile(file: File) {
    return this.some(item => item.name === file.name)
  }

  constructor() { super(); this.init() }
}

export default new Edited()
