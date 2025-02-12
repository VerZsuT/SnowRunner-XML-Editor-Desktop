import type { IStringArrayAttrDescriptor } from '../../attributes'
import { lazy, stringArrayAttr } from '../../attributes'
import { BaseGameData } from '../../base'
import { innerElement, innerElements } from '../../xml-with-templates'
import AddonSlots from './addon-slots'
import AddonSockets from './addon-sockets'
import CraneSocket from './crane-socket'
import UiDesc from './ui-desc'
import WinchSocket from './winch-socket'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

export * from './addon-sockets'
export { default as TrailerAddonSlots, default as TruckAddonSockets } from './addon-sockets'
export { default as TruckCraneSocket } from './crane-socket'
export { default as TruckUiDesc } from './ui-desc'
export { default as TruckWinchSocket } from './winch-socket'

/** Информация о взаимодействии трака с окружающим миром. */
export default class GameData extends BaseGameData {
  /** Регион. */
  @stringArrayAttr(strToCountry, true)
  accessor Country: Country[] = []
  declare $Country: IStringArrayAttrDescriptor<Country>
  @lazy get CountryDesc() {
    return new BaseLocalization()
      .ru('Регион, в котором автомобиль доступен для покупки')
      .en('The region where the car is available for purchase')
      .de('Die Region, in der das Auto zum Kauf verfügbar ist')
      .get(Config)
  }

  /** Исключение конкретного аддона из типа. */
  @stringArrayAttr()
  accessor ExcludeAddons: string[] = []
  declare $ExcludeAddons: IStringArrayAttrDescriptor

  /** Место крепления лебедки. */
  @innerElements(WinchSocket, 'WinchSocket')
  readonly WinchSockets: WinchSocket[] = []

  /** Блок UI. */
  @innerElement(UiDesc)
  readonly UiDesc: UiDesc | undefined = undefined

  @innerElement(AddonSlots)
  readonly AddonSlots: AddonSlots | undefined

  /** Место, за которое может цепляться кран. */
  @innerElements(CraneSocket, 'CraneSocket')
  readonly CraneSockets: CraneSocket[] = []

  /** Секция определения взаимного расположения аддонов трака. */
  @innerElements(AddonSockets)
  readonly AddonSockets: AddonSockets[] = []
}

export enum Country {
  ru = 'RU',
  us = 'US',
  cas = 'CAS',
  ne = 'NE'
}

export function strToCountry(str: string): Country | undefined {
  switch (str) {
    case Country.ru: { return Country.ru }
    case Country.us: { return Country.us }
    case Country.cas: { return Country.cas }
    case Country.ne: { return Country.ne }
  }
}
