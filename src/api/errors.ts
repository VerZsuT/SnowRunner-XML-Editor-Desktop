/** Текст ошибки команды или исключения для сообщения интерфейса. */
export function errorMessage(reason: unknown): string {
	return reason instanceof Error ? reason.message : String(reason)
}
