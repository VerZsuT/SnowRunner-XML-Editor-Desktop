import type { StrUtils } from '../game-xml'
import { strAttr, strUtils } from '../game-xml'
import XMLWithTemplates from '../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Блок UI */
export default class UiDesc extends XMLWithTemplates {
  /** Описание */
  @strAttr()
  get UiDesc(): string | undefined { return undefined }
  set UiDesc(_) {}
  @strUtils()
  get $UiDesc() { return {} as StrUtils }
  get UiDescDesc() {
    return new Localization()
      .ru('Описание предмета')
      .en('Description of the item')
      .de('Beschreibung des Gegenstands')
      .get()
  }

  /** Название */
  @strAttr()
  get UiName(): string | undefined { return undefined }
  set UiName(_) {}
  @strUtils()
  get $UiName() { return {} as StrUtils }
  get UiNameDesc() {
    return new Localization()
      .ru('Название предмета')
      .en('Name of the item')
      .de('Name des Gegenstands')
      .get()
  }
}
