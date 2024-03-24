import type { BoolUtils, NumUtils, PosUtils, StrUtils } from '../../../game-xml'
import { boolAttr, boolUtils, floatAttr, numUtils, posAttr, posUtils, strAttr, strUtils } from '../../../game-xml'
import Limit from '../../../limit'
import type Position from '../../../position'
import XMLWithTemplates from '../../../xml-with-templates'

import { Localization } from '/utils/texts/renderer'

/** Описание конкретного колеса */
export default class Wheel extends XMLWithTemplates {
  /** Положение левого колеса (координата z обязательно должна быть положительной) */
  @posAttr({ z: Limit.Positive })
  get Pos(): Position | undefined { return undefined }
  set Pos(_) {}
  @posUtils()
  get $Pos() { return {} as PosUtils }

  /** Этот параметр делает из левого колеса правое */
  @boolAttr()
  get RightSize() { return false }
  set RightSize(_: boolean | undefined) {}
  @boolUtils()
  get $RightSize() { return {} as BoolUtils }

  /** Значения: front и rear. Используется только для составных колес, для определения того, переднее это колесо или заднее */
  @strAttr<WheelLocation>()
  get Location() { return WheelLocation.front }
  set Location(_: WheelLocation | undefined) {}
  @strUtils<WheelLocation>()
  get $Location() { return {} as StrUtils }

  /** Крутящий момент */
  @strAttr<WheelTorque>()
  get Torque(): WheelTorque | undefined { return undefined }
  set Torque(_) {}
  @strUtils<WheelTorque>()
  get $Torque() { return {} as StrUtils }
  TorqueDesc = new Localization()
    .ru('Тип привода колеса')
    .en('Type of wheel drive')
    .de('Art des Radantriebs')
    .get()

  /** Максимальный угол поворота колеса при рулении */
  @floatAttr(new Limit({ min: -90.0, max: 90.0 }))
  get SteeringAngle() { return 0.0 }
  set SteeringAngle(_: number | undefined) {}
  @numUtils()
  get $SteeringAngle() { return {} as NumUtils }
  SteeringAngleDesc = new Localization()
    .ru('Максимальный угол поворота колеса при рулении')
    .en('The maximum angle of rotation of the wheel when taxiing')
    .de('Maximaler Lenkwinkel des Rades beim Lenken')
    .get()

  /** Угол наклона колеса по оси OX в сторону поворота */
  @floatAttr(new Limit({ min: 0.0, max: 45.0 }))
  get SteeringCastor() { return 0.0 }
  set SteeringCastor(_: number | undefined) {}
  @numUtils()
  get $SteeringCastor() { return {} as NumUtils }
  SteeringCastorDesc = new Localization()
    .ru('Угол наклона колеса в сторону поворота')
    .en('The angle of inclination of the wheel in the direction of rotation')
    .de('Neigungswinkel des Rades zum Drehen')
    .get()

  /** Минимальное значение просадки подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get SuspensionMin() { return 0.0 }
  set SuspensionMin(_: number | undefined) {}
  @numUtils()
  get $SuspensionMin() { return {} as NumUtils }

  /** Высота подвески */
  @floatAttr(new Limit({ min: -1000.0, max: 1000.0 }))
  get SuspensionHeight() { return 0.0 }
  set SuspensionHeight(_: number | undefined) {}
  @numUtils()
  get $SuspensionHeight() { return {} as NumUtils }
  SuspensionHeightDesc = new Localization()
    .ru('Высота подвески колеса')
    .en('Wheel suspension height')
    .de('Höhe der Radaufhängung')
    .get()

  /** Жесткость подвески */
  @floatAttr(new Limit({ min: 0.0, max: 1000.0 }))
  get SuspensionStrength() { return 0.0 }
  set SuspensionStrength(_: number | undefined) {}
  @numUtils()
  get $SuspensionStrength() { return {} as NumUtils }
  SuspensionStrengthDesc = new Localization()
    .ru('Жесткость подвески колеса')
    .en('Wheel suspension stiffness')
    .de('Steifigkeit der Radaufhängung')
    .get()

  /** Имя файла колеса */
  @strAttr()
  get Type(): string | undefined { return undefined }
  set Type(_) {}
  @strUtils()
  get $Type() { return {} as StrUtils }
}

export enum WheelLocation {
  front = 'front',
  rear = 'rear'
}

export enum WheelTorque {
  default = 'default',
  full = 'full',
  none = 'none',
  connectable = 'connectable'
}
