import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlElements, XmlValue } from '../../attributes'
import { floatAttr, integerAttr, properties, stringAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement, innerElements } from '../../xml-with-templates'
import Suspension from '../suspension'
import texts from './texts'

export { default as Suspension } from '../suspension'

/** Набор подвесок. */
export default class SuspensionSet extends XMLWithTemplates {
  /** Имя набора подвесок. */
  @properties({
    get label() { return texts.name }
  })
  @stringAttr()
  accessor Name: XmlValue<string>
  declare $Name: IStringAttrDescriptor

  /** Размер допустимого ущерба. */
  @properties({
    get label() { return texts.damageCapacity },
    get desc() { return texts.damageCapacityDesc },
    step: 10,
    limit: new Limit({ min: 0, max: 64_000, fixed: true }),
    areas: {
      yellow: [1000, 10_000],
      red: [10_001, Number.POSITIVE_INFINITY]
    },
    default: 0
  })
  @integerAttr()
  accessor DamageCapacity: XmlValue<number>
  declare $DamageCapacity: INumberAttrDescriptor

  /** Порог критического урона. */
  @properties({
    get label() { return texts.criticalDamageThreshold },
    get desc() { return texts.criticalDamageThresholdDesc },
    step: 0.01,
    limit: new Limit({ min: 0.0, max: 0.999 }),
    default: 0.7
  })
  @floatAttr()
  accessor CriticalDamageThreshold: XmlValue<number>
  declare $CriticalDamageThreshold: INumberAttrDescriptor

  /** Коэффициент увеличения повреждения подвески при пробитом колесе. */
  @properties({
    get desc() { return texts.brokenWheelDamageMultiplierDesc },
    limit: new Limit({ min: 0.0, max: 100.0 }),
    default: 1.0
  })
  @floatAttr()
  accessor BrokenWheelDamageMultiplier: XmlValue<number>
  declare $BrokenWheelDamageMultiplier: INumberAttrDescriptor

  /** Подвески. */
  @innerElements(Suspension, 'Suspension')
  readonly Suspensions!: XmlElements<Suspension>

  /** Информация о взаимодействии подвески с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: XmlElement<BaseGameData>
}
