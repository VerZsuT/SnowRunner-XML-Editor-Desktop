import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import type { WheelLocation } from '../../truck/truck-data/wheels/wheel'
import XMLWithTemplates from '../../xml-with-templates'

/** Подвеска */
export default class Suspension extends XMLWithTemplates {
  /** Тип колеса */
  @strAttr()
  get WheelType(): WheelLocation | undefined { return undefined }
  set WheelType(_) {}
  @strUtils()
  get $WheelType() { return {} as StrUtils }

  /** Высота подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get Height(): number | undefined { return undefined }
  set Height(_) {}
  @numUtils()
  get $Height() { return {} as NumUtils }

  /** Жесткость подвески */
  @floatAttr(new Limit({ min: 0.01 }))
  get Strength(): number | undefined { return undefined }
  set Strength(_) {}
  @numUtils()
  get $Strength() { return {} as NumUtils }

  /** Затухание */
  @floatAttr(new Limit({ min: 0.0, max: 1000.0 }))
  get Damping(): number | undefined { return undefined }
  set Damping(_) {}
  @numUtils()
  get $Damping() { return {} as NumUtils }

  /** Минимальный ход подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get SuspensionMin(): number | undefined { return undefined }
  set SuspensionMin(_) {}
  @numUtils()
  get $SuspensionMin() { return {} as NumUtils }

  /** Максимальный ход подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get SuspensionMax(): number | undefined { return undefined }
  set SuspensionMax(_) {}
  @numUtils()
  get $SuspensionMax() { return {} as NumUtils }

  /** Максимальный ход сломанной подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get BrokenSuspensionMax(): number | undefined { return undefined }
  set BrokenSuspensionMax(_) {}
  @numUtils()
  get $BrokenSuspensionMax() { return {} as NumUtils }
}
