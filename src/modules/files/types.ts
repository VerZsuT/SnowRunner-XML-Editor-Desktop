import type { ChildProcess } from 'node:child_process'
import type { FSWatcher, WatchListener } from 'node:fs'
import type { XMLElement } from '../xml/xml-element'

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
	 * Проверить существует ли файл/папка.
	 * @returns Существует ли файл/папка.
	 */
	existsSync(): boolean

	/**
	 * Проверить наличие у программы прав на чтение/запись файла/папки.
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
	 * Изменить права доступа файла/папки.
	 * @param mod Новые права.
	 */
	chmod(mod: number): Promise<void>

	/**
	 * Является ли сущность папкой.
	 * @returns Является ли сущность папкой.
	 */
	isDir(): Promise<boolean>

	/**
	 * Является ли сущность папкой.
	 * @returns Является ли сущность папкой.
	 */
	isDirSync(): boolean

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
	 * Рекурсивно удалить файл/папку.
	 * Не бросает исключение если не существует.
	 */
	removeSync(): void

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

	/** Создать папку. */
	makeSync(): void

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
	 */
	watch(listener: WatchListener<string>): FSWatcher

	/**
	 * Выполнить файл.
	 * @returns Процесс выполнения.
	 */
	exec(): Promise<ChildProcess>

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
	 * Получить содержимое файла.
	 * @param encoding Кодировка файла.
	 * @returns Содержимое файла.
	 */
	readSync(encoding?: BufferEncoding): string

	/**
	 * Получить содержимое файла из JSON.
	 * @returns Содержимое файла.
	 */
	readFromJSON<T extends object = any>(): Promise<T>

	/**
	 * Получить содержимое файла из JSON.
	 * @returns Содержимое файла.
	 */
	readFromJSONSync<T extends object = any>(): T

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
	 * @param data Объект.
	 */
	writeToJSON<T extends object>(obj: T): Promise<void>

	/**
	 * Записать данные в файл в формате JSON.
	 * @param data Объект.
	 */
	writeToJSONSync<T extends object>(obj: T): void

	/**
	 * Копировать файл.
	 * Перезаписывает файл если тот уже существует.
	 * @param file Сущность.
	 */
	copyTo(entry: IFSEntry): Promise<void>
	/**
	 * Копировать файл.
	 * Перезаписывает файл если тот уже существует.
	 * @param path Путь.
	 */
	copyTo(path: string): Promise<void>

	/**
	 * Создать файл файл.
	 * Рекурсивно создаёт родительскую папку, затем сам файл.
	 * Ничего не делает если уже существует.
	 */
	make(): Promise<void>

	/**
	 * Создать файл файл.
	 * Рекурсивно создаёт родительскую папку, затем сам файл.
	 * Ничего не делает если уже существует.
	 */
	makeSync(): void

	/**
	 * Очистить файл.
	 * Если не существует, то создаёт файл.
	 */
	clear(): Promise<void>
}

/** Основные папки. */
export interface IDirs {
	/**
	 * Является ли объект папкой.
	 * @param other Проверяемый объект.
	 * @returns Является ли объект папкой.
	 */
	isDir(other: any): other is IDir


	/**
	 * Создать новый объект папки.
	 * @param pathsToJoin Пути к папке.
	 * @returns Объект папки с переданным путём.
	 */
	newDir(...pathsToJoin: string[]): IDir

	/** Папка `app`. */
	root: IDir

	/** Папка `WinRAR`. */
	winrar: IDir

	/** Папка со страницами. */
	pages: IDir

	/** Папка с бэкапами. */
	backupFolder: IDir

	/** Бэкап данных `initail.pak` перед распаковкой. */
	backupInitialData: IDir

	/** Временная папка для основных файлов. */
	mainTemp: IDir

	/** Временная папка для файлов модификаций. */
	modsTemp: IDir

	/** Временная папка для файлов обновления. */
	updateTemp: IDir

	/** Временная папка `[strings]`. */
	strings: IDir

	/** Временная папка `classes`. */
	classes: IDir

	/** Временная папка `_templates`. */
	templates: IDir

	/** Временная папка `_dlc`. */
	dlc: IDir
}

/** Основные файлы. */
export interface IFiles {
	/**
	 * Является ли объект файлом.
	 * @param other Проверяемый объект.
	 * @returns Является ли объект файлом.
	 */
	isFile(other: any): other is IFile

	/**
	 * Создать новый объект файла.
	 * @param pathsToJoin Пути к папке.
	 * @returns Объект файла с переданным путём.
	 */
	newFile(...pathsToJoin: string[]): IFile

	/** initial.pak */
	initial: IFile

	/** `config.json`. */
	config: IFile

	/** `sizes.json`. */
	sizes: IFile

	/** `mods.json`. */
	mods: IFile

	/** `favorites.json`. */
	favorites: IFile

	/** `edited.json`. */
	edited: IFile

	/** Файл-флаг, означающий изменение initial.pak. */
	editedFlag: IFile

	/** `exported.json`. */
	exported: IFile

	/** Файл с переводами игры. */
	initialTexts: IFile

	/** Иконка программы. */
	icon: IFile

	/** Бэкап `initial.pak`. */
	backupInitial: IFile

	/** Бэкап `initial.pak` с датой-временем. */
	backupInitialWithDate: IFile

	/** Деинсталлятор. */
	uninstall: IFile
}

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
