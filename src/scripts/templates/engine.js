import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'
const engine = {
	main: [
		Template({type: 'Multiply', itemSelector: '[ENGINE]'}, [
			Group({nameType: 'Computed', nameSelector: '[ENGINE_ITEM_TEXT]', resNameSelector: '[ENGINE_ITEM]', nameAttribute: 'UiName', resNameAttribute: 'Name', defaultSelector: '[ENGINE_ITEM]'}, [
				Input({attribute: 'Name', text: '[ID]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'CriticalDamageThreshold', text: '[CRITICAL_DAMAGE_THRESHOLD]', numberType: 'float', max: '0.999'}),
				Input({attribute: 'DamageCapacity', text: '[DAMAGE_CAPACITY]', max: '64000', bold: true}),
				Input({attribute: 'DamagedConsumptionModifier', text: '[DAMAGE_CONSUMPTION_MODIFIER]', numberType: 'float', min: '0.1', max: '32'}),
				Input({attribute: 'EngineResponsiveness', text: '[RESPONSIVENESS]', numberType: 'float', max: '1'}),
				Input({attribute: 'FuelConsumption', text: '[FUEL_CONSUMPTION]', numberType: 'float', max: '100.0', bold: true}),
				Input({attribute: 'Torque', text: '[TORQUE]', max: '1000000', bold: true}),
				Input({attribute: 'DamagedMinTorqueMultiplier', text: '[DAMAGED_MIN_TORQUE_MODIFIER]', numberType: 'float', min: '0', max: '1'}),
				Input({attribute: 'DamagedMaxTorqueMultiplier', text: '[DAMAGED_MAX_TORQUE_MODIFIER]', numberType: 'float', min: '0', max: '1'}),
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
			Selector({id: 'ENGINE', value: 'EngineVariants.Engine'}),
			Selector({id: 'ENGINE_ITEM', value: '{ENGINE}#every'}),
			Selector({id: 'ENGINE_ITEM_TEXT', value: '{ENGINE_ITEM}.GameData.UiDesc'}),
			Selector({id: 'GAME_DATA', value: '{ENGINE}#every.GameData'})
		])
	],
	selector: 'EngineVariants',
	translation: {
		EN: {
			"ID": "ID",
			"CRITICAL_DAMAGE_THRESHOLD": "Critical damage threshold",
			"DAMAGE_CAPACITY": "Damage capacity",
			"DAMAGE_CONSUMPTION_MODIFIER": "Damage consumption modifier",
			"RESPONSIVENESS": "Responsiveness",
			"FUEL_CONSUMPTION": "Fuel consumption",
			"TORQUE": "Torque",
			"DAMAGED_MIN_TORQUE_MODIFIER": "Damaged min torque modifier",
			"DAMAGED_MAX_TORQUE_MODIFIER": "Damaged max torque modifier",
			"UNLOCK_GROUP_NAME": "Unlock",
			"PRICE": "Price",
			"BY_EXPLORATION": "Unlock method",
			"FIND_ON_MAP": "Find on map",
			"BY_RANK": "By rank",
			"BY_RANK_LEVEL": "Unlock level",
		},
		RU: {
			"ID": "ID",
			"CRITICAL_DAMAGE_THRESHOLD": "Порог критического повреждения",
			"DAMAGE_CAPACITY": "Прочность",
			"DAMAGE_CONSUMPTION_MODIFIER": "Множитель потребления топлива при повреждении",
			"RESPONSIVENESS": "Отзывчивость",
			"FUEL_CONSUMPTION": "Потребление топлива",
			"TORQUE": "Мощность",
			"DAMAGED_MIN_TORQUE_MODIFIER": "Минимальный множитель мощности при повреждении",
			"DAMAGED_MAX_TORQUE_MODIFIER": "Максимальный множитель мощности при повреждении",
			"UNLOCK_GROUP_NAME": "Разблокировка",
			"PRICE": "Цена",
			"BY_EXPLORATION": "Способ разблокировки",
			"FIND_ON_MAP": "Найти на карте",
			"BY_RANK": "По достижению уровня",
			"BY_RANK_LEVEL": "Уровень разблокировки",
		},
		DE: {
			"ID": "ID",
			"CRITICAL_DAMAGE_THRESHOLD": "Kritische Schadensschwelle",
			"DAMAGE_CAPACITY": "Schadenskapazität",
			"DAMAGE_CONSUMPTION_MODIFIER": "Schadensverbrauchsmodifikator",
			"RESPONSIVENESS": "Empfänglichkeit",
			"FUEL_CONSUMPTION": "Kraftstoffverbrauch",
			"TORQUE": "Drehmoment",
			"DAMAGED_MIN_TORQUE_MODIFIER": "Beschädigter min Drehmomentmodifikator",
			"DAMAGED_MAX_TORQUE_MODIFIER": "Beschädigte max Drehmoment-Modifikator",
			"UNLOCK_GROUP_NAME": "Freischalten",
			"PRICE": "Preis",
			"BY_EXPLORATION": "Methode entsperren",
			"FIND_ON_MAP": "Auf Karte finden",
			"BY_RANK": "Nach Rang",
			"BY_RANK_LEVEL": "Level freischalten",
		}
	}
}

export default engine
