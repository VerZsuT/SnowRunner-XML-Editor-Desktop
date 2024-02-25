import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const useStore = defineStore('filter', () => {
  const filter = ref('')

  return {
    setFilter(newValue: string) {
      filter.value = newValue
    },
    filter
  }
})

export const useFilterStore = () => {
  const store = useStore()
  const { setFilter } = store
  return {
    setFilter,
    get filter() { return computed(() => store.filter) }
  }
}
