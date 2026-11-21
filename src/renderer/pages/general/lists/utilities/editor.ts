import type { IExportedData } from '@modules/epf/types'
import type { IFile } from '@modules/files/types'

export type EveryCallback = () => Promise<void> | void

export type ExportArgs = { source: IFile, toExport?: IFile }[]
export type ExportListener = (args: ExportArgs, every?: EveryCallback) => IExportedData | void | Promise<IExportedData | void>

export type ImportArgs = { file: IFile, toImport?: IFile }[]
export type ImportListener = (args: ImportArgs, every?: EveryCallback) => void | Promise<void>

export type ResetArgs = IFile[]
export type ResetListener = (args: ResetArgs, every?: EveryCallback) => void | Promise<void>

export class EditorUtils {
	private exportListener?: ExportListener
	private importListener?: ImportListener
	private resetListener?: ResetListener

	/**
	 * Подписаться на экспорт.
	 * @param listener Слушатель.
	 * @returns Функция отписки.
	 */
	onExport = (listener: ExportListener): (() => void) => {
		this.exportListener = listener

		return () => {
			if (this.exportListener === listener) {
				this.exportListener = undefined
			}
		}
	}

	/**
	 * Подписаться на импорт.
	 * @param listener Слушатель.
	 * @returns Функция отписки.
	 */
	onImport = (listener: ImportListener): (() => void) => {
		this.importListener = listener

		return () => {
			if (this.importListener === listener) {
				this.importListener = undefined
			}
		}
	}

	/**
	 * Подписаться на сброс.
	 * @param listener Слушатель.
	 * @returns Функция отписки.
	 */
	onReset = (listener: ResetListener): (() => void) => {
		this.resetListener = listener

		return () => {
			if (this.resetListener === listener) {
				this.resetListener = undefined
			}
		}
	}

	async export(args: ExportArgs, every?: EveryCallback) {
		return args.length
			? this.exportListener?.(args, every)
			: undefined
	}

	async import(args: ImportArgs, every?: EveryCallback) {
		const filtered: ImportArgs = []

		for (const item of args) {
			if (!item.toImport || await item.toImport?.exists()) {
				filtered.push(item)
			}
		}

		if (filtered.length) {
			await this.importListener?.(filtered, every)
		}
	}

	async reset(args: ResetArgs, every?: EveryCallback) {
		if (args.length) {
			await this.resetListener?.(args, every)
		}
	}
}

export const editorUtils = new EditorUtils()
