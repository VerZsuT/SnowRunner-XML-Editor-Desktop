import Config from '/mods/data/config/main'

import type { ITextsToLocalize, LocalizedTexts } from './types'

/**
 * Обновляет все поля объекта при изменении языка
 * @param texts - объект с локализированными вариантами
 */
export function localize<T extends ITextsToLocalize<string>>(texts: T): LocalizedTexts<T> {
  const result = {} as LocalizedTexts<T>

  for (const key in texts) {
    Object.defineProperty(result, key, {
      get: () => texts[key][Config.lang],
      enumerable: true
    })
  }
  
  return result
}
