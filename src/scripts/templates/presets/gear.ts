import { Input } from '../../service'

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
    }
}[config.lang]

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
    }
}[config.lang]

export default [
    Input({
        attribute: 'AngVel',
        text: texts.angelVelocity,
        desc: descs.angelVelocity,
        max: 32,
        default: 0,
        bold: true
    }),
    Input({
        attribute: 'FuelModifier',
        text: texts.fuelModifier,
        desc: descs.fuelModifier,
        max: 10,
        default: 1
    })
]