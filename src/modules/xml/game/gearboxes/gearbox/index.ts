import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, intAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement, innerElements } from '../../xml-with-templates'
import GameData from './game-data'
import Gear from './gear'

export * from './game-data'
export { default as GearboxGameData } from './game-data'
export { default as Gear } from './gear'

/** Коробка передач */
export default class Gearbox extends XMLWithTemplates {
  /** Коэффициент изменения расхода топлива при использовании полного привода */
  @floatAttr(new Limit({ min: 0.0, max: 32.0 }))
  get AWDConsumptionModifier() { return 1.0 }
  set AWDConsumptionModifier(_: number | undefined) {}
  @numUtils()
  get $AWDConsumptionModifier() { return {} as NumUtils }

  /** Процент повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива */
  @floatAttr(new Limit({ min: 0.0, max: 0.999 }))
  get CriticalDamageThreshold() { return 0.7 }
  set CriticalDamageThreshold(_: number | undefined) {}
  @numUtils()
  get $CriticalDamageThreshold() { return {} as NumUtils }

  /** Размер допустимого ущерба */
  @intAttr(new Limit({ min: 0, max: 64_000, fixed: true }))
  get DamageCapacity() { return 0 }
  set DamageCapacity(_: number | undefined) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }

  /** Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана */
  @floatAttr(new Limit({ min: 0.0, max: 32.0 }))
  get DamagedConsumptionModifier() { return 1.0 }
  set DamagedConsumptionModifier(_: number | undefined) {}
  @numUtils()
  get $DamagedConsumptionModifier() { return {} as NumUtils }

  /** Базовое потребление топлива коробкой */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get FuelConsumption() { return 0.1 }
  set FuelConsumption(_: number | undefined) {}
  @numUtils()
  get $FuelConsumption() { return {} as NumUtils }

  /** Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем */
  @floatAttr(new Limit({ min: 0.0, max: 10.0 }))
  get IdleFuelModifier() { return 0.3 }
  set IdleFuelModifier(_: number | undefined) {}
  @numUtils()
  get $IdleFuelModifier() { return {} as NumUtils }

  /** Название подвески */
  @strAttr()
  get Name(): string | undefined { return undefined }
  set Name(_) {}
  @strUtils()
  get $Name() { return {} as StrUtils }

  /** минимальная частота вылетания передачи, на момент, когда прочность достигла CriticalDamageThreshold */
  @floatAttr(new Limit({ min: 0.0, max: 60.0 }))
  get MinBreakFreq() { return 0.0 }
  set MinBreakFreq(_: number | undefined) {}
  @numUtils()
  get $MinBreakFreq() { return {} as NumUtils }

  /** Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю */
  @floatAttr(new Limit({ min: 0.0, max: 60.0 }))
  get MaxBreakFreq() { return 0.0 }
  set MaxBreakFreq(_: number | undefined) {}
  @numUtils()
  get $MaxBreakFreq() { return {} as NumUtils }

  /** Задняя передача */
  @innerElement(Gear)
  get ReverseGear(): Gear | undefined { return undefined }

  /** Повышенная передача */
  @innerElement(Gear)
  get HighGear(): Gear | undefined { return undefined }

  /** Передачи */
  @innerElements(Gear, 'Gear')
  get Gears(): Gear[] { return [] }

  /** Информация о взаимодействии коробки передач с окружающим миром */
  @innerElement(GameData)
  get GameData(): GameData | undefined { return undefined }
}
