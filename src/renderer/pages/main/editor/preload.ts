import { existsSync, readdirSync, watchFile as watch } from 'fs'
import { join } from 'path'

import '#r/scripts/root-preload.main'

import { PreloadType } from '#g/enums'
import type { IEditorPreload } from '#g/types'
import Main from '#r/scripts/main'
import { Preload } from '#r/services/interprocess'

class _EditorPreload {
  static paths = Main.paths

  static findFromDLC = (fileName: string, type: string): string | undefined => {
    const dlcFolders = readdirSync(this.paths.dlc)
    for (let i = 0; i < dlcFolders.length; ++i) {
      const path = join(this.paths.dlc, dlcFolders[i], 'classes', type, `${fileName}.xml`)
      if (existsSync(path)) return path
    }
  }

  static watchFile = (path: string, callback: () => void): void => {
    watch(path, { persistent: false }, callback)
  }

  static {
    Preload.register<IEditorPreload>({
      findFromDLC: this.findFromDLC,
      watchFile: this.watchFile
    }, PreloadType.editor)
  }
}
