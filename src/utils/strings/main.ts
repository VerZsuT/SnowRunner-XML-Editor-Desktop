/** Заменяет `_` на пробелы и делает первую букву большой. */
export function prettyString(str: string): string {
  const text = str.replaceAll('_', ' ')
  const firstChar = text[0].toUpperCase()
  return `${firstChar}${text.slice(1)}`
}

export function boolToStr(value?: boolean): string {
  return value === undefined ? '' : String(value)
}

export function strToBool(value: string): boolean {
  return value === 'true'
}

export function procNameForFS(name: string): string {
  return name
    .trim()
    .replaceAll(' ', '-')
    .replaceAll(/[!"#$%&'*+/:<=>?@\\`{|}]/gi, '')
    .toLowerCase()
}
