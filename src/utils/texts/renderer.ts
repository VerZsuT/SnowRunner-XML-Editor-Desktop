import Config from '/mods/data/config/renderer'

import type { ITextsToLocalize, LocalizedTexts } from './types'

import { reactive } from 'vue'

/**
 * Локализирует объект
 * @param texts - объект с локализированными вариантами
 */
export function localize<T extends ITextsToLocalize<any>>(texts: T): LocalizedTexts<T> {
  const result = {} as LocalizedTexts<T>

  for (const key in texts) { 
    result[key] = texts[key][Config.lang]
  }

  const textsObj = reactive(result)
  Config.onChange(() => {
    for (const key in texts) {
      textsObj[key as any] = texts[key][Config.lang]
    }
  })
  
  return textsObj as LocalizedTexts<T>
}
