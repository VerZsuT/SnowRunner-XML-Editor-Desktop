import type { InputArea } from '@renderer/pages/general/editor/types'
import { hasItems, isNumber, lastItem } from '../checks'

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
		result = result.replace('{lst}', String(lastItem(args) ?? ''))
	}

	return result
}

/**
 * Преобразовать `boolean` в строку.
 * @param value Логическое значение.
 * @returns Строка.
 */
export function boolToString(value?: boolean): string {
	return value === undefined
		? ''
		: String(value)
}

/**
 * Преобразовать число в строку.
 * @param value Число.
 * @returns Строка.
 */
export function numberToString(value?: number): string {
	return value === undefined
		? ''
		: String(value)
}

/**
 * Преобразовать массив в строку.
 * @param value Массив для преобразования.
 * @returns Строка.
 */
export function arrayToString<T extends string>(value?: T[]): string {
	return value === undefined
		? ''
		: value.join(',')
}

export function areasToString(value: InputArea | InputArea[]): string {
	return Array.isArray(value[0])
		? value.map(item => areasToString(item)).join('; ')
		: `${value[0]}-${value[1]}`
}

/**
 * Преобразовать строку в `boolean`.
 * @param value Строка.
 * @returns Логическое значение.
 */
export function stringToBoolean(value: string): boolean {
	return value === 'true'
}

/**
 * Преобразовать строку в число.
 * @param value Строка.
 * @returns Число.
 */
export function stringToNumber(value: string | number): number {
	return isNumber(value)
		? value
		: Number.parseFloat(value)
}

/**
 * Преобразовать строку в массив строк.
 * @param str Строка для преобразования.
 * @param parser Функция-преобразователь.
 * @param delimiter Разделитель [default=','].
 */
export function stringToArray<T extends string>(
	str?: string,
	parser = (str: string) => str as T | undefined,
	delimiter = ','
): T[] | undefined {
	const values = str
		?.split(delimiter)
		.map(val => val.trim())
		?? []

	if (lastItem(values) === '') {
		values.pop()
	}

	if (!hasItems(values)) {
		return
	}

	return values
		.map(parser)
		.filter(Boolean) as T[]
}

/**
 * Подготовить название файла к использованию в файловой системе.
 * @param name Название файла.
 * @return Подготовленное название файла.
 */
export function processNameForFilesystem(name: string): string {
	const processed = String(name ?? '')
		.trim()
		.replaceAll(' ', '-')
		.replaceAll(/[!"#$%&'*+/:<=>?@\\`{|}]/gi, '')
		.replaceAll(/\.{2,}/g, '.')
		.replaceAll(/^[.-]+|[.-]+$/g, '')
		.toLowerCase()
		.slice(0, 80)

	if (!processed) {
		return 'mod'
	}

	// Имена вроде `CON` или `NUL` зарезервированы Windows и не могут быть папками.
	return /^(con|prn|aux|nul|com[1-9]|lpt[1-9])$/.test(processed)
		? `_${processed}`
		: processed
}

/**
 * Сравнить версии в формате `major.minor.patch[-prerelease]`.
 * @param a Первая версия.
 * @param b Вторая версия.
 * @returns `-1`, `0` или `1`.
 */
export function compareVersions(a: string, b: string): number {
	const parse = (version: string) => {
		const [core = '', prerelease = ''] = String(version ?? '')
			.trim()
			.replace(/^v/i, '')
			.split('-', 2)
		const numbers = core.split('.').map(part => Number.parseInt(part, 10) || 0)
		const parts = prerelease
			? prerelease.split('.').map(part => /^\d+$/.test(part) ? Number(part) : part)
			: []

		return { numbers, parts }
	}
	const pa = parse(a)
	const pb = parse(b)
	const length = Math.max(pa.numbers.length, pb.numbers.length)

	for (let i = 0; i < length; i++) {
		const diff = (pa.numbers[i] ?? 0) - (pb.numbers[i] ?? 0)

		if (diff) {
			return Math.sign(diff)
		}
	}

	if (!pa.parts.length && !pb.parts.length) {
		return 0
	}

	if (!pa.parts.length) {
		return 1
	}

	if (!pb.parts.length) {
		return -1
	}

	const partsLength = Math.max(pa.parts.length, pb.parts.length)

	for (let i = 0; i < partsLength; i++) {
		const left = pa.parts[i]
		const right = pb.parts[i]

		if (left === undefined) {
			return -1
		}

		if (right === undefined) {
			return 1
		}

		if (left === right) {
			continue
		}

		if (typeof left === 'number' && typeof right === 'number') {
			return Math.sign(left - right)
		}

		return String(left) > String(right)
			? 1
			: -1
	}

	return 0
}

/**
 * Начинается ли строка на одну из переданных строк.
 * @param str Строка.
 * @param array Массив строк.
 * @returns Начинается ли строка на одну из переданных строк.
 */
export function startsWith(str: string, array: string[]): boolean {
	for (const element of array) {
		if (str.startsWith(element!)) {
			return true
		}
	}

	return false
}
