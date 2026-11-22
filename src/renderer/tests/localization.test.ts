import { Lang, LocalizationStrings } from '@localization'
import { describe, expect, it } from 'vitest'

describe('LocalizationStrings', () => {
	it('возвращает строки для ru и en', () => {
		const text = new LocalizationStrings()
			.ru('Привет')
			.en('Hello')

		expect(text.get({ lang: Lang.ru })).toBe('Привет')
		expect(text.get({ lang: Lang.en })).toBe('Hello')
	})

	it('использует en как fallback для непереведённого языка', () => {
		const text = new LocalizationStrings().en('Hello')

		expect(text.get({ lang: Lang.de })).toBe('Hello')
		expect(text.get({ lang: Lang.ch })).toBe('Hello')
	})

	it('переопределяет перевод и поддерживает de/ch', () => {
		const text = new LocalizationStrings()
			.en('Old')
			.de('Hallo')
			.ch('你好')

		text.en('New')

		expect(text.get({ lang: Lang.en })).toBe('New')
		expect(text.get({ lang: Lang.de })).toBe('Hallo')
		expect(text.get({ lang: Lang.ch })).toBe('你好')
	})
})
