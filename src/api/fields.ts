/**
 * Преобразование значений {@link Field} в строки XML-атрибутов.
 *
 * Формат повторяет Rust (`value.rs`): числа — `String(number)`, логические —
 * `true`/`false`, списки — через запятую без пробелов, позиция — `(x; y; z)`.
 */

import type { Field, MutationResult, Position } from './bindings'
import type { DocumentSession } from './documents'

/** Значение поля документа. */
export type FieldValue = string | number | boolean | Position | string[] | null

/** Приводит значение к строке атрибута; `null` удаляет атрибут. */
export function formatValue(value: unknown): string | null {
	if (value === null || value === undefined) {
		return null
	}

	if (typeof value === 'boolean') {
		return value ? 'true' : 'false'
	}

	if (typeof value === 'number') {
		return String(value)
	}

	if (Array.isArray(value)) {
		return value.join(',')
	}

	if (typeof value === 'object') {
		return formatPosition(value as Position)
	}

	return String(value)
}

/** Записывает позицию в формате игры: `(x; y; z)`. */
export function formatPosition(position: Position): string {
	return `(${position.x ?? 0}; ${position.y ?? 0}; ${position.z ?? 0})`
}

/** Отображаемое значение поля: значение документа или значение по умолчанию. */
export function fieldValue<T>(field: Field<T>): T | null {
	return field.value ?? field.defaultValue
}

/** Записывает значение поля в документ. */
export function writeField(session: DocumentSession, field: Field<unknown>, value: unknown): Promise<MutationResult> {
	return session.setAttr(field.descriptor, formatValue(value))
}

/** Сбрасывает поле к значению по умолчанию. */
export function resetField(session: DocumentSession, field: Field<unknown>): Promise<MutationResult> {
	return writeField(session, field, field.defaultValue)
}
