import type { IStringAttrDescriptor } from '../attributes'
import { lazy, stringAttr } from '../attributes'
import XMLWithTemplates from '../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Блок User Interface (UI). */
export default class UiDesc extends XMLWithTemplates {
  /** Описание. */
  @stringAttr()
  accessor UiDesc: string | undefined
  declare $UiDesc: IStringAttrDescriptor
  @lazy get UiDescDesc() {
    return new BaseLocalization()
      .ru('Описание предмета')
      .en('Description of the item')
      .de('Beschreibung des Gegenstands')
      .get(Config)
  }

  /** Название. */
  @stringAttr()
  accessor UiName: string | undefined
  declare $UiName: IStringAttrDescriptor
  @lazy get UiNameDesc() {
    return new BaseLocalization()
      .ru('Название предмета')
      .en('Name of the item')
      .de('Name des Gegenstands')
      .get(Config)
  }
}
