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

export function useFilterStore() {
  const store = useStore()
  return {
    ...store,
    filter: computed(() => store.filter)
  }
}
