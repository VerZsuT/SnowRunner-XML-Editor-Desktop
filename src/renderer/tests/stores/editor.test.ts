import { useEditorStore } from '@renderer/pages/general/store/editor'
import { beforeEach, describe, expect, it } from 'vitest'
import { makeFile } from '../helpers'

describe('useEditorStore', () => {
	beforeEach(() => {
		useEditorStore.getState().clearEditorStore()
	})

	it('склеивает частичные изменения info', () => {
		useEditorStore.getState().setInfo({ dlc: 'dlc_1' })
		useEditorStore.getState().setInfo({ mod: 'mod_1', isBackup: true })

		expect(useEditorStore.getState().info).toEqual({
			dlc: 'dlc_1',
			mod: 'mod_1',
			isBackup: true
		})
	})

	it('clearEditorStore очищает файл, info и наборы файлов', () => {
		const file = makeFile('navistar')

		useEditorStore.getState().setFile(file)
		useEditorStore.getState().setInfo({ dlc: 'dlc_1' })
		useEditorStore.getState().setMainFile(file)
		useEditorStore.getState().addAllFiles('engines', [file])

		useEditorStore.getState().clearEditorStore()

		const state = useEditorStore.getState()

		expect(state.file).toBeUndefined()
		expect(state.info).toEqual({})
		expect(state.allFiles.main).toBeNull()
		expect(state.allFiles.engines).toEqual([])
		expect(state.allFiles.winches).toEqual([])
	})

	it('addAllFiles не добавляет дубли и не смешивает наборы', () => {
		const navistar = makeFile('navistar')
		const navistarCopy = makeFile('navistar')
		const westernStar = makeFile('western-star')

		useEditorStore.getState().addAllFiles('engines', [navistar])
		useEditorStore.getState().addAllFiles('engines', [navistarCopy, westernStar])

		expect(useEditorStore.getState().allFiles.engines.map(file => file.name))
			.toEqual(['navistar', 'western-star'])
		expect(useEditorStore.getState().allFiles.winches).toEqual([])
	})

	it('setMainFile меняет только главный файл', () => {
		const main = makeFile('main')
		const engine = makeFile('engine')

		useEditorStore.getState().addAllFiles('engines', [engine])
		useEditorStore.getState().setMainFile(main)

		expect(useEditorStore.getState().allFiles.main).toBe(main)
		expect(useEditorStore.getState().allFiles.engines).toEqual([engine])
	})
})
