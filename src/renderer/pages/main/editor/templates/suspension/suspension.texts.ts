import { compareWithGlobal } from '#g/texts/renderer'

const $ = compareWithGlobal({
  RU: {
    HEIGHT: 'Высота',
    STRENGTH: 'Жёсткость',
    DAMPING: 'Затухание',
    SUSPENSION_MIN: 'Минимальная высота подвески',
    SUSPENSION_MAX: 'Максимальная высота подвески',
    BROKEN_SUSPENSION_MAX: 'Максимальная высота подвески (когда сломана)',
    SUSPENSION: 'Подвеска',
    CRITICAL_DAMAGE_THRESHOLD: 'Порог критического повреждения',
    DAMAGE_CAPACITY: 'Прочность'
  },
  EN: {
    HEIGHT: 'Height',
    STRENGTH: 'Strength',
    DAMPING: 'Damping',
    SUSPENSION_MIN: 'Minimum suspension height',
    SUSPENSION_MAX: 'Maximum suspension height',
    BROKEN_SUSPENSION_MAX: 'Minimum suspension height in broken condition',
    SUSPENSION: 'Suspension',
    CRITICAL_DAMAGE_THRESHOLD: 'Critical damage threshold',
    DAMAGE_CAPACITY: 'Damage capacity'
  },
  DE: {
    HEIGHT: 'Höhe',
    STRENGTH: 'Stärke',
    DAMPING: 'Dämpfung',
    SUSPENSION_MIN: 'Minimale Aufhängungshöhe',
    SUSPENSION_MAX: 'Maximale Aufhängungshöhe',
    BROKEN_SUSPENSION_MAX: 'Minimale Aufhängungshöhe in gebrochenem Zustand',
    SUSPENSION: 'Aussetzung',
    CRITICAL_DAMAGE_THRESHOLD: 'Kritische Schadensschwelle',
    DAMAGE_CAPACITY: 'Schadenskapazität'
  },
  CH: {
    HEIGHT: '悬架的高度',
    STRENGTH: '悬架的硬度',
    DAMPING: '悬架的阻尼',
    SUSPENSION_MIN: '悬架最小行程',
    SUSPENSION_MAX: '悬架最大行程(悬空时)',
    BROKEN_SUSPENSION_MAX: '是架损坏时的最大行程',
    SUSPENSION: '悬架',
    CRITICAL_DAMAGE_THRESHOLD: '损坏阈值',
    DAMAGE_CAPACITY: '血量'
  }
})

export default $
