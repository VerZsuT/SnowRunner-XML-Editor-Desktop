import { Page } from '@modules/windows/enums'
import { usePageStore } from '@renderer/pages/general/store/page'
import { beforeEach, describe, expect, it } from 'vitest'

const INITIAL_PAGE = usePageStore.getState().page

describe('usePageStore', () => {
	beforeEach(() => {
		usePageStore.setState({ page: Page.lists })
	})

	it('по умолчанию открывает страницу списков', () => {
		expect(INITIAL_PAGE).toBe(Page.lists)
	})

	it('меняет текущий маршрут', () => {
		usePageStore.getState().route(Page.editor)
		expect(usePageStore.getState().page).toBe(Page.editor)

		usePageStore.getState().route(Page.lists)
		expect(usePageStore.getState().page).toBe(Page.lists)
	})
})
