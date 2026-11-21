import { Page } from '@modules/windows/enums'
import { create } from 'zustand'

/** Состояние страниц. */
interface PageState {
	/** Текущая страница. */
	page: Page

	/** Изменить текущую страницу. */
	route(page: Page): void
}

export const usePageStore = create<PageState>()(set => ({
	page: Page.lists,
	route: page => set({ page })
}))
