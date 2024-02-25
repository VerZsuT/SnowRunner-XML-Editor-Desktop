import type { NumUtils } from '../game-xml'
import { intAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates from '../xml-with-templates'

/** Свойства непосредственно аддона */
export default class TruckData extends XMLWithTemplates {
  /** Объем топлива */
  @intAttr(Limit.Positive.fixed())
  get FuelCapacity() { return 0 }
  set FuelCapacity(_: number | undefined) {}
  @numUtils()
  get $FuelCapacity() { return {} as NumUtils }

  /** Объем воды */
  @intAttr(Limit.Positive.fixed())
  get WaterCapacity() { return 0 }
  set WaterCapacity(_: number | undefined) {}
  @numUtils()
  get $WaterCapacity() { return {} as NumUtils }

  /** Количество ремкомплекта */
  @intAttr(Limit.Positive.fixed())
  get RepairsCapacity() { return 0 }
  set RepairsCapacity(_: number | undefined) {}
  @numUtils()
  get $RepairsCapacity() { return {} as NumUtils }

  /** WheelRepairsCapacity */
  @intAttr(Limit.Positive.fixed())
  get WheelRepairsCapacity() { return 0 }
  set WheelRepairsCapacity(_: number | undefined) {}
  @numUtils()
  get $WheelRepairsCapacity() { return {} as NumUtils }
}
