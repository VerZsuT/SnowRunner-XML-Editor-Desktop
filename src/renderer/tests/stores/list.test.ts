import type { IFile } from '@modules/files/types'
import { Category, ListMode, SourceType } from '@renderer/pages/general/enums'
import { getAllFiles, getSourceFiles, useListStore } from '@renderer/pages/general/store/list'
import { di } from '@utilities/di/container'
import { FAVORITES_TOKEN } from '@utilities/di/renderer/tokens'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeFile } from '../helpers'

/** Зарегистрировать фиктивный список избранного. */
function registerFavorites() {
	const names: string[] = []

	const favorites = {
		names,
		isFavorite: (file: IFile) => names.includes(file.name),
		findAndRemove: (predicate: (name: string) => boolean) => {
			const index = names.findIndex(predicate)

			if (index === -1) {
				return false
			}

			names.splice(index, 1)

			return true
		},
		push: (name: string) => names.push(name)
	}

	di.register(FAVORITES_TOKEN, favorites as any)

	return favorites
}

describe('useListStore', () => {
	beforeEach(() => {
		useListStore.getState().clearFiles()
		useListStore.setState({
			category: Category.trucks,
			source: SourceType.main,
			truckType: '',
			listMode: ListMode.cards,
			name: ''
		})
	})

	it('addFiles не добавляет дубли и сортирует по имени', () => {
		const westernStar = makeFile('western-star')
		const navistar = makeFile('navistar')
		const navistarCopy = makeFile('navistar')

		useListStore.getState().addFiles('main', [westernStar])
		useListStore.getState().addFiles('main', [navistar, navistarCopy])

		expect(useListStore.getState().files.main.map(file => file.name))
			.toEqual(['navistar', 'western-star'])
	})

	it('addFiles раскладывает файлы по источникам', () => {
		const main = makeFile('main-truck')
		const dlc = makeFile('dlc-truck')
		const mod = makeFile('mod-truck')

		useListStore.getState().addFiles('main', [main])
		useListStore.getState().addFiles('dlc', [dlc])
		useListStore.getState().addFiles('mods', [mod])

		expect(useListStore.getState().files.main).toEqual([main])
		expect(useListStore.getState().files.dlc).toEqual([dlc])
		expect(useListStore.getState().files.mods).toEqual([mod])
	})

	it('clearFiles очищает все источники', () => {
		useListStore.getState().addFiles('main', [makeFile('a')])
		useListStore.getState().addFiles('dlc', [makeFile('b')])

		useListStore.getState().clearFiles()

		expect(useListStore.getState().files).toEqual({ main: [], dlc: [], mods: [] })
	})

	it('toggleFavorite добавляет и убирает файл через FAVORITES_TOKEN', () => {
		const favorites = registerFavorites()
		const file = makeFile('navistar')

		useListStore.getState().toggleFavorite(file)

		expect(favorites.names).toEqual(['navistar'])
		expect(favorites.isFavorite(file)).toBe(true)

		useListStore.getState().toggleFavorite(file)

		expect(favorites.names).toEqual([])
		expect(favorites.isFavorite(file)).toBe(false)
	})

	it('getSourceFiles фильтрует избранное и сортирует все файлы', () => {
		registerFavorites()

		const b = makeFile('b')
		const a = makeFile('a')
		const state = useListStore.getState()

		state.addFiles('main', [b, a])
		state.toggleFavorite(a)

		expect(getAllFiles(useListStore.getState().files).map(file => file.name)).toEqual(['a', 'b'])
		expect(getSourceFiles(useListStore.getState().files, SourceType.favorites)).toEqual([a])
		expect(getSourceFiles(useListStore.getState().files, SourceType.main)).toEqual([a, b])
	})
})
