import { existsSync, mkdirSync, rmSync } from 'fs'
import { basename, join } from 'path'

import { publicMethod } from 'emr-bridge'

import Config from './Config'
import Hash from './Hash'
import Paths from './Paths'
import Windows from './Windows'

import type { IArchiver } from '#g/types'
import WinRAR from '#m/archivers/winrar'
import $ from '#m/texts'

class ArchiveClass {
  private archiver: IArchiver = WinRAR

  /**
   * Обновить файлы в архиве
   * @param source - путь до папки с файлами
   * @param direction - путь до архива
   * @param isMod - архив является модом
   */
  async update(source: string, direction: string, isMod?: boolean): Promise<void> {
    await this.archiver.update(source, direction)
    this.saveSize(direction, isMod)
  }

  /**
   * Распаковать файлы из архива в папку
   * @param source - путь до архива
   * @param direction - путь до папки
   * @param isMod - архив является модом
   */
  async unpack(source: string, direction: string, isMod?: boolean): Promise<void> {
    this.rmDir(direction)
    await this.archiver.unpack(source, direction, isMod)
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
  publicUnpack(source: string, direction: string, isMod?: boolean) {
    return this.unpack(source, direction, isMod)
  }

  /**
   * Распаковать основные XML файлы (+DLC) из `initial.pak`
   */
  @publicMethod()
  async unpackMain(hideLoading = true): Promise<void> {
    if (Windows.loading) {
      await Windows.loading.showAndWait()
      Windows.loading.setText($.UNPACKING)
    }

    this.clearDir(Paths.mainTemp)
    this.rmFile(Paths.texts)

    await this.unpack(Config.initial, Paths.mainTemp, false)
    this.saveSize(Config.initial)

    if (Windows.loading && hideLoading) {
      Windows.loading.hide()
    }
  }

  /**
   * Распаковать XML файлы из архива модификации
   * @param pathToFile - путь к архиву модификации
   */
  async unpackMod(pathToFile: string): Promise<void> {
    const modId = this.cutDotPak(pathToFile)
    const pathToDir = join(Paths.modsTemp, modId)

    this.mkDir(Paths.modsTemp)
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
      Config.sizes.mods[fileName] = Hash.getSize(path)
    }
    else {
      Config.sizes.initial = Hash.getSize(path)
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
   * Удаляет `.pak` из пути
   * @param path - путь
   */
  private cutDotPak(path: string): string {
    return basename(path, '.pak')
  }
}

const Archive = new ArchiveClass()

export default Archive
