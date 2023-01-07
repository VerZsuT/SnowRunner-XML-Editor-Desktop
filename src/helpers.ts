export function isString(value: unknown): value is string {
  return typeof value === 'string'
}

export function isObject(value: unknown): value is object {
  return typeof value === 'object'
}

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined
}

export function isNullable(value: unknown): value is null | undefined {
  return !isNonNullable(value)
}
