import { Lang } from '@modules/data/config/enums'
import { registerConfig, updateConfig } from '@renderer/config'
import { loadGameTexts, translate } from '@renderer/api/texts'
import { beforeEach, describe, expect, it, vi } from 'vitest'

const gameTexts = vi.fn(async (lang: string) => ({
	main: { ui_name: `main-${lang}` },
	mods: { my_mod: { ui_name: `mod-${lang}` } }
}))

vi.mock('@renderer/api/bindings', () => ({
	commands: {
		gameTexts: (lang: string) => gameTexts(lang)
	}
}))

describe('игровые переводы', () => {
	beforeEach(() => {
		gameTexts.mockClear()
		registerConfig({ lang: Lang.ru })
	})

	it('переводит ключ с учётом мода', () => {
		const texts = {
			main: { ui_name: 'Игра', only_main: 'Только игра' },
			mods: { my_mod: { ui_name: 'Мод' } }
		}

		expect(translate(texts, 'ui_name')).toBe('Игра')
		expect(translate(texts, 'ui_name', 'my_mod')).toBe('Мод')
		expect(translate(texts, 'only_main', 'my_mod')).toBe('Только игра')
		expect(translate(texts, 'missing')).toBeUndefined()
		expect(translate(texts, 'ui_name', 'unknown')).toBe('Игра')
		expect(translate(null, 'ui_name')).toBeUndefined()
		expect(translate(texts, undefined)).toBeUndefined()
	})

	it('читает переводы один раз на язык', async () => {
		const first = loadGameTexts()

		expect(loadGameTexts()).toBe(first)
		expect(await first).toEqual({ main: { ui_name: 'main-RU' }, mods: { my_mod: { ui_name: 'mod-RU' } } })
		expect(gameTexts).toHaveBeenCalledTimes(1)

		updateConfig('lang', Lang.en)

		expect(await loadGameTexts()).toEqual({ main: { ui_name: 'main-EN' }, mods: { my_mod: { ui_name: 'mod-EN' } } })
		expect(gameTexts).toHaveBeenCalledTimes(2)
	})
})
