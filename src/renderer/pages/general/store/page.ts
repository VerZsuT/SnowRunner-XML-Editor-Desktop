import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Page } from '/mods/renderer'

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
