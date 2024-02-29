import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { Page } from '../enums'

const useStore = defineStore('page', () => {
  const page = ref(Page.lists)

  return {
    route(newPage: Page) {
      page.value = newPage
    },
    page
  }
})

export function usePageStore() {
  const store = useStore()
  return {
    ...store,
    page: computed(() => store.page)
  }
}
