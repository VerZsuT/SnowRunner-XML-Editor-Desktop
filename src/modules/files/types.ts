import type { XMLElement } from '../xml/xml-element'

/** Код ошибки файловой системы. */
export type FsErrorCode = 'ENOENT' | 'EACCES' | 'EPERM' | 'EBUSY' | 'EISDIR' | 'ENOTDIR' | 'UNKNOWN'

/** Неуспешный результат операции с файловой системой. */
export interface FsFailure {
	/** Код ошибки. */
	code: FsErrorCode

	/** Путь, на котором произошла ошибка. */
	path: string

	/** Текст ошибки. */
	message: string
}

/** Результат операции с файловой системой. */
export type FsResult<T> = { ok: true; value: T } | { ok: false; error: FsFailure }

/** Информация о сущности, полученная из main процесса. */
export interface IFsEntryInfo {
	/** Полный путь. */
	path: string

	/** Имя (для файла — с расширением). */
	name: string

	/** Тип сущности. */
	kind: 'file' | 'dir'
}

/** Информация о сущности, полученная через `stat`. */
export interface IFsStat extends IFsEntryInfo {
	/** Размер в байтах. */
	size: number
}

/** Аргументы сканирования дерева. */
export interface IScanArgs {
	/** Расширение файлов (без точки). */
	ext?: string

	/** Имя файла без расширения или имя папки. */
	name?: string

	/** Рекурсивный поиск. */
	recursive?: boolean

	/** Что искать. _По умолчанию_: `files`. */
	kind?: 'files' | 'dirs' | 'all'
}

/** Событие наблюдения за файлом. */
export interface IWatcherEvent {
	/** Идентификатор наблюдателя. */
	id: string

	/** Путь, за которым наблюдают. */
	path: string

	/** Тип события. */
	event: 'rename' | 'change'

	/** Имя изменившегося файла. */
	filename: string | null
}

/** Наблюдатель за файлом. */
export interface IWatcher {
	/** Прекратить наблюдение. */
	close(): void

	/** Убрать локальных слушателей, не прекращая наблюдение. */
	removeAllListeners(): void
}

/** Файловая система, доступная renderer процессу. */
export interface IFs {
	/**
	 * Получить содержимое папки.
	 * @param path Путь к папке.
	 * @returns Сущности в папке.
	 */
	list(path: string): Promise<FsResult<IFsEntryInfo[]>>

	/**
	 * Найти сущности в дереве папок.
	 * @param path Путь к папке.
	 * @param args Аргументы поиска.
	 * @returns Найденные сущности.
	 */
	scan(path: string, args: IScanArgs): Promise<FsResult<IFsEntryInfo[]>>

	/**
	 * Найти сущности в нескольких деревьях папок.
	 * Порядок результатов совпадает с порядком входного массива путей.
	 * @param paths Пути к папкам.
	 * @param args Аргументы поиска.
	 * @returns Найденные сущности.
	 */
	scanMany(paths: string[], args: IScanArgs): Promise<FsResult<IFsEntryInfo[]>>

	/**
	 * Получить информацию о сущности.
	 * @param path Путь к сущности.
	 * @returns Информация о сущности или `null`, если её нет.
	 */
	stat(path: string): Promise<FsResult<IFsStat | null>>

	/**
	 * Получить информацию о сущностях.
	 * Порядок результатов совпадает с порядком входного массива,
	 * ошибка отдельной сущности возвращает `null`.
	 * @param paths Пути к сущностям.
	 * @returns Информация о сущностях.
	 */
	statMany(paths: string[]): Promise<FsResult<Array<IFsStat | null>>>

	/**
	 * Прочитать файл.
	 * @param path Путь к файлу.
	 * @param encoding Кодировка файла.
	 * @returns Содержимое файла.
	 */
	readFile(path: string, encoding?: BufferEncoding): Promise<FsResult<string>>

	/**
	 * Прочитать файлы.
	 * Порядок результатов совпадает с порядком входного массива,
	 * ошибка отдельного файла возвращает `null`.
	 * @param paths Пути к файлам.
	 * @param encoding Кодировка файлов.
	 * @returns Содержимое файлов.
	 */
	readMany(paths: string[], encoding?: BufferEncoding): Promise<FsResult<Array<string | null>>>

	/**
	 * Записать файл.
	 * Создаёт родительскую папку при необходимости.
	 * @param path Путь к файлу.
	 * @param data Данные.
	 * @returns Результат операции.
	 */
	writeFile(path: string, data: string): Promise<FsResult<void>>

