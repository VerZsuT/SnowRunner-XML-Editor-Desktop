/**
 * Является ли значение строкой.
 * @param value Значение.
 * @returns Является ли значение строкой.
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/**
 * Является ли значение числом.
 * @param value Значение.
 * @returns Является ли значение числом.
 */
export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

/**
 * Является ли значение объектом.
 * @param value Значение.
 * @returns Является ли значение объектом.
 */
export function isObject(value: unknown): value is object {
  return typeof value === 'object'
}

/**
 * Является ли значение нулевым.
 * @param value Значение.
 * @returns Является ли значение нулевым.
 */
export function isNullable(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/**
 * Является ли значение ненулевым.
 * @param value Значение.
 * @returns Является ли значение ненулевым.
 */
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return !isNullable(value)
}

/**
 * Имеет ли массив элементы.
 * @param object Объект.
 * @returns Имеет ли массив элементы.
 */
export function hasItems<T extends { length?: number }>(object: T | undefined) {
  return Boolean(object?.length)
}

/**
 * Получить последний элемент массива.
 * @param array Массив.
 * @returns последний элемент массива.
 */
export function lastItem<T>(array: T[]) {
  return array.at(-1)
}
