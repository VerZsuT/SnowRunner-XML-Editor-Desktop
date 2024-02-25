import type { Lang } from '/mods/main'

export interface ITextsToLocalize<T> {
  [key: string]: {
    [key in Lang]: T
  }
}

export type LocalizedTexts<T extends LocalizedTexts<any>> = {
  [key in keyof T]: T[key][Lang.ru]
}
