import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlValue } from '../../attributes'
import { floatAttr, properties, stringAttr } from '../../attributes'
import Limit from '../../limit'
import type { WheelLocation } from '../../truck/truck-data/wheels/wheel'
import XMLWithTemplates from '../../xml-with-templates'
import texts from './texts'

/** Подвеска. */
export default class Suspension extends XMLWithTemplates {
  /** Тип колеса. */
  @stringAttr()
  accessor WheelType: XmlValue<WheelLocation>
  declare $WheelType: IStringAttrDescriptor<WheelLocation>

  /** Высота подвески. */
  @properties({
    get label() { return texts.height },
    get desc() { return texts.heightDesc },
    step: 0.01,
    limit: new Limit({ min: -1000.0, max: 1000.0 }),
    areas: {
      yellow: [[-2, -1], [1, 2]],
      red: [[-1000, -2.1], [2.1, 1000]]
    }
  })
  @floatAttr()
  accessor Height: XmlValue<number>
  declare $Height: INumberAttrDescriptor

  /** Жесткость подвески. */
  @properties({
    get label() { return texts.strength },
    get desc() { return texts.strengthDesc },
    step: 0.01,
    limit: new Limit({ min: 0.01 }),
    areas: {
      yellow: [0.5, 1.5],
      red: [1.6, Number.POSITIVE_INFINITY]
    }
  })
  @floatAttr()
  accessor Strength: XmlValue<number>
  declare $Strength: INumberAttrDescriptor

  /** Демпинг. */
  @properties({
    get label() { return texts.damping },
    get desc() { return texts.dampingDesc },
    step: 0.01,
    limit: new Limit({ min: 0.0, max: 1000.0 }),
    areas: {
      yellow: [1, 3],
      red: [3, 1000]
    }
  })
  @floatAttr()
  accessor Damping: XmlValue<number>
  declare $Damping: INumberAttrDescriptor

  /** Минимальный ход подвески. */
  @properties({
    get label() { return texts.suspensionMin },
    get desc() { return texts.suspensionMinDesc },
    step: 0.01,
    limit: new Limit({ min: -1000.0, max: 1000.0 }),
    areas: {
      yellow: [[-5, -2], [2, 5]],
      red: [[-1000, -5.1], [5.1, 1000]]
    }
  })
  @floatAttr()
  accessor SuspensionMin: XmlValue<number>
  declare $SuspensionMin: INumberAttrDescriptor

  /** Максимальный ход подвески. */
  @properties({
    get label() { return texts.suspensionMax },
    get desc() { return texts.suspensionMaxDesc },
    step: 0.01,
    limit: new Limit({ min: -1000.0, max: 1000.0 }),
    areas: {
      yellow: [[-5, -2], [2, 5]],
      red: [[-1000, -5.1], [5.1, 1000]]
    },
    default: 1.0
  })
  @floatAttr()
  accessor SuspensionMax: XmlValue<number>
  declare $SuspensionMax: INumberAttrDescriptor

  /** Максимальный ход сломанной подвески. */
  @properties({
    get label() { return texts.brokenSuspensionMax },
    get desc() { return texts.brokenSuspensionMaxDesc },
    step: 0.01,
    limit: new Limit({ min: -1000.0, max: 1000.0 }),
    areas: {
      yellow: [[-5, -2], [2, 5]],
      red: [[-1000, -5.1], [5.1, 1000]]
    }
  })
  @floatAttr()
  accessor BrokenSuspensionMax: XmlValue<number>
  declare $BrokenSuspensionMax: INumberAttrDescriptor
}
