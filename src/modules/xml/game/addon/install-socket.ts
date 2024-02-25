import type { StrUtils } from '../game-xml'
import { strAttr, strUtils } from '../game-xml'
import XMLWithTemplates from '../xml-with-templates'

export default class InstallSocket extends XMLWithTemplates {
  @strAttr()
  get Type(): string | undefined { return undefined }
  set Type(_) {}
  @strUtils()
  get $Type() { return {} as StrUtils }
}
