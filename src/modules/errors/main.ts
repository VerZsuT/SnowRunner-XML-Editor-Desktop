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
		const normalText = (text as unknown) instanceof Error
			? (text as unknown as Error).message
			: formatString(text, ...formatArgs)
		const messages = di.resolve(MESSAGES_TOKEN)

		messages.error(normalText)

		if (error) {
			console.error(error)
		}

		super(normalText, { cause: error })
	}
}
