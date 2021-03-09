import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'
const wheels = {
	main: [
		Template({type: 'Multiply', itemSelector: '[TRUCK_TIRE]'}, [
			Group({nameType: 'Computed', nameSelector: '[TRUCK_TIRE_ITEM]', nameAttribute: 'Name', defaultSelector: '[WHEEL_FRICTION]'}, [
				Input({attribute: 'BodyFriction', text: '[BODY_FRICTION]', numberType: 'float', max: '10'}),
				Input({attribute: 'BodyFrictionAsphalt', text: '[BODY_FRICTION_ASPHALT]', numberType: 'float', max: '10'}),
				Input({attribute: 'SubstanceFriction', text: '[SUBSTANCE_FRICTION]', numberType: 'float', max: '10'}),
				Select({attribute: 'IsIgnoreIce', text: '[IS_IGNORE_ICE]'}, [
					Opt({text: '[YES]', value: 'true'}),
					Opt({text: '[NO]', value: '__DefaultSelectValue__'})
				]),
				Group({name: '[UNLOCK_GROUP_NAME]', defaultSelector: '[GAME_DATA]'}, [
					Input({attribute: 'Price', text: '[PRICE]'}),
					Select({attribute: 'UnlockByExploration', text: '[BY_EXPLORATION]', onlyDeveloper: 'true'}, [
						Opt({text: '[FIND_ON_MAP]', value: 'true'}),
						Opt({text: '[BY_RANK]', value: 'false'})
					]),
					Input({attribute: 'UnlockByRank', text: '[BY_RANK_LEVEL]'})
				])
			])
		]),
		Selectors([
			Selector({id: 'TRUCK_WHEELS', value: 'TruckWheels'}),
			Selector({id: 'TRUCK_TIRE', value: 'TruckWheels.TruckTires.TruckTire'}),
			Selector({id: 'TRUCK_TIRE_ITEM', value: '{TRUCK_TIRE}#every'}),
			Selector({id: 'WHEEL_FRICTION', value: '{TRUCK_TIRE_ITEM}.WheelFriction'}),
			Selector({id: 'GAME_DATA', value: '{TRUCK_TIRE_ITEM}.GameData'})
		])
	],
	systemData: {
		name: 'Wheels',
		author: 'VerZsuT',
		description: '[media]/classes/wheels/...',
		id: 4086480433,
		defaultState: 'enabled',
		type: 'system',
		selector: 'TruckWheels',
		version: '1.2'
	},
	translation: {
		3478485900: {
			"GENERAL_SETTINGS": "General",
			"DAMAGE_CAPACITY": "Damage capacity",
			"BODY_FRICTION": "Body friction",
			"BODY_FRICTION_ASPHALT": "Body friction asphalt",
			"SUBSTANCE_FRICTION": "Substance friction",
			"IS_IGNORE_ICE": "Rides on ice",
			"YES": "Yes",
			"NO": "No",
			"UNLOCK_GROUP_NAME": "Unlock",
			"PRICE": "Price",
			"BY_EXPLORATION": "Unlock method",
			"FIND_ON_MAP": "Find on map",
			"BY_RANK": "By rank",
			"BY_RANK_LEVEL": "Unlock level",
		},
		7081350102: {
			"GENERAL_SETTINGS": "Общие настройки",
			"DAMAGE_CAPACITY": "Прочность",
			"BODY_FRICTION": "Сцепление на бездорожье",
			"BODY_FRICTION_ASPHALT": "Сцепление на асфальте",
			"SUBSTANCE_FRICTION": "Сцепление в грязи",
			"IS_IGNORE_ICE": "Едет по льду",
			"YES": "Да",
			"NO": "Нет",
			"UNLOCK_GROUP_NAME": "Разблокировка",
			"PRICE": "Цена",
			"BY_EXPLORATION": "Способ разблокировки",
			"FIND_ON_MAP": "Найти на карте",
			"BY_RANK": "По достижению уровня",
			"BY_RANK_LEVEL": "Уровень разблокировки",
		},
		6042577539: {
			"GENERAL_SETTINGS": "Allgemeines",
			"DAMAGE_CAPACITY": "Schadenskapazität",
			"BODY_FRICTION": "Körperreibung",
			"BODY_FRICTION_ASPHALT": "Körperreibung asphalt",
			"SUBSTANCE_FRICTION": "Substanzreibung",
			"IS_IGNORE_ICE": "Fahrten auf Eis",
			"YES": "Ja",
			"NO": "Nein",
			"UNLOCK_GROUP_NAME": "Freischalten",
			"PRICE": "Preis",
			"BY_EXPLORATION": "Methode entsperren",
			"FIND_ON_MAP": "Auf Karte finden",
			"BY_RANK": "Nach Rang",
			"BY_RANK_LEVEL": "Level freischalten",
		}
	}
}

export default wheels
