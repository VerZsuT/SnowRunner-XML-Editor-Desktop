import type { IStringAttrDescriptor } from '../../attributes'
import { stringAttr } from '../../attributes'
import Gearboxes from '../../gearboxes'
import XMLWithTemplates from '../../xml-with-templates'

/** Описание доступных коробок передач. */
export default class GearboxSocket extends XMLWithTemplates {
  /** Имя xml-файла. */
  @stringAttr()
  accessor Type: string | undefined
  declare $Type: IStringAttrDescriptor

  /** Имя дефолтной коробки. */
  @stringAttr()
  accessor Default: string | undefined
  declare $Default: IStringAttrDescriptor

  readonly gearboxesFiles = this.files('gearboxes', () => this.Type)
  readonly gearboxes = this.filesElementsWithTemplates<Gearboxes>(Gearboxes, this.gearboxesFiles)
}
