import { Lang, LOCALES, setTexts, T } from '@/utilities/localization'
import { describe, expect, it } from 'vitest'

/** Пути до листьев дерева локализации. */
function leafPaths(value: unknown, prefix = ''): string[] {
	if (typeof value !== 'object' || value === null) {
		return [prefix]
	}

	return Object.entries(value).flatMap(([key, child]) => leafPaths(child, prefix ? `${prefix}.${key}` : key))
}

describe('локализация', () => {
	it('содержит одинаковый набор ключей во всех языках', () => {
		const reference = leafPaths(LOCALES[Lang.ru]).sort()

		for (const [lang, locale] of Object.entries(LOCALES)) {
			expect(leafPaths(locale).sort(), lang).toEqual(reference)
		}
	})

	it('не содержит пустых строк', () => {
		for (const [lang, locale] of Object.entries(LOCALES)) {
			for (const path of leafPaths(locale)) {
				const value = path.split('.').reduce<unknown>((node, key) => (node as Record<string, unknown>)[key], locale)

				if (typeof value === 'string') {
					expect(value.trim(), `${lang}.${path}`).not.toBe('')
				}
			}
		}
	})

	it('применяет язык к текущим текстам', () => {
		setTexts(Lang.en)

		expect(T.updateAlert.ignore).toBe('Ignore')
		expect(T.whatsNew.changes).toHaveLength(3)

		setTexts(Lang.ru)

		expect(T.updateAlert.ignore).toBe('Игнорировать')
		expect(T.lists.title).toBe('Автомобили и прицепы')
	})
})
