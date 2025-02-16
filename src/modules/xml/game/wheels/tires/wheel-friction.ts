import type { IStringAttrDescriptor, XmlValue } from '../../attributes'
import { stringAttr } from '../../attributes'
import { BaseWheelFriction } from '../../base'

/** Сцепление колеса с дорогой. */
export default class WheelFriction extends BaseWheelFriction {
  /** Имя типа резины. */
  @stringAttr<WheelName>()
  accessor UiName: XmlValue<WheelName>
  declare $UiName: IStringAttrDescriptor<WheelName>
}

export enum WheelName {
  highway = 'UI_TIRE_TYPE_HIGHWAY_NAME',
  allterrain = 'UI_TIRE_TYPE_ALLTERRAIN_NAME',
  offroad = 'UI_TIRE_TYPE_OFFROAD_NAME',
  chains = 'UI_TIRE_TYPE_CHAINS_NAME',
  mudtires = 'UI_TIRE_TYPE_MUDTIRES_NAME'
}
