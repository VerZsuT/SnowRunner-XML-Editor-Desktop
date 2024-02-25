/** Является ли значение строкой */
export const isString = (value: unknown): value is string => typeof value === 'string'

/** Является ли значение объектом */
export const isObject = (value: unknown): value is object => typeof value === 'object'

/** Является ли значение ненулевым */
export const isNonNullable = <T>(value: T): value is NonNullable<T> => value !== null && value !== undefined

/** Является ли значение нулевым */
export const isNullable = (value: unknown): value is null | undefined => !isNonNullable(value)

/** Имеет ли массив элементы */
export const hasItems = <T extends { length?: number }>(object: T | undefined) => Boolean(object?.length)

/** Возвращает последний элемент массива */
export const lastItem = <T>(array: T[]) => array.at(-1)
