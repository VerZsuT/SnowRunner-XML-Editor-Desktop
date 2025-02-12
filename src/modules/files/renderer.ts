import type { IHasSnapshot } from 'emr-bridge/renderer'
import type CP from 'node:child_process'
import type FS from 'node:fs'
import type { WatchListener } from 'node:fs'
import type FSP from 'node:fs/promises'
import type PATH from 'node:path'

import type { XMLElement } from '../renderer'
import type { ICheckResult, IFindDirsArgs, IFindFilesArgs, IFSEntryArraySnapshot, IFSEntrySnapshot } from './types'
export type * from './types'

import { ErrorText, ProgramError } from '/mods/errors/renderer'
import Paths from '/mods/paths/renderer'

const {
  cp: { execFile },
  fs: { watch },
  fsp: { access, chmod, constants, copyFile, lstat, mkdir, readFile, readdir, rename, rm, writeFile },
  path: { basename, dirname, extname, join }
} = window['fast-fs'] as {
  cp: typeof CP
  fs: typeof FS
  fsp: typeof FSP
  path: typeof PATH
}

/**
 * Сущность в файловой системе  
 * _renderer process_
*/
export class FSEntry implements IHasSnapshot<IFSEntrySnapshot> {
  /** Путь к сущности */
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

  /** Имя базовой папки */
  get dirname() {
    return dirname(this.path)
  }

  /** Базовая папка */
  get root() {
    return new Dir(this.dirname)
  }

  /** Полное имя файла/папки */
  basename(extname?: string) {
    return basename(this.path, extname)
  }

  /** Проверяет существует ли файл/папка */
  exists(): Promise<boolean> {
    return exists(this.path)
  }

  /** Проверяет можно ли прочитать файл/папку */
  canRead() {
    return canRead(this.path)
  }

  /** Проверяет можно ли записать файл/папку */
  canWrite() {
    return canWrite(this.path)
  }

  /** Преобразует объект в файл */
  asFile() {
    return new File(this.path)
  }

  /** Преобразует объект в папку */
  asDir() {
    return new Dir(this.path)
  }

  /** Изменяет права доступа файла/папки */
  chmod(mod: number) {
    return chmod(this.path, mod)
  }

  /** Является ли точка папкой */
  async isDir(): Promise<boolean> {
    const stats = await lstat(this.path)
    return stats.isDirectory()
  }

  /** Является ли точка файлом */
  async isFile(): Promise<boolean> {
    const stats = await lstat(this.path)
    return stats.isFile()
  }

  /**
   * Рекурсивно удаляет файл/папку.  
   * Не бросает исключение если не существует.
   */
  async remove() {
    if (!await this.exists()) return
    
    try {
      await rm(this.path, { recursive: await this.isDir(), force: true })
    }
    catch (error: any) {
      throw new ProgramError(ErrorText.removeError, error, this.path)
    }
  }

  /** Перемещает файл/папку */
  async move(path: string): Promise<void>
  async move(entry: FSEntry): Promise<void>
  async move(arg: string | FSEntry): Promise<void> {
    const path = arg instanceof FSEntry ? arg.path : arg

    try {
      await rename(this.path, path)
    }
    catch (error: any) {
      throw new ProgramError(ErrorText.moveError, error, this.path, path)
    }
  }

  /** Переименовывает файл/папку */
  async rename(entry: FSEntry): Promise<void>
  async rename(name: string): Promise<void>
  async rename(arg: string | FSEntry): Promise<void> {
    const newName = arg instanceof FSEntry ? arg.basename() : arg

    try {
      await this.move(join(this.dirname, newName))
    }
    catch (error: any) {
      throw new ProgramError(ErrorText.renameError, error, this.basename(), newName)
    }
  }
}

/**
 * Массив сущностей в файловой системе  
 * _renderer process_
*/
export class FSEntryArray extends Array<FSEntry> implements IHasSnapshot<IFSEntryArraySnapshot> {
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

  /** Возвращает в виде массива файлов */
  asFiles(): File[] {
    return this.map(entry => entry.asFile())
  }

  /** Возвращает в виде массива папок */
  asDirs(): Dir[] {
    return this.map(entry => entry.asDir())
  }
}

