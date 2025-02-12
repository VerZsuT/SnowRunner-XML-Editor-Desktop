import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  tire: new BaseLocalization()
    .ru('Покрышка')
    .en('Tire')
    .de('Reifen')
    .ch('轮胎'),

  bodyFriction: new BaseLocalization()
    .ru('Сцепление на бездорожье')
    .en('Body friction')
    .de('Körperreibung')
    .ch('在干土地上的摩擦力'),

  bodyFrictionAsphalt: new BaseLocalization()
    .ru('Сцепление на асфальте')
    .en('Body friction asphalt')
    .de('Körperreibung asphalt')
    .ch('在公路上的摩擦力'),

  substanceFriction: new BaseLocalization()
    .ru('Сцепление в грязи')
    .en('Substance friction')
    .de('Substanzreibung')
    .ch('在泥浆里的摩擦力'),

  ignoreIce: new BaseLocalization()
    .ru('Едет по льду')
    .en('Rides on ice')
    .de('Fahrten auf Eis')
    .ch('在冰上驾驶'),

  yes: new BaseLocalization()
    .ru('Да')
    .en('Yes')
    .de('Ja')
    .ch('是'),

  no: new BaseLocalization()
    .ru('Нет')
    .en('No')
    .de('Nein')
    .ch('没有'),

  name: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题')
}).loadRenderer()
