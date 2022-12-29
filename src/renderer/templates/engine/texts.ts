import { lzn } from '#services'

export const {
  CRITICAL_DAMAGE_THRESHOLD,
  DAMAGED_CONSUMPTION_MODIFIER,
  DAMAGED_MAX_TORQUE_MODIFIER,
  DAMAGED_MIN_TORQUE_MODIFIER,
  TORQUE,
  DAMAGE_CAPACITY,
  RESPONSIVENESS,
  MAX_DELTA_ANG_VEL,
  FUEL_CONSUMPTION,
  BRAKES_DELAY
} = lzn.localize({
  RU: {
    CRITICAL_DAMAGE_THRESHOLD: 'Порог критического повреждения',
    DAMAGE_CAPACITY: 'Прочность',
    DAMAGED_CONSUMPTION_MODIFIER: 'Множитель потребления топлива при повреждении',
    RESPONSIVENESS: 'Отзывчивость',
    FUEL_CONSUMPTION: 'Потребление топлива',
    TORQUE: 'Крутящий момент',
    DAMAGED_MIN_TORQUE_MODIFIER: 'Мин. множитель мощности при повреждении',
    DAMAGED_MAX_TORQUE_MODIFIER: 'Макс. множитель мощности при повреждении',
    BRAKES_DELAY: 'Задержка торможения',
    MAX_DELTA_ANG_VEL: 'Макс. дельта угловой скорости'
  },
  EN: {
    CRITICAL_DAMAGE_THRESHOLD: 'Critical damage threshold',
    DAMAGE_CAPACITY: 'Damage capacity',
    DAMAGED_CONSUMPTION_MODIFIER: 'Damage consumption modifier',
    RESPONSIVENESS: 'Responsiveness',
    FUEL_CONSUMPTION: 'Fuel consumption',
    TORQUE: 'Torque',
    DAMAGED_MIN_TORQUE_MODIFIER: 'Damaged min torque modifier',
    DAMAGED_MAX_TORQUE_MODIFIER: 'Damaged max torque modifier',
    BRAKES_DELAY: 'Braking delay',
    MAX_DELTA_ANG_VEL: 'Max angular velocity delta'
  },
  DE: {
    CRITICAL_DAMAGE_THRESHOLD: 'Kritische Schadensschwelle',
    DAMAGE_CAPACITY: 'Schadenskapazität',
    DAMAGED_CONSUMPTION_MODIFIER: 'Schadensverbrauchsmodifikator',
    RESPONSIVENESS: 'Empfänglichkeit',
    FUEL_CONSUMPTION: 'Kraftstoffverbrauch',
    TORQUE: 'Drehmoment',
    DAMAGED_MIN_TORQUE_MODIFIER: 'Beschädigter min Drehmomentmodifikator',
    DAMAGED_MAX_TORQUE_MODIFIER: 'Beschädigte max Drehmoment-Modifikator',
    BRAKES_DELAY: 'Verzögerung beim Bremsen',
    MAX_DELTA_ANG_VEL: 'maximale Winkelgeschwindigkeit Delta'
  },
  CH: {
    CRITICAL_DAMAGE_THRESHOLD: '扱害阈値',
    DAMAGE_CAPACITY: '血量',
    DAMAGED_CONSUMPTION_MODIFIER: '损伤时油耗增加的倍数',
    RESPONSIVENESS: '引擎转速增加的速度',
    FUEL_CONSUMPTION: '油耗',
    TORQUE: '扭矩',
    DAMAGED_MIN_TORQUE_MODIFIER: '损坏时马力输出倍数',
    DAMAGED_MAX_TORQUE_MODIFIER: '严重损坏时马力输出倍数',
    BRAKES_DELAY: '制动延迟',
    MAX_DELTA_ANG_VEL: '加速的减速'
  }
})
