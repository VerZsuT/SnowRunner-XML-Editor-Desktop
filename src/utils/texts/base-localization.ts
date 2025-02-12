import { computed } from 'vue'
import type { ITextsToLocalize, LocalizedTexts } from './types'
import { Lang } from '/mods/data/config/enums'
import type { IConfig } from '/mods/data/config/types'

/** Позволяет локализировать объект со значениями */
export class BaseLocalizationObj<
  Value = string,
  ToLocalize extends ITextsToLocalize<Value> = ITextsToLocalize<Value>
> {
  protected readonly value: ToLocalize

  constructor(obj: ToLocalize)
  constructor(obj: BaseLocalizationObj<Value, ToLocalize>)
  constructor(obj: BaseLocalizationObj<Value, ToLocalize> | ToLocalize)
  constructor(obj: BaseLocalizationObj<Value, ToLocalize> | ToLocalize) {
    this.value = obj instanceof BaseLocalizationObj ? obj.value : obj
  }

  /** Локализировать объект */
  get(config: IConfig): LocalizedTexts<typeof this.value> {
    const out = {} as any

    for (const key in this.value) {
      Object.defineProperty(out, key, {
        get: () => this.value[key].get(config),
        enumerable: true
      })
    }

    return out
  }
}

/** Позволяет локализировать значение */
export class BaseLocalization<T = string> {
  protected readonly obj: { [key in Lang]?: T } = {}

  /** Локализировать значение */
  get(config: { lang: Lang }) {
    return computed(() => this.obj[config.lang] ?? this.obj[Lang.en]!).value
  }

  ru(value: T) {
    this.obj[Lang.ru] = value
    
    return this
  }

  en(value: T) {
    this.obj[Lang.en] = value
    
    return this
  }

  de(value: T) {
    this.obj[Lang.de] = value
    
    return this
  }

  ch(value: T) {
    this.obj[Lang.ch] = value
    
    return this
  }
}
