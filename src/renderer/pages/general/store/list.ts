import type { IFile } from '@modules/files/types'
import type { TruckType, TruckXML } from '@modules/xml/renderer'
import { di } from '@utilities/di/container'
import { EDITED_TOKEN, FAVORITES_TOKEN } from '@utilities/di/renderer/tokens'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { Category, ListMode, SourceType } from '../enums'

export type ItemCache = {
	xml: TruckXML
}

const itemsCache = new Map<string, ItemCache>()

export const useListStore = defineStore('list', () => {
	const category = ref(Category.trucks)
	const source = ref(SourceType.main)
	const truckType = ref<TruckType | ''>('')
	const listMode = ref(ListMode.cards)
	const name = ref('')
	const files = reactive<Record<SourceType, IFile[]>>({
		[SourceType.main]: [],
		[SourceType.dlc]: [],
		[SourceType.mods]: [],
		get [SourceType.all]() {
			return [
				...this[SourceType.main],
				...this[SourceType.dlc],
				...this[SourceType.mods]
			].toSorted((a, b) => a.name.localeCompare(b.name))
		},
		get [SourceType.favorites]() {
			const favorites = di.resolve(FAVORITES_TOKEN)

			return this[SourceType.all].filter(item => favorites.isFavorite(item))
		},
		get [SourceType.edited]() {
			const edited = di.resolve(EDITED_TOKEN)

			return this[SourceType.all].filter(item => edited.isEdited(item))
		}
	})

	return {
		/** Изменить источник в списке */
		setSource(newSource: SourceType) {
			source.value = newSource
		},
		/** Изменить категорию в списке */
		setCategory(newCategory: Category) {
			category.value = newCategory
		},
		setTruckType(newType: TruckType) {
			truckType.value = newType
		},
		setListMode(newMode: ListMode) {
			listMode.value = newMode
		},
		/** Изменить статус "избранное" */
		toggleFavorite(file: IFile) {
			const favorites = di.resolve(FAVORITES_TOKEN)

			if (favorites.isFavorite(file)) {
				favorites.findAndRemove(item => item === file.name)
			} else {
				favorites.push(file.name)
			}
		},
		/** Изменить фильтр по названию */
		setName(newValue?: string) {
			name.value = newValue ?? ''
		},
		clearFiles() {
			files[SourceType.main].length = 0
			files[SourceType.dlc].length = 0
			files[SourceType.mods].length = 0
		},
		/** Кеш элементов. */
		itemsCache,
		/** Файлы. */
		files,
		/** Фильтр по названию */
		name,
		/** Источник в списке */
		source,
		/** Категорию в списке */
		category,
		/** Тип автомобиля. */
		truckType,
		/** Режим списка. */
		listMode
	}
})
