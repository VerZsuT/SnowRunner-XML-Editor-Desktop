import { execFile, execFileSync } from 'child_process'
import { existsSync, mkdirSync, rmSync } from 'fs'
import { basename, join } from 'path'

import { providePublic, publicMethod } from 'emr-bridge'

import config from './config'
import hash from './hash'
import paths from './paths'
import windows from './windows'

import { DEBUG_WINRAR, DEBUG_WINRAR_ERRORS } from '#consts'
import { UNPACKING } from '#m-scripts/programTexts'

class Archive {
  private readonly MAIN_UNPACK_LIST = '@unpack-list.lst'
  private readonly MODS_UNPACK_LIST = '@unpack-mod-list.lst'

  // WinRAR flags
  private readonly EXCLUDE_BASE_FOLDER = '-ep1'
  private readonly RECURSIVE = '-r'
  private readonly UPDATE = 'f'
  private readonly UNPACK = 'x'
  private readonly WINRAR = 'WinRAR.exe'
  private readonly NO_ERRORS = '-inul'
  private readonly IN_BACKGROUND = '-ibck'
  private readonly ignoreErrors = DEBUG_WINRAR ? [] : [this.IN_BACKGROUND, this.NO_ERRORS]

  /**
   * Обновить файлы в архиве
   * @param source - путь до папки с файлами
   * @param direction - путь до архива
   * @param isMod - архив является модом
   */
  update(source: string, direction: string, isMod?: boolean): void {
    this.WinRAR([
      this.UPDATE,
      ...this.ignoreErrors,
      direction,
      this.inner(source),
      this.RECURSIVE,
      this.EXCLUDE_BASE_FOLDER
    ])
    this.saveSize(direction, isMod)
  }

  /**
   * Распаковать файлы из архива в папку
   * @param source - путь до архива
   * @param direction - путь до папки
   * @param isMod - архив является модом
   * @param sync - синхронный вызов WinRAR
   */
  async unpack(source: string, direction: string, isMod?: boolean, sync?: boolean): Promise<void> {
    const list = isMod ? this.MODS_UNPACK_LIST : this.MAIN_UNPACK_LIST
    this.rmDir(direction)
    await this.WinRAR([
      this.UNPACK,
      ...this.ignoreErrors,
      source,
      list,
      this.inner(direction)
    ], sync)
  }

  /**
   * Синхронная версия `unpackArchive`
   *
   * Распаковать файлы из архива в папку
   * @param source - путь до архива
   * @param direction - путь до папки
   * @param isMod - архив является модом
   */
  @publicMethod('unpack')
  syncUnpack(source: string, direction: string, isMod?: boolean): void {
    void this.unpack(source, direction, isMod, true)
  }

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak`
   */
  @publicMethod()
  async unpackMain(hideLoading = true): Promise<void> {
    await windows.loading?.showAndWait()
    windows.loading?.setText(UNPACKING)

    this.clearDir(paths.mainTemp)
    this.rmFile(paths.texts)

    await this.unpack(config.initial, paths.mainTemp, false, true)
    this.saveSize(config.initial)

    if (hideLoading) {
      windows.loading?.hide()
    }
  }

  /**
   * Распаковать XML файлы из архива модификации
   * @param pathToFile - путь к архиву модификации
   */
  async unpackMod(pathToFile: string): Promise<void> {
    const modId = this.cutDotPak(pathToFile)
    const pathToDir = join(paths.modsTemp, modId)

    this.mkDir(paths.modsTemp)
    this.clearDir(pathToDir)

    this.saveSize(pathToFile, true)
    await this.unpack(pathToFile, pathToDir, true)
  }

  /**
   * Сохранить размер архива для фиксации изменений извне
   * @param path - путь к файлу
   * @param isMod - архив является модом
   */
  private saveSize(path: string, isMod?: boolean): void {
    const fileName = this.cutDotPak(path)
    if (isMod) {
      config.sizes.mods[fileName] = hash.getSize(path)
    }
    else {
      config.sizes.initial = hash.getSize(path)
    }
  }

  /**
   * Удалить папку с содержимым
   * @param path - путь к папке
   */
  private rmDir(path: string): void {
    rmSync(path, { recursive: true, force: true })
  }

  /**
   * Удалить файл
   * @param path - путь к файлу
   */
  private rmFile(path: string): void {
    rmSync(path, { force: true })
  }

  /**
   * Создать папку (при отсутствии)
   * @param path - путь создания
   */
  private mkDir(path: string): void {
    if (!existsSync(path)) {
      mkdirSync(path)
    }
  }

  /**
   * Очистить содержимое папки
   * @param path - путь к папке
   */
  private clearDir(path: string): void {
    this.rmDir(path)
    this.mkDir(path)
  }

  /**
   * Запустить WinRAR
   * @param attrs - параметры вызова
   * @param sync - запустить синхронно (default=true)
   */
  private WinRAR(attrs: string[], sync = true): Promise<void> | undefined {
    if (sync) {
      try {
        execFileSync(this.WINRAR, attrs, { cwd: paths.winrar })
      }
      catch (error: any) {
        if (DEBUG_WINRAR_ERRORS) {
          console.error(error.message)
        }
      }
      return
    }

    return new Promise<void>(resolve => {
      execFile(this.WINRAR, attrs, { cwd: paths.winrar })
        .once('close', resolve)
        .once('error', error => DEBUG_WINRAR_ERRORS && console.log(error))
    })
  }

  /**
   * Удаляет `.pak` из пути
   * @param path - путь
   */
  private cutDotPak(path: string): string {
    return basename(path, '.pak')
  }

  /**
   * Добавляет в конец `//`
   * @param path - путь
   */
  private inner(path: string): string {
    return `${path}\\`
  }
}

export default providePublic(new Archive())
