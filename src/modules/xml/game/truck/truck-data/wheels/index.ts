import type { StrUtils } from '../../../game-xml'
import { strAttr, strUtils } from '../../../game-xml'
import Wheels from '../../../wheels'
import XMLWithTemplates, { innerElements } from '../../../xml-with-templates'
import Wheel from './wheel'

export * from './wheel'
export { default as TruckWheel } from './wheel'

/** Секция описания колес */
export default class TruckWheels extends XMLWithTemplates {
  /** Имя файла дефолтного класса колес */
  @strAttr()
  get DefaultWheelType(): string | undefined { return undefined }
  set DefaultWheelType(_) {}
  @strUtils()
  get $DefaultWheelType() { return {} as StrUtils }

  /** Описание конкретных колёс */
  @innerElements(Wheel, 'Wheel')
  get Wheels(): Wheel[] { return [] }
  
  readonly defaultWheelFile = this.file('wheels', () => this.DefaultWheelType)
  readonly defaultWheel = this.fileElementWithTemplates(Wheels, this.defaultWheelFile)
}
