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

export const useListStore = () => {
  const store = useStore()
  const { setCategory, setSource, toggleFavorite } = store
  return {
    setCategory, setSource, toggleFavorite,
    get source() { return computed(() => store.source) },
    get category() { return computed(() => store.category) }
  }
}
