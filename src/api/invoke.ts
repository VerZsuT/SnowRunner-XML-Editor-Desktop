import type { CommandError, ErrorCode } from './bindings'

/** Результат команды Tauri в режиме `ErrorHandlingMode::Result`. */
export type CommandResult<T> =
	| { status: 'ok', data: T }
	| { status: 'error', error: CommandError }

/** Ошибка команды с категорией: UI выбирает по ней сообщение и реакцию. */
export class CommandFailure extends Error {
	readonly code: ErrorCode
	readonly path?: string

	constructor(error: CommandError) {
		super(error.message)
		this.name = 'CommandFailure'
		this.code = error.code
		this.path = error.path ?? undefined
	}
}

/**
 * Разворачивает результат команды: возвращает данные или бросает {@link CommandFailure}.
 * Единственное место, где UI общается с `bindings.ts` напрямую по результату.
 */
export async function call<T>(result: Promise<CommandResult<T>>): Promise<T> {
	const response = await result

	if (response.status === 'error') {
		throw new CommandFailure(response.error)
	}

	return response.data
}
