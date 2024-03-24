import Config from '/mods/data/config/main'

import { BaseLocalization, BaseLocalizationObj } from './base-localization'
import type { ITextsToLocalize } from './types'

/** Позволяет локализировать объект со значениями */
export class LocalizationObj<
  Value = string,
  ToLocalize extends ITextsToLocalize<Value> = ITextsToLocalize<Value>
> extends BaseLocalizationObj<Value, ToLocalize> {
  override get() {
    return super.get(Config)
  }
}

/** Позволяет локализировать значение */
export class Localization<Value = string> extends BaseLocalization<Value> {
  override get() {
    return super.get(Config)
  }
}
