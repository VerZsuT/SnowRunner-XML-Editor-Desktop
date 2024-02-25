import { BaseGameData } from '../../base'
import type { StrArrUtils } from '../../game-xml'
import { strArrAttr, strArrUtils } from '../../game-xml'
import { innerElement, innerElements } from '../../xml-with-templates'
import AddonSlots from './addon-slots'
import AddonSockets from './addon-sockets'
import CraneSocket from './crane-socket'
import UiDesc from './ui-desc'
import WinchSocket from './winch-socket'

export * from './addon-sockets'
export { default as TrailerAddonSlots, default as TruckAddonSockets } from './addon-sockets'
export { default as TruckCraneSocket } from './crane-socket'
export { default as TruckUiDesc } from './ui-desc'
export { default as TruckWinchSocket } from './winch-socket'

/** Информация о взаимодействии трака с окружающим миром */
export default class GameData extends BaseGameData {
  /** Регион */
  @strArrAttr(strToCountry, true)
  get Country(): Country[] { return [] }
  set Country(_) {}
  @strArrUtils(strToCountry, true)
  get $Country() { return {} as StrArrUtils }

  /** Исключение конкретного аддона из типа */
  @strArrAttr()
  get ExcludeAddons(): string[] { return [] }
  set ExcludeAddons(_) {}
  @strArrUtils()
  get $ExcludeAddons() { return {} as StrArrUtils }

  /** Место крепления лебедки */
  @innerElements(WinchSocket, 'WinchSocket')
  get WinchSockets(): WinchSocket[] { return [] }

  /** Блок UI */
  @innerElement(UiDesc)
  get UiDesc(): UiDesc | undefined { return undefined }

  @innerElement(AddonSlots)
  get AddonSlots(): AddonSlots | undefined { return undefined }

  /** Место, за которое может цепляться кран */
  @innerElements(CraneSocket, 'CraneSocket')
  get CraneSockets(): CraneSocket[] { return [] }

  /** Секция определения взаимного расположения аддонов трака */
  @innerElements(AddonSockets)
  get AddonSockets(): AddonSockets[] { return [] }
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
