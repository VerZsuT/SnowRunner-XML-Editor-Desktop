import type { IStringAttrDescriptor, XmlElement, XmlValue } from '../../../attributes'
import { properties, stringAttr } from '../../../attributes'
import { BaseGameData } from '../../../base'
import XMLWithTemplates, { innerElement } from '../../../xml-with-templates'
import texts from './texts'

/** Диск или пара дисков. */
export default class TruckRim extends XMLWithTemplates {
  /** Имя диска. */
  @properties({
    get label() { return texts.name }
  })
  @stringAttr()
  accessor Name: XmlValue<string>
  declare $Name: IStringAttrDescriptor

  /** Информация о взаимодействии диска с окружающим миром. */
  @innerElement(BaseGameData)
  readonly GameData: XmlElement<BaseGameData>
}
