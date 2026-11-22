/**
 * Заменить `_` на пробелы и сделать первую букву большой.
 * @param str Строка.
 * @returns Изменённая строка.
 */
export function prettyString(str: string): string {
	const text = str.replaceAll('_', ' ')
	const firstChar = text[0]?.toUpperCase() ?? ''

	return `${firstChar}${text.slice(1)}`
}

/**
 * Форматировать строку.
 * @param str Форматируемая строка.
 * @param args Аргументы для замены "{}".
 */
export function formatString(str: string, ...args: string[]): string {
	let result = String(str ?? '')

	for (const element of args) {
		result = result.replace('{}', String(element ?? ''))
	}

	if (args.length > 0) {
		result = result.replace('{lst}', String(args.at(-1) ?? ''))
	}

	return result
}
