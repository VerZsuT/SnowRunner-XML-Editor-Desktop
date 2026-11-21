import type { IFile } from '@modules/files/types'
import type { TruckType, TruckXML } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { EDITED_TOKEN, FAVORITES_TOKEN } from '@utilities/di/renderer/tokens'
import { create } from 'zustand'
import { Category, ListMode, SourceType } from '../enums'

/** Кешированный элемент. */
export type ItemCache = {
	xml: TruckXML
}

/** Файлы по источникам. */
export interface IListFiles {
	main: IFile[]
	dlc: IFile[]
	mods: IFile[]
}

/** Названия источников с файлами. */
export type ListFilesKey = keyof IListFiles

/** Состояние списка. */
export interface ListState {
	/** Категория. */
	category: Category

	/** Источник. */
	source: SourceType

	/** Тип автомобиля. */
	truckType: TruckType | ''

	/** Режим списка. */
	listMode: ListMode

	/** Фильтр по названию. */
	name: string

	/** Файлы по источникам. */
	files: IListFiles

	/** Кеш элементов. */
	itemsCache: Map<string, ItemCache>

	/** Изменить источник. */
	setSource(source: SourceType): void

	/** Изменить категорию. */
	setCategory(category: Category): void

	/** Изменить тип автомобиля. */
	setTruckType(type: TruckType | ''): void

	/** Изменить режим списка. */
	setListMode(mode: ListMode): void

	/** Изменить фильтр по названию. */
	setName(name?: string): void

	/** Изменить статус "избранное". */
	toggleFavorite(file: IFile): void

	/** Добавить файлы в источник. */
	addFiles(source: ListFilesKey, files: IFile[]): void

	/** Очистить файлы. */
	clearFiles(): void
}

/** Отсортировать файлы по названию. */
export function sortFilesByName(a: IFile, b: IFile) {
	return a.name.localeCompare(b.name)
}

/** Получить все файлы. */
export function getAllFiles(files: IListFiles): IFile[] {
	return [
		...files.main,
		...files.dlc,
		...files.mods
	].toSorted(sortFilesByName)
}

/** Получить файлы выбранного источника. */
export function getSourceFiles(files: IListFiles, source: SourceType): IFile[] {
	switch (source) {
		case SourceType.main:
			return files.main
		case SourceType.dlc:
			return files.dlc
		case SourceType.mods:
			return files.mods
		case SourceType.favorites: {
			const favorites = di.resolve(FAVORITES_TOKEN)

			return getAllFiles(files).filter(item => favorites.isFavorite(item))
		}
		case SourceType.edited: {
			const edited = di.resolve(EDITED_TOKEN)

			return getAllFiles(files).filter(item => edited.isEdited(item))
		}
		default:
			return getAllFiles(files)
	}
}

export const useListStore = create<ListState>()((set, get) => ({
	category: Category.trucks,
	source: SourceType.main,
	truckType: '',
	listMode: ListMode.cards,
	name: '',
	files: {
		main: [],
		dlc: [],
		mods: []
	},
	itemsCache: new Map(),

	setSource(source) {
		set({ source })
	},

	setCategory(category) {
		set({ category })
	},

	setTruckType(truckType) {
		set({ truckType })
	},

	setListMode(listMode) {
		set({ listMode })
	},

	setName(value) {
		set({ name: value ?? '' })
	},

	toggleFavorite(file) {
		const favorites = di.resolve(FAVORITES_TOKEN)

		if (favorites.isFavorite(file)) {
			favorites.findAndRemove(item => item === file.name)
		} else {
			favorites.push(file.name)
		}
	},

	addFiles(source, files) {
		const current = get().files[source]
		const known = new Set(current.map(file => file.path))
		const added = files.filter(file => {
			if (known.has(file.path)) {
				return false
			}

			known.add(file.path)

			return true
		})

		set(state => ({
			files: {
				...state.files,
				[source]: [...state.files[source], ...added].toSorted(sortFilesByName)
			}
		}))
	},

	clearFiles() {
		set({ files: { main: [], dlc: [], mods: [] } })
	}
}))