	/**
	 * Записать файлы.
	 * @param items Пути и данные.
	 * @returns Результат операции.
	 */
	writeMany(items: Array<{ path: string; data: string }>): Promise<FsResult<void>>

	/**
	 * Создать папку.
	 * @param path Путь к папке.
	 * @returns Результат операции.
	 */
	makeDir(path: string): Promise<FsResult<void>>

	/**
	 * Рекурсивно удалить файл/папку.
	 * Ничего не делает, если сущности нет.
	 * @param path Путь.
	 * @returns Результат операции.
	 */
	remove(path: string): Promise<FsResult<void>>

	/**
	 * Переместить файл/папку.
	 * @param from Исходный путь.
	 * @param to Конечный путь.
	 * @returns Результат операции.
	 */
	move(from: string, to: string): Promise<FsResult<void>>

	/**
	 * Скопировать файл.
	 * @param from Исходный путь.
	 * @param to Конечный путь.
	 * @returns Результат операции.
	 */
	copy(from: string, to: string): Promise<FsResult<void>>

	/**
	 * Изменить права доступа.
	 * @param path Путь.
	 * @param mode Новые права.
	 * @returns Результат операции.
	 */
	chmod(path: string, mode: number): Promise<FsResult<void>>

	/**
	 * Наблюдать за файлом.
	 * @param path Путь к файлу.
	 * @returns Идентификатор наблюдателя.
	 */
	watch(path: string): FsResult<string>

	/**
	 * Прекратить наблюдение.
	 * @param id Идентификатор наблюдателя.
	 * @returns Результат операции.
	 */
	unwatch(id: string): FsResult<void>
}

/** Сущность в файловой системе. */
export interface IFSEntry {
	/** Путь к сущности. */
	path: string

	/** Имя базовой папки. */
	dirname: string

	/** Базовая папка. */
	root: IDir

	/**
	 * Получить полное имя файла/папки.
	 * @param extname Расширение файла.
	 * @returns Полное имя файла/папки.
	 */
	basename(extname?: string): string

	/**
	 * Проверить существует ли файл/папка.
	 * @returns Существует ли файл/папка.
	 */
	exists(): Promise<boolean>

	/**
	 * Преобразовать объект в файл.
	 * @returns Файл.
	 */
	asFile(): IFile

	/**
	 * Преобразовать объект в папку.
	 * @returns Папка.
	 */
	asDir(): IDir

	/**
	 * Является ли сущность папкой.
	 * @returns Является ли сущность папкой.
	 */
	isDir(): Promise<boolean>

	/**
	 * Является ли сущность файлом.
	 * @returns Является ли сущность файлом.
	 */
	isFile(): Promise<boolean>

	/**
	 * Рекурсивно удалить файл/папку.
	 * Не бросает исключение если не существует.
	 */
	remove(): Promise<void>

	/**
	 * Переместить файл/папку.
	 * @param path Путь.
	 */
	move(path: string): Promise<void>
	/**
	 * Переместить файл/папку.
	 * @param entry Сущность.
	 */
	move(entry: IFSEntry): Promise<void>

	/**
	 * Переименовать файл/папку.
	 * @param name Название.
	 */
	rename(name: string): Promise<void>
	/**
	 * Переименовать файл/папку.
	 * @param entry Сущность.
	 */
	rename(entry: IFSEntry): Promise<void>
}

/** Папка в файловой системе. */
export interface IDir extends IFSEntry {
	/** Имя папки. */
	name: string

	/**
	 * Получить папку в текущей папке.
	 * @param path Путь.
	 * @returns Папка.
	 */
	dir(...path: string[]): IDir

	/**
	 * Получить файл в текущей папке.
	 * @param path Путь.
	 * @returns Файл.
	 */
	file(...path: string[]): IFile

	/**
	 * Получить сущность в текущей папке.
	 * @param path Путь.
	 * @returns Сущность.
	 */
	entry(...path: string[]): IFSEntry

	/**
	 * Получить содержимое папки.
	 * @returns Содержимое папки.
	 */
	read(): Promise<IFSEntry[]>

	/** Создать папку. */
	make(): Promise<void>

	/** Очистить папку. */
	clear(): Promise<void>

	/**
	 * Найти файлы в папке.
	 * @param args Аргументы поиска.
	 * @returns Найденные файлы.
	 */
	findFiles(args: IFindFilesArgs): Promise<IFile[]>

