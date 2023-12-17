import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'
import Winches from '../../winches'
import XMLWithTemplates from '../../xml-with-templates'

export default class WinchUpgradeSocket extends XMLWithTemplates {
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

  readonly winchesFiles = this.files('winches', () => this.Type)
  readonly winches = this.filesElementsWithTemplates(Winches, this.winchesFiles)
}
