import type { INumberAttrDescriptor, IStringAttrDescriptor, XmlElement, XmlValue } from '../../attributes'
import { booleanAttr, floatAttr, properties, stringAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import Limit from '../../limit'
import XMLWithTemplates, { innerElement } from '../../xml-with-templates'
import texts from './texts'

/** Лебёдка. */
export default class Winch extends XMLWithTemplates {
  @properties({
    get label() { return texts.name }
  })
  @stringAttr()
  accessor Name: XmlValue<string>
  declare $Name: IStringAttrDescriptor

  /** Длина лебёдки. */
  @properties({
    get label() { return texts.length },
    get desc() { return texts.lengthDesc },
    limit: new Limit({ min: 0.0, max: 100.0 }),
    areas: {
      yellow: [30, 50],
      red: [51, 100]
    },
    default: 14.0
  })
  @floatAttr()
  accessor Length: XmlValue<number>
  declare $Length: INumberAttrDescriptor

  /** Сила лебёдки. */
  @properties({
    get label() { return texts.strengthMult },
    limit: new Limit({ min: 0.0, max: 10.0 }),
    areas: {
      yellow: [2, 5],
      red: [5.1, 10]
    },
    default: 1.0
  })
  @floatAttr()
  accessor StrengthMult: XmlValue<number>
  declare $StrengthMult: INumberAttrDescriptor

  /** Автономная ли лебёдка. */
  @properties({
    get label() { return texts.isEngineIgnitionRequired },
    get desc() { return texts.isEngineIgnitionRequiredDesc },
    default: true
  })
  @booleanAttr()
  accessor IsEngineIgnitionRequired: XmlValue<boolean>
  declare $IsEngineIgnitionRequired: INumberAttrDescriptor

  /** Информация о взаимодействии лебёдки с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: XmlElement<BaseGameData>
}
