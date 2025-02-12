import type { IBooleanAttrDescriptor, INumberAttrDescriptor } from '../attributes'
import { booleanAttr, integerAttr, lazy, limit } from '../attributes'
import Limit from '../limit'
import XMLWithTemplates, { innerElement } from '../xml-with-templates'
import BaseUiDesc from './ui-desc'
import { Config } from '/mods/renderer'
import { BaseLocalization } from '/utils/texts/base-localization'

/** Информация о взаимодействии сущности с окружающим миром. */
export default class GameData extends XMLWithTemplates {
  /** Цена. */
  @limit(Limit.Positive.fixed())
  @integerAttr()
  accessor Price: number | undefined
  declare $Price: INumberAttrDescriptor
  @lazy get PriceDesc() {
    return new BaseLocalization()
      .ru('Стоимость предмета / автомобиля в магазине. В случае автомобиля это лишь базовая стоимость, не включающая стоимость стандартного оборудования при покупке в магазине')
      .en('The cost of the item / truck in the store. In the case of a truck, this is only the basic cost, which does not include the cost of standard equipment when purchased in a store')
      .de('Der Wert des Artikels / Autos im Laden. Im Falle eines Autos handelt es sich lediglich um die Grundkosten, die beim Kauf im Geschäft nicht die Kosten für Standardausrüstung beinhalten')
      .get(Config)
  }

  /** Разлочивается разведкой. */
  @booleanAttr()
  accessor UnlockByExploration: boolean | undefined = false
  declare $UnlockByExploration: IBooleanAttrDescriptor
  @lazy get UnlockByExplorationDesc() {
    return new BaseLocalization()
      .ru('Разблокируется ли предмет / автомобиль при помощи поиска на локации (разведки)')
      .en('Does the item / truck unlock using location search')
      .de('Öffnet sich ein Gegenstand / ein Fahrzeug mit einer Standortsuche')
      .get(Config)
  }

  /** Разлочивается рангом. */
  @limit(new Limit({ min: 1, max: 30, fixed: true }))
  @integerAttr()
  accessor UnlockByRank: number | undefined = 1
  declare $UnlockByRank: INumberAttrDescriptor
  @lazy get UnlockByRankDesc() {
    return new BaseLocalization()
      .ru('При достижении какого уровня открывается предмет / автомобиль. Игнорируется если стоит разблокировка разведкой')
      .en('Upon reaching which level the item / truck opens. It is ignored if it is worth unlocking by exploration')
      .de('Wenn das Niveau erreicht ist, öffnet sich das Objekt / Fahrzeug. Wird ignoriert, wenn es sich lohnt, durch Intelligenz freigeschaltet zu werden')
      .get(Config)
  }

  /** Блок UI */
  @innerElement(BaseUiDesc)
  readonly UiDesc: BaseUiDesc | undefined
}
