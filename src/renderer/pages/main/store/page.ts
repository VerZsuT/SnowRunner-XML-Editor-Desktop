import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import { Page } from '../enums'

const useStore = defineStore('page', () => {
  const page = ref(Page.lists)

  return {
    /** Изменить текущую страницу */
    route(newPage: Page) {
      page.value = newPage
    },
    /** Текущая страница */
    page
  }
})

/** Хранилище для текущей страницы */
export function usePageStore() {
  const store = useStore()

  return {
    ...store,
    /** Текущая страница */
    page: computed(() => store.page)
  }
}
