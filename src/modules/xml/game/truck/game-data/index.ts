import type { IStringArrayAttrDescriptor, XmlArrayValue, XmlElement, XmlElements } from '../../attributes'
import { properties, stringArrayAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import { innerElement, innerElements } from '../../xml-with-templates'
import AddonSlots from './addon-slots'
import AddonSockets from './addon-sockets'
import CraneSocket from './crane-socket'
import texts from './texts'
import UiDesc from './ui-desc'
import WinchSocket from './winch-socket'

export * from './addon-sockets'
export { default as TrailerAddonSlots, default as TruckAddonSockets } from './addon-sockets'
export { default as TruckCraneSocket } from './crane-socket'
export { default as TruckUiDesc } from './ui-desc'
export { default as TruckWinchSocket } from './winch-socket'

/** Информация о взаимодействии трака с окружающим миром. */
export default class GameData extends BaseGameData {
  /** Регион. */
  @properties({
    get label() { return texts.country },
    get desc() { return texts.countryDesc }
  })
  @stringArrayAttr(strToCountry, true)
  accessor Country!: XmlArrayValue<Country>
  declare $Country: IStringArrayAttrDescriptor<Country>

  /** Исключение конкретного аддона из типа. */
  @stringArrayAttr()
  accessor ExcludeAddons!: XmlArrayValue<string>
  declare $ExcludeAddons: IStringArrayAttrDescriptor

  /** Место крепления лебедки. */
  @innerElements(WinchSocket, 'WinchSocket')
  readonly WinchSockets!: XmlElements<WinchSocket>

  /** Блок UI. */
  @innerElement(UiDesc)
  readonly UiDesc: XmlElement<UiDesc> = undefined

  @innerElement(AddonSlots)
  readonly AddonSlots: XmlElement<AddonSlots>

  /** Место, за которое может цепляться кран. */
  @innerElements(CraneSocket, 'CraneSocket')
  readonly CraneSockets!: XmlElements<CraneSocket>

  /** Секция определения взаимного расположения аддонов трака. */
  @innerElements(AddonSockets)
  readonly AddonSockets!: XmlElements<AddonSockets>
}

export enum Country {
  ru = 'RU',
  us = 'US',
  cas = 'CAS',
  ne = 'NE'
}

export function strToCountry(str: string): Country | undefined {
  for (const country of Object.values(Country)) {
    if (country === str) {
      return country
    }
  }
}
