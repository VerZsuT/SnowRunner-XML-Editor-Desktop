import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export default localize({
  suspensionSet: {
    [Lang.ru]: 'Подвески',
    [Lang.en]: 'Suspension set',
    [Lang.de]: 'Aufhängungsset',
    [Lang.ch]: '悬挂装置'
  },
  height: {
    [Lang.ru]: 'Высота',
    [Lang.en]: 'Height',
    [Lang.de]: 'Höhe',
    [Lang.ch]: '悬架的高度'
  },
  strenght: {
    [Lang.ru]: 'Жёсткость',
    [Lang.en]: 'Strength',
    [Lang.de]: 'Stärke',
    [Lang.ch]: '悬架的硬度'
  },
  damping: {
    [Lang.ru]: 'Затухание',
    [Lang.en]: 'Damping',
    [Lang.de]: 'Dämpfung',
    [Lang.ch]: '悬架的阻尼'
  },
  suspensionMin: {
    [Lang.ru]: 'Минимальная высота подвески',
    [Lang.en]: 'Minimum suspension height',
    [Lang.de]: 'Minimale Aufhängungshöhe',
    [Lang.ch]: '悬架最小行程'
  },
  suspensionMax: {
    [Lang.ru]: 'Максимальная высота подвески',
    [Lang.en]: 'Maximum suspension height',
    [Lang.de]: 'Maximale Aufhängungshöhe',
    [Lang.ch]: '悬架最大行程(悬空时)'
  },
  brokenSuspensionMax: {
    [Lang.ru]: 'Максимальная высота подвески (когда сломана)',
    [Lang.en]: 'Minimum suspension height in broken condition',
    [Lang.de]: 'Minimale Aufhängungshöhe in gebrochenem Zustand',
    [Lang.ch]: '悬架损坏时的最大行程'
  },
  suspension: {
    [Lang.ru]: 'Подвеска',
    [Lang.en]: 'Suspension',
    [Lang.de]: 'Aussetzung',
    [Lang.ch]: '悬架'
  },
  criticalDamageThreshold: {
    [Lang.ru]: 'Порог критического повреждения',
    [Lang.en]: 'Critical damage threshold',
    [Lang.de]: 'Kritische Schadensschwelle',
    [Lang.ch]: '损坏阈值'
  },
  damageCapacity: {
    [Lang.ru]: 'Прочность',
    [Lang.en]: 'Damage capacity',
    [Lang.de]: 'Schadenskapazität',
    [Lang.ch]: '血量'
  }
})
