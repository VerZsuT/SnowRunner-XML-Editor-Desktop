/**
 * Форматировать строку
 * 
 * @param str - форматируемая строка
 * @param args - агрументы для замены "{}"
 */
export function format(str: string, ...args: string[]): string {
  let result = str

  for (const element of args) {
    result = result.replace('{}', element!)
  }
  result = result.replace('{lst}', args.at(-1)!)

  return result
}
