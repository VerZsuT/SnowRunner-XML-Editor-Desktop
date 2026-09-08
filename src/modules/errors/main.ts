import { di } from '@utilities/di/container'
import { MESSAGES_TOKEN } from '@utilities/di/main/tokens'
import { formatString } from '@utilities/strings/main'

/**
 * Ошибка программы.
 * _main process_
 */
export class ProgramError extends Error {
	/**
	 * Создать ошибку программы.
	 * @param text Текст ошибки.
	 * @param error Объект ошибки.
	 * @param formatArgs Аргументы для вставки.
	 */
	constructor(text: string, error?: Error | null, ...formatArgs: string[]) {
		const messages = di.resolve(MESSAGES_TOKEN)

		text = formatString(text, ...formatArgs)
		messages.error(text)
		console.error(error)

		super(text, { cause: error })
	}
}