export class FileArray extends Array<File> implements IHasSnapshot<IFSEntryArraySnapshot> {
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

export class DirArray extends Array<Dir> implements IHasSnapshot<IFSEntryArraySnapshot> {
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
 * Папка в файловой системе  
 * _renderer process_
 */
export class Dir extends FSEntry {
  /**
   * Имя папки.  
   * То же самое что и `basename`
   */
  get name() {
    return this.basename()
  }

  /** Возвращает объект папки в текущей папке */
  dir(...path: string[]) {
    return new Dir(join(this.path, join(...path)))
  }

  /** Возвращает объект файла в текущей папке */
  file(...path: string[]) {
    return new File(join(this.path, join(...path)))
  }

  /** Возвращает объект точки в текущей папке */
  entry(...path: string[]) {
    return new FSEntry(join(this.path, join(...path)))
  }

  /** Считывает содержимое папки */
  async read(): Promise<FSEntryArray> {
    if (!await this.exists()) return new FSEntryArray()

    try {
      const inner = await readdir(this.path)
      return new FSEntryArray(...inner.map(name => this.entry(name)))
    }
    catch (error: any) {
      throw new ProgramError(ErrorText.readDirError, error, this.path)
    }
  }

  /**
   * Рекурсивно создаёт папку.  
   * Ничего не делает если уже существует.
   */
  async make() {
    if (await this.exists()) return

    try {
      await mkdir(this.path, { recursive: true })
    }
    catch (error: any) {
      throw new ProgramError(ErrorText.makeDirError, error, this.path)
    }
  }

  /**
   * Очищает папку путём удаления и создания заново.  
   * Если не существует, то создаёт её.
   */
  async clear() {
    await this.remove()
    await this.make()
  }

