import { lastItem } from '/utils/checks/main'

/**
 * Форматировать строку
 * @param str - форматируемая строка
 * @param args - агрументы для замены "{}"
 */
export function format(str: string, ...args: string[]): string {
  let result = str

  for (const element of args) {
    result = result.replace('{}', element)
  }
  if (args.length > 0) {
    result = result.replace('{lst}', lastItem(args)!)
  }

  return result
}
