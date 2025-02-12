import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  engine: new BaseLocalization()
    .ru('Двигатель')
    .en('Engine')
    .de('Motor')
    .ch('发动机'),

  criticalDamageThreshold: new BaseLocalization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),

  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  damagedConsumptionModifier: new BaseLocalization()
    .ru('Множитель потребления топлива при повреждении')
    .en('Damage consumption modifier')
    .de('Schadensverbrauchsmodifikator')
    .ch('损伤时油耗增加的倍数'),

  responsiveness: new BaseLocalization()
    .ru('Отзывчивость')
    .en('Responsiveness')
    .de('Empfänglichkeit')
    .ch('引擎转速增加的速度'),

  fuelConsumption: new BaseLocalization()
    .ru('Потребление топлива')
    .en('Fuel consumption')
    .de('Kraftstoffverbrauch')
    .ch('油耗'),

  torque: new BaseLocalization()
    .ru('Крутящий момент')
    .en('Torque')
    .de('Drehmoment')
    .ch('马力'),

  damagedMinTorqueModifier: new BaseLocalization()
    .ru('Мин. множитель мощности при повреждении')
    .en('Damaged min torque modifier')
    .de('Beschädigter min Drehmomentmodifikator')
    .ch('损坏时马力输出倍数'),

  damagedMaxTorqueModifier: new BaseLocalization()
    .ru('Макс. множитель мощности при повреждении')
    .en('Damaged max torque modifier')
    .de('Beschädigte max Drehmoment-Modifikator')
    .ch('严重损坏时马力输出倍数'),

  brakesDelay: new BaseLocalization()
    .ru('Задержка торможения')
    .en('Braking delay')
    .de('Verzögerung beim Bremsen')
    .ch('制动延迟'),

  maxDeltaAngVel: new BaseLocalization()
    .ru('Макс. дельта угловой скорости')
    .en('Max angular velocity delta')
    .de('maximale Winkelgeschwindigkeit Delta')
    .ch('加速的减速'),

  name: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题')
}).loadRenderer()
