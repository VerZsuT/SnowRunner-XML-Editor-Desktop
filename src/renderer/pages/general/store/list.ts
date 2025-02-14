import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { Category, ListMode, SourceType } from '../enums'
import type { File, TruckType, TruckXML } from '/mods/renderer'
import { Edited, Favorites } from '/mods/renderer'

export type ItemCache = {
  xml: TruckXML
}

const itemsCache = new Map<string, ItemCache>()

export const useListStore = defineStore('list', () => {
  const category = ref(Category.trucks)
  const source = ref(SourceType.all)
  const truckType = ref<TruckType | ''>('')
  const listMode = ref(ListMode.cards)
  const name = ref('')
  const files = reactive<Record<SourceType, File[]>>({
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
      return this[SourceType.all].filter(item => Favorites.isFavorite(item))
    },
    get [SourceType.edited]() {
      return this[SourceType.all].filter(item => Edited.isEdited(item))
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
    toggleFavorite(file: File) {
      if (Favorites.isFavorite(file)) {
        Favorites.findAndRemove(item => item === file.name)
      } else {
        Favorites.push(file.name)
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
