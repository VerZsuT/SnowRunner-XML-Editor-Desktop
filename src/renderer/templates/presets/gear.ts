import { Num } from '../items'

import { localization } from '#services'

const {
  ANGEL_VELOCITY,
  FUEL_MODIFIER
} = localization.localize({
  RU: {
    ANGEL_VELOCITY: 'Макс. угловая скорость колеса',
    FUEL_MODIFIER: 'Модификатор потребления топлива'
  },
  EN: {
    ANGEL_VELOCITY: 'Max wheel angular velocity',
    FUEL_MODIFIER: 'Fuel modifier'
  },
  DE: {
    ANGEL_VELOCITY: 'Winkelgeschwindigkeit',
    FUEL_MODIFIER: 'Kraftstoffmodifikator'
  },
  CH: {
    ANGEL_VELOCITY: '最大车轮角速度',
    FUEL_MODIFIER: '燃油消耗改性剂'
  }
})

export const gearPreset = [
  new Num({
    attribute: 'AngVel',
    label: ANGEL_VELOCITY,
    max: 32,
    default: 0
  }),
  new Num({
    attribute: 'FuelModifier',
    label: FUEL_MODIFIER,
    max: 10,
    min: 0,
    default: 1
  })
]
