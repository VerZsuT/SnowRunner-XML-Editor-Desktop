import { Number } from '../items'
import Config from 'main/classes/Config'

const texts = {
    RU: {
        angelVelocity: 'Макс. угловая скорость колеса',
        fuelModifier: 'Модификатор потребления топлива'
    },
    EN: {
        angelVelocity: 'Max wheel angular velocity',
        fuelModifier: 'Fuel modifier'
    },
    DE: {
        angelVelocity: 'Winkelgeschwindigkeit',
        fuelModifier: 'Kraftstoffmodifikator'
    },
    ZH: {
        angelVelocity: '车轮的最大角速度',
        fuelModifier: '油耗修改器'
    }
}[Config.obj.lang]

const descs = {
    RU: {
        angelVelocity: 'Максимальная угловая скорость колеса',
        fuelModifier: 'Множитель потребления топлива на данной передаче'
    },
    EN: {
        angelVelocity: 'Maximum angular velocity of the wheel',
        fuelModifier: 'Fuel consumption multiplier in this gear'
    },
    DE: {
        angelVelocity: 'Maximale Winkelgeschwindigkeit des Rades',
        fuelModifier: 'Multiplikator des Kraftstoffverbrauchs in diesem Getriebe'
    },
    ZH: {
        angelVelocity: '车轮的最大角速度',
        fuelModifier: '此变速箱上的油耗乘数'
    }
}[Config.obj.lang]

export default [
    Number({
        attribute: 'AngVel',
        text: texts.angelVelocity,
        desc: descs.angelVelocity,
        max: 32,
        default: 0
    }),
    Number({
        attribute: 'FuelModifier',
        text: texts.fuelModifier,
        desc: descs.fuelModifier,
        max: 10,
        min: 0,
        default: 1
    })
]
