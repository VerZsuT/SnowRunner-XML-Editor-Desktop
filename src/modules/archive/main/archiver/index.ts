import { execFile } from 'node:child_process'
import type { IDir, IFile } from '../../../main'
import { DEBUG_ARCHIVER } from '/consts'
import Config from '/mods/data/config/main'
import { ErrorText, ProgramError } from '/mods/errors/main'
import { Dirs } from '/mods/files/main'
import Paths from '/mods/paths/main'

/** Работа с WinRAR. */
class WinRAR {
  /** Исполняемый файл WinRAR. */
  private readonly exeName = 'WinRAR.exe'

  /** Списки файлов для распаковки. */
  private readonly lists = {
    /** Список основных файлов/папок для распаковки. */
    main: 'unpack-list.lst',

    /** Список модовых файлов/папок для распаковки. */
    mods: 'unpack-mod-list.lst',

    /** Оптимизированный список основных файлов/папок для распаковки. */
    mainOptimized: 'unpack-list-optimized.lst'
  }

  /** Действия архиватора. */
  private readonly actions = {
    /** Обновление файлов в архиве. */
    update: 'f',

    /** Распаковка файлов из архива. */
    unpack: 'x',

    /** Добавление файла в архив. */
    add: 'a'
  }

  /** Флаги запуска WinRAR. */
  private readonly flags = {
    /** Не включать базовую папку. */
    excludeBase: '-ep1',

    /** Не использовать полные пути. */
    excludeAll: '-ep',

    /** Рекурсивная операция. */
    recursive: '-r',

    /** Выполнение в фоновом режиме. */
    inBackground: '-ibck',

    /** Не паниковать при ошибках. */
    noErrors: '-inul'
  }

  /**
   * Получить аргументы, зависящие от режима отладки архиватора.
   * @param isMod Идёт ли работа с модификацией.
   * @returns Аргументы запуска.
   */
  private getRunArgs(isMod = false) {
    return DEBUG_ARCHIVER
      ? []
      : [
        this.flags.inBackground,
        ...isMod
          ? [this.flags.noErrors]
          : []
      ]
  }

  /**
   * Обновить файлы в архиве.
   * @param dir Папка с файлами.
   * @param archive Обновляемый архив.
   */
  async update(dir: IDir, archive: IFile) {
    await archive.chmod(0o777)

    const readResult = await archive.canWrite()
    const writeResult = await dir.canRead()

    if (!writeResult.result) {
      throw new ProgramError(ErrorText.writeFileError, writeResult.error, archive.path)
    } else if (!readResult.result) {
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
   * Распаковать файлы из архива в папку.
   * @param archive Распаковываемый архив.
   * @param dir Папка, в которую будет происходить распаковка.
   */
  async unpack(archive: IFile, dir: IDir) {
    const isMod = !!Config.initialPath && archive.path !== Config.initialPath
    const list = isMod
      ? this.lists.mods
      : Config.optimizeUnpack
        ? this.lists.mainOptimized
        : this.lists.main

    const readResult = await archive.canRead()
    
    if (!readResult.result) {
      throw new ProgramError(ErrorText.readFileError, readResult.error, archive.path)
    }
    
    await dir.make()

    const writeResult = await dir.canWrite()

    if (!writeResult.result) {
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
   * Добавить файл в архив.
   * @param file Добавляемый файл.
   * @param archive Архив, в который будет добавляться файл.
  */
  async add(file: IFile, archive: IFile) {
    await archive.chmod(0o777)

    const readResult = await file.canRead()
    const writeResult = await archive.canWrite()

    if (!readResult.result) {
      throw new ProgramError(ErrorText.readFileError, readResult.error, file.path)
    } else if (!writeResult.result) {
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
   * Запустить `WinRAR`.
   * @param args Параметры запуска.
   */
  async run(...args: (string | string[])[]) {
    if (!await Dirs.winrar.exists()) {
      throw new ProgramError(ErrorText.dirNotFound, null, Dirs.winrar.path)
    }

    const execArgs = args.flatMap(value => Array.isArray(value) ? value : [value])
    const { promise, resolve, reject } = Promise.withResolvers()

    execFile(this.exeName, execArgs, { cwd: Paths.winrar })
      .once('close', resolve)
      .once('error', error => {
        reject(error.message)

        throw new ProgramError(ErrorText.winRarCommandError, error, args.join(','))
      })

    return promise
  }

  /**
   * Сделать путь внутренним.
   * @param path Путь.
   * @returns Внутренний путь.
   */
  private inner(path: string) {
    return `${path}\\`
  }
}

/** Работа с WinRAR. */
export default new WinRAR()
