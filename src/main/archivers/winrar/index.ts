import { IArchiver } from '#g/types'
import { execFile, execFileSync } from 'child_process'

import { DEBUG_ARCHIVER, SHOW_ARCHIVER_ERRORS } from '#g/consts'
import Paths from '#m/modules/Paths'

class WinRARClass implements IArchiver {
  private readonly MAIN_UNPACK_LIST = '@unpack-list.lst'
  private readonly MODS_UNPACK_LIST = '@unpack-mod-list.lst'

  // WinRAR flags
  private readonly EXCLUDE_BASE_FOLDER = '-ep1'
  private readonly RECURSIVE = '-r'
  private readonly UPDATE = 'f'
  private readonly UNPACK = 'x'
  private readonly WINRAR_EXE = 'WinRAR.exe'
  private readonly NO_ERRORS = '-inul'
  private readonly IN_BACKGROUND = '-ibck'
  private readonly IGNORE_ERRORS = DEBUG_ARCHIVER ? [] : [this.IN_BACKGROUND, this.NO_ERRORS]

  update(source: string, direction: string): void {
    this.run([
      this.UPDATE,
      ...this.IGNORE_ERRORS,
      direction,
      this.inner(source),
      this.RECURSIVE,
      this.EXCLUDE_BASE_FOLDER
    ])
  }
  async unpack(source: string, direction: string, isMod?: boolean, sync?: boolean): Promise<void> {
    const list = isMod ? this.MODS_UNPACK_LIST : this.MAIN_UNPACK_LIST

    await this.run([
      this.UNPACK,
      ...this.IGNORE_ERRORS,
      source,
      list,
      this.inner(direction)
    ], sync)
  }

  /**
   * Запустить WinRAR
   * @param attrs - параметры вызова
   * @param sync - запустить синхронно (default=true)
   */
  private run(attrs: string[], sync = true): Promise<void> | undefined {
    if (sync) {
      try {
        execFileSync(this.WINRAR_EXE, attrs, { cwd: Paths.winrar })
      }
      catch (error: unknown) {
        if (SHOW_ARCHIVER_ERRORS && error instanceof Error) {
          console.error(error.message)
        }
      }
      return
    }

    return new Promise<void>(resolve => {
      execFile(this.WINRAR_EXE, attrs, { cwd: Paths.winrar })
        .once('close', resolve)
        .once('error', error => SHOW_ARCHIVER_ERRORS && console.log(error))
    })
  }

  /**
   * Добавляет в конец `//`
   * @param path - путь
   */
  private inner(path: string): string {
    return `${path}\\`
  }
}

const WinRAR = new WinRARClass()

export default WinRAR
