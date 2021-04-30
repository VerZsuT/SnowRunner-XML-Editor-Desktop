import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'
const suspension = {
	main: [
		Template({type: 'Multiply', itemSelector: '[SUSPENSION_SET]'}, [
			Group({nameType: 'Computed', nameSelector: '[SUSPENSION_SET_ITEM_TEXT]', resNameSelector: '[SUSPENSION_SET_ITEM]', nameAttribute: 'UiName', resNameAttribute: 'Name', defaultSelector: '[SUSPENSION_SET_ITEM]'}, [
				Input({attribute: 'Name', text: '[ID]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'CriticalDamageThreshold', text: '[CRITICAL_DAMAGE_THRESHOLD]', numberType: 'float', max: '0.999'}),
				Input({attribute: 'DamageCapacity', text: '[DAMAGE_CAPACITY]', max: '64000', bold: true}),
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
			Selector({id: 'SUSPENSION_SET', value: 'SuspensionSetVariants.SuspensionSet'}),
			Selector({id: 'SUSPENSION_SET_ITEM', value: '{SUSPENSION_SET}#every'}),
			Selector({id: 'SUSPENSION_SET_ITEM_TEXT', value: '{SUSPENSION_SET_ITEM}.GameData.UiDesc'}),
			Selector({id: 'GAME_DATA', value: '{SUSPENSION_SET_ITEM}.GameData'})
		])
	],
	selector: 'SuspensionSetVariants',
	translation: {
		EN: {
			"ID": "ID",
			"CRITICAL_DAMAGE_THRESHOLD": "Critical damage threshold",
			"DAMAGE_CAPACITY": "Damage capacity",
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
			"UNLOCK_GROUP_NAME": "Freischalten",
			"PRICE": "Preis",
			"BY_EXPLORATION": "Methode entsperren",
			"FIND_ON_MAP": "Auf Karte finden",
			"BY_RANK": "Nach Rang",
			"BY_RANK_LEVEL": "Level freischalten",
		}
	}
}

export default suspension
