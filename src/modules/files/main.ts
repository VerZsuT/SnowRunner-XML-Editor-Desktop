import type { IHasSnapshot } from 'emr-bridge/main'
import { execFile } from 'node:child_process'
import type { WatchListener } from 'node:fs'
import { watch } from 'node:fs'
import { access, chmod, constants, copyFile, lstat, mkdir, readdir, readFile, rename, rm, writeFile } from 'node:fs/promises'
import { basename, dirname, extname, join } from 'node:path'
import type { ICheckResult, IDir, IFile, IFindDirsArgs, IFindFilesArgs, IFSEntry, IFSEntryArraySnapshot, IFSEntrySnapshot } from './types'
import { ErrorText, ProgramError } from '/mods/errors/main'
import Paths from '/mods/paths/main'

export type * from './types'

/**
 * Сущность в файловой системе.  
 * _main process_
 */
export class FSEntry implements IFSEntry, IHasSnapshot<IFSEntrySnapshot> {
  path = ''

  constructor(path?: string, ...partsToJoin: string[]) {
    if (path) {
      this.path = join(path, ...partsToJoin)
    }
  }

  takeSnapshot(): IFSEntrySnapshot {
    return {
      path: this.path
    }
  }

  updateFromSnapshot(snapshot: IFSEntrySnapshot): void {
    this.path = snapshot.path
  }

  get dirname() {
    return dirname(this.path)
  }

  get root(): IDir {
    return new Dir(this.dirname)
  }

  basename(extname?: string) {
    return basename(this.path, extname)
  }

  exists(): Promise<boolean> {
    return exists(this.path)
  }

  canRead() {
    return canRead(this.path)
  }

  canWrite() {
    return canWrite(this.path)
  }

  asFile() {
    return new File(this.path)
  }

  asDir() {
    return new Dir(this.path)
  }

  chmod(mod: number) {
    return chmod(this.path, mod)
  }

  async isDir(): Promise<boolean> {
    return (await lstat(this.path)).isDirectory()
  }

  async isFile(): Promise<boolean> {
    return (await lstat(this.path)).isFile()
  }

  async remove() {
    if (!await this.exists()) {
      return
    }
    
    try {
      await rm(this.path, { recursive: await this.isDir(), force: true })
    } catch (error: any) {
      throw new ProgramError(ErrorText.removeError, error, this.path)
    }
  }

  async move(path: string): Promise<void>
  async move(entry: IFSEntry): Promise<void>
  async move(arg: string | IFSEntry): Promise<void> {
    const path = arg instanceof FSEntry
      ? arg.path
      : arg as string

    try {
      await rename(this.path, path)
    } catch (error: any) {
      throw new ProgramError(ErrorText.moveError, error, this.path, path)
    }
  }

  async rename(entry: IFSEntry): Promise<void>
  async rename(name: string): Promise<void>
  async rename(arg: string | IFSEntry): Promise<void> {
    const newName = arg instanceof FSEntry
      ? arg.basename()
      : arg as string

    try {
      await this.move(join(this.dirname, newName))
    } catch (error: any) {
      throw new ProgramError(ErrorText.renameError, error, this.basename(), newName)
    }
  }
}

/**
 * Массив сущностей в файловой системе.  
 * _main process_
 */
export class FSEntryArray extends Array<IFSEntry> implements IHasSnapshot<IFSEntryArraySnapshot> {
  takeSnapshot(): IFSEntryArraySnapshot {
    return {
      paths: this.map(entry => entry.path)
    }
  }

  updateFromSnapshot(snapshot: IFSEntryArraySnapshot): void {
    for (const path of snapshot.paths) {
      this.push(new FSEntry(path))
    }
  }

  /**
   * Получить в виде массива файлов.
   * @returns Массив файлов.
   */
  asFiles(): IFile[] {
    return this.map(entry => entry.asFile())
  }

  /**
   * Получить в виде массива папок.
   * @returns Массив папок.
   */
  asDirs(): IDir[] {
    return this.map(entry => entry.asDir())
  }
}

/**
 * Массив файлов в файловой системе.  
 * _main process_
 */
