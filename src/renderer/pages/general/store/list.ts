import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { Category, SourceType } from '../enums'
import type { File, TruckType, TruckXML } from '/mods/renderer'
import { Favorites } from '/mods/renderer'

export type ItemCache = {
  xml: TruckXML
}

const itemsCache = new Map<string, ItemCache>()

export const useListStore = defineStore('list', () => {
  const source = ref(SourceType.main)
  const category = ref(Category.trucks)
  const truckType = ref<TruckType | ''>('')
  const name = ref('')
  const files = reactive({
    [SourceType.main]: [] as File[],
    [SourceType.dlc]: [] as File[],
    [SourceType.mods]: [] as File[],
    [SourceType.favorites]: [] as File[]
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
    /** Изменить статус "избранное" */
    toggleFavorite(name: string) {
      if (Favorites.includes(name)) {
        Favorites.set(Favorites.filter(value => value !== name))
      } else {
        Favorites.push(name)
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
      files[SourceType.favorites].length = 0
    },
    itemsCache,
    files,
    /** Фильтр по названию */
    name,
    /** Источник в списке */
    source,
    /** Категорию в списке */
    category,
    truckType
  }
})
