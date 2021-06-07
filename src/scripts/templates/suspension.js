import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'

const desc = {
	Price: {
		RU: 'Цена самого автомобиля (без учёта составляющих)',
		EN: 'Der Preis des Autos selbst (ohne die Komponenten)',
		DE: 'The price of the car itself (excluding components)'
	},
	UnlockByExporation: {
		RU: 'Способ разблокировки автомобиля',
		EN: 'How to unlock the car',
		DE: 'Methode zum Entsperren des Autos'
	},
	UnlockByRank: {
		RU: 'Уровень разблокировки автомобиля',
		EN: 'Car Unlock Level',
		DE: 'Auto entsperren Ebene'
	},
	Name: {
		RU: 'ID данной подвески',
		EN: 'ID of this suspension',
		DE: 'ID dieser Aufhängung'
	},
	CriticalDamageThreshold: {
		RU: 'Процент повреждения (процент = значение * 100), при котором подвеска будет проявлять признаки поломки',
		EN: 'The percentage of damage (percentage = value * 100) at which the suspension will show signs of failure',
		DE: 'Prozentsatz des Schadens (Prozent = Wert * 100), bei dem die Federung Anzeichen von Bruch zeigt'
	},
	DamageCapacity: {
		RU: 'Запас прочности данной подвески',
		EN: 'The safety margin of this suspension',
		DE: 'Sicherheitsmarge dieser Aufhängung'
	}
}

const suspension = {
	main: [
		Template({
			type: 'Multiply', 
			itemSelector: '[SUSPENSION_SET]'
		}, [
			Group({
				nameType: 'Computed', 
				nameSelector: '[SUSPENSION_SET_ITEM_TEXT]', 
				resNameSelector: '[SUSPENSION_SET_ITEM]', 
				nameAttribute: 'UiName', 
				resNameAttribute: 'Name', 
				defaultSelector: '[SUSPENSION_SET_ITEM]'
			}, [
				Input({
					attribute: 'Name', 
					text: '[ID]', 
					type: 'text', 
					onlyDeveloper: 'true',
					desc: desc.Name
				}),
				Input({
					attribute: 'CriticalDamageThreshold', 
					text: '[CRITICAL_DAMAGE_THRESHOLD]', 
					numberType: 'float', 
					max: '0.999',
					default: '0.7',
					desc: desc.CriticalDamageThreshold
				}),
				Input({
					attribute: 'DamageCapacity', 
					text: '[DAMAGE_CAPACITY]', 
					max: '64000', 
					default: 0,
					bold: true,
					desc: desc.DamageCapacity
				}),
				Group({
					name: '[UNLOCK_GROUP_NAME]', 
					defaultSelector: '[GAME_DATA]'
				}, [
					Input({
						attribute: 'Price', 
						text: '[PRICE]', 
						bold: true,
						desc: desc.Price
					}),
					Select({
						attribute: 'UnlockByExploration', 
						text: '[BY_EXPLORATION]', 
						onlyDeveloper: 'true',
						desc: desc.UnlockByExporation
					}, [
						Opt({
							text: '[FIND_ON_MAP]', 
							value: 'true'
						}),
						Opt({
							text: '[BY_RANK]', 
							value: 'false'
						})
					]),
					Input({
						attribute: 'UnlockByRank', 
						text: '[BY_RANK_LEVEL]', 
						min: 1,
						desc: desc.UnlockByRank
					})
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
			ID: 'ID',
			CRITICAL_DAMAGE_THRESHOLD: 'Critical damage threshold',
			DAMAGE_CAPACITY: 'Damage capacity',
			UNLOCK_GROUP_NAME: 'Unlock',
			PRICE: 'Price',
			BY_EXPLORATION: 'Unlock method',
			FIND_ON_MAP: 'Find on map',
			BY_RANK: 'By rank',
			BY_RANK_LEVEL: 'Unlock level'
		},
		RU: {
			ID: 'ID',
			CRITICAL_DAMAGE_THRESHOLD: 'Порог критического повреждения',
			DAMAGE_CAPACITY: 'Прочность',
			UNLOCK_GROUP_NAME: 'Разблокировка',
			PRICE: 'Цена',
			BY_EXPLORATION: 'Способ разблокировки',
			FIND_ON_MAP: 'Найти на карте',
			BY_RANK: 'По достижению уровня',
			BY_RANK_LEVEL: 'Уровень разблокировки'
		},
		DE: {
			ID: 'ID',
			CRITICAL_DAMAGE_THRESHOLD: 'Kritische Schadensschwelle',
			DAMAGE_CAPACITY: 'Schadenskapazität',
			UNLOCK_GROUP_NAME: 'Freischalten',
			PRICE: 'Preis',
			BY_EXPLORATION: 'Methode entsperren',
			FIND_ON_MAP: 'Auf Karte finden',
			BY_RANK: 'Nach Rang',
			BY_RANK_LEVEL: 'Level freischalten'
		}
	}
}

export default suspension
