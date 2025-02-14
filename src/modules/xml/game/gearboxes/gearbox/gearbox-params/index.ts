import type { IBooleanAttrDescriptor, XmlElement, XmlValue } from '../../../attributes'
import { booleanAttr, properties } from '../../../attributes'
import { BaseUiDesc } from '../../../base'
import XMLWithTemplates, { innerElement } from '../../../xml-with-templates'
import texts from './texts'

/** Наличие передач в коробке. */
export default class GearboxParams extends XMLWithTemplates {
  /** “H”. Если значение false, кнопка неактивна. */
  @properties({
    get label() { return texts.isHighGearExists },
    get desc() { return texts.isHighGearExistsDesc },
    default: true
  })
  @booleanAttr()
  accessor IsHighGearExists: XmlValue<boolean>
  declare $IsHighGearExists: IBooleanAttrDescriptor

  /** “L+” Первая передача. */
  @properties({
    get label() { return texts.isLowerPlusGearExists },
    get desc() { return texts.isLowerPlusGearExistsDesc },
    default: true
  })
  @booleanAttr()
  accessor IsLowerPlusGearExists: XmlValue<boolean>
  declare $IsLowerPlusGearExists: IBooleanAttrDescriptor

  /** “L”. Максимальная угловая скорость 0.45*AngVel от первой передачи. */
  @properties({
    get label() { return texts.isLowerGearExists },
    get desc() { return texts.isLowerGearExistsDesc },
    default: true
  })
  @booleanAttr()
  accessor IsLowerGearExists: XmlValue<boolean>
  declare $IsLowerGearExists: IBooleanAttrDescriptor

  /** Точная регулировка. */
  @properties({
    get label() { return texts.isManualLowGear },
    get desc() { return texts.isManualLowGearDesc },
    default: false
  })
  @booleanAttr()
  accessor IsManualLowGear: XmlValue<boolean>
  declare $IsManualLowGear: IBooleanAttrDescriptor

  /** “L-”. Максимальная угловая скорость 0.2*AngVel от первой передачи. */
  @properties({
    get label() { return texts.isLowerMinusGearExists },
    get desc() { return texts.isLowerMinusGearExistsDesc },
    default: true
  })
  @booleanAttr()
  accessor IsLowerMinusGearExists: XmlValue<boolean>
  declare $IsLowerMinusGearExists: IBooleanAttrDescriptor

  /** Блок UI. */
  @innerElement(BaseUiDesc)
  readonly UiDesc: XmlElement<BaseUiDesc>
}
