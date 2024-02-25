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

export const usePageStore = () => {
  const store = useStore()
  const { route } = store
  return {
    route,
    get page() { return computed(() => store.page) }
  }
}
