import {localize} from 'scripts/localize'

export const suspensionTexts = localize({
    RU: {
        height: 'Высота',
        strength: 'Жёсткость',
        damping: 'Затухание',
        suspensionMin: 'Минимальная высота подвески',
        suspensionMax: 'Максимальная высота подвески',
        brokenSuspensionMax: 'Максимальная высота подвески (когда сломана)',
        suspension: 'Подвеска',
        criticalDamageThreshold: 'Порог критического повреждения',
        damageCapacity: 'Прочность'
    },
    EN: {
        height: 'Height',
        strength: 'Strength',
        damping: 'Damping',
        suspensionMin: 'Minimum suspension height',
        suspensionMax: 'Maximum suspension height',
        brokenSuspensionMax: 'Minimum suspension height in broken condition',
        suspension: 'Suspension',
        criticalDamageThreshold: 'Critical damage threshold',
        damageCapacity: 'Damage capacity'
    },
    DE: {
        height: 'Höhe',
        strength: 'Stärke',
        damping: 'Dämpfung',
        suspensionMin: 'Minimale Aufhängungshöhe',
        suspensionMax: 'Maximale Aufhängungshöhe',
        brokenSuspensionMax: 'Minimale Aufhängungshöhe in gebrochenem Zustand',
        suspension: 'Aussetzung',
        criticalDamageThreshold: 'Kritische Schadensschwelle',
        damageCapacity: 'Schadenskapazität'
    },
    CH: {
        height: '悬架的高度',
        strength: '悬架的硬度',
        damping: '悬架的阻尼',
        suspensionMin: '悬架最小行程',
        suspensionMax: '悬架最大行程(悬空时)',
        brokenSuspensionMax: '是架损坏时的最大行程',
        suspension: '悬架',
        criticalDamageThreshold: '损坏阈值',
        damageCapacity: '血量'
    }
})
