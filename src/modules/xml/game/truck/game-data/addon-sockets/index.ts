import type { StrUtils } from '../../../game-xml'
import { strAttr, strUtils } from '../../../game-xml'
import XMLWithTemplates, { innerElements } from '../../../xml-with-templates'
import AddonSocket from './addon-socket'

export * from './addon-socket'
export { default as TruckAddonSocket } from './addon-socket'

/** Секция определения взаимного расположения аддонов трака */
export default class AddonSockets extends XMLWithTemplates {
  /** Имя xml-файла дефолтного аддона */
  @strAttr()
  get DefaultAddon(): string | undefined { return undefined }
  set DefaultAddon(_) {}
  @strUtils()
  get $DefaultAddon() { return {} as StrUtils }

  /** Места крепления аддона на траке */
  @innerElements(AddonSocket, 'Socket')
  get Sockets(): AddonSocket[] { return [] }
}
