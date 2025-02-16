import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  unlockGroupName: new BaseLocalization()
    .ru('Разблокировка')
    .en('Unlock')
    .de('Freischalten')
    .ch('解锁'),

  price: new BaseLocalization()
    .ru('Цена')
    .en('Price')
    .de('Preis')
    .ch('价格'),

  byExploration: new BaseLocalization()
    .ru('Способ разблокировки')
    .en('Unlock method')
    .de('Methode entsperren')
    .ch('解锁条件'),

  findOnMap: new BaseLocalization()
    .ru('Найти на карте')
    .en('Find on map')
    .de('Auf Karte finden')
    .ch('在地图上寻找'),

  byRank: new BaseLocalization()
    .ru('По достижению уровня')
    .en('By rank')
    .de('Nach Rang')
    .ch('达到该等级时'),

  unlockByRank: new BaseLocalization()
    .ru('Уровень разблокировки')
    .en('Unlock level')
    .de('Level freischalten')
    .ch('解锁等级')
}).loadRenderer()
