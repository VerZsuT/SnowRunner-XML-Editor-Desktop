import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { Favorites } from '/mods/renderer'

import { Category, SourceType } from '../enums'

const useStore = defineStore('list', () => {
  const source = ref(SourceType.main)
  const category = ref(Category.trucks)

  return {
    setSource(newSource: SourceType) {
      source.value = newSource
    },
    setCategory(newCategory: Category) {
      category.value = newCategory
    },
    toggleFavorite(name: string) {
      if (Favorites.includes(name)) {
        Favorites.set(Favorites.filter(value => value !== name))
      }
      else {
        Favorites.push(name)
      }
    },
    source,
    category
  }
})

export function useListStore() {
  const store = useStore()
  return {
    ...store,
    source: computed(() => store.source),
    category: computed(() => store.category)
  }
}