export class FileArray extends Array<IFile> implements IHasSnapshot<IFSEntryArraySnapshot> {
  takeSnapshot(): IFSEntryArraySnapshot {
    return {
      paths: this.map(entry => entry.path)
    }
  }

  updateFromSnapshot(snapshot: IFSEntryArraySnapshot): void {
    for (const path of snapshot.paths) {
      this.push(new File(path))
    }
  }
}

/**
 * Массив папок в файловой системе.  
 * _main process_
 */
export class DirArray extends Array<IDir> implements IHasSnapshot<IFSEntryArraySnapshot> {
  takeSnapshot(): IFSEntryArraySnapshot {
    return {
      paths: this.map(entry => entry.path)
    }
  }

  updateFromSnapshot(snapshot: IFSEntryArraySnapshot): void {
    for (const path of snapshot.paths) {
      this.push(new Dir(path))
    }
  }
}

/**
 * Папка в файловой системе.  
 * _main process_
 */
export class Dir extends FSEntry implements IDir {
  get name() {
    return this.basename()
  }

  dir(...path: string[]) {
    return new Dir(join(this.path, join(...path)))
  }

  file(...path: string[]) {
    return new File(join(this.path, join(...path)))
  }

  entry(...path: string[]) {
    return new FSEntry(join(this.path, join(...path)))
  }

  async read(): Promise<IFSEntry[]> {
    if (!await this.exists()) {
      return new FSEntryArray()
    }

    try {
      return new FSEntryArray(...(await readdir(this.path)).map(name => this.entry(name)))
    } catch (error: any) {
      throw new ProgramError(ErrorText.readDirError, error, this.path)
    }
  }

  async make() {
    if (await this.exists()) {
      return
    }

    try {
      await mkdir(this.path, { recursive: true })
    } catch (error: any) {
      throw new ProgramError(ErrorText.makeDirError, error, this.path)
    }
  }

  async clear() {
    await this.remove()
    await this.make()
  }

  async findFiles(args: IFindFilesArgs): Promise<IFile[]> {
    const { ext, name, recursive } = args
    const result: IFile[] = []

    if (!name && !ext) {
      return []
    }

    for (const entry of await this.read()) {
      if (await entry.isDir() && recursive) {
        result.push(...await entry.asDir().findFiles(args))

        continue
      }

      const file = entry.asFile()

      if (file.name === name || (ext && file.isExt(ext))) {
        result.push(file)
      }
    }

    return result
  }

  async findDirs(args: IFindDirsArgs): Promise<IDir[]> {
    const { name, recursive } = args
    const result: IDir[] = []

    for (const entry of await this.read()) {
      if (await entry.isFile()) {
        continue
      }

      const dir = entry.asDir()

      if (dir.name === name) {
        result.push(dir)
      }

      if (recursive) {
        result.push(...await dir.findDirs(args))
      }
    }

    return result
  }
}

/**
 * Файл в файловой системе.  
 * _main process_
*/
export class File extends FSEntry implements IFile {
  get extname(): string {
    return extname(this.path)
  }

  get name(): string {
    return basename(this.path, this.extname)
  }

  isExt(extension: string): boolean {
    return this.extname.split('.')[1] === extension
  }

  watch(listener: WatchListener<string>) {
    return watch(this.path, { persistent: false }, listener)
  }

  async exec() {
    const execResult = await canExecute(this.path)

    if (!execResult.result) {
      throw new ProgramError(ErrorText.executeFileError, execResult.error, this.path)
    }

    return execFile(this.path)
  }

  async getSize(): Promise<number> {
    return (await lstat(this.path)).size
  }

  async read(encoding?: BufferEncoding): Promise<string> {
    const readResult = await canRead(this.path)

    if (!readResult.result) {
      throw new ProgramError(ErrorText.readFileError, readResult.error, this.path)
    }

    return (await readFile(this.path, { encoding }))
      .toString()
  }

  async readFromJSON<T extends object = any>() {
    return <T>JSON.parse(await this.read())
  }

  async write(data: string, encoding?: BufferEncoding) {
    await this.make()

    const writeResult = await canWrite(this.path)

    if (!writeResult.result) {
      throw new ProgramError(ErrorText.writeFileError, writeResult.error, this.path)
    }

    await writeFile(this.path, data, encoding)
  }

