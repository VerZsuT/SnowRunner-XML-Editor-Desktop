import { execFile } from 'node:child_process'

import type { Dir, File, ICheckResult } from '../../../main'

import { DEBUG_ARCHIVER } from '/consts'
import Config from '/mods/data/config/main'
import { ErrorText, ProgramError } from '/mods/errors/main'
import { Dirs } from '/mods/files/main'
import Paths from '/mods/paths/main'

/** Работа с WinRAR */
class WinRAR {
  /** Файл списка основных файлов/папок для распаковки */
  private readonly MAIN_UNPACK_LIST = 'unpack-list.lst'
  /** Файл списка модовых файлов/папок для распаковки */
  private readonly MODS_UNPACK_LIST = 'unpack-mod-list.lst'
  /** Исполняемый файл WinRAR */
  private readonly WINRAR_EXE = 'WinRAR.exe'

  // Флаги WinRAR
  /** Не включать базовую папку */
  private readonly EXCLUDE_BASE_FOLDER = '-ep1'
  /** Не использовать полные пути */
  private readonly EXCLUDE_ALL_PATHS = '-ep'
  /** Рекурсивная операция */
  private readonly RECURSIVE = '-r'
  /** Выполнение в фоновом режиме */
  private readonly IN_BACKGROUND = '-ibck'
  /** Не паниковать при ошибках */
  private readonly NO_ERRORS = '-inul'


  // Операции WinRAR
  /** Обновление файлов в архиве */
  private readonly UPDATE = 'f'
  /** Распаковка файлов из архива */
  private readonly UNPACK = 'x'
  /** Добавление файла в архив */
  private readonly ADD = 'a'

  /**  Аргументы зависящие от режима отладки архиватора */
  private readonly RUN_ARGS = DEBUG_ARCHIVER ? [] : [this.IN_BACKGROUND]

  /**
   * Обновить файлы в архиве
   * 
   * @param dir - папка с файлами
   * @param archive - обновляемый архив
   */
  async update(dir: Dir, archive: File) {
    await archive.chmod(0o777)
    let writeResult: ICheckResult
    if (!(writeResult = await archive.canWrite()).result) {
      throw new ProgramError(ErrorText.writeFileError, archive.path, writeResult.error!)
    }

    let readResult: ICheckResult
    if (!(readResult = await dir.canRead()).result) {
      throw new ProgramError(ErrorText.readDirError, dir.path, readResult.error!)
    }

    await this.run([
      this.UPDATE,
      ...this.RUN_ARGS,
      archive.path,
      this.inner(dir.path),
      this.RECURSIVE,
      this.EXCLUDE_BASE_FOLDER
    ])
  }

  /**
   * Распаковать файлы из архива в папку
   * 
   * @param archive - распаковываемый архив
   * @param dir - папка, в которую будет происходить распаковка
   */
  async unpack(archive: File, dir: Dir) {
    const isMod = !!Config.initialPath && archive.path !== Config.initialPath
    const list = isMod ? this.MODS_UNPACK_LIST : this.MAIN_UNPACK_LIST

    let readResult: ICheckResult
    if (!(readResult = await archive.canRead()).result) {
      throw new ProgramError(ErrorText.readFileError, archive.path, readResult.error!)
    }

    await dir.make()
    let writeResult: ICheckResult
    if (!(writeResult = await dir.canWrite()).result) {
      throw new ProgramError(ErrorText.writeDirError, dir.path, writeResult.error!)
    }

    await this.run([
      this.UNPACK,
      ...this.RUN_ARGS,
      ...(isMod ? [this.NO_ERRORS] : []),
      archive.path,
      `@${list}`,
      this.inner(dir.path)
    ])
  }

  /**
   * Добавить файл в архив
   * 
   * @param file - добавляемый файл
   * @param archive - архив, в который будет добавляться файл
  */
  async add(file: File, archive: File) {
    await archive.chmod(0o777)
    let readResult: ICheckResult
    if (!(readResult = await file.canRead()).result) {
      throw new ProgramError(ErrorText.readFileError, file.path, readResult.error!)
    }

    let writeResult: ICheckResult
    if (!(writeResult = await archive.canWrite()).result) {
      throw new ProgramError(ErrorText.writeFileError, archive.path, writeResult.error!)
    }

    await this.run([
      this.ADD,
      ...this.RUN_ARGS,
      archive.path,
      file.path,
      this.EXCLUDE_ALL_PATHS
    ])
  }

  /**
   * Запустить `WinRAR`
   * 
   * @param attrs - параметры вызова
   */
  async run(attrs: string[]) {
    if (!await Dirs.winrar.exists()) {
      throw new ProgramError(ErrorText.dirNotFound, Dirs.winrar.path)
    }

    await new Promise((resolve, reject) => {
      execFile(this.WINRAR_EXE, attrs, { cwd: Paths.winrar })
        .once('close', resolve)
        .once('error', error => {
          reject(error.message)
          throw new ProgramError(ErrorText.winRarCommandError, attrs.join(','), error.message)
        })
    })
  }

  /**
   * Добавляет в конец `//`
   * 
   * @param path - путь
   */
  private inner(path: string) { return `${path}\\` }
}

export default new WinRAR()
