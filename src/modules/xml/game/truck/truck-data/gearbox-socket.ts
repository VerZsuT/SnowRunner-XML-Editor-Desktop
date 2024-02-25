import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'
import Gearboxes from '../../gearboxes'
import XMLWithTemplates from '../../xml-with-templates'

/** Описание доступных коробок передач */
export default class GearboxSocket extends XMLWithTemplates {
  /** Имя xml-файла */
  @strAttr()
  get Type(): string | undefined { return undefined }
  set Type(_) {}
  @strUtils()
  get $Type() { return {} as StrUtils }

  /** Имя дефолтной коробки */
  @strAttr()
  get Default(): string | undefined { return undefined }
  set Default(_) {}
  @strUtils()
  get $Default() { return {} as StrUtils }

  readonly gearboxesFiles = this.files('gearboxes', () => this.Type)
  readonly gearboxes = this.filesElementsWithTemplates(Gearboxes, this.gearboxesFiles)
}
