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
 * _Если преобразование невозможно, возвращает `undefined`_
 */
export function strToLang(str?: string): Lang | undefined {
  if (!str) return

  for (const value of Object.values(Lang)) {
    if (str === value) {
      return str as Lang
    }
  }
}

/**
 * Преобразует `locale` в `Lang`
 * 
 * _Если преобразование невозможно, возвращает `undefined`_
 */
export function localeToLang(locale?: string): Lang | undefined {
  if (!locale) {
    return
  }

  const langStr = locale.toLowerCase()

  for (const value of Object.values(Lang)) {
    if (langStr.includes(value.toLowerCase())) {
      return value
    }
  }
}

/**
 * Преобразует строку в `Lang`
 * 
 * _Если преобразование невозможно, бросает ошибку `Error`_
 */
export function parseStrToLang(str: string): Lang | never {
  const value = strToLang(str)
  if (!value) throw new Error(`Cannot parse '${str}' into Lang`)
  
  return value
}
