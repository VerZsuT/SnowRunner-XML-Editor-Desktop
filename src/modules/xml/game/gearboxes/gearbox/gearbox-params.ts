import { BaseUiDesc } from '../../base'
import type { BoolUtils } from '../../game-xml'
import { boolAttr, boolUtils } from '../../game-xml'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Наличие передач в коробке */
export default class GearboxParams extends XMLWithTemplates {
  /** “H”. Если значение false, кнопка неактивна */
  @boolAttr() 
  get IsHighGearExists() { return true }
  set IsHighGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsHighGearExists() { return {} as BoolUtils }
  IsHighGearExistsDesc = new Localization()
    .ru('Доступна ли повышенная передача')
    .en('Is high gear available')
    .de('Ist eine erhöhte Übertragung verfügbar')
    .get()

  /** “L+” Первая передача */
  @boolAttr()
  get IsLowerPlusGearExists() { return true }
  set IsLowerPlusGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsLowerPlusGearExists() { return {} as BoolUtils }
  IsLowerPlusGearExistsDesc = new Localization()
    .ru('Доступна ли пониженная+ (первая) передача')
    .en('Is lower+ (first) gear available')
    .de('Ist ein reduzierter+ (erster) Gang verfügbar')
    .get()

  /** “L”. Максимальная угловая скорость 0.45*AngVel от первой передачи */
  @boolAttr()
  get IsLowerGearExists() { return true }
  set IsLowerGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsLowerGearExists() { return {} as BoolUtils }
  IsLowerGearExistsDesc = new Localization()
    .ru('Доступна ли пониженная передача (45% скорости первой передачи)')
    .en('Is lower gear available (45% of the first gear speed)')
    .de('Ist eine reduzierte Übertragung verfügbar (45% der ersten Übertragungsrate)')
    .get()

  /** Точная регулировка */
  @boolAttr()
  get IsManualLowGear() { return false }
  set IsManualLowGear(_: boolean | undefined) {}
  @boolUtils()
  get $IsManualLowGear() { return {} as BoolUtils }
  IsManualLowGearDesc = new Localization()
    .ru('Доступна ли точная регулировка')
    .en('Is a manual gear available')
    .de('Ist eine genaue Einstellung verfügbar')
    .get()

  /** “L-”. Максимальная угловая скорость 0.2*AngVel от первой передачи */
  @boolAttr()
  get IsLowerMinusGearExists() { return true }
  set IsLowerMinusGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsLowerMinusGearExists() { return {} as BoolUtils }
  IsLowerMinusGearExistsDesc = new Localization()
    .ru('Доступна ли пониженная- передача (20% скорости первой передачи)')
    .en('Is lower- available (20% of the first gear speed)')
    .de('Ist eine reduzierte Übertragung verfügbar (20% der ersten Übertragungsrate)')
    .get()

  /** Блок UI */
  @innerElement(BaseUiDesc)
  get UiDesc(): BaseUiDesc | undefined { return undefined }
}
