import Engines from '../../engines'
import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'
import XMLWithTemplates from '../../xml-with-templates'

/** Описание доступных двигателей */
export default class EngineSocket extends XMLWithTemplates {
  /** Имя xml-файла */
  @strAttr()
  get Type(): string | undefined { return undefined }
  set Type(_) {}
  @strUtils()
  get $Type() { return {} as StrUtils }

  /** Имя дефолтного двигателя */
  @strAttr()
  get Default(): string | undefined { return undefined }
  set Default(_) {}
  @strUtils()
  get $Default() { return {} as StrUtils }

  readonly enginesFiles = this.files('engines', () => this.Type)
  readonly engines = this.filesElementsWithTemplates(Engines, this.enginesFiles)
}
