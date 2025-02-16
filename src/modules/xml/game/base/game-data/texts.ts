import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  price: new BaseLocalization()
    .ru('Цена')
    .en('Price')
    .de('Preis')
    .ch('价格'),

  priceDesc: new BaseLocalization()
    .ru('Стоимость предмета / автомобиля в магазине. В случае автомобиля это лишь базовая стоимость, не включающая стоимость стандартного оборудования при покупке в магазине')
    .en('The cost of the item / truck in the store. In the case of a truck, this is only the basic cost, which does not include the cost of standard equipment when purchased in a store')
    .de('Der Wert des Artikels / Autos im Laden. Im Falle eines Autos handelt es sich lediglich um die Grundkosten, die beim Kauf im Geschäft nicht die Kosten für Standardausrüstung beinhalten'),

  unlockByExploration: new BaseLocalization()
    .ru('Способ разблокировки')
    .en('Unlock method')
    .de('Methode entsperren')
    .ch('解锁条件'),

  unlockByExplorationDesc: new BaseLocalization()
    .ru('Разблокируется ли предмет / автомобиль при помощи поиска на локации (разведки)')
    .en('Does the item / truck unlock using location search')
    .de('Öffnet sich ein Gegenstand / ein Fahrzeug mit einer Standortsuche'),

  unlockByRank: new BaseLocalization()
    .ru('Уровень разблокировки')
    .en('Unlock level')
    .de('Level freischalten')
    .ch('解锁等级'),

  unlockByRankDesc: new BaseLocalization()
    .ru('При достижении какого уровня открывается предмет / автомобиль. Игнорируется если стоит разблокировка разведкой')
    .en('Upon reaching which level the item / truck opens. It is ignored if it is worth unlocking by exploration')
    .de('Wenn das Niveau erreicht ist, öffnet sich das Objekt / Fahrzeug. Wird ignoriert, wenn es sich lohnt, durch Intelligenz freigeschaltet zu werden')
}).loadRenderer()
