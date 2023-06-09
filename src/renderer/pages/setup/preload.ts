import { existsSync } from 'fs'
import { basename, join } from 'path'

import '#r/scripts/root-preload.main'

import $ from './texts'

import type { IFolder, ISetupPreload } from '#g/types'
import Main from '#r/scripts/main'
import { Preload } from '#r/services/interprocess'

class _SetupPreload {
  static getGameFolder = (): IFolder | undefined => {
    const result = Main.getDir()
    let existed = ''

    if (!result) {
      window.handleErrorMessage?.($.EMPTY_FOLDER_ERROR)
      return
    }
    const folder = result
    const paths = [
      join(folder, 'steamapps/common/SnowRunner/preload/paks/client/initial.pak'),
      join(folder, 'common/SnowRunner/preload/paks/client/initial.pak'),
      join(folder, 'SnowRunner/en_us/preload/paks/client/initial.pak'),
      join(folder, 'en_us/preload/paks/client/initial.pak'),
      join(folder, 'preload/paks/client/initial.pak'),
      join(folder, 'paks/client/initial.pak'),
      join(folder, 'client/initial.pak'),
      join(folder, 'initial.pak')
    ]
    for (let i = 0; i < paths.length; ++i) {
      if (existsSync(paths[i])) {
        existed = paths[i]
        break
      }
    }

    if (!existed) {
      window.handleErrorMessage?.($.INVALID_FOLDER_ERROR)
      return
    }

    return {
      folder,
      initial: existed
    }
  }

  static getInitialPak = (): IFolder | undefined => {
    const result = Main.getInitial()

    if (!result || basename(result) !== 'initial.pak' || !existsSync(result)) {
      window.handleErrorMessage?.($.INVALID_INITIAL_ERROR)
      return
    }
    return { initial: result }
  }

  static {
    Preload.register<ISetupPreload>({
      getGameFolder: this.getGameFolder,
      getInitialPak: this.getInitialPak
    })
  }
}
