/** Тип билда программы */
export enum BuildType {
  /** Билд для разработки */
  dev = 'dev',
  /** Билд для конечного пользователя */
  prod = 'prod'
}

/** Язык интерфейса программы */
export enum Lang {
  /** Русский язык интерфейса */
  ru = 'RU',
  /** Английский язык интерфейса */
  en = 'EN',
  /** Немецкий язык интерфейса */
  de = 'DE',
  /** Китайский (упрощённый) язык интерфейса */
  ch = 'CH'
}

/**
 * Преобразует строку в `Lang`
 * 
 * _Если невозможно, возвращает `undefined`_
 */
export function convertStrToLang(str?: string): Lang | undefined {
  if (!str) return undefined

  for (const value of Object.values(Lang)) {
    if (str === value) return str as Lang
  }
  return undefined
}

/**
 * Преобразует строку в `Lang`
 * 
 * _Если невозможно, бросает ошибку `Error` _
 */
export function parseStrToLang(str: string): Lang | never {
  const value = convertStrToLang(str)
  if (!value) throw new Error(`Cannot parse '${str}' into Lang`)
  return value
}
