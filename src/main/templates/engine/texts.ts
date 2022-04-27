import { config } from "main/classes/Config";

export const texts = {
	RU: {
		criticalDamageThreshold: "Порог критического повреждения",
		damageCapacity: "Прочность",
		damagedConsumptionModifier: "Множитель потребления топлива при повреждении",
		responsiveness: "Отзывчивость",
		fuelConsumption: "Потребление топлива",
		torque: "Крутящий момент",
		damagedMinTorqueModifier: "Минимальный множитель мощности при повреждении",
		damagedMaxTorqueModifier: "Максимальный множитель мощности при повреждении",
		breakesDelay: "Задержка торможения",
		maxDeltaAngVel: "Замедление ускорения"
	},
	EN: {
		criticalDamageThreshold: "Critical damage threshold",
		damageCapacity: "Damage capacity",
		damagedConsumptionModifier: "Damage consumption modifier",
		responsiveness: "Responsiveness",
		fuelConsumption: "Fuel consumption",
		torque: "Torque",
		damagedMinTorqueModifier: "Damaged min torque modifier",
		damagedMaxTorqueModifier: "Damaged max torque modifier",
		breakesDelay: "Braking delay",
		maxDeltaAngVel: "Deceleration of acceleration"
	},
	DE: {
		criticalDamageThreshold: "Kritische Schadensschwelle",
		damageCapacity: "Schadenskapazität",
		damagedConsumptionModifier: "Schadensverbrauchsmodifikator",
		responsiveness: "Empfänglichkeit",
		fuelConsumption: "Kraftstoffverbrauch",
		torque: "Drehmoment",
		damagedMinTorqueModifier: "Beschädigter min Drehmomentmodifikator",
		damagedMaxTorqueModifier: "Beschädigte max Drehmoment-Modifikator",
		breakesDelay: "Verzögerung beim Bremsen",
		maxDeltaAngVel: "Verlangsamung der Beschleunigung"
	},
	CH: {
		criticalDamageThreshold:"危急伤害阈值",
		damageCapacity: "耐用性",
		damagedConsumptionModifier: "损害的燃料消耗乘数",
		responsiveness: "响应性",
		fuelConsumption: "燃料消耗",
		torque: "扭矩",
		damagedMinTorqueModifier: "伤害的最小功率乘数",
		damagedMaxTorqueModifier: "伤害的最大功率乘数",
		breakesDelay: "制动延迟",
		maxDeltaAngVel: "加速的减速"
	}
}[config.lang];

export const descs = {
	RU: {
		criticalDamageTheshold: "Порог повреждения (значение * 100 = процент), при котором двигатель будет вести себя как сломанный.",
		damageCapacity: "Запас прочности данного двигателя.",
		damagedConsumptionModifier: "Множитель потребления топлива в сломанном состоянии",
		responsiveness: "Скорость набора оборотов двигателя",
		fuelConsumption: "Множитель потребления топлива двигателя.",
		torque: "Мощность данного двигателя",
		damagedMinTorqueModifier: "Множитель мощности, когда ущерб движка достиг порога CriticalDamageThresold",
		damagedMaxTorqueModifier: "Множитель мощности, когда движок близок к полной поломке",
		maxDeltaAngVel: "Ограничитель максимального углового ускорения колёс. Чем он меньше, тем медленнее разгоняется машина."
	},
	EN: {
		criticalDamageThreshold: "The damage threshold (value * 100 = percentage) at which the engine will behave as broken.",
		damageCapacity: "The safety margin of this engine.",
		damagedConsumptionModifier: "Fuel consumption modifier in the damaged state",
		responsiveness: "Engine speed set",
		fuelConsumption: "The multiplier of the engine fuel consumption.",
		torque: "Power of this engine",
		damagedMinTorqueModifier: "Power multiplier when engine damage has reached the CriticalDamageThresold threshold",
		damagedMaxTorqueModifier: "Power multiplier when the engine is close to complete failure",
		maxDeltaAngVel: "Limiter of the maximum angular acceleration of the wheels. The smaller it is, the slower the car accelerates."
	},
	DE: {
		criticalDamageThreshold: "Die Schadensschwelle (Wert * 100 = Prozent), bei der sich der Motor als defekt verhält.",
		damageCapacity: "Die Sicherheitsmarge dieses Motors.",
		damagedConsumptionModifier: "Modifikator des Kraftstoffverbrauchs in beschädigtem Zustand",
		responsiveness: "Motordrehzahl",
		fuelConsumption: "Multiplikator des Kraftstoffverbrauchs des Motors.",
		torque: "Leistung dieses Motors",
		damagedMinTorqueModifier: "Leistungsmultiplikator, wenn der Motorschaden den CriticalDamageThresold-Schwellenwert erreicht hat",
		damagedMaxTorqueModifier: "Leistungsmultiplikator, wenn der Motor kurz vor einem Totalausfall steht",
		maxDeltaAngVel: "Begrenzer für maximale Winkelbeschleunigung der Räder. Je kleiner es ist, desto langsamer beschleunigt das Auto."
	},
	CH: {
		criticalDamageTheshold:"损伤阈值（值*100=百分比），在此阈值下，发动机将表现得像坏了一样。",
		damageCapacity: "这个发动机的安全系数。",
		damagedConsumptionModifier: "破损状态下的油耗倍率",
		responsiveness: "发动机转数的速度",
		fuelConsumption: "发动机油耗乘数。",
		torque: "该电机的输出功率",
		damagedMinTorqueModifier: "当发动机损坏达到CriticalDamageThresold阈值时的功率倍数",
		damagedMaxTorqueModifier: "发动机接近完全失效时的功率倍增器",
		maxDeltaAngVel: "车轮的最大角加速度限制器。它越小，汽车的加速就越慢。"
	}
}[config.lang];
