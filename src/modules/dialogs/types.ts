import type { IFile } from '@modules/files/types'
import type { MessageBoxReturnValue, MessageBoxSyncOptions } from 'electron'
import type { DialogSourceType, DialogType } from './enums'

/** Параметры диалогового окна. */
export type DialogProps = Array<'openFile' | 'openDirectory' | 'multiSelections'>

/** Параметры alert. */
export interface IDialogAlertParams {
	title: string
	message: string
	type?: MessageBoxSyncOptions['type']
	noLink?: boolean
	buttons?: string[]
}

/** Параметры диалога. */
export interface IDialogParams {
	properties?: DialogProps
	filters?: {
		name: string
		extensions: string[]
	}[]
}

/** Параметры open. */
export interface IOpenDialogParams {
	type?: DialogType
	source?: DialogSourceType
	extention?: string
	defaultPath?: string
	properties?: DialogProps
}

/** Вывод системных диалогов. [renderer] */
export type IRendererDialogs = IPublicDialogs

/** Вывод системных диалогов. [public] */
export interface IPublicDialogs {
	/**
	 * Открыть окно выбора `.epf` файла.
	 * @returns Путь к выбранному `.epf` файлу.
	 */
	getEPF(): string | undefined

	/**
	 * Открыть окно сохранения `.epf` файла.
	 * @param defaultName Название файла по умолчанию.
	 * @returns Путь к выбранному `.epf` файлу.
	 */
	saveEPF(defaultName: string): string | undefined

	/**
	 * Открыть окно выбора `initial.pak`.
	 * @returns Путь к выбранному `initial.pak` файлу.
	 */
	getInitial(): string | undefined

	/**
	 * Открыть окно выбора папки.
	 * @returns Путь к выбранной папке.
	 */
	getDir(): string | undefined

	/**
	 * Открыть окно выбора папок.
	 * @returns Пути выбранных папок.
	 */
	getDirs(): string[] | undefined

	/**
	 * Открыть окно выбора `.pak` файлов.
	 * @returns Пути выбранных `.pak` файлов.
	 */
	getPaks(): string[] | undefined

	/**
	 * Открыть окно выбора `.xml` файла.
	 * @returns Путь к выбранному `.xml` файлу.
	 */
	getXML(): string | undefined
}


/** Вывод системных диалогов. [main] */
export interface IMainDialogs extends IPublicDialogs {
	/**
	 * Вывести ошибку.
	 * @param message Сообщение ошибки.
	 */
	error(message: string): Promise<MessageBoxReturnValue>

	/**
	 * Вывести сообщение.
	 * @param params Параметры сообщения.
	 */
	alert(params: IDialogAlertParams): Promise<MessageBoxReturnValue>

	/**
	 * Открыть окно выбора `.epf` файлов.
	 * @returns Пути выбранных `.epf` файлов.
	 */
	getMultiEPF(): IFile[] | undefined

	/**
	 * Открыть диалоговое окно.
	 * @param params Параметры окна.
	 * @returns Выбранная сущность.
	 */
	openDialog<T extends string | string[]>(params: IOpenDialogParams): T | undefined
}

