import Config from '@editor-app/classes/Config'

export const texts = {
	RU: {
		id: 'ID',
		lowerManualGear: 'Точная регулировка',
		awdConsumptionModifier: 'Модификатор потребления топлива при полном приводе',
		criticalDamageThreshold: 'Порог критического повреждения',
		damageCapacity: 'Прочность',
		damagedConsumptionModifier: 'Множитель потребления топлива при повреждении',
		fuelConsumption: 'Потребление топлива',
		idleFuelConsumption: 'Множитель потребления топлива в бездействии',
		gearboxParams: 'Наличие передач',
		highGear: 'Повышенная',
		allow: 'Доступно',
		notAllow: 'Недоступно',
		lowerGear: 'Пониженная',
		lowerPlusGear: 'Пониженная+',
		lowerMinusGear: 'Пониженная-',
		reverceGear: 'Задняя',
		gears: 'Передачи'
	},
	EN: {
		id: 'ID',
		lowerManualGear: 'Precise adjustment',
		awdConsumptionModifier: 'AWD consumption modifier',
		criticalDamageThreshold: 'Critical damage threshold',
		damageCapacity: 'Damage capacity',
		damagedConsumptionModifier: 'Damage consumption modifier',
		fuelConsumption: 'Fuel consumption',
		idleFuelConsumption: 'IDLE fuel consumption',
		gearboxParams: 'Gears availability',
		highGear: 'High',
		allow: 'Available',
		notAllow: 'Not Available',
		lowerGear: 'Lower',
		lowerPlusGear: 'Lower+',
		lowerMinusGear: 'Lower-',
		reverceGear: 'Reverce',
		gears: 'Gears'
	},
	DE: {
		id: 'ID',
		lowerManualGear: 'Feineinstellung',
		awdConsumptionModifier: 'AWD-Verbrauchsmodifikator',
		criticalDamageThreshold: 'Kritische Schadensschwelle',
		damageCapacity: 'Schadenskapazität',
		damagedConsumptionModifier: 'Schadensverbrauchsmodifikator',
		fuelConsumption: 'Kraftstoffverbrauch',
		idleFuelConsumption: 'Leerlaufverbrauch',
		gearboxParams: 'Zahnräder Verfügbarkeit',
		highGear: 'Hoher',
		allow: 'Verfügbar',
		notAllow: 'Nicht verfügbar',
		lowerGear: 'Unterer',
		lowerPlusGear: 'Unterer+',
		lowerMinusGear: 'Unterer-',
		reverceGear: 'Rückwärtsgang',
		gears: 'Gangs'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		lowerManualGear: 'Позволяет менять передаточное число пониженной и задней передачи.',
		awdConsumptionModifier: 'Коэффициент изменения расхода топлива при использовании полного привода',
		criticalDamageThreshold: 'Процент повреждений (значение * 100 = процент), после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива',
		damageCapacity: 'Запас прочности данной коробки передач',
		damagedConsumptionModifier: 'Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана.',
		fuelConsumption: 'Базовое потребление топлива коробкой передач',
		idleFuelConsumption: 'Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем.',
		highGear: 'Есть ли повышенная передача в коробке передач',
		lowerGear: 'Есть ли пониженная передача в коробке передач',
		lowerPlusGear: 'Есть ли пониженная+ передача в коробке передач',
		lowerMinusGear: 'Есть ли повышенная+ передача в коробке передач'
	},
	EN: {
		lowerManualGear: 'Allows you to change the gear ratio of downshift and reverse gear.',
		awdConsumptionModifier: 'Coefficient of change in fuel consumption when using all-wheel drive',
		criticalDamageThreshold: 'The percentage of damage (value * 100 = percentage), after which the box begins to show signs of failure - flying gears and increased fuel consumption',
		damageCapacity: 'The safety margin of this gearbox',
		damagedConsumptionModifier: 'The maximum fuel consumption multiplier, to this multiplier the fuel consumption comes when the box is completely broken.',
		fuelConsumption: 'Basic fuel consumption of the gearbox',
		idleFuelConsumption: 'The fuel consumption multiplier when the car is stationary with the engine running.',
		highGear: 'Is there an upshift in the gearbox',
		lowerGear: 'Is there a downshift in the gearbox',
		lowerPlusGear: 'Is there a downshift+ in the gearbox',
		lowerMinusGear: 'Is there an upshift+ in the gearbox'
	},
	DE: {
		lowerManualGear: 'Ermöglicht das Ändern des Übersetzungsverhältnisses von Herunter-und Rückwärtsgang.',
		awdConsumptionModifier: 'Der Faktor der Veränderung des Kraftstoffverbrauchs bei der Nutzung des Allradantriebs',
		criticalDamageThreshold: 'Prozentsatz des Schadens (Wert * 100 = Prozent), nach dem die Box beginnt, Anzeichen von Bruch zu zeigen-fliegende Getriebe und erhöhter Kraftstoffverbrauch',
		damageCapacity: 'Sicherheitsfaktor dieses Getriebes',
		damagedConsumptionModifier: 'Der maximale Kraftstoffverbrauch Multiplikator, zu diesem Verbrauch Multiplikator kommt, wenn die Box vollständig gebrochen ist.',
		fuelConsumption: 'Der standardverbrauch von Kraftstoff Getriebe',
		idleFuelConsumption: 'Multiplikator des Kraftstoffverbrauchs, wenn das Auto stillsteht mit dem laufenden Motor.',
		highGear: 'Gibt es ein erhöhtes Getriebe im Getriebe',
		lowerGear: 'Gibt es ein reduziertes Getriebe im Getriebe',
		lowerPlusGear: 'Gibt es ein reduziertes+ Getriebe im Getriebe',
		lowerMinusGear: 'Gibt es ein erhöhte+s Getriebe im Getriebe'
	}	
}[Config.obj.lang]
