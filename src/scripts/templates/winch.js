import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'
const whinch = {
	main: [
		Template({type: 'Multiply', itemSelector: '[WINCH]'}, [
			Group({nameType: 'Computed', nameSelector: '[WINCH_ITEM]', nameAttribute: 'Name', defaultSelector: '[WINCH_ITEM]'}, [
				Input({attribute: 'Length', text: '[LENGTH]', min: '0.0', max: '100.0'}),
				Input({attribute: 'StrengthMult', text: '[STRENGTH]', min: '0.0', max: '10.0'}),
				Select({attribute: 'IsEngineIgnitionRequired', text: '[IS_ENGINE_IGNITION_REQUIRED]'}, [
					Opt({text: '[ENGINE]', value: 'true'}),
					Opt({text: '[BATTERY]', value: 'false'})
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
			Selector({id: 'WINCH', value: 'WinchVariants.Winch'}),
			Selector({id: 'WINCH_ITEM', value: '{WINCH}#every'}),
			Selector({id: 'GAME_DATA', value: '{WINCH_ITEM}.GameData'})
		])
	],
	selector: 'WinchVariants',
	translation: {
		EN: {
			"LENGTH": "Length",
			"STRENGTH": "Strength",
			"IS_ENGINE_IGNITION_REQUIRED": "Works from",
			"ENGINE": "Engine",
			"BATTERY": "Battery",
			"UNLOCK_GROUP_NAME": "Unlock",
			"PRICE": "Price",
			"BY_EXPLORATION": "Unlock method",
			"FIND_ON_MAP": "Find on map",
			"BY_RANK": "By rank",
			"BY_RANK_LEVEL": "Unlock level",
		},
		RU: {
			"LENGTH": "Длина",
			"STRENGTH": "Сила",
			"IS_ENGINE_IGNITION_REQUIRED": "Работает от",
			"ENGINE": "Двигатель",
			"BATTERY": "Аккумулятора",
			"UNLOCK_GROUP_NAME": "Разблокировка",
			"PRICE": "Цена",
			"BY_EXPLORATION": "Способ разблокировки",
			"FIND_ON_MAP": "Найти на карте",
			"BY_RANK": "По достижению уровня",
			"BY_RANK_LEVEL": "Уровень разблокировки",
		},
		DE: {
			"LENGTH": "Länge",
			"STRENGTH": "Stärke",
			"IS_ENGINE_IGNITION_REQUIRED": "Arbeitet von",
			"ENGINE": "Motor",
			"BATTERY": "Batterie",
			"UNLOCK_GROUP_NAME": "Freischalten",
			"PRICE": "Preis",
			"BY_EXPLORATION": "Methode entsperren",
			"FIND_ON_MAP": "Auf Karte finden",
			"BY_RANK": "Nach Rang",
			"BY_RANK_LEVEL": "Level freischalten",
		}
	}
}

export default whinch
