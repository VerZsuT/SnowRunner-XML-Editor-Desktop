import { Page } from '@modules/windows/enums'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('page', () => {
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