  async writeToJSON(data: any) {
    await this.write(JSON.stringify(data, undefined, '\t'))
  }

  async copyTo(file: IFSEntry): Promise<void>
  async copyTo(path: string): Promise<void>
  async copyTo(arg: string | IFSEntry): Promise<void> {
    const path = arg instanceof FSEntry
      ? arg.path
      : arg as string

    try {
      await copyFile(this.path, path)
    } catch (error: any) {
      throw new ProgramError(ErrorText.copyFileError, error, this.path, path)
    }
  }

  async make() {
    if (await this.exists()) {
      return
    }

    try {
      await this.root.make()
      await writeFile(this.path, '')
    } catch (error: any) {
      throw new ProgramError(ErrorText.makeFileError, error, this.path)
    }
  }

  async clear() {
    await this.remove()
    await this.make()
  }
}

/**
 * Основные файлы.  
 * _main process_
 */
export const Files = {
  /** `config.json`. */
  config: new File(Paths.config),

  /** `sizes.json`. */
  sizes: new File(Paths.sizes),

  /** `mods.json`. */
  mods: new File(Paths.mods),

  /** `favorites.json`. */
  favorites: new File(Paths.favorites),

  /** `edited.json`. */
  edited: new File(Paths.edited),

  /** `exported.json`. */
  exported: new File(Paths.exported),

  /** Файл с переводами игры. */
  initialTexts: new File(Paths.texts),

  /** Иконка программы. */
  icon: new File(Paths.icon),

  /** Бэкап `initial.pak`. */
  backupInitial: new File(Paths.backupInitial),

  /** Бэкап `initial.pak` с датой-временем. */
  get backupInitialWithDate() {
    return new File(Paths.backupInitialWithDate)
  },

  /** Деинсталлятор. */
  uninstall: new File(Paths.uninstall)
}

/**
 * Основные папки.  
 * _main process_
 */
export const Dirs = {
  /** Папка `app`. */
  root: new Dir(Paths.root),

  /** Папка `WinRAR`. */
  winrar: new Dir(Paths.winrar),

  /** Папка со страницами. */
  pages: new Dir(Paths.pages),

  /** Папка с бэкапами. */
  backupFolder: new Dir(Paths.backupFolder),

  /** Бэкап данных `initail.pak` перед распаковкой. */
  backupInitialData: new Dir(Paths.backupInitialData),

  /** Временная папка для основных файлов. */
  mainTemp: new Dir(Paths.mainTemp),

  /** Временная папка для файлов модификаций. */
  modsTemp: new Dir(Paths.modsTemp),

  /** Временная папка для файлов обновления. */
  updateTemp: new Dir(Paths.updateTemp),

  /** Временная папка `[strings]`. */
  strings: new Dir(Paths.strings),

  /** Временная папка `classes`. */
  classes: new Dir(Paths.classes),

  /** Временная папка `_templates`. */
  templates: new Dir(Paths.templates),
  
  /** Временная папка `_dlc`. */
  dlc: new Dir(Paths.dlc)
}

/**
 * Проверить существует ли путь.
 * @param path Путь.
 * @returns Существует ли путь.
 */
async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.R_OK)
    return true
  } catch {
    return false
  }
}

/**
 * Проверить можно ли прочитать по пути.
 * @param path Путь.
 * @returns Можно ли прочитать по пути.
 */
async function canRead(path: string): Promise<ICheckResult> {
  try {
    await access(path, constants.R_OK)
    return { result: true }
  } catch (error: any) {
    return {
      result: false,
      error
    }
  }
}

/**
 * Проверить можно ли записать по пути.
 * @param path Путь.
 * @returns Можно ли записать по пути.
 */
async function canWrite(path: string): Promise<ICheckResult> {
  try {
    await access(path, constants.W_OK)
    return { result: true }
  } catch (error: any) {
    return {
      result: false,
      error
    }
  }
}

/**
 * Проверить можно ли исполнить по пути.
 * @param path Путь.
 * @returns Можно ли исполнить по пути.
 */
async function canExecute(path: string): Promise<ICheckResult> {
  try {
    await access(path, constants.X_OK)
    return { result: true }
  } catch (error: any) {
    return {
      result: false,
      error
    }
  }
}
