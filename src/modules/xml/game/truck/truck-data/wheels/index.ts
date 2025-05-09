import type { IStringAttrDescriptor, XmlElements, XmlValue } from '../../../attributes'
import { stringAttr } from '../../../attributes'
import Wheels from '../../../wheels'
import XMLWithTemplates, { innerElements } from '../../../xml-with-templates'
import Wheel from './wheel'

export * from './wheel'
export { default as TruckWheel } from './wheel'

/** Секция описания колес. */
export default class TruckWheels extends XMLWithTemplates {
  /** Имя файла дефолтного класса колес. */
  @stringAttr()
  accessor DefaultWheelType: XmlValue<string>
  declare $DefaultWheelType: IStringAttrDescriptor

  /** Описание конкретных колёс. */
  @innerElements(Wheel, 'Wheel')
  readonly Wheels!: XmlElements<Wheel>
  
  readonly defaultWheelFile = this.file('wheels', () => this.DefaultWheelType)
  readonly defaultWheel = this.fileElementWithTemplates<Wheels>(Wheels, this.defaultWheelFile)
}
