import { existsSync, readdirSync, watchFile as watch } from 'fs'
import { join } from 'path'

import '#r-scripts/root-preload.main'

import { Main } from 'emr-bridge/preload'

import { PreloadType } from '#enums'
import preload from '#services/preload'
import type { IEditorPreload, MPC } from '#types'

class EditorPreload {
  private readonly paths = Main.as<MPC>().paths

  constructor() {
    preload.register<IEditorPreload>({
      findFromDLC: this.findFromDLC,
      watchFile: this.watchFile
    }, PreloadType.editor)
  }

  private findFromDLC = (fileName: string, type: string): string | undefined => {
    const dlcFolders = readdirSync(this.paths.dlc)
    for (let i = 0; i < dlcFolders.length; ++i) {
      const path = join(this.paths.dlc, dlcFolders[i], 'classes', type, `${fileName}.xml`)
      if (existsSync(path)) return path
    }
  }

  private watchFile = (path: string, callback: () => void): void => {
    watch(path, { persistent: false }, callback)
  }
}

new EditorPreload()
