import { BaseWheelFriction } from '../../base'
import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'

/** Сцепление колеса с дорогой */
export default class WheelFriction extends BaseWheelFriction {
  /** Имя типа резины */
  @strAttr<WheelName>()
  get UiName(): WheelName | undefined { return undefined }
  set UiName(_) {}
  @strUtils<WheelName>()
  get $UiName() { return {} as StrUtils }
}

export enum WheelName {
  highway = 'UI_TIRE_TYPE_HIGHWAY_NAME',
  allterrain = 'UI_TIRE_TYPE_ALLTERRAIN_NAME',
  offroad = 'UI_TIRE_TYPE_OFFROAD_NAME',
  chains = 'UI_TIRE_TYPE_CHAINS_NAME',
  mudtires = 'UI_TIRE_TYPE_MUDTIRES_NAME'
}