  /** Поиск файлов в папке */
  async findFiles(args: IFindFilesArgs): Promise<File[]> {
    const { ext, name, recursive } = args
    const result: File[] = []

    if (!name && !ext) return []

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

  /** Поиск папок в папке */
  async findDirs(args: IFindDirsArgs): Promise<Dir[]> {
    const { name, recursive } = args
    const result: Dir[] = []

    for (const entry of await this.read()) {
      if (await entry.isFile()) continue

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
 * Файл в файловой системе  
 * _renderer process_
*/
export class File extends FSEntry {
  /** Является ли аргумент файлом */
  static isFile(other: any): other is File {
    return other instanceof File
  }

  /** Расширение файла */
  get extname() {
    return extname(this.path)
  }

  /** Имя файла без расширения */
  get name() {
    return basename(this.path, this.extname)
  }

  /** Имеет ли файл такое расширение */
  isExt(extension: string) {
    return this.extname.split('.')[1] === extension
  }

  /** Отслеживает изменения файла */
  watch(listener: WatchListener<string>) {
    return watch(this.path, { persistent: false }, listener)
  }

  /** Исполняет файл */
  async exec() {
    let execResult: ICheckResult
    if (!(execResult = await canExecute(this.path)).result) {
      throw new ProgramError(ErrorText.executeFileError, execResult.error, this.path)
    }

    return execFile(this.path)
  }

  /** Размер файла */
  async getSize(): Promise<number> {
    const stats = await lstat(this.path)
    return stats.size
  }

  /** Считывает содержимое файла. */
  async read(encoding?: BufferEncoding): Promise<string> {
    let readResult: ICheckResult
    if (!(readResult = await canRead(this.path)).result) {
      throw new ProgramError(ErrorText.readFileError, readResult.error, this.path)
    }

    const data = await readFile(this.path, { encoding })
    return data.toString()
  }

  /** Считывает содержимое xml файла. */
  async readFromXML(): Promise<XMLElement | undefined> {
    const { XMLElement } = await import('../xml/renderer')
    return XMLElement.from(await this.read())
  }

  /** Считывает содержимое файла (парсит из JSON). */
  async readFromJSON<T = any>() {
    return <T>JSON.parse(await this.read())
  }

  /**
   * Записывает данные в файл.  
   * Перезаписывает файл если он существует.
   */
  async write(data: string, encoding?: BufferEncoding) {
    await this.make()

    let writeResult: ICheckResult
    if (!(writeResult = await canWrite(this.path)).result) {
      throw new ProgramError(ErrorText.writeFileError, writeResult.error, this.path)
    }

    await writeFile(this.path, data, encoding)
  }

  /** Записывает данные в файл в формате JSON. */
  async writeToJSON(data: any) {
    await this.write(JSON.stringify(data, undefined, '\t'))
  }

  /**
   * Копирует файл.  
   * Перезаписывает файл если тот уже существует.
   */
  async copyTo(file: FSEntry): Promise<void>
  async copyTo(path: string): Promise<void>
  async copyTo(arg: string | FSEntry): Promise<void> {
    const path = arg instanceof FSEntry ? arg.path : arg

    try {
      await copyFile(this.path, path)
    }
    catch (error: any) {
      throw new ProgramError(ErrorText.copyFileError, error, this.path, path)
    }
  }

  /**
   * Создаёт файл.  
   * Рекурсивно создаёт root папку, затем сам файл.  
   * Ничего не делает если уже существует.
   */
  async make() {
    if (await this.exists()) return

    try {
      await this.root.make()
      await writeFile(this.path, '')
    }
    catch (error: any) {
      throw new ProgramError(ErrorText.makeFileError, error, this.path)
    }
  }

  /**
   * Очищает файл путём удаления и создания заново.  
   * Если не существует, то создаёт её.
   */
  async clear() {
    await this.remove()
    await this.make()
  }
}

/**
 * Работа с основными папками  
 * _renderer process_
 */
export const Dirs = {
  /** Папка `app` */
  root: new Dir(Paths.root),
  /** Папка `WinRAR` */
  winrar: new Dir(Paths.winrar),
  /** Папка со страницами */
  pages: new Dir(Paths.pages),
  
  /** Папка с бэкапами */
  backupFolder: new Dir(Paths.backupFolder),
  /** Бэкап данных `initail.pak` перед распаковкой */
  backupInitialData: new Dir(Paths.backupInitialData),
  
  /** Временная папка для основных файлов */
  mainTemp: new Dir(Paths.mainTemp),
  /** Временная папка для файлов модификаций */
  modsTemp: new Dir(Paths.modsTemp),
  /** Временная папка для файлов обновления */
  updateTemp: new Dir(Paths.updateTemp),
  /** Временная папка `[strings]` */
  strings: new Dir(Paths.strings),
  /** Временная папка `classes` */
  classes: new Dir(Paths.classes),
  /** Временная папка `_templates` */
  templates: new Dir(Paths.templates),
  /** Временная папка `_dlc` */
  dlc: new Dir(Paths.dlc)
}

/**
 * Работа с основными файлами  
 * _renderer process_
 */
export const Files = {
  /** `config.json` */
  config: new File(Paths.config),
  /** `sizes.json` */
  sizes: new File(Paths.sizes),
  /** `mods.json` */
  mods: new File(Paths.mods),
  /** `favorites.json` */
  favorites: new File(Paths.favorites),
  /** `edited.json` */
  edited: new File(Paths.edited),
  /** Файл-флаг, означающий изменение initial.pak */
  editedFlag: Dirs.mainTemp.file('edited'),
  /** `exported.json` */
  exported: new File(Paths.exported),
  /** Файл с переводами игры */
  initialTexts: new File(Paths.texts),

  /** Иконка программы */
  icon: new File(Paths.icon),
  /** Бэкап `initial.pak` */
  backupInitial: new File(Paths.backupInitial),
  /** Деинсталлятор */
  uninstall: new File(Paths.uninstall)
}

/** Проверяет существует ли путь */
async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.R_OK)
    return true
  }
  catch {
    return false
  }
}

/** Проверяет можно ли прочитать по пути */
async function canRead(path: string): Promise<ICheckResult> {
  try {
    await access(path, constants.R_OK)
    return { result: true }
  }
  catch (error: any) {
    return {
      result: false,
      error
    }
  }
}

/** Проверяет можно ли записать по пути */
async function canWrite(path: string): Promise<ICheckResult> {
  try {
    await access(path, constants.W_OK)
    return { result: true }
  }
  catch (error: any) {
    return {
      result: false,
      error
    }
  }
}

/** Проверяет можно ли исполнить по пути */
async function canExecute(path: string): Promise<ICheckResult> {
  try {
    await access(path, constants.X_OK)
    return { result: true }
  }
  catch (error: any) {
    return {
      result: false,
      error
    }
  }
}
