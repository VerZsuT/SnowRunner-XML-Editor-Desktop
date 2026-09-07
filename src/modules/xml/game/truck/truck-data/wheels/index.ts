import type { IStringAttrDescriptor, XmlElements, XmlValue } from '../../../attributes'
import { stringAttr } from '../../../attributes'
import { Wheels } from '../../../wheels'
import { XMLWithTemplates, innerElements } from '../../../xml-with-templates'
import { TruckWheel } from './wheel'

export * from './wheel'

/** Секция описания колес. */
export class TruckWheels extends XMLWithTemplates {
  /** Имя файла дефолтного класса колес. */
  @stringAttr()
  accessor DefaultWheelType: XmlValue<string>
  declare $DefaultWheelType: IStringAttrDescriptor

  /** Описание конкретных колёс. */
  @innerElements(TruckWheel, 'Wheel')
  readonly Wheels!: XmlElements<TruckWheel>

  readonly defaultWheelFile = this.file('wheels', () => this.DefaultWheelType)
  readonly defaultWheel = this.fileElementWithTemplates<Wheels>(Wheels, this.defaultWheelFile)
}
