/** Тип билда программы. */
export enum BuildType {
  /** Для разработки. */
  dev = 'dev',

  /** Для конечного пользователя. */
  prod = 'prod'
}

/** Язык интерфейса программы. */
export enum Lang {
  /** Русский. */
  ru = 'RU',

  /** Английский. */
  en = 'EN',

  /** Немецкий. */
  de = 'DE',

  /** Китайский (упрощённый). */
  ch = 'CH'
}

/**
 * Преобразует строку в `Lang`.  
 * _Если преобразование невозможно, возвращает `undefined`_
 * @param str Строка.
 * @returns Lang.
 */
export function strToLang(str?: string): Lang | undefined {
  if (!str) {
    return
  }

  for (const value of Object.values(Lang)) {
    if (str === value) {
      return value
    }
  }
}

/**
 * Преобразует `locale` в `Lang`.  
 * _Если преобразование невозможно, возвращает `undefined`_
 * @param locale Locale.
 * @returns Lang.
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
 * Преобразует строку в `Lang`.  
 * _Если преобразование невозможно, бросает ошибку `Error`_
 * @param str Строка.
 * @returns Lang.
 */
export function parseStrToLang(str: string): Lang | never {
  const value = strToLang(str)

  if (!value) {
    throw new Error(`Cannot parse '${str}' into Lang`)
  }
  
  return value
}
