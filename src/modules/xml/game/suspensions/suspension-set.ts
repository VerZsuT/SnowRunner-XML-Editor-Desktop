import { BaseGameData } from '../base'
import type { NumUtils, StrUtils } from '../game-xml'
import { floatAttr, intAttr, numUtils, strAttr, strUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates, { innerElement, innerElements } from '../xml-with-templates'
import Suspension from './suspension'

import { Localization } from '/utils/texts/renderer'

export { default as Suspension } from './suspension'

/** Набор подвесок */
export default class SuspensionSet extends XMLWithTemplates {
  /** Имя набора подвесок */
  @strAttr()
  get Name(): string | undefined { return undefined }
  set Name(_) {}
  @strUtils()
  get $Name() { return {} as StrUtils }

  /** Размер допустимого ущерба */
  @intAttr(new Limit({ min: 0, max: 64_000, fixed: true }))
  get DamageCapacity() { return 0 }
  set DamageCapacity(_: number | undefined) {}
  @numUtils()
  get $DamageCapacity() { return {} as NumUtils }
  DamageCapacityDesc = new Localization()
    .ru('Размер допустимого ущерба подвеске')
    .en('The amount of possible damage to the suspension')
    .de('Die Höhe des zulässigen Schadens an der Aufhängung')
    .get()

  /** Порог критического урона */
  @floatAttr(new Limit({ min: 0.0, max: 0.999 }))
  get CriticalDamageThreshold() { return 0.7 }
  set CriticalDamageThreshold(_: number | undefined) {}
  @numUtils()
  get $CriticalDamageThreshold() { return {} as NumUtils }
  CriticalDamageThresholdDesc = new Localization()
    .ru('Порог критического урона подвески')
    .en('Suspension Critical Damage Threshold')
    .de('Schwelle für kritischen Fahrwerksschaden')
    .get()

  /** Коэффициент увеличения повреждения подвески при пробитом колесе */
  @floatAttr(new Limit({ min: 0.0, max: 100.0 }))
  get BrokenWheelDamageMultiplier() { return 1.0 }
  set BrokenWheelDamageMultiplier(_: number | undefined) {}
  @numUtils()
  get $BrokenWheelDamageMultiplier() { return {} as NumUtils }
  BrokenWheelDamageMultiplierDesc = new Localization()
    .ru('Коэффициент увеличения повреждения подвески при пробитом колесе')
    .en('The coefficient of increase in suspension damage with a punctured wheel')
    .de('Erhöhte Fahrwerksschäden bei eingeschlossenem Rad')
    .get()

  /** Подвески */
  @innerElements(Suspension, 'Suspension')
  get Suspensions(): Suspension[] { return [] }

  /** Информация о взаимодействии подвески с окружающим миром */
  @innerElement(BaseGameData)
  get GameData(): BaseGameData | undefined { return undefined }
}
