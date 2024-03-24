import type { BaseLocalization } from './base-localization'

export interface ITextsToLocalize<T> {
  [key: string]: BaseLocalization<T>
}

export type LocalizedTexts<T extends ITextsToLocalize<any>> = {
  [key in keyof T]: ReturnType<T[key]['get']>
}
