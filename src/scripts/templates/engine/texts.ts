import Config from '@sxmle-app/classes/Config'

export const texts = {
	RU: {
		id: 'ID',
		criticalDamageThreshold: 'Порог критического повреждения',
		damageCapacity: 'Прочность',
		damagedConsumptionModifier: 'Множитель потребления топлива при повреждении',
		responsiveness: 'Отзывчивость',
		fuelConsumption: 'Потребление топлива',
		torque: 'Крутящий момент',
		damagedMinTorqueModifier: 'Минимальный множитель мощности при повреждении',
		damagedMaxTorqueModifier: 'Максимальный множитель мощности при повреждении',
		breakesDelay: 'Задержка торможения',
		maxDeltaAngVel: 'Замедление ускорения'
	},
	EN: {
		id: 'ID',
		criticalDamageThreshold: 'Critical damage threshold',
		damageCapacity: 'Damage capacity',
		damagedConsumptionModifier: 'Damage consumption modifier',
		responsiveness: 'Responsiveness',
		fuelConsumption: 'Fuel consumption',
		torque: 'Torque',
		damagedMinTorqueModifier: 'Damaged min torque modifier',
		damagedMaxTorqueModifier: 'Damaged max torque modifier',
		breakesDelay: 'Braking delay',
		maxDeltaAngVel: 'Deceleration of acceleration'
	},
	DE: {
		id: 'ID',
		criticalDamageThreshold: 'Kritische Schadensschwelle',
		damageCapacity: 'Schadenskapazität',
		damagedConsumptionModifier: 'Schadensverbrauchsmodifikator',
		responsiveness: 'Empfänglichkeit',
		fuelConsumption: 'Kraftstoffverbrauch',
		torque: 'Drehmoment',
		damagedMinTorqueModifier: 'Beschädigter min Drehmomentmodifikator',
		damagedMaxTorqueModifier: 'Beschädigte max Drehmoment-Modifikator',
		breakesDelay: 'Verzögerung beim Bremsen',
		maxDeltaAngVel: 'Verlangsamung der Beschleunigung'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		name: 'ID данного двигателя',
		criticalDamageTheshold: 'Порог повреждения (значение * 100 = процент), при котором двигатель будет вести себя как сломанный.',
		damageCapacity: 'Запас прочности данного двигателя.',
		damagedConsumptionModifier: 'Множитель потребления топлива в сломанном состоянии',
		responsiveness: 'Скорость набора оборотов двигателя',
		fuelConsumption: 'Множитель потребления топлива двигателя.',
		torque: 'Мощность данного двигателя',
		damagedMinTorqueModifier: 'Множитель мощности, когда ущерб движка достиг порога CriticalDamageThresold',
		damagedMaxTorqueModifier: 'Множитель мощности, когда движок близок к полной поломке',
		maxDeltaAngVel: 'Ограничитель максимального углового ускорения колёс. Чем он меньше, тем медленнее разгоняется машина.'
	},
	EN: {
		name: 'ID of this engine',
		criticalDamageThreshold: 'The damage threshold (value * 100 = percentage) at which the engine will behave as broken.',
		damageCapacity: 'The safety margin of this engine.',
		damagedConsumptionModifier: 'Fuel consumption modifier in the damaged state',
		responsiveness: 'Engine speed set',
		fuelConsumption: 'The multiplier of the engine fuel consumption.',
		torque: 'Power of this engine',
		damagedMinTorqueModifier: 'Power multiplier when engine damage has reached the CriticalDamageThresold threshold',
		damagedMaxTorqueModifier: 'Power multiplier when the engine is close to complete failure',
		maxDeltaAngVel: 'Limiter of the maximum angular acceleration of the wheels. The smaller it is, the slower the car accelerates.'
	},
	DE: {
		name: 'ID dieses Motors',
		criticalDamageThreshold: 'Die Schadensschwelle (Wert * 100 = Prozent), bei der sich der Motor als defekt verhält.',
		damageCapacity: 'Die Sicherheitsmarge dieses Motors.',
		damagedConsumptionModifier: 'Modifikator des Kraftstoffverbrauchs in beschädigtem Zustand',
		responsiveness: 'Motordrehzahl',
		fuelConsumption: 'Multiplikator des Kraftstoffverbrauchs des Motors.',
		torque: 'Leistung dieses Motors',
		damagedMinTorqueModifier: 'Leistungsmultiplikator, wenn der Motorschaden den CriticalDamageThresold-Schwellenwert erreicht hat',
		damagedMaxTorqueModifier: 'Leistungsmultiplikator, wenn der Motor kurz vor einem Totalausfall steht',
		maxDeltaAngVel: 'Begrenzer für maximale Winkelbeschleunigung der Räder. Je kleiner es ist, desto langsamer beschleunigt das Auto.'
	}
}[Config.obj.lang]
