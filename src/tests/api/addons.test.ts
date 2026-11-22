import type { AddonFile, GameTexts } from '@/api/bindings'
import { addonLabel } from '@/api/addons'
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