	/**
	 * Найти папки в папке.
	 * @param args Аргументы поиска.
	 * @returns Найденные папки.
	 */
	findDirs(args: IFindDirsArgs): Promise<IDir[]>
}

/** Слушатель изменения файла. */
export type WatcherListener = (event: string, filename: string | null) => void

/** Файл в файловой системе. */
export interface IFile extends IFSEntry {
	/** Расширение файла. */
	extname: string

	/** Имя файла без расширения. */
	name: string

	/**
	 * Имеет ли файл такое расширение.
	 * @param extension Расширение.
	 * @returns Имеет ли файл такое расширение.
	 */
	isExt(extension: string): boolean

	/**
	 * Отследить изменения файла.
	 * @param listener Обработчик изменения.
	 * @returns Наблюдатель.
	 */
	watch(listener: WatcherListener): IWatcher

	/**
	 * Получить размер файла.
	 * @returns Размер файла.
	 */
	getSize(): Promise<number>

	/**
	 * Получить содержимое файла.
	 * @param encoding Кодировка файла.
	 * @returns Содержимое файла.
	 */
	read(encoding?: BufferEncoding): Promise<string>

	/**
	 * Получить содержимое файла из JSON.
	 * @returns Содержимое файла.
	 */
	readFromJSON<T extends object = any>(): Promise<T>

	/**
	 * Получить содержимое файла из XML.
	 * @returns Содержимое файла.
	 */
	readFromXML(): Promise<XMLElement | undefined>

	/**
	 * Записать данные в файл.
	 * Перезаписывает файл если он существует.
	 * @param data Данные.
	 * @param encoding Кодировка файла.
	 */
	write(data: string, encoding?: BufferEncoding): Promise<void>

	/**
	 * Записать данные в файл в формате JSON.
	 * @param obj Объект.
	 */
	writeToJSON<T extends object>(obj: T): Promise<void>

	/**
	 * Копировать файл.
	 * Перезаписывает файл если тот уже существует.
	 * @param entry Сущность.
	 */
	copyTo(entry: IFSEntry): Promise<void>
	/**
	 * Копировать файл.
	 * Перезаписывает файл если тот уже существует.
	 * @param path Путь.
	 */
	copyTo(path: string): Promise<void>

	/**
	 * Создать файл.
	 * Рекурсивно создаёт родительскую папку, затем сам файл.
	 * Ничего не делает если уже существует.
	 */
	make(): Promise<void>

	/**
	 * Очистить файл.
	 * Если не существует, то создаёт файл.
	 */
	clear(): Promise<void>
}

/** Наблюдатель за файлом в main процессе. */
export interface IMainWatcher extends IWatcher {
	/**
	 * Подписаться на событие наблюдателя.
	 * @param event Название события.
	 * @param listener Обработчик.
	 * @returns Наблюдатель.
	 */
	on(event: 'error', listener: (error: Error) => void): unknown
}

/** Сущность в файловой системе, доступная main процессу. */
export interface IMainFSEntry extends IFSEntry {
	/**
	 * Проверить существует ли файл/папка синхронно.
	 * @returns Существует ли файл/папка.
	 */
	existsSync(): boolean

	/**
	 * Является ли сущность папкой синхронно.
	 * @returns Является ли сущность папкой.
	 */
	isDirSync(): boolean

	/**
	 * Синхронно удалить файл/папку.
	 * Не бросает исключение если не существует.
	 */
	removeSync(): void

	/**
	 * Проверить наличие у программы прав на чтение/запись.
	 * @returns Имеет ли программа права на чтение/запись.
	 */
	hasPermissions(): Promise<boolean>

	/**
	 * Проверить можно ли прочитать файл/папку.
	 * @returns Можно ли прочитать файл/папку.
	 */
	canRead(): Promise<ICheckResult>

	/**
	 * Проверить можно ли записать файл/папку.
	 * @returns Можно ли записать файл/папку.
	 */
	canWrite(): Promise<ICheckResult>

	/**
	 * Изменить права доступа файла/папки.
	 * @param mod Новые права.
	 */
	chmod(mod: number): Promise<void>
}

/** Папка в файловой системе, доступная main процессу. */
export interface IMainDir extends IDir, IMainFSEntry {
	asFile(): IMainFile
	asDir(): IMainDir
	dir(...path: string[]): IMainDir
	file(...path: string[]): IMainFile
	entry(...path: string[]): IMainFSEntry
	findFiles(args: IFindFilesArgs): Promise<IMainFile[]>
	findDirs(args: IFindDirsArgs): Promise<IMainDir[]>

