import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  suspensionSet: new Localization()
    .ru('Подвески')
    .en('Suspension set')
    .de('Aufhängungsset')
    .ch('悬挂装置'),
  height: new Localization()
    .ru('Высота')
    .en('Height')
    .de('Höhe')
    .ch('悬架的高度'),
  strenght: new Localization()
    .ru('Жёсткость')
    .en('Strength')
    .de('Stärke')
    .ch('悬架的硬度'),
  damping: new Localization()
    .ru('Затухание')
    .en('Damping')
    .de('Dämpfung')
    .ch('悬架的阻尼'),
  suspensionMin: new Localization()
    .ru('Минимальная высота подвески')
    .en('Minimum suspension height')
    .de('Minimale Aufhängungshöhe')
    .ch('悬架最小行程'),
  suspensionMax: new Localization()
    .ru('Максимальная высота подвески')
    .en('Maximum suspension height')
    .de('Maximale Aufhängungshöhe')
    .ch('悬架最大行程(悬空时)'),
  brokenSuspensionMax: new Localization()
    .ru('Максимальная высота подвески (когда сломана)')
    .en('Minimum suspension height in broken condition')
    .de('Minimale Aufhängungshöhe in gebrochenem Zustand')
    .ch('悬架损坏时的最大行程'),
  suspension: new Localization()
    .ru('Подвеска')
    .en('Suspension')
    .de('Aussetzung')
    .ch('悬架'),
  criticalDamageThreshold: new Localization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),
  damageCapacity: new Localization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量')
}).get()
