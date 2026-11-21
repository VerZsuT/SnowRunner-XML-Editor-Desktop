import type { IFile } from '@modules/files/renderer'
import type { FileInfo } from '@modules/xml/renderer'
import { create } from 'zustand'

/** Действие с маркировкой "изменённый". */
export enum EditedAction {
	/** Пометить как "изменённый". */
	markAsEdited = 'markAsEdited',

	/** Пометить как "неизмененный". */
	markAsNotEdited = 'markAsNotEdited'
}

/** Наборы файлов редактора. */
export interface IEditorFiles {
	main: IFile | null
	engines: IFile[]
	winches: IFile[]
	suspensions: IFile[]
	gearboxes: IFile[]
	wheels: IFile[]
}

/** Названия наборов файлов редактора. */
export type EditorFilesKey = Exclude<keyof IEditorFiles, 'main'>

/** Состояние редактора. */
export interface EditorState {
	/** Действие с маркировкой "изменённый". */
	editedAction: EditedAction

	/** Показывать ли сообщения. */
	showMessages: boolean

	/** Идёт сохранение. */
	isSaving: boolean

	/** Текущий файл. */
	file?: IFile

	/** Информация о файле. */
	info: FileInfo

	/** Все файлы редактора. */
	allFiles: IEditorFiles

	/** Очистить состояние. */
	clearEditorStore(): void

	/** Изменить текущий файл. */
	setFile(value: IFile): void

	/** Изменить действие с маркировкой "изменённый". */
	setEditedAction(value: EditedAction): void

	/** Изменить показ сообщений. */
	setShowMessages(value: boolean): void

	/** Изменить информацию о файле. */
	setInfo(value: Partial<FileInfo>): void

	/** Изменить состояние "сохранение". */
	setIsSaving(value: boolean): void

	/** Добавить файлы в набор (без дублей). */
	addAllFiles(key: EditorFilesKey, files: IFile[]): void

	/** Установить главный файл. */
	setMainFile(file: IFile | null): void
}

/** Стандартные файлы редактора. */
const defaultFiles = (): IEditorFiles => ({
	main: null,
	engines: [],
	winches: [],
	suspensions: [],
	gearboxes: [],
	wheels: []
})

export const useEditorStore = create<EditorState>()((set, get) => ({
	editedAction: EditedAction.markAsEdited,
	showMessages: true,
	isSaving: false,
	file: undefined,
	info: {},
	allFiles: defaultFiles(),

	clearEditorStore() {
		set({
			file: undefined,
			editedAction: EditedAction.markAsEdited,
			showMessages: true,
			isSaving: false,
			info: {},
			allFiles: defaultFiles()
		})
	},

	setFile(value) {
		set({ file: value })
	},

	setEditedAction(value) {
		set({ editedAction: value })
	},

	setShowMessages(value) {
		set({ showMessages: value })
	},

	setInfo(value) {
		set(state => ({ info: { ...state.info, ...value } }))
	},

	setIsSaving(value) {
		set({ isSaving: value })
	},

	addAllFiles(key, files) {
		const current = get().allFiles[key]
		const known = new Set(current.map(file => file.path))
		const added = files.filter(file => {
			if (known.has(file.path)) {
				return false
			}

			known.add(file.path)

			return true
		})

		if (added.length) {
			set(state => ({
				allFiles: {
					...state.allFiles,
					[key]: [...state.allFiles[key], ...added]
				}
			}))
		}
	},

	setMainFile(file) {
		set(state => ({ allFiles: { ...state.allFiles, main: file } }))
	}
}))
