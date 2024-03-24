import { Localization, LocalizationObj } from '/utils/texts/renderer'

export default new LocalizationObj({
  engine: new Localization()
    .ru('Двигатель')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),
  criticalDamageThreshold: new Localization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),
  damageCapacity: new Localization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),
  damagedConsumptionModifier: new Localization()
    .ru('Множитель потребления топлива при повреждении')
    .en('Damage consumption modifier')
    .de('Schadensverbrauchsmodifikator')
    .ch('损伤时油耗增加的倍数'),
  responsiveness: new Localization()
    .ru('Отзывчивость')
    .en('Responsiveness')
    .de('Empfänglichkeit')
    .ch('引擎转速增加的速度'),
  fuelConsumption: new Localization()
    .ru('Потребление топлива')
    .en('Fuel consumption')
    .de('Kraftstoffverbrauch')
    .ch('油耗'),
  torque: new Localization()
    .ru('Крутящий момент')
    .en('Torque')
    .de('Drehmoment')
    .ch('马力'),
  damagedMinTorqueModifier: new Localization()
    .ru('Мин. множитель мощности при повреждении')
    .en('Damaged min torque modifier')
    .de('Beschädigter min Drehmomentmodifikator')
    .ch('损坏时马力输出倍数'),
  damagedMaxTorqueModifier: new Localization()
    .ru('Макс. множитель мощности при повреждении')
    .en('Damaged max torque modifier')
    .de('Beschädigte max Drehmoment-Modifikator')
    .ch('严重损坏时马力输出倍数'),
  brakesDelay: new Localization()
    .ru('Задержка торможения')
    .en('Braking delay')
    .de('Verzögerung beim Bremsen')
    .ch('制动延迟'),
  maxDeltaAngVel: new Localization()
    .ru( 'Макс. дельта угловой скорости')
    .en( 'Max angular velocity delta')
    .de( 'maximale Winkelgeschwindigkeit Delta')
    .ch( '加速的减速')
}).get()
