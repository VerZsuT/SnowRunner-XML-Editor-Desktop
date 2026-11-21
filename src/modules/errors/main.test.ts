// @vitest-environment node
import { ErrorText } from '@modules/errors/enums'
import { di } from '@utilities/di/container'
import { MESSAGES_TOKEN } from '@utilities/di/main/tokens'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createProgramError, ProgramError, reportError } from './main'

/** Получатель сообщений. */
const messages = { error: vi.fn<(message: string) => void>() }

beforeEach(() => {
	vi.spyOn(console, 'error').mockImplementation(() => {})
	messages.error.mockClear()
	di.register(MESSAGES_TOKEN, messages as any)
})

describe('ProgramError', () => {
	it('создаётся без показа уведомления', () => {
		const error = new ProgramError('code', 'message', new Error('cause'))

		expect(error.message).toBe('message')
		expect(error.code).toBe('code')
		expect(messages.error).not.toHaveBeenCalled()
	})

	it('форматирует текст ошибки', () => {
		const error = createProgramError(ErrorText.readFileError, undefined, 'a.xml')

		expect(error.message).toBe('Error on reading file "a.xml"')
		expect(error.code).toBe(ErrorText.readFileError)
		expect(messages.error).not.toHaveBeenCalled()
	})
})

describe('reportError', () => {
	it('показывает ровно одно уведомление', () => {
		reportError(new Error('fs failure'), 'ui')

		expect(messages.error).toHaveBeenCalledTimes(1)
		expect(messages.error).toHaveBeenCalledWith('fs failure')
	})
})
