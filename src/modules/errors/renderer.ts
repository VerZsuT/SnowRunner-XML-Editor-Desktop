import { di } from '@utilities/di/container'
import { MESSAGES_TOKEN } from '@utilities/di/renderer/tokens'
import { formatString } from '@utilities/strings/renderer'

/**
 * Ошибка программы.
 * Чистые данные: создание ошибки не показывает уведомлений.
 * _renderer process_
 */
export class ProgramError extends Error {
	/**
	 * Создать ошибку программы.
	 * @param code Код ошибки.
	 * @param message Текст ошибки.
	 * @param cause Причина.
	 */
	constructor(readonly code: string, message: string, cause?: unknown) {
		super(message, { cause })
		this.name = 'ProgramError'
	}
}

/**
 * Создать ошибку программы из текста локализации.
 * @param text Текст ошибки.
 * @param cause Причина.
 * @param formatArgs Аргументы для вставки.
 * @returns Ошибка программы.
 */
export function createProgramError(text: string, cause?: unknown, ...formatArgs: string[]): ProgramError {
	const message = (text as unknown) instanceof Error
		? (text as unknown as Error).message
		: formatString(String(text), ...formatArgs)

	return new ProgramError(String(text), message, cause)
}

/** Граница обработки ошибки. */
export type ErrorBoundaryKind = 'ui' | 'startup' | 'background'

/**
 * Показать ошибку один раз на границе renderer процесса.
 * @param error Ошибка.
 * @param boundary Граница обработки.
 */
export function reportError(error: unknown, boundary: ErrorBoundaryKind = 'ui'): void {
	const normalized = error instanceof Error ? error : new Error(String(error))

	console.error(`[${boundary}]`, normalized)

	try {
		di.resolve(MESSAGES_TOKEN).error(normalized)
	} catch {
		// Сообщения недоступны (например, в тестах без DI).
	}
}
