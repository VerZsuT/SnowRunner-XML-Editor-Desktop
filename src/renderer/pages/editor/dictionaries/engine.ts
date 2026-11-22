import { loadLocalization, Localization, LocalizationStrings } from '@localization/renderer'

export const ENGINE_LOCALIZATION = loadLocalization(new Localization({
	name: new LocalizationStrings()
		.ru('Название')
		.en('Name')
		.de('Titel')
		.ch('标题'),

	responsiveness: new LocalizationStrings()
		.ru('Отзывчивость')
		.en('Responsiveness')
		.de('Empfänglichkeit')
		.ch('引擎转速增加的速度'),

	responsivenessDesc: new LocalizationStrings()
		.ru('Отзывчивость двигателя (скорость набирания оборотов)')
		.en('Engine responsiveness (revving speed)')
		.de('Reaktionsfähigkeit des Motors (Drehzahl)'),

	fuelConsumption: new LocalizationStrings()
		.ru('Потребление топлива')
		.en('Fuel consumption')
		.de('Kraftstoffverbrauch')
		.ch('油耗'),

	fuelConsumptionDesc: new LocalizationStrings()
		.ru('Базовое потребление топлива двигателем')
		.en('The basic fuel consumption of the engine')
		.de('Basiskraftstoffverbrauch durch den Motor'),

	damagedConsumptionModifier: new LocalizationStrings()
		.ru('Множитель потребления топлива при повреждении')
		.en('Damage consumption modifier')
		.de('Schadensverbrauchsmodifikator')
		.ch('损伤时油耗增加的倍数'),

	damagedConsumptionModifierDesc: new LocalizationStrings()
		.ru('Максимальное значение изменения расхода при поломке двигателя')
		.en('The maximum value of the flow rate change in case of engine failure')
		.de('Maximale Durchflussänderung bei Motorschaden'),

	torque: new LocalizationStrings()
		.ru('Крутящий момент')
		.en('Torque')
		.de('Drehmoment')
		.ch('马力'),

	torqueDesc: new LocalizationStrings()
		.ru('Мощность двигателя')
		.en('Engine power')
		.de('Motorleistung'),

	damagedMinTorqueModifier: new LocalizationStrings()
		.ru('Мин. множитель мощности при повреждении')
		.en('Damaged min torque modifier')
		.de('Beschädigter min Drehmomentmodifikator')
		.ch('损坏时马力输出倍数'),

	damagedMinTorqueModifierDesc: new LocalizationStrings()
		.ru('Множитель мощности, когда ущерб движка достиг порога поломки')
		.en('Power multiplier when engine damage has reached the breakdown threshold')
		.de('Leistungsmultiplikator, wenn der Motorschaden die Bruchschwelle erreicht hat'),

	damagedMaxTorqueModifier: new LocalizationStrings()
		.ru('Макс. множитель мощности при повреждении')
		.en('Damaged max torque modifier')
		.de('Beschädigte max Drehmoment-Modifikator')
		.ch('严重损坏时马力输出倍数'),

	damagedMaxTorqueModifierDesc: new LocalizationStrings()
		.ru('Множитель мощности, когда движок близок к полной поломке (к 0 прочности)')
		.en('Power multiplier when the engine is close to complete breakdown (to 0 strength)')
		.de('Leistungsmultiplikator, wenn der Motor nahe an einem vollständigen Bruch liegt (bei 0 Stärke)'),

	brakesDelay: new LocalizationStrings()
		.ru('Задержка торможения')
		.en('Braking delay')
		.de('Verzögerung beim Bremsen')
		.ch('制动延迟'),

	brakesDelayDesc: new LocalizationStrings()
		.ru('Задержка при торможении')
		.en('Braking delay')
		.de('Verzögerung beim Bremsen'),

	maxDeltaAngVel: new LocalizationStrings()
		.ru('Макс. дельта угловой скорости')
		.en('Max angular velocity delta')
		.de('maximale Winkelgeschwindigkeit Delta')
		.ch('加速的减速'),

	maxDeltaAngVelDesc: new LocalizationStrings()
		.ru('Ограничитель максимального углового ускорения колёс. Чем он меньше, тем медленнее разгоняется машина')
		.en('The limiter of the maximum angular acceleration of the wheels. The smaller it is, the slower the car accelerates')
		.de('Begrenzer für maximale Winkelbeschleunigung der Räder. Je kleiner es ist, desto langsamer beschleunigt das Auto'),

	criticalDamageThreshold: new LocalizationStrings()
		.ru('Порог критического повреждения')
		.en('Critical damage threshold')
		.de('Kritische Schadensschwelle')
		.ch('损坏阈值'),

	criticalDamageThresholdDesc: new LocalizationStrings()
		.ru('Порог критической поломки. После этого порога изменяется расход топлива и мощность двигателя')
		.en('The threshold of critical failure. After this threshold, the fuel consumption and engine power change')
		.de('Kritische Bruchschwelle. Nach dieser Schwelle ändert sich der Kraftstoffverbrauch und die Motorleistung'),

	damageCapacity: new LocalizationStrings()
		.ru('Прочность')
		.en('Damage capacity')
		.de('Schadenskapazität')
		.ch('血量'),

	damageCapacityDesc: new LocalizationStrings()
		.ru('Размер допустимого ущерба двигателю')
		.en('The amount of possible damage to the engine')
		.de('Die Größe des zulässigen Motorschadens')
}))
