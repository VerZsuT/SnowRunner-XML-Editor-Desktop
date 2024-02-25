import type { NumUtils, StrUtils } from '../../game-xml'
import { floatAttr, numUtils, strAttr, strUtils } from '../../game-xml'
import Limit from '../../limit'
import Wheels from '../../wheels'
import XMLWithTemplates from '../../xml-with-templates'

/** Доступные колеса */
export default class CompatibleWheels extends XMLWithTemplates {
  /** Имя XML-класса колес */
  @strAttr()
  get Type(): string | undefined { return undefined }
  set Type(_) {}
  @strUtils()
  get $Type() { return {} as StrUtils }

  /** Равномерный скейл колеса */
  @floatAttr(new Limit({ min: 0.01 }))
  get Scale() { return 1.0 }
  set Scale(_: number | undefined) {}
  @numUtils()
  get $Scale() { return {} as NumUtils }

  readonly wheelsFile = this.file('wheels', () => this.Type)
  readonly wheels = this.fileElementWithTemplates(Wheels, this.wheelsFile)
}