	/** Создать папку синхронно. */
	makeSync(): void
}

/** Файл в файловой системе, доступный main процессу. */
export interface IMainFile extends IFile, IMainFSEntry {
	asFile(): IMainFile
	asDir(): IMainDir

	/**
	 * Отследить изменения файла.
	 * @param listener Обработчик изменения.
	 * @returns Наблюдатель файловой системы.
	 */
	watch(listener: WatcherListener): IMainWatcher

	/**
	 * Получить содержимое файла синхронно.
	 * @param encoding Кодировка файла.
	 * @returns Содержимое файла.
	 */
	readSync(encoding?: BufferEncoding): string

	/**
	 * Получить содержимое файла из JSON синхронно.
	 * @returns Содержимое файла.
	 */
	readFromJSONSync<T extends object = any>(): T

	/**
	 * Записать данные в файл в формате JSON синхронно.
	 * @param obj Объект.
	 */
	writeToJSONSync<T extends object>(obj: T): void

	/** Создать файл синхронно. */
	makeSync(): void
}

/** Основные папки. */
export interface IDirs<D extends IDir = IDir> {
	/**
	 * Является ли объект папкой.
	 * @param other Проверяемый объект.
	 * @returns Является ли объект папкой.
	 */
	isDir(other: any): other is D

	/**
	 * Создать новый объект папки.
	 * @param pathsToJoin Пути к папке.
	 * @returns Объект папки с переданным путём.
	 */
	newDir(...pathsToJoin: string[]): D

	/** Папка `app`. */
	root: D

	/** Папка `WinRAR`. */
	winrar: D

	/** Папка со страницами. */
	pages: D

	/** Папка с бэкапами. */
	backupFolder: D

	/** Бэкап данных `initail.pak` перед распаковкой. */
	backupInitialData: D

	/** Временная папка для основных файлов. */
	mainTemp: D

	/** Временная папка для файлов модификаций. */
	modsTemp: D

	/** Временная папка для файлов обновления. */
	updateTemp: D

	/** Временная папка `[strings]`. */
	strings: D

	/** Временная папка `classes`. */
	classes: D

	/** Временная папка `_templates`. */
	templates: D

	/** Временная папка `_dlc`. */
	dlc: D
}

/** Основные файлы. */
export interface IFiles<F extends IFile = IFile> {
	/**
	 * Является ли объект файлом.
	 * @param other Проверяемый объект.
	 * @returns Является ли объект файлом.
	 */
	isFile(other: any): other is F

	/**
	 * Создать новый объект файла.
	 * @param pathsToJoin Пути к папке.
	 * @returns Объект файла с переданным путём.
	 */
	newFile(...pathsToJoin: string[]): F

	/** initial.pak */
	initial: F

	/** `config.json`. */
	config: F

	/** `sizes.json`. */
	sizes: F

	/** `mods.json`. */
	mods: F

	/** `favorites.json`. */
	favorites: F

	/** `edited.json`. */
	edited: F

	/** Файл-флаг, означающий изменение initial.pak. */
	editedFlag: F

	/** `exported.json`. */
	exported: F

	/** Файл с переводами игры. */
	initialTexts: F

	/** Иконка программы. */
	icon: F

	/** Бэкап `initial.pak`. */
	backupInitial: F

	/** Бэкап `initial.pak` с датой-временем. */
	backupInitialWithDate: F

	/** Деинсталлятор. */
	uninstall: F
}

/** Основные файлы main процесса. */
export type IMainFiles = IFiles<IMainFile>

/** Основные папки main процесса. */
export type IMainDirs = IDirs<IMainDir>

/** Результат проверки на чтение/запись. */
export interface ICheckResult {
	/** Успешно или нет. */
	result: boolean

	/** Ошибка. */
	error?: Error
}

/** Аргументы поиска файлов в папке. */
export interface IFindFilesArgs {
	/** По расширению файла. */
	ext?: string

	/** По имени. */
	name?: string

	/** Рекурсивный поиск. */
	recursive?: boolean
}

/** Аргументы поиска папок в папке. */
export interface IFindDirsArgs {
	/** По имени. */
	name: string

	/** Рекурсивный поиск. */
	recursive?: boolean
}
