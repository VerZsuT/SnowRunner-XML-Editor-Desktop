import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { Favorites } from '/mods/renderer'

import { Category, SourceType } from '../enums'

const useStore = defineStore('list', () => {
  const source = ref(SourceType.main)
  const category = ref(Category.trucks)
  const filter = ref('')

  return {
    /** Изменить источник в списке */
    setSource(newSource: SourceType) {
      source.value = newSource
    },
    /** Изменить категорию в списке */
    setCategory(newCategory: Category) {
      category.value = newCategory
    },
    /** Изменить статус "избранное" */
    toggleFavorite(name: string) {
      if (Favorites.includes(name)) {
        Favorites.set(Favorites.filter(value => value !== name))
      }
      else {
        Favorites.push(name)
      }
    },
    /** Изменить фильтр по названию */
    setFilter(newValue: string) {
      filter.value = newValue
    },
    /** Фильтр по названию */
    filter,
    /** Источник в списке */
    source,
    /** Категорию в списке */
    category
  }
})

/** Хранилище для списка авто / прицепов */
export function useListStore() {
  const store = useStore()

  return {
    ...store,
    /** Фильтр по названию */
    filter: computed(() => store.filter),
    /** Источник в списке */
    source: computed(() => store.source),
    /** Категория в списке */
    category: computed(() => store.category)
  }
}
