import { Lang } from '/mods/renderer'
import { localize } from '/utils/texts/renderer'

export default localize({
  engine: {
    [Lang.ru]: 'Двигатель',
    [Lang.en]: 'Engine',
    [Lang.de]: 'Motor',
    [Lang.ch]: '发动机'
  },
  criticalDamageThreshold: {
    [Lang.ru]: 'Порог критического повреждения',
    [Lang.en]: 'Critical damage threshold',
    [Lang.de]: 'Kritische Schadensschwelle',
    [Lang.ch]: '扱害阈値'
  },
  damageCapacity: {
    [Lang.ru]: 'Прочность',
    [Lang.en]: 'Damage capacity',
    [Lang.de]: 'Schadenskapazität',
    [Lang.ch]: '血量'
  },
  damagedConsumptionModifier: {
    [Lang.ru]: 'Множитель потребления топлива при повреждении',
    [Lang.en]: 'Damage consumption modifier',
    [Lang.de]: 'Schadensverbrauchsmodifikator',
    [Lang.ch]: '损伤时油耗增加的倍数'
  },
  responsiveness: {
    [Lang.ru]: 'Отзывчивость',
    [Lang.en]: 'Responsiveness',
    [Lang.de]: 'Empfänglichkeit',
    [Lang.ch]: '引擎转速增加的速度'
  },
  fuelConsumption: {
    [Lang.ru]: 'Потребление топлива',
    [Lang.en]: 'Fuel consumption',
    [Lang.de]: 'Kraftstoffverbrauch',
    [Lang.ch]: '油耗'
  },
  torque: {
    [Lang.ru]: 'Крутящий момент',
    [Lang.en]: 'Torque',
    [Lang.de]: 'Drehmoment',
    [Lang.ch]: '马力'
  },
  damagedMinTorqueModifier: {
    [Lang.ru]: 'Мин. множитель мощности при повреждении',
    [Lang.en]: 'Damaged min torque modifier',
    [Lang.de]: 'Beschädigter min Drehmomentmodifikator',
    [Lang.ch]: '损坏时马力输出倍数'
  },
  damagedMaxTorqueModifier: {
    [Lang.ru]: 'Макс. множитель мощности при повреждении',
    [Lang.en]: 'Damaged max torque modifier',
    [Lang.de]: 'Beschädigte max Drehmoment-Modifikator',
    [Lang.ch]: '严重损坏时马力输出倍数'
  },
  brakesDelay: {
    [Lang.ru]: 'Задержка торможения',
    [Lang.en]: 'Braking delay',
    [Lang.de]: 'Verzögerung beim Bremsen',
    [Lang.ch]: '制动延迟'
  },
  maxDeltaAngVel: {
    [Lang.ru]: 'Макс. дельта угловой скорости',
    [Lang.en]: 'Max angular velocity delta',
    [Lang.de]: 'maximale Winkelgeschwindigkeit Delta',
    [Lang.ch]: '加速的减速'
  }
})
