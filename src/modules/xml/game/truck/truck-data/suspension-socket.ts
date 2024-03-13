import type { StrUtils } from '../../game-xml'
import { strAttr, strUtils } from '../../game-xml'
import Suspensions from '../../suspensions'
import XMLWithTemplates from '../../xml-with-templates'

/** Описание доступных подвесок */
export default class SuspensionSocket extends XMLWithTemplates {
  /** Имя XML класса подвески */
  @strAttr()
  get Type(): string | undefined { return undefined }
  set Type(_) {}
  @strUtils()
  get $Type() { return {} as StrUtils }

  /** Имя дефолтной подвески из XML класса подвески */
  @strAttr()
  get Default(): string | undefined { return undefined }
  set Default(_) {}
  @strUtils()
  get $Default() { return {} as StrUtils }

  readonly suspensionsFiles = this.files('suspensions', () => this.Type)
  readonly suspensions = this.filesElementsWithTemplates<Suspensions>(Suspensions, this.suspensionsFiles)
}
