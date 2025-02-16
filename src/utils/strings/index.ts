import { hasItems, isNumber, lastItem } from '../checks'
import type { InputArea } from '/rend/pages/general/editor/types'

/**
 * Заменить `_` на пробелы и сделать первую букву большой.
 * @param str Строка.
 * @returns Изменённая строка.
 */
export function prettyString(str: string): string {
  const text = str.replaceAll('_', ' ')
  const firstChar = text[0].toUpperCase()

  return `${firstChar}${text.slice(1)}`
}

/**
 * Форматировать строку.
 * @param str Форматируемая строка.
 * @param args Аргументы для замены "{}".
 */
export function formatString(str: string, ...args: string[]): string {
  let result = str

  for (const element of args) {
	  result = result.replace('{}', element)
  }
  
  if (args.length > 0) {
	  result = result.replace('{lst}', lastItem(args)!)
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
  return name
    .trim()
    .replaceAll(' ', '-')
    .replaceAll(/[!"#$%&'*+/:<=>?@\\`{|}]/gi, '')
    .toLowerCase()
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
