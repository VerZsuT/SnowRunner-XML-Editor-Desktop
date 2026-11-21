import { describe, expect, it } from 'vitest'
import { isWinRarFailure } from './index'

describe('isWinRarFailure', () => {
	it('не считает ошибкой успех, предупреждение и «нет файлов по списку»', () => {
		expect(isWinRarFailure(0)).toBe(false)
		expect(isWinRarFailure(1)).toBe(false)
		expect(isWinRarFailure(10)).toBe(false)
		expect(isWinRarFailure('1')).toBe(false)
		expect(isWinRarFailure('10')).toBe(false)
	})

	it('считает ошибкой фатальные коды и отсутствие кода', () => {
		expect(isWinRarFailure(2)).toBe(true)
		expect(isWinRarFailure(4)).toBe(true)
		expect(isWinRarFailure(5)).toBe(true)
		expect(isWinRarFailure('ETIMEDOUT')).toBe(true)
		expect(isWinRarFailure(null)).toBe(true)
		expect(isWinRarFailure(undefined)).toBe(true)
	})
})
