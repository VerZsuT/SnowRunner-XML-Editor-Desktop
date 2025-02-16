import type { BaseLocalization } from './base-localization'

/** Тексты для локализации. */
export interface ITextsToLocalize<T> {
  [key: string]: BaseLocalization<T>
}

/** Локализированные тексты. */
export type LocalizedTexts<T extends ITextsToLocalize<any>> = {
  [key in keyof T]: ReturnType<T[key]['get']>
}
