import { registerConfig } from '@renderer/config'
import { fieldText, optionText, texts } from '@renderer/pages/editor/texts'
import { beforeEach, describe, expect, it } from 'vitest'

describe('локализация редактора', () => {
	beforeEach(() => {
		registerConfig()
	})

	it('находит подпись поля по ключу из Rust', () => {
		expect(fieldText('truckData.backSteerSpeed')).toBe('Скорость возврата колёс')
		expect(fieldText('gameData.price')).toBe('Цена')
		expect(fieldText('engine.torque')).toBe('Крутящий момент')
	})

	it('подставляет читаемый ключ для неизвестного поля', () => {
		expect(fieldText('unknown.someValue')).toBe('SomeValue')
		expect(fieldText(null)).toBe('')
		expect(fieldText(undefined)).toBe('')
	})

	it('переводит значения перечислений', () => {
		expect(optionText('truckData.diffLockType', 'Always')).toBe('Всегда включена')
		expect(optionText('truckGameData.country', 'RU')).toBe('Россия')
		expect(optionText('truckGameData.country', 'XX')).toBe('XX')
		expect(optionText(null, 'raw')).toBe('raw')
	})

	it('отдаёт тексты экрана', () => {
		expect(texts.unlock).toBe('Разблокировка')
		expect(texts.saved).toBe('Сохранено')
	})
})
