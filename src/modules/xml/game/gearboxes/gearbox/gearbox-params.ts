import type { IBooleanAttrDescriptor } from '../../attributes'
import { booleanAttr, lazy } from '../../attributes'
import { BaseUiDesc } from '../../base'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Наличие передач в коробке. */
export default class GearboxParams extends XMLWithTemplates {
  /** “H”. Если значение false, кнопка неактивна. */
  @booleanAttr() 
  accessor IsHighGearExists: boolean | undefined = true
  declare $IsHighGearExists: IBooleanAttrDescriptor
  @lazy get IsHighGearExistsDesc() {
    return new BaseLocalization()
      .ru('Доступна ли повышенная передача')
      .en('Is high gear available')
      .de('Ist eine erhöhte Übertragung verfügbar')
      .get(Config)
  }

  /** “L+” Первая передача. */
  @booleanAttr()
  accessor IsLowerPlusGearExists: boolean | undefined = true
  declare $IsLowerPlusGearExists: IBooleanAttrDescriptor
  @lazy get IsLowerPlusGearExistsDesc() {
    return new BaseLocalization()
      .ru('Доступна ли пониженная+ (первая) передача')
      .en('Is lower+ (first) gear available')
      .de('Ist ein reduzierter+ (erster) Gang verfügbar')
      .get(Config)
  }

  /** “L”. Максимальная угловая скорость 0.45*AngVel от первой передачи. */
  @booleanAttr()
  accessor IsLowerGearExists: boolean | undefined = true
  declare $IsLowerGearExists: IBooleanAttrDescriptor
  @lazy get IsLowerGearExistsDesc() {
    return new BaseLocalization()
      .ru('Доступна ли пониженная передача (45% скорости первой передачи)')
      .en('Is lower gear available (45% of the first gear speed)')
      .de('Ist eine reduzierte Übertragung verfügbar (45% der ersten Übertragungsrate)')
      .get(Config)
  }

  /** Точная регулировка. */
  @booleanAttr()
  accessor IsManualLowGear: boolean | undefined = false
  declare $IsManualLowGear: IBooleanAttrDescriptor
  @lazy get IsManualLowGearDesc() {
    return new BaseLocalization()
      .ru('Доступна ли точная регулировка')
      .en('Is a manual gear available')
      .de('Ist eine genaue Einstellung verfügbar')
      .get(Config)
  }

  /** “L-”. Максимальная угловая скорость 0.2*AngVel от первой передачи. */
  @booleanAttr()
  accessor IsLowerMinusGearExists: boolean | undefined = true
  declare $IsLowerMinusGearExists: IBooleanAttrDescriptor
  @lazy get IsLowerMinusGearExistsDesc() {
    return new BaseLocalization()
      .ru('Доступна ли пониженная- передача (20% скорости первой передачи)')
      .en('Is lower- available (20% of the first gear speed)')
      .de('Ist eine reduzierte Übertragung verfügbar (20% der ersten Übertragungsrate)')
      .get(Config)
  }

  /** Блок UI. */
  @innerElement(BaseUiDesc)
  readonly UiDesc: BaseUiDesc | undefined
}
