import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  tire: new Localization()
    .ru('Покрышка')
    .en('Tire')
    .de('Reifen')
    .ch('轮胎'),
  bodyFriction: new Localization()
    .ru('Сцепление на бездорожье')
    .en('Body friction')
    .de('Körperreibung')
    .ch('在干土地上的摩擦力'),
  bodyFrictionAsphalt: new Localization()
    .ru('Сцепление на асфальте')
    .en('Body friction asphalt')
    .de('Körperreibung asphalt')
    .ch('在公路上的摩擦力'),
  substanceFriction: new Localization()
    .ru('Сцепление в грязи')
    .en('Substance friction')
    .de('Substanzreibung')
    .ch('在泥浆里的摩擦力'),
  ignoreIce: new Localization()
    .ru('Едет по льду')
    .en('Rides on ice')
    .de('Fahrten auf Eis')
    .ch('在冰上驾驶'),
  yes: new Localization()
    .ru('Да')
    .en('Yes')
    .de('Ja')
    .ch('是'),
  no: new Localization()
    .ru('Нет')
    .en('No')
    .de('Nein')
    .ch('没有')
}).get()
