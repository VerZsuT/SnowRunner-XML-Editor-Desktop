import type { AddonFile, GameTexts } from '@renderer/api/bindings'
import { addonLabel, selectableAddons } from '@renderer/api/addons'
import { describe, expect, it } from 'vitest'

/** Аддон с минимальными полями. */
function addon(name: string, installed: boolean, uiName: string | null = null): AddonFile {
	return {
		name,
		path: `D:\\data\\${name}.xml`,
		archiveName: `[media]\\classes\\trucks\\addons\\${name}.xml`,
		uiName,
		installType: installed ? 'FrameAddon' : null,
		tuning: false,
		installed,
		dlc: null,
		modName: null
	}
}

describe('selectableAddons', () => {
	it('оставляет установленные аддоны', () => {
		const list = [addon('a', false), addon('b', true)]

		expect(selectableAddons(list).map(item => item.name)).toEqual(['b'])
	})

	it('без установленных отдаёт весь список', () => {
		const list = [addon('a', false), addon('b', false)]

		expect(selectableAddons(list)).toHaveLength(2)
	})
})

describe('addonLabel', () => {
	const texts: GameTexts = {
		main: { ADDON_NAME: 'Basic sideboard' },
		mods: { mod: { ADDON_NAME: 'Mod sideboard' } }
	}

	it('переводит ключ UiName', () => {
		expect(addonLabel(addon('a', true, 'ADDON_NAME'), texts)).toBe('Basic sideboard')
	})

	it('берёт строки мода', () => {
		const value = { ...addon('a', true, 'ADDON_NAME'), modName: 'mod' }

		expect(addonLabel(value, texts)).toBe('Mod sideboard')
	})

	it('без перевода отдаёт ключ или имя файла', () => {
		expect(addonLabel(addon('a', true, 'UNKNOWN'), texts)).toBe('UNKNOWN')
		expect(addonLabel(addon('a', true), texts)).toBe('a')
	})
})
