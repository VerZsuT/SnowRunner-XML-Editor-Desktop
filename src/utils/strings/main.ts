/** Заменяет `_` на пробелы и делает первую букву большой. */
export function prettyString(str: string): string {
  const text = str.replaceAll('_', ' ')
  const firstChar = text[0].toUpperCase()
  return `${firstChar}${text.slice(1)}`
}

/** Преобразовать `boolean` в строку */
export function boolToStr(value?: boolean): string {
  return value === undefined ? '' : String(value)
}

/** Преобразовать строку в `boolean` */
export function strToBool(value: string): boolean {
  return value === 'true'
}

/** Подготовить имя к использованию в файловой системе */
export function procNameForFS(name: string): string {
  return name
    .trim()
    .replaceAll(' ', '-')
    .replaceAll(/[!"#$%&'*+/:<=>?@\\`{|}]/gi, '')
    .toLowerCase()
}
