import type { IBooleanAttrDescriptor, INumberAttrDescriptor, IPositionAttrDescriptor, IStringAttrDescriptor } from '../../../attributes'
import { booleanAttr, floatAttr, lazy, limit, positionAttr, stringAttr } from '../../../attributes'
import Limit from '../../../limit'
import type Position from '../../../position'
import XMLWithTemplates from '../../../xml-with-templates'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Описание конкретного колеса. */
export default class Wheel extends XMLWithTemplates {
  /** Положение левого колеса (координата z обязательно должна быть положительной). */
  @limit({ z: Limit.Positive })
  @positionAttr()
  accessor Pos: Position | undefined
  declare $Pos: IPositionAttrDescriptor

  /** Этот параметр делает из левого колеса правое. */
  @booleanAttr()
  accessor RightSize: boolean | undefined = false
  declare $RightSize: IBooleanAttrDescriptor

  /** Значения: front и rear. Используется только для составных колес, для определения того, переднее это колесо или заднее. */
  @stringAttr<WheelLocation>()
  accessor Location: WheelLocation | undefined = WheelLocation.front
  declare $Location: IStringAttrDescriptor<WheelLocation>

  /** Крутящий момент. */
  @stringAttr<WheelTorque>()
  accessor Torque: WheelTorque | undefined
  declare $Torque: IStringAttrDescriptor<WheelTorque>
  @lazy get TorqueDesc() {
    return new BaseLocalization()
      .ru('Тип привода колеса')
      .en('Type of wheel drive')
      .de('Art des Radantriebs')
      .get(Config)
  }

  /** Максимальный угол поворота колеса при рулении. */
  @limit(new Limit({ min: -90.0, max: 90.0 }))
  @floatAttr()
  accessor SteeringAngle: number | undefined = 0.0
  declare $SteeringAngle: INumberAttrDescriptor
  @lazy get SteeringAngleDesc() {
    return new BaseLocalization()
      .ru('Максимальный угол поворота колеса при рулении')
      .en('The maximum angle of rotation of the wheel when taxiing')
      .de('Maximaler Lenkwinkel des Rades beim Lenken')
      .get(Config)
  }

  /** Угол наклона колеса по оси OX в сторону поворота. */
  @limit(new Limit({ min: 0.0, max: 45.0 }))
  @floatAttr()
  accessor SteeringCastor: number | undefined = 0.0
  declare $SteeringCastor: INumberAttrDescriptor
  @lazy get SteeringCastorDesc() {
    return new BaseLocalization()
      .ru('Угол наклона колеса в сторону поворота')
      .en('The angle of inclination of the wheel in the direction of rotation')
      .de('Neigungswinkel des Rades zum Drehen')
      .get(Config)
  }

  /** Минимальное значение просадки подвески. */
  @limit(new Limit({ min: -1000.0, max: 1000.0 }))
  @floatAttr()
  accessor SuspensionMin: number | undefined = 0.0
  declare $SuspensionMin: INumberAttrDescriptor

  /** Высота подвески. */
  @limit(new Limit({ min: -1000.0, max: 1000.0 }))
  @floatAttr()
  accessor SuspensionHeight: number | undefined = 0.0
  declare $SuspensionHeight: INumberAttrDescriptor
  @lazy get SuspensionHeightDesc() {
    return new BaseLocalization()
      .ru('Высота подвески колеса')
      .en('Wheel suspension height')
      .de('Höhe der Radaufhängung')
      .get(Config)
  }

  /** Жесткость подвески. */
  @limit(new Limit({ min: 0.0, max: 1000.0 }))
  @floatAttr()
  accessor SuspensionStrength: number | undefined = 0.0
  declare $SuspensionStrength: INumberAttrDescriptor
  @lazy get SuspensionStrengthDesc() {
    return new BaseLocalization()
      .ru('Жесткость подвески колеса')
      .en('Wheel suspension stiffness')
      .de('Steifigkeit der Radaufhängung')
      .get(Config)
  }

  /** Имя файла колеса. */
  @stringAttr()
  accessor Type: string | undefined
  declare $Type: IStringAttrDescriptor
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
