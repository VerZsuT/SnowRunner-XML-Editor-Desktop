import { execFile } from 'node:child_process'

import type { Dir, File, ICheckResult } from '../../../main'

import { DEBUG_ARCHIVER } from '/consts'
import Config from '/mods/data/config/main'
import { ErrorText, ProgramError } from '/mods/errors/main'
import { Dirs } from '/mods/files/main'
import Paths from '/mods/paths/main'

/** Работа с WinRAR */
class WinRAR {
  /** Исполняемый файл WinRAR */
  private readonly exeName = 'WinRAR.exe'

  /** Списки файлов для распаковки */
  private readonly lists = {
    /** Файл списка основных файлов/папок для распаковки */
    main: 'unpack-list.lst',
    /** Файл списка модовых файлов/папок для распаковки */
    mods: 'unpack-mod-list.lst'
  }

  /** Действия архиватора */
  private readonly actions = {
    /** Обновление файлов в архиве */
    update: 'f',
    /** Распаковка файлов из архива */
    unpack: 'x',
    /** Добавление файла в архив */
    add: 'a'
  }

  /** Флаги запуска WinRAR */
  private readonly flags = {
    /** Не включать базовую папку */
    excludeBase: '-ep1',
    /** Не использовать полные пути */
    excludeAll: '-ep',
    /** Рекурсивная операция */
    recursive: '-r',
    /** Выполнение в фоновом режиме */
    inBackground: '-ibck',
    /** Не паниковать при ошибках */
    noErrors: '-inul'
  }

  /**  Аргументы зависящие от режима отладки архиватора */
  private getRunArgs(isMod = false) {
    return DEBUG_ARCHIVER ? [] : [
      this.flags.inBackground,
      ...isMod ? [this.flags.noErrors] : []
    ]
  }

  /**
   * Обновить файлы в архиве
   * @param dir - папка с файлами
   * @param archive - обновляемый архив
   */
  async update(dir: Dir, archive: File) {
    await archive.chmod(0o777)
    let writeResult: ICheckResult
    if (!(writeResult = await archive.canWrite()).result) {
      throw new ProgramError(ErrorText.writeFileError, writeResult.error, archive.path)
    }

    let readResult: ICheckResult
    if (!(readResult = await dir.canRead()).result) {
      throw new ProgramError(ErrorText.readDirError, readResult.error, dir.path)
    }

    await this.run(
      this.actions.update,
      
      archive.path,
      this.inner(dir.path),
      
      this.getRunArgs(),
      this.flags.recursive,
      this.flags.excludeBase
    )
  }

  /**
   * Распаковать файлы из архива в папку
   * @param archive - распаковываемый архив
   * @param dir - папка, в которую будет происходить распаковка
   */
  async unpack(archive: File, dir: Dir) {
    const isMod = !!Config.initialPath && archive.path !== Config.initialPath
    const list = isMod ? this.lists.mods : this.lists.main

    let readResult: ICheckResult
    if (!(readResult = await archive.canRead()).result) {
      throw new ProgramError(ErrorText.readFileError, readResult.error, archive.path)
    }

    await dir.make()
    let writeResult: ICheckResult
    if (!(writeResult = await dir.canWrite()).result) {
      throw new ProgramError(ErrorText.writeDirError, writeResult.error, dir.path)
    }

    await this.run(
      this.actions.unpack,

      archive.path,
      `@${list}`,
      this.inner(dir.path),
      
      this.getRunArgs(isMod)
    )
  }

  /**
   * Добавить файл в архив
   * @param file - добавляемый файл
   * @param archive - архив, в который будет добавляться файл
  */
  async add(file: File, archive: File) {
    await archive.chmod(0o777)
    let readResult: ICheckResult
    if (!(readResult = await file.canRead()).result) {
      throw new ProgramError(ErrorText.readFileError, readResult.error, file.path)
    }

    let writeResult: ICheckResult
    if (!(writeResult = await archive.canWrite()).result) {
      throw new ProgramError(ErrorText.writeFileError, writeResult.error, archive.path)
    }

    await this.run(
      this.actions.add,

      archive.path,
      file.path,

      this.getRunArgs(),
      this.flags.excludeAll
    )
  }

  /**
   * Запустить `WinRAR`
   * @param args - параметры вызова
   */
  async run(...args: (string | string[])[]) {
    if (!await Dirs.winrar.exists()) {
      throw new ProgramError(ErrorText.dirNotFound, null, Dirs.winrar.path)
    }

    const execArgs = args.flatMap(value => Array.isArray(value) ? value : [value])
    await new Promise((resolve, reject) => {
      execFile(this.exeName, execArgs, { cwd: Paths.winrar })
        .once('close', resolve)
        .once('error', error => {
          reject(error.message)
          throw new ProgramError(ErrorText.winRarCommandError, error, args.join(','))
        })
    })
  }

  /**
   * Добавляет в конец `//`
   * @param path - путь
   */
  private inner(path: string) { return `${path}\\` }
}

export default new WinRAR()
