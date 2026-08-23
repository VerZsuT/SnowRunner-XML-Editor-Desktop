import type { LocalizationStrings } from '.'

/** Тексты для локализации. */
export interface ITextsToLocalize<T> {
  [key: string]: LocalizationStrings<T>
}

/** Локализированные тексты. */
export type LocalizedTexts<T extends ITextsToLocalize<any>> = {
  [key in keyof T]: ReturnType<T[key]['get']>
}
