import texts from './texts'
import type { IBooleanAttrDescriptor, INumberAttrDescriptor, IPositionAttrDescriptor, IStringAttrDescriptor, XmlValue } from '/mods/xml/game/attributes'
import { booleanAttr, floatAttr, positionAttr, properties, stringAttr } from '/mods/xml/game/attributes'
import Limit from '/mods/xml/game/limit'
import type Position from '/mods/xml/game/position'
import XMLWithTemplates from '/mods/xml/game/xml-with-templates'

export enum WheelLocation {
  front = 'front',
  rear = 'rear',
  middle = 'middle'
}

export enum WheelTorque {
  default = 'default',
  full = 'full',
  none = 'none',
  connectable = 'connectable'
}

/** Описание конкретного колеса. */
export default class Wheel extends XMLWithTemplates {
  /** Положение левого колеса (координата z обязательно должна быть положительной). */
  @properties({
    limit: { z: Limit.Positive }
  })
  @positionAttr()
  accessor Pos: XmlValue<Position>
  declare $Pos: IPositionAttrDescriptor

  /** Этот параметр делает из левого колеса правое. */
  @properties({
    default: false
  })
  @booleanAttr()
  accessor RightSize: XmlValue<boolean>
  declare $RightSize: IBooleanAttrDescriptor

  /** Значения: front и rear. Используется только для составных колес, для определения того, переднее это колесо или заднее. */
  @properties({
    default: WheelLocation.front
  })
  @stringAttr<WheelLocation>()
  accessor Location: XmlValue<WheelLocation>
  declare $Location: IStringAttrDescriptor<WheelLocation>

  /** Крутящий момент. */
  @properties({
    get label() { return texts.torque },
    get desc() { return texts.torqueDesc }
  })
  @stringAttr<WheelTorque>()
  accessor Torque: XmlValue<WheelTorque>
  declare $Torque: IStringAttrDescriptor<WheelTorque>

  /** Максимальный угол поворота колеса при рулении. */
  @properties({
    get label() { return texts.steeringAngle },
    get desc() { return texts.steeringAngleDesc },
    step: 1.0,
    limit: new Limit({ min: -90.0, max: 90.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor SteeringAngle: XmlValue<number>
  declare $SteeringAngle: INumberAttrDescriptor

  /** Угол наклона колеса по оси OX в сторону поворота. */
  @properties({
    get desc() { return texts.steeringCastorDesc },
    step: 1.0,
    limit: new Limit({ min: 0.0, max: 45.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor SteeringCastor: XmlValue<number>
  declare $SteeringCastor: INumberAttrDescriptor

  /** Минимальное значение просадки подвески. */
  @properties({
    limit: new Limit({ min: -1000.0, max: 1000.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor SuspensionMin: XmlValue<number>
  declare $SuspensionMin: INumberAttrDescriptor

  /** Высота подвески. */
  @properties({
    get label() { return texts.suspensionHeight },
    get desc() { return texts.suspensionHeightDesc },
    limit: new Limit({ min: -1000.0, max: 1000.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor SuspensionHeight: XmlValue<number>
  declare $SuspensionHeight: INumberAttrDescriptor

  /** Жесткость подвески. */
  @properties({
    get label() { return texts.suspensionStrength },
    get desc() { return texts.suspensionStrengthDesc },
    limit: new Limit({ min: 0.0, max: 1000.0 }),
    default: 0.0
  })
  @floatAttr()
  accessor SuspensionStrength: XmlValue<number>
  declare $SuspensionStrength: INumberAttrDescriptor

  /** Имя файла колеса. */
  @stringAttr()
  accessor Type: XmlValue<string>
  declare $Type: IStringAttrDescriptor
}
