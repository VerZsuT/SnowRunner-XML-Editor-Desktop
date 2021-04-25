import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'
const gearbox = {
	main: [
		Template({type: 'Multiply', itemSelector: '[GEARBOX]'}, [
			Group({nameType: 'Computed', nameSelector: '[GEARBOX_ITEM_TEXT]', resNameSelector: '[GEARBOX_ITEM]', nameAttribute: 'UiName', resNameAttribute: 'Name', defaultSelector: '[GEARBOX_ITEM]'}, [
				Input({attribute: 'Name', text: '[ID]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'AWDConsumptionModifier', text: '[AWD_CONSUMPTION_MODIFIER]', numberType: 'float', max: '32'}),
				Input({attribute: 'CriticalDamageThreshold', text: '[CRITICAL_DAMAGE_THRESHOLD]', numberType: 'float', max: '0.999'}),
				Input({attribute: 'DamageCapacity', text: '[DAMAGE_CAPACITY]', max: '64000', bold: true}),
				Input({attribute: 'DamagedConsumptionModifier', text: '[DAMAGE_CONSUMPTION_MODIFIER]', numberType: 'float', max: '32'}),
				Input({attribute: 'FuelConsumption', text: '[FUEL_CONSUMPTION]', numberType: 'float', max: '10', bold: true}),
				Input({attribute: 'IdleFuelModifier', text: '[IDLE_FUEL_CONSUMPTION]', numberType: 'float', max: '10'}),
				Group({name: '[GEARBOX_PARAMS]', defaultSelector: '[GEARBOX_PARAMS]'}, [
					Select({attribute: 'IsHighGearExists', text: '[HIGH_GEAR]'}, [
						Opt({text: '[ALLOW]', value: 'true'}),
						Opt({text: '[NOT_ALLOW]', value: 'false'})
					]),
					Select({attribute: 'IsLowerGearExists', text: '[LOWER_GEAR]'}, [
						Opt({text: '[ALLOW]', value: 'true'}),
						Opt({text: '[NOT_ALLOW]', value: 'false'})
					]),
					Select({attribute: 'IsLowerPlusGearExists', text: '[LOWER_PLUS_GEAR]'}, [
						Opt({text: '[ALLOW]', value: 'true'}),
						Opt({text: '[NOT_ALLOW]', value: 'false'})
					]),
					Select({attribute: 'IsLowerMinusGearExists', text: '[LOWER_MINUS_GEAR]'}, [
						Opt({text: '[ALLOW]', value: 'true'}),
						Opt({text: '[NOT_ALLOW]', value: 'false'})
					])
				]),
				Group({name: '[REVERCE_GEAR]', defaultSelector: '[REVERSE_GEAR]'}, [
					Input({attribute: 'AngVel', text: '[ANGEL_VELOCITY]', numberType: 'float', max: '32', bold: true}),
					Input({attribute: 'FuelModifier', text: '[FUEL_MODIFIER]', numberType: 'float', max: '10'})
				]),
				Group({name: '[HIGH_GEAR]', defaultSelector: '[HIGH_GEAR]'}, [
					Input({attribute: 'AngVel', text: '[ANGEL_VELOCITY]', numberType: 'float', max: '32', bold: true}),
					Input({attribute: 'FuelModifier', text: '[FUEL_MODIFIER]', numberType: 'float', max: '10'})
				]),
				Template({type: 'Multiply', itemSelector: '[GEAR]'}, [
					Group({name: '[GEAR]', defaultSelector: '[GEAR_ITEM]', withCounter: 'true'}, [
						Input({attribute: 'AngVel', text: '[ANGEL_VELOCITY]', numberType: 'float', max: '32', bold: true}),
						Input({attribute: 'FuelModifier', text: '[FUEL_MODIFIER]', numberType: 'float', max: '10'})
					])
				]),
				Group({name: '[UNLOCK_GROUP_NAME]', defaultSelector: '[GAME_DATA]'}, [
					Input({attribute: 'Price', text: '[PRICE]', bold: true}),
					Select({attribute: 'UnlockByExploration', text: '[BY_EXPLORATION]', onlyDeveloper: 'true'}, [
						Opt({text: '[FIND_ON_MAP]', value: 'true'}),
						Opt({text: '[BY_RANK]', value: 'false'})
					]),
					Input({attribute: 'UnlockByRank', text: '[BY_RANK_LEVEL]'})
				])
			])
		]),
		Selectors([
			Selector({id: 'GEARBOX', value: 'GearboxVariants.Gearbox'}),
			Selector({id: 'GEARBOX_ITEM', value: '{GEARBOX}#every'}),
			Selector({id: 'GEARBOX_ITEM_TEXT', value: '{GEARBOX_ITEM}.GameData.UiDesc'}),
			Selector({id: 'GEAR', value: '{GEARBOX}#every.Gear'}),
			Selector({id: 'REVERSE_GEAR', value: '{GEARBOX_ITEM}.ReverseGear'}),
			Selector({id: 'HIGH_GEAR', value: '{GEARBOX_ITEM}.HighGear'}),
			Selector({id: 'GEAR_ITEM', value: '{GEAR}#every(2)'}),
			Selector({id: 'GAME_DATA', value: '{GEARBOX_ITEM}.GameData'}),
			Selector({id: 'GEARBOX_PARAMS', value: '{GAME_DATA}.GearboxParams'})
		])
	],
	selector: 'GearboxVariants',
	translation: {
		EN: {
			"ID": "ID",
			"AWD_CONSUMPTION_MODIFIER": "AWD consumption modifier",
			"CRITICAL_DAMAGE_THRESHOLD": "Critical damage threshold",
			"DAMAGE_CAPACITY": "Damage capacity",
			"DAMAGE_CONSUMPTION_MODIFIER": "Damage consumption modifier",
			"FUEL_CONSUMPTION": "Fuel consumption",
			"IDLE_FUEL_CONSUMPTION": "IDLE fuel consumption",
			"GEARBOX_PARAMS": "Gears availability",
			"HIGH_GEAR": "High gear",
			"ALLOW": "Available",
			"NOT_ALLOW": "Not Available",
			"LOWER_GEAR": "Lower gear",
			"LOWER_PLUS_GEAR": "Lower+",
			"LOWER_MINUS_GEAR": "Lower-",
			"REVERCE_GEAR": "Reverce gear",
			"ANGEL_VELOCITY": "Angular velocity",
			"FUEL_MODIFIER": "Fuel modifier",
			"GEAR": "Gear",
			"UNLOCK_GROUP_NAME": "Unlock",
			"PRICE": "Price",
			"BY_EXPLORATION": "Unlock method",
			"FIND_ON_MAP": "Find on map",
			"BY_RANK": "By rank",
			"BY_RANK_LEVEL": "Unlock level",
		},
		RU: {
			"ID": "ID",
			"AWD_CONSUMPTION_MODIFIER": "Модификатор потребления топлива при полном приводе",
			"CRITICAL_DAMAGE_THRESHOLD": "Порог критического повреждения",
			"DAMAGE_CAPACITY": "Прочность",
			"DAMAGE_CONSUMPTION_MODIFIER": "Множитель потребления топлива при повреждении",
			"FUEL_CONSUMPTION": "Потребление топлива",
			"IDLE_FUEL_CONSUMPTION": "Множитель потребления топлива в бездействии",
			"GEARBOX_PARAMS": "Наличие передач",
			"HIGH_GEAR": "Повышенная передача",
			"ALLOW": "Доступно",
			"NOT_ALLOW": "Недоступно",
			"LOWER_GEAR": "Пониженная передача",
			"LOWER_PLUS_GEAR": "Пониженная+",
			"LOWER_MINUS_GEAR": "Пониженная-",
			"REVERCE_GEAR": "Задняя передача",
			"ANGEL_VELOCITY": "Тяга",
			"FUEL_MODIFIER": "Модификатор потребления топлива",
			"GEAR": "Передача",
			"UNLOCK_GROUP_NAME": "Разблокировка",
			"PRICE": "Цена",
			"BY_EXPLORATION": "Способ разблокировки",
			"FIND_ON_MAP": "Найти на карте",
			"BY_RANK": "По достижению уровня",
			"BY_RANK_LEVEL": "Уровень разблокировки",
		},
		DE: {
			"ID": "ID",
			"AWD_CONSUMPTION_MODIFIER": "AWD-Verbrauchsmodifikator",
			"CRITICAL_DAMAGE_THRESHOLD": "Kritische Schadensschwelle",
			"DAMAGE_CAPACITY": "Schadenskapazität",
			"DAMAGE_CONSUMPTION_MODIFIER": "Schadensverbrauchsmodifikator",
			"FUEL_CONSUMPTION": "Kraftstoffverbrauch",
			"IDLE_FUEL_CONSUMPTION": "Leerlaufverbrauch",
			"GEARBOX_PARAMS": "Zahnräder Verfügbarkeit",
			"HIGH_GEAR": "Hoher Gang",
			"ALLOW": "Verfügbar",
			"NOT_ALLOW": "Nicht verfügbar",
			"LOWER_GEAR": "Unterer Gang",
			"LOWER_PLUS_GEAR": "Unterer+",
			"LOWER_MINUS_GEAR": "Unterer-",
			"REVERCE_GEAR": "Rückwärtsgang",
			"ANGEL_VELOCITY": "Winkelgeschwindigkeit",
			"FUEL_MODIFIER": "Kraftstoffmodifikator",
			"GEAR": "Gang",
			"UNLOCK_GROUP_NAME": "Freischalten",
			"PRICE": "Preis",
			"BY_EXPLORATION": "Methode entsperren",
			"FIND_ON_MAP": "Auf Karte finden",
			"BY_RANK": "Nach Rang",
			"BY_RANK_LEVEL": "Level freischalten",
		}
	}
}

export default gearbox
