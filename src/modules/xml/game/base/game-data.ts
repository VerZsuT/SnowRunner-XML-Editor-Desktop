import type { BoolUtils, NumUtils } from '../game-xml'
import { boolAttr, boolUtils, intAttr, numUtils } from '../game-xml'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import BaseUiDesc from './ui-desc'

import { Localization } from '/utils/texts/renderer'

/** Информация о взаимодействии сущности с окружающим миром */
export default class GameData extends XMLWithTemplates {
  /** Цена */
  @intAttr(Limit.Positive.fixed())
  get Price(): number | undefined { return undefined }
  set Price(_) {}
  @numUtils()
  get $Price() { return {} as NumUtils }
  PriceDesc = new Localization()
    .ru('Стоимость предмета / автомобиля в магазине. В случае автомобиля это лишь базовая стоимость, не включающая стоимость стандартного оборудования при покупке в магазине')
    .en('The cost of the item / truck in the store. In the case of a truck, this is only the basic cost, which does not include the cost of standard equipment when purchased in a store')
    .de('Der Wert des Artikels / Autos im Laden. Im Falle eines Autos handelt es sich lediglich um die Grundkosten, die beim Kauf im Geschäft nicht die Kosten für Standardausrüstung beinhalten')
    .get()

  /** Разлочивается разведкой */
  @boolAttr()
  get UnlockByExploration() { return false }
  set UnlockByExploration(_: boolean | undefined) {}
  @boolUtils()
  get $UnlockByExploration() { return {} as BoolUtils }
  UnlockByExplorationDesc = new Localization()
    .ru('Разблокируется ли предмет / автомобиль при помощи поиска на локации (разведки)')
    .en('Does the item / truck unlock using location search')
    .de('Öffnet sich ein Gegenstand / ein Fahrzeug mit einer Standortsuche')
    .get()

  /** Разлочивается рангом */
  @intAttr(new Limit({ min: 1, max: 30, fixed: true }))
  get UnlockByRank() { return 1 }
  set UnlockByRank(_: number | undefined) {}
  @numUtils()
  get $UnlockByRank() { return {} as NumUtils }
  UnlockByRankDesc = new Localization()
    .ru('При достижении какого уровня открывается предмет / автомобиль. Игнорируется если стоит разблокировка разведкой')
    .en('Upon reaching which level the item / truck opens. It is ignored if it is worth unlocking by exploration')
    .de('Wenn das Niveau erreicht ist, öffnet sich das Objekt / Fahrzeug. Wird ignoriert, wenn es sich lohnt, durch Intelligenz freigeschaltet zu werden')
    .get()

  /** Блок UI */
  @innerElement(BaseUiDesc)
  get UiDesc(): BaseUiDesc | undefined { return undefined }
}
