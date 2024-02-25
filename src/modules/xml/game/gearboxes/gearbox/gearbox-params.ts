import { BaseUiDesc } from '../../base'
import type { BoolUtils } from '../../game-xml'
import { boolAttr, boolUtils } from '../../game-xml'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'

/** Наличие передач в коробке */
export default class GearboxParams extends XMLWithTemplates {
  /** “H”. Если значение false, кнопка неактивна */
  @boolAttr() 
  get IsHighGearExists() { return true }
  set IsHighGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsHighGearExists() { return {} as BoolUtils }

  /** “L+” Первая передача */
  @boolAttr()
  get IsLowerPlusGearExists() { return true }
  set IsLowerPlusGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsLowerPlusGearExists() { return {} as BoolUtils }

  /** “L”. Максимальная угловая скорость 0.45*AngVel от первой передачи */
  @boolAttr()
  get IsLowerGearExists() { return true }
  set IsLowerGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsLowerGearExists() { return {} as BoolUtils }

  @boolAttr()
  get IsManualLowGear() { return true }
  set IsManualLowGear(_: boolean | undefined) {}
  @boolUtils()
  get $IsManualLowGear() { return {} as BoolUtils }

  /** “L-”. Максимальная угловая скорость 0.2*AngVel от первой передачи */
  @boolAttr()
  get IsLowerMinusGearExists() { return true }
  set IsLowerMinusGearExists(_: boolean | undefined) {}
  @boolUtils()
  get $IsLowerMinusGearExists() { return {} as BoolUtils }

  /** Блок UI */
  @innerElement(BaseUiDesc)
  get UiDesc(): BaseUiDesc | undefined { return undefined }
}
