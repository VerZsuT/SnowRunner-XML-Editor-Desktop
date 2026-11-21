import { di } from '@utilities/di/container'
import { MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createProgramError, ProgramError, reportError } from './renderer'

/** Получатель сообщений. */
const messages = { error: vi.fn<(message: unknown) => void>() }

beforeEach(() => {
	vi.spyOn(console, 'error').mockImplementation(() => {})
	messages.error.mockClear()
	di.register(MESSAGES_TOKEN, messages as any)
})

describe('ProgramError [renderer]', () => {
	it('создаётся без показа уведомления', () => {
		const error = new ProgramError('code', 'message')

		expect(error.code).toBe('code')
		expect(messages.error).not.toHaveBeenCalled()
	})

	it('createProgramError форматирует текст', () => {
		expect(createProgramError('Ошибка "{}"', undefined, 'x').message).toBe('Ошибка "x"')
		expect(messages.error).not.toHaveBeenCalled()
	})
})

describe('reportError [renderer]', () => {
	it('показывает одно уведомление на ошибку', () => {
		reportError(new Error('cannot read file'), 'ui')

		expect(messages.error).toHaveBeenCalledTimes(1)
	})
})
