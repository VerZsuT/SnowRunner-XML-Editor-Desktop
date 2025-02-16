import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  name: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题'),

  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  damageCapacityDesc: new BaseLocalization()
    .ru('Размер допустимого ущерба подвеске')
    .en('The amount of possible damage to the suspension')
    .de('Die Höhe des zulässigen Schadens an der Aufhängung'),

  criticalDamageThreshold: new BaseLocalization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),

  criticalDamageThresholdDesc: new BaseLocalization()
    .ru('Порог критического урона подвески')
    .en('Suspension Critical Damage Threshold')
    .de('Schwelle für kritischen Fahrwerksschaden'),

  brokenWheelDamageMultiplierDesc: new BaseLocalization()
    .ru('Коэффициент увеличения повреждения подвески при пробитом колесе')
    .en('The coefficient of increase in suspension damage with a punctured wheel')
    .de('Erhöhte Fahrwerksschäden bei eingeschlossenem Rad')
}).loadRenderer()
