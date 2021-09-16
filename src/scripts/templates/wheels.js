import {
	Template,
	Group,
	Input,
	Select,
	Opt,
	Selectors,
	Selector
} from '../service/templateItems.js';

export default {
	main: [
		Template({}, [
			Group({
				name: '[GENERAL]',
				defaultSelector: '[TRUCK_WHEELS]'
			}, [
				Input({
					attribute: 'DamageCapacity',
					type: 'number',
					text: '[DAMAGE_CAPACITY]',
					desc: '[DAMAGE_CAPACITY]',
					min: 0,
					max: 64000
				}),
				Input({
					attribute: 'Radius',
					type: 'number',
					numberType: 'float',
					text: '[RADIUS]',
					desc: '[RADIUS]',
					min: 0
				}),
				Input({
					attribute: 'Width',
					type: 'number',
					numberType: 'float',
					text: '[WIDTH]',
					desc: '[WIDTH]',
					min: 0
				})
			]),
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
						desc: '[NAME]',
						type: 'text',
						onlyDeveloper: 'true',
						selector: 'TRUCK_TIRE_ITEM'
					}),
					Input({
						attribute: 'BodyFriction',
						text: '[BODY_FRICTION]',
						desc: '[BODY_FRICTION]',
						numberType: 'float',
						max: 10,
						step: 0.1,
						bold: true,
						canAddTag: true,
						default: 1
					}),
					Input({
						attribute: 'BodyFrictionAsphalt',
						text: '[BODY_FRICTION_ASPHALT]',
						desc: '[BODY_FRICTION_ASPHALT]',
						numberType: 'float',
						max: 10,
						step: 0.1,
						bold: true,
						canAddTag: true,
						default: 1
					}),
					Input({
						attribute: 'SubstanceFriction',
						text: '[SUBSTANCE_FRICTION]',
						desc: '[SUBSTANCE_FRICTION]',
						numberType: 'float',
						max: 10,
						step: 0.1,
						bold: true,
						canAddTag: true,
						default: 1
					}),
					Select({
						attribute: 'IsIgnoreIce',
						text: '[IS_IGNORE_ICE]',
						desc: '[IS_IGNORE_ICE]',
						bold: true,
						canAddTag: true,
						default: 'false'
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
							desc: '[PRICE]',
							bold: true
						}),
						Select({
							attribute: 'UnlockByExploration',
							text: '[BY_EXPLORATION]',
							desc: '[UNLOCK_BY_EXPLORATION]',
							onlyDeveloper: true
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
							desc: '[UNLOCK_BY_RANK]',
							min: 1
						})
					])
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
	descriptions: {
		PRICE: {
			RU: 'Цена самого автомобиля (без учёта составляющих)',
			EN: 'Der Preis des Autos selbst (ohne die Komponenten)',
			DE: 'The price of the car itself (excluding components)'
		},
		DAMAGE_CAPACITY: {
			RU: 'Запас прочности колёс',
			EN: 'Wheel safety margin',
			DE: 'Sicherheitsmarge der Räder'
		},
		RADIUS: {
			RU: 'Базовый радиус колёс (без учёта изменения в файле конкретной машины)',
			EN: 'The base radius of the wheels (without taking into account changes in the file of a specific machine)',
			DE: 'Basisradius der Räder (ohne Änderungen in der Datei einer bestimmten Maschine)'
		},
		WIDTH: {
			RU: 'Ширина колёс. Также этот параметр определяет ширину следа и область налипания грязи на колесо',
			EN: 'The width of the wheels. This parameter also determines the width of the track and the area of dirt sticking to the wheel',
			DE: 'Breite der Räder. Dieser Parameter bestimmt auch die Breite der Spur und den Bereich, in dem sich Schmutz am Rad anhaftet'
		},
		UNLOCK_BY_EXPLORATION: {
			RU: 'Способ разблокировки автомобиля',
			EN: 'How to unlock the car',
			DE: 'Methode zum Entsperren des Autos'
		},
		UNLOCK_BY_RANK: {
			RU: 'Уровень разблокировки автомобиля',
			EN: 'Car Unlock Level',
			DE: 'Auto entsperren Ebene'
		},
		NAME: {
			RU: 'ID данных колёс',
			EN: 'Wheel data ID',
			DE: 'Rad-ID'
		},
		BODY_FRICTION: {
			RU: 'Коэффициент сцепления на твёрдом грунте',
			EN: 'Coefficient of adhesion on solid ground',
			DE: 'Koeffizient der Haftung auf hartem Boden'
		},
		BODY_FRICTION_ASPHALT: {
			RU: 'Коэффициент сцепления на асфальте (статических камнях)',
			EN: 'Coefficient of adhesion on asphalt (static stones)',
			DE: 'Koeffizient der Haftung auf Asphalt (statische Steine)'
		},
		SUBSTANCE_FRICTION: {
			RU: 'Коэффициент сцепления в грязи',
			EN: 'Coefficient of grip in mud',
			DE: 'Koeffizient der Kupplung im Schlamm'
		},
		IS_IGNORE_ICE: {
			RU: 'Будет ли колесо ехать по льду как цепное',
			EN: 'Will the wheel ride on the ice like a chain wheel',
			DE: 'Wird das Rad wie eine Kette auf dem Eis fahren'
		}
	},
	translations: {
		EN: {
			ID: 'ID',
			GENERAL: 'General',
			DAMAGE_CAPACITY: 'Damage capacity',
			WIDTH: 'Width',
			RADIUS: 'Radius',
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
			WIDTH: 'Ширина',
			RADIUS: 'Радиус',
			GENERAL: 'Общие настройки',
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
			WIDTH: 'Breite',
			RADIUS: 'Radius',
			GENERAL: 'Allgemeines',
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
};
