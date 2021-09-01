import {
	Template,
	Group,
	Input,
	Select,
	Opt,
	Selectors,
	Selector
} from '../service/templateItems.js'

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
		RU: 'ID данных колёс',
		EN: 'Wheel data ID',
		DE: 'Rad-ID'
	},
	BodyFriction: {
		RU: 'Коэффициент сцепления на твёрдом грунте',
		EN: 'Coefficient of adhesion on solid ground',
		DE: 'Koeffizient der Haftung auf hartem Boden'
	},
	BodyFrictionAsphalt: {
		RU: 'Коэффициент сцепления на асфальте (статических камнях)',
		EN: 'Coefficient of adhesion on asphalt (static stones)',
		DE: 'Koeffizient der Haftung auf Asphalt (statische Steine)'
	},
	SubstanceFriction: {
		RU: 'Коэффициент сцепления в грязи',
		EN: 'Coefficient of grip in mud',
		DE: 'Koeffizient der Kupplung im Schlamm'
	},
	IsIgnoreIce: {
		RU: 'Будет ли колесо ехать по льду как цепное',
		EN: 'Will the wheel ride on the ice like a chain wheel',
		DE: 'Wird das Rad wie eine Kette auf dem Eis fahren'
	}
}

const wheels = {
	main: [
		Template({
			type: 'Multiply',
			itemSelector: '[TRUCK_TIRE]'
		}, [
			Group({
				nameType: 'Computed',
				nameSelector: '[TRUCK_TIRE_ITEM_TEXT]',
				resNameSelector: '[TRUCK_TIRE_ITEM]',
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				defaultSelector: '[WHEEL_FRICTION]'
			}, [
				Input({
					attribute: 'Name',
					text: '[ID]',
					type: 'text',
					onlyDeveloper: 'true',
					selector: 'TRUCK_TIRE_ITEM',
					desc: desc.Name
				}),
				Input({
					attribute: 'BodyFriction',
					text: '[BODY_FRICTION]',
					numberType: 'float',
					max: '10',
					bold: true,
					canAddTag: true,
					default: 1,
					desc: desc.BodyFriction
				}),
				Input({
					attribute: 'BodyFrictionAsphalt',
					text: '[BODY_FRICTION_ASPHALT]',
					numberType: 'float',
					max: '10',
					bold: true,
					canAddTag: true,
					default: 1,
					desc: desc.BodyFrictionAsphalt
				}),
				Input({
					attribute: 'SubstanceFriction',
					text: '[SUBSTANCE_FRICTION]',
					numberType: 'float',
					max: '10',
					bold: true,
					canAddTag: true,
					default: 1,
					desc: desc.SubstanceFriction
				}),
				Select({
					attribute: 'IsIgnoreIce',
					text: '[IS_IGNORE_ICE]',
					bold: true,
					canAddTag: true,
					default: 'false',
					desc: desc.IsIgnoreIce
				}, [
					Opt({
						text: '[YES]',
						value: 'true'
					}),
					Opt({
						text: '[NO]',
						value: 'false'
					})
				]),
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
			Selector({
				id: 'TRUCK_WHEELS',
				value: 'TruckWheels'
			}),
			Selector({
				id: 'TRUCK_TIRE',
				value: 'TruckWheels.TruckTires.TruckTire'
			}),
			Selector({
				id: 'TRUCK_TIRE_ITEM',
				value: '{TRUCK_TIRE}#every'
			}),
			Selector({
				id: 'TRUCK_TIRE_ITEM_TEXT',
				value: '{TRUCK_TIRE_ITEM}.GameData.UiDesc'
			}),
			Selector({
				id: 'WHEEL_FRICTION',
				value: '{TRUCK_TIRE_ITEM}.WheelFriction'
			}),
			Selector({
				id: 'GAME_DATA',
				value: '{TRUCK_TIRE_ITEM}.GameData'
			})
		])
	],
	selector: 'TruckWheels',
	translation: {
		EN: {
			ID: 'ID',
			GENERAL_SETTINGS: 'General',
			DAMAGE_CAPACITY: 'Damage capacity',
			BODY_FRICTION: 'Body friction',
			BODY_FRICTION_ASPHALT: 'Body friction asphalt',
			SUBSTANCE_FRICTION: 'Substance friction',
			IS_IGNORE_ICE: 'Rides on ice',
			YES: 'Yes',
			NO: 'No',
			UNLOCK_GROUP_NAME: 'Unlock',
			PRICE: 'Price',
			BY_EXPLORATION: 'Unlock method',
			FIND_ON_MAP: 'Find on map',
			BY_RANK: 'By rank',
			BY_RANK_LEVEL: 'Unlock level'
		},
		RU: {
			ID: 'ID',
			GENERAL_SETTINGS: 'Общие настройки',
			DAMAGE_CAPACITY: 'Прочность',
			BODY_FRICTION: 'Сцепление на бездорожье',
			BODY_FRICTION_ASPHALT: 'Сцепление на асфальте',
			SUBSTANCE_FRICTION: 'Сцепление в грязи',
			IS_IGNORE_ICE: 'Едет по льду',
			YES: 'Да',
			NO: 'Нет',
			UNLOCK_GROUP_NAME: 'Разблокировка',
			PRICE: 'Цена',
			BY_EXPLORATION: 'Способ разблокировки',
			FIND_ON_MAP: 'Найти на карте',
			BY_RANK: 'По достижению уровня',
			BY_RANK_LEVEL: 'Уровень разблокировки'
		},
		DE: {
			ID: 'ID',
			GENERAL_SETTINGS: 'Allgemeines',
			DAMAGE_CAPACITY: 'Schadenskapazität',
			BODY_FRICTION: 'Körperreibung',
			BODY_FRICTION_ASPHALT: 'Körperreibung asphalt',
			SUBSTANCE_FRICTION: 'Substanzreibung',
			IS_IGNORE_ICE: 'Fahrten auf Eis',
			YES: 'Ja',
			NO: 'Nein',
			UNLOCK_GROUP_NAME: 'Freischalten',
			PRICE: 'Preis',
			BY_EXPLORATION: 'Methode entsperren',
			FIND_ON_MAP: 'Auf Karte finden',
			BY_RANK: 'Nach Rang',
			BY_RANK_LEVEL: 'Level freischalten'
		}
	}
}

export default wheels
