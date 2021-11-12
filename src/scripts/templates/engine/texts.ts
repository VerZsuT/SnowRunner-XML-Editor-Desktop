export const descs = {
	RU: {
		price: 'Цена самого автомобиля (без учёта составляющих)',
		byExploration: 'Способ разблокировки автомобиля',
		unlockByRank: 'Способ разблокировки автомобиля',
		name: 'ID данного двигателя',
		criticalDamageTheshold: 'Порог повреждения (значение * 100 = процент), при котором двигатель будет вести себя как сломанный.',
		damageCapacity: 'Запас прочности данного двигателя.',
		damagedConsumptionModifier: 'Множитель потребления топлива в сломанном состоянии',
		responsiveness: 'Скорость набора оборотов двигателя',
		fuelConsumption: 'Множитель потребления топлива двигателя.',
		torque: 'Мощность данного двигателя',
		damagedMinTorqueModifier: 'Множитель мощности, когда ущерб движка достиг порога CriticalDamageThresold',
		damagedMaxTorqueModifier: 'Множитель мощности, когда движок близок к полной поломке'
	},
	EN: {
		price: 'Der Preis des Autos selbst (ohne die Komponenten)',
		byExploration: 'How to unlock the car',
		unlockByRank: 'Car Unlock Level',
		name: 'ID of this engine',
		criticalDamageThreshold: 'The damage threshold (value * 100 = percentage) at which the engine will behave as broken.',
		damageCapacity: 'The safety margin of this engine.',
		damagedConsumptionModifier: 'Fuel consumption modifier in the damaged state',
		responsiveness: 'Engine speed set',
		fuelConsumption: 'The multiplier of the engine fuel consumption.',
		torque: 'Power of this engine',
		damagedMinTorqueModifier: 'Power multiplier when engine damage has reached the CriticalDamageThresold threshold',
		damagedMaxTorqueModifier: 'Power multiplier when the engine is close to complete failure'
	},
	DE: {
		price: 'The price of the car itself (excluding components)',
		byExploration: 'Methode zum Entsperren des Autos',
		unlockByRank: 'Auto entsperren Ebene',
		name: 'ID dieses Motors',
		criticalDamageThreshold: 'Die Schadensschwelle (Wert * 100 = Prozent), bei der sich der Motor als defekt verhält.',
		damageCapacity: 'Die Sicherheitsmarge dieses Motors.',
		damagedConsumptionModifier: 'Modifikator des Kraftstoffverbrauchs in beschädigtem Zustand',
		responsiveness: 'Motordrehzahl',
		fuelConsumption: 'Multiplikator des Kraftstoffverbrauchs des Motors.',
		torque: 'Leistung dieses Motors',
		damagedMinTorqueModifier: 'Leistungsmultiplikator, wenn der Motorschaden den CriticalDamageThresold-Schwellenwert erreicht hat',
		damagedMaxTorqueModifier: 'Leistungsmultiplikator, wenn der Motor kurz vor einem Totalausfall steht'
	}
}[config.lang]

export const texts = {
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
		unlockGroupName: 'Unlock',
		price: 'Price',
		byExploration: 'Unlock method',
		findOnMap: 'Find on map',
		byRank: 'By rank',
		unlockByRank: 'Unlock level'
	},
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
		unlockGroupName: 'Разблокировка',
		price: 'Цена',
		byExploration: 'Способ разблокировки',
		findOnMap: 'Найти на карте',
		byRank: 'По достижению уровня',
		unlockByRank: 'Уровень разблокировки'
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
		unlockGroupName: 'Freischalten',
		price: 'Preis',
		byExploration: 'Methode entsperren',
		findOnMap: 'Auf Karte finden',
		byRank: 'Nach Rang',
		unlockByRank: 'Level freischalten'
	}
}[config.lang]
