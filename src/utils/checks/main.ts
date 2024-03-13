/** Является ли значение строкой */
export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

/** Является ли значение объектом */
export function isObject(value: unknown): value is object {
  return typeof value === 'object'
}

/** Является ли значение нулевым */
export function isNullable(value: unknown): value is null | undefined {
  return value === null || value === undefined
}

/** Является ли значение ненулевым */
export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return !isNullable(value)
}

/** Имеет ли массив элементы */
export function hasItems<T extends { length?: number }>(object: T | undefined) {
  return Boolean(object?.length)
}

/** Возвращает последний элемент массива */
export function lastItem<T>(array: T[]) {
  return array.at(-1)
}
