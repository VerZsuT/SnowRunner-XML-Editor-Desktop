import { existsSync, readdirSync, watchFile as watch } from 'fs'
import { join } from 'path'

import '#r-scripts/root-preload.main'

import { PreloadType } from '#enums'
import main from '#r-scripts/main'
import preload from '#services/preload'
import type { IEditorPreload } from '#types'

const paths = main.paths

class EditorPreload {
  constructor() {
    preload.register<IEditorPreload>({
      findFromDLC: this.findFromDLC,
      watchFile: this.watchFile
    }, PreloadType.editor)
  }

  private findFromDLC = (fileName: string, type: string): string | undefined => {
    const dlcFolders = readdirSync(paths.dlc)
    for (let i = 0; i < dlcFolders.length; ++i) {
      const path = join(paths.dlc, dlcFolders[i], 'classes', type, `${fileName}.xml`)
      if (existsSync(path)) return path
    }
  }

  private watchFile = (path: string, callback: () => void): void => {
    watch(path, { persistent: false }, callback)
  }
}

new EditorPreload()
