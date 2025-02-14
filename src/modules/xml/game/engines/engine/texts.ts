import { createTextsLoader } from '/utils/texts'
import { BaseLocalization } from '/utils/texts/base-localization'

export default await createTextsLoader({
  name: new BaseLocalization()
    .ru('Название')
    .en('Name')
    .de('Titel')
    .ch('标题'),

  responsiveness: new BaseLocalization()
    .ru('Отзывчивость')
    .en('Responsiveness')
    .de('Empfänglichkeit')
    .ch('引擎转速增加的速度'),

  responsivenessDesc: new BaseLocalization()
    .ru('Отзывчивость двигателя (скорость набирания оборотов)')
    .en('Engine responsiveness (revving speed)')
    .de('Reaktionsfähigkeit des Motors (Drehzahl)'),

  fuelConsumption: new BaseLocalization()
    .ru('Потребление топлива')
    .en('Fuel consumption')
    .de('Kraftstoffverbrauch')
    .ch('油耗'),

  fuelConsumptionDesc: new BaseLocalization()
    .ru('Базовое потребление топлива двигателем')
    .en('The basic fuel consumption of the engine')
    .de('Basiskraftstoffverbrauch durch den Motor'),

  damagedConsumptionModifier: new BaseLocalization()
    .ru('Множитель потребления топлива при повреждении')
    .en('Damage consumption modifier')
    .de('Schadensverbrauchsmodifikator')
    .ch('损伤时油耗增加的倍数'),

  damagedConsumptionModifierDesc: new BaseLocalization()
    .ru('Максимальное значение изменения расхода при поломке двигателя')
    .en('The maximum value of the flow rate change in case of engine failure')
    .de('Maximale Durchflussänderung bei Motorschaden'),

  torque: new BaseLocalization()
    .ru('Крутящий момент')
    .en('Torque')
    .de('Drehmoment')
    .ch('马力'),

  torqueDesc: new BaseLocalization()
    .ru('Мощность двигателя')
    .en('Engine power')
    .de('Motorleistung'),

  damagedMinTorqueModifier: new BaseLocalization()
    .ru('Мин. множитель мощности при повреждении')
    .en('Damaged min torque modifier')
    .de('Beschädigter min Drehmomentmodifikator')
    .ch('损坏时马力输出倍数'),

  damagedMinTorqueModifierDesc: new BaseLocalization()
    .ru('Множитель мощности, когда ущерб движка достиг порога поломки')
    .en('Power multiplier when engine damage has reached the breakdown threshold')
    .de('Leistungsmultiplikator, wenn der Motorschaden die Bruchschwelle erreicht hat'),

  damagedMaxTorqueModifier: new BaseLocalization()
    .ru('Макс. множитель мощности при повреждении')
    .en('Damaged max torque modifier')
    .de('Beschädigte max Drehmoment-Modifikator')
    .ch('严重损坏时马力输出倍数'),

  damagedMaxTorqueModifierDesc: new BaseLocalization()
    .ru('Множитель мощности, когда движок близок к полной поломке (к 0 прочности)')
    .en('Power multiplier when the engine is close to complete breakdown (to 0 strength)')
    .de('Leistungsmultiplikator, wenn der Motor nahe an einem vollständigen Bruch liegt (bei 0 Stärke)'),

  brakesDelay: new BaseLocalization()
    .ru('Задержка торможения')
    .en('Braking delay')
    .de('Verzögerung beim Bremsen')
    .ch('制动延迟'),

  brakesDelayDesc: new BaseLocalization()
    .ru('Задержка при торможении')
    .en('Braking delay')
    .de('Verzögerung beim Bremsen'),

  maxDeltaAngVel: new BaseLocalization()
    .ru('Макс. дельта угловой скорости')
    .en('Max angular velocity delta')
    .de('maximale Winkelgeschwindigkeit Delta')
    .ch('加速的减速'),

  maxDeltaAngVelDesc: new BaseLocalization()
    .ru('Ограничитель максимального углового ускорения колёс. Чем он меньше, тем медленнее разгоняется машина')
    .en('The limiter of the maximum angular acceleration of the wheels. The smaller it is, the slower the car accelerates')
    .de('Begrenzer für maximale Winkelbeschleunigung der Räder. Je kleiner es ist, desto langsamer beschleunigt das Auto'),

  criticalDamageThreshold: new BaseLocalization()
    .ru('Порог критического повреждения')
    .en('Critical damage threshold')
    .de('Kritische Schadensschwelle')
    .ch('损坏阈值'),

  criticalDamageThresholdDesc: new BaseLocalization()
    .ru('Порог критической поломки. После этого порога изменяется расход топлива и мощность двигателя')
    .en('The threshold of critical failure. After this threshold, the fuel consumption and engine power change')
    .de('Kritische Bruchschwelle. Nach dieser Schwelle ändert sich der Kraftstoffverbrauch und die Motorleistung'),

  damageCapacity: new BaseLocalization()
    .ru('Прочность')
    .en('Damage capacity')
    .de('Schadenskapazität')
    .ch('血量'),

  damageCapacityDesc: new BaseLocalization()
    .ru('Размер допустимого ущерба двигателю')
    .en('The amount of possible damage to the engine')
    .de('Die Größe des zulässigen Motorschadens')
}).loadRenderer()
