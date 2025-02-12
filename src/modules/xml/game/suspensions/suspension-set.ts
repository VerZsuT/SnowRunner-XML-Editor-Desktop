import type { INumberAttrDescriptor, IStringAttrDescriptor } from '../attributes'
import { floatAttr, integerAttr, lazy, limit, stringAttr } from '../attributes'
import { BaseGameData } from '../base'
import Limit from '../limit'
import XMLWithTemplates, { innerElement, innerElements } from '../xml-with-templates'
import Suspension from './suspension'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

export { default as Suspension } from './suspension'

/** Набор подвесок. */
export default class SuspensionSet extends XMLWithTemplates {
  /** Имя набора подвесок. */
  @stringAttr()
  accessor Name: string | undefined
  declare $Name: IStringAttrDescriptor

  /** Размер допустимого ущерба. */
  @limit(new Limit({ min: 0, max: 64_000, fixed: true }))
  @integerAttr()
  accessor DamageCapacity: number | undefined = 0
  declare $DamageCapacity: INumberAttrDescriptor
  @lazy get DamageCapacityDesc() {
    return new BaseLocalization()
      .ru('Размер допустимого ущерба подвеске')
      .en('The amount of possible damage to the suspension')
      .de('Die Höhe des zulässigen Schadens an der Aufhängung')
      .get(Config)
  }

  /** Порог критического урона. */
  @limit(new Limit({ min: 0.0, max: 0.999 }))
  @floatAttr()
  accessor CriticalDamageThreshold: number | undefined = 0.7
  declare $CriticalDamageThreshold: INumberAttrDescriptor
  @lazy get CriticalDamageThresholdDesc() {
    return new BaseLocalization()
      .ru('Порог критического урона подвески')
      .en('Suspension Critical Damage Threshold')
      .de('Schwelle für kritischen Fahrwerksschaden')
      .get(Config)
  }

  /** Коэффициент увеличения повреждения подвески при пробитом колесе. */
  @limit(new Limit({ min: 0.0, max: 100.0 }))
  @floatAttr()
  accessor BrokenWheelDamageMultiplier: number | undefined = 1.0
  declare $BrokenWheelDamageMultiplier: INumberAttrDescriptor
  @lazy get BrokenWheelDamageMultiplierDesc() {
    return new BaseLocalization()
      .ru('Коэффициент увеличения повреждения подвески при пробитом колесе')
      .en('The coefficient of increase in suspension damage with a punctured wheel')
      .de('Erhöhte Fahrwerksschäden bei eingeschlossenem Rad')
      .get(Config)
  }

  /** Подвески. */
  @innerElements(Suspension, 'Suspension')
  readonly Suspensions: Suspension[] = []

  /** Информация о взаимодействии подвески с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: BaseGameData | undefined
}
