import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  suspensionSet: new BaseLocalization()
    .ru('Подвески')
    .en('Suspension set')
    .de('Aufhängungsset')
    .ch('悬挂装置'),

  height: new BaseLocalization()
    .ru('Высота')
    .en('Height')
    .de('Höhe')
    .ch('悬架的高度'),

  strenght: new BaseLocalization()
    .ru('Жёсткость')
    .en('Strength')
    .de('Stärke')
    .ch('悬架的硬度'),

  damping: new BaseLocalization()
    .ru('Затухание')
    .en('Damping')
    .de('Dämpfung')
    .ch('悬架的阻尼'),

  suspensionMin: new BaseLocalization()
    .ru('Минимальная высота подвески')
    .en('Minimum suspension height')
    .de('Minimale Aufhängungshöhe')
    .ch('悬架最小行程'),

  suspensionMax: new BaseLocalization()
    .ru('Максимальная высота подвески')
    .en('Maximum suspension height')
    .de('Maximale Aufhängungshöhe')
    .ch('悬架最大行程(悬空时)'),

  brokenSuspensionMax: new BaseLocalization()
    .ru('Максимальная высота подвески (когда сломана)')
    .en('Minimum suspension height in broken condition')
    .de('Minimale Aufhängungshöhe in gebrochenem Zustand')
    .ch('悬架损坏时的最大行程'),

  suspension: new BaseLocalization()
    .ru('Подвеска')
    .en('Suspension')
    .de('Aussetzung')
    .ch('悬架'),

  criticalDamageThreshold: new BaseLocalization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),

  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量')
}).loadRenderer()
