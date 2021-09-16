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
		Template({
			type: 'Multiply',
			itemSelector: '[GEARBOX]'
		}, [
			Group({
				nameType: 'Computed',
				nameSelector: '[GEARBOX_ITEM_TEXT]',
				resNameSelector: '[GEARBOX_ITEM]',
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				defaultSelector: '[GEARBOX_ITEM]'
			}, [
				Input({
					attribute: 'Name',
					text: '[ID]',
					desc: '[NAME]',
					type: 'text',
					onlyDeveloper: true
				}),
				Input({
					attribute: 'AWDConsumptionModifier',
					text: '[AWD_CONSUMPTION_MODIFIER]',
					desc: '[AWD_CONSUMPTION_MODIFIER]',
					numberType: 'float',
					max: 32,
					step: 0.1,
					default: 1
				}),
				Input({
					attribute: 'CriticalDamageThreshold',
					text: '[CRITICAL_DAMAGE_THRESHOLD]',
					desc: '[CRITICAL_DAMAGE_THRESHOLD]',
					numberType: 'float',
					max: 0.99,
					step: 0.01,
					default: 0.7
				}),
				Input({
					attribute: 'DamageCapacity',
					text: '[DAMAGE_CAPACITY]',
					desc: '[DAMAGE_CAPACITY]',
					max: 64000,
					bold: true,
					default: 0
				}),
				Input({
					attribute: 'DamagedConsumptionModifier',
					text: '[DAMAGE_CONSUMPTION_MODIFIER]',
					desc: '[DAMAGED_CONSUMPTION_MODIFIER]',
					numberType: 'float',
					max: 32,
					step: 0.01,
					default: 1
				}),
				Input({
					attribute: 'FuelConsumption',
					text: '[FUEL_CONSUMPTION]',
					desc: '[FUEL_CONSUMPTION]',
					numberType: 'float',
					max: 10,
					step: 0.1,
					bold: true,
					default: 0.1
				}),
				Input({
					attribute: 'IdleFuelModifier',
					text: '[IDLE_FUEL_CONSUMPTION]',
					desc: '[IDLE_FUEL_CONSUMPTION]',
					numberType: 'float',
					max: 10,
					step: 0.1,
					default: 0.3
				}),
				Group({
					name: '[GEARBOX_PARAMS]',
					defaultSelector: '[GEARBOX_PARAMS]'
				}, [
					Select({
						attribute: 'IsHighGearExists',
						text: '[HIGH_GEAR]',
						desc: '[IS_HIGH_GEAR_EXISTS]',
						default: 'true'
					}, [
						Opt({
							text: '[ALLOW]',
							value: 'true'
						}),
						Opt({
							text: '[NOT_ALLOW]',
							value: 'false'
						})
					]),
					Select({
						attribute: 'IsLowerGearExists',
						text: '[LOWER_GEAR]',
						desc: '[IS_LOWER_GEAR_EXISTS]',
						default: 'true'
					}, [
						Opt({
							text: '[ALLOW]',
							value: 'true'
						}),
						Opt({
							text: '[NOT_ALLOW]',
							value: 'false'
						})
					]),
					Select({
						attribute: 'IsLowerPlusGearExists',
						text: '[LOWER_PLUS_GEAR]',
						desc: '[IS_LOWER_PLUS_GEAR_EXISTS]',
						default: 'true'
					}, [
						Opt({
							text: '[ALLOW]',
							value: 'true'
						}),
						Opt({
							text: '[NOT_ALLOW]',
							value: 'false'
						})
					]),
					Select({
						attribute: 'IsLowerMinusGearExists',
						text: '[LOWER_MINUS_GEAR]',
						desc: '[IS_LOWER_MINUS_GEAR_EXISTS]',
						default: 'true'
					}, [
						Opt({
							text: '[ALLOW]',
							value: 'true'
						}),
						Opt({
							text: '[NOT_ALLOW]',
							value: 'false'
						})
					])
				]),
				Group({
					name: '[REVERCE_GEAR]',
					defaultSelector: '[REVERSE_GEAR]'
				}, [
					Input({
						attribute: 'AngVel',
						text: '[ANGEL_VELOCITY]',
						desc: '[ANGEL_VELOCITY]',
						numberType: 'float',
						max: 32,
						step: 1,
						bold: true,
						default: 0
					}),
					Input({
						attribute: 'FuelModifier',
						text: '[FUEL_MODIFIER]',
						desc: '[FUEL_MODIFIER]',
						numberType: 'float',
						max: 10,
						step: 0.1,
						default: 1
					})
				]),
				Group({
					name: '[HIGH_GEAR]',
					defaultSelector: '[HIGH_GEAR]'
				}, [
					Input({
						attribute: 'AngVel',
						text: '[ANGEL_VELOCITY]',
						desc: '[ANGEL_VELOCITY]',
						numberType: 'float',
						max: 32,
						step: 1,
						bold: true,
						default: 0
					}),
					Input({
						attribute: 'FuelModifier',
						text: '[FUEL_MODIFIER]',
						desc: '[FUEL_MODIFIER]',
						numberType: 'float',
						max: 10,
						step: 0.1,
						default: 1
					})
				]),
				Template({
					type: 'Multiply',
					itemSelector: '[GEAR]'
				}, [
					Group({
						name: '[GEAR]',
						defaultSelector: '[GEAR_ITEM]',
						withCounter: 'true'
					}, [
						Input({
							attribute: 'AngVel',
							text: '[ANGEL_VELOCITY]',
							desc: '[ANGEL_VELOCITY]',
							numberType: 'float',
							max: 32,
							step: 1,
							bold: true,
							default: 0
						}),
						Input({
							attribute: 'FuelModifier',
							text: '[FUEL_MODIFIER]',
							desc: '[FUEL_MODIFIER]',
							numberType: 'float',
							max: 10,
							step: 0.1,
							default: 1
						})
					])
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
		]),
		Selectors([
			Selector({
				id: 'GEARBOX',
				value: 'GearboxVariants.Gearbox'
			}),
			Selector({
				id: 'GEARBOX_ITEM',
				value: '{GEARBOX}#every'
			}),
			Selector({
				id: 'GEARBOX_ITEM_TEXT',
				value: '{GEARBOX_ITEM}.GameData.UiDesc'
			}),
			Selector({
				id: 'GEAR',
				value: '{GEARBOX}#every.Gear'
			}),
			Selector({
				id: 'REVERSE_GEAR',
				value: '{GEARBOX_ITEM}.ReverseGear'
			}),
			Selector({
				id: 'HIGH_GEAR',
				value: '{GEARBOX_ITEM}.HighGear'
			}),
			Selector({
				id: 'GEAR_ITEM',
				value: '{GEAR}#every(2)'
			}),
			Selector({
				id: 'GAME_DATA',
				value: '{GEARBOX_ITEM}.GameData'
			}),
			Selector({
				id: 'GEARBOX_PARAMS',
				value: '{GAME_DATA}.GearboxParams'
			})
		])
	],
	selector: 'GearboxVariants',
	descriptions: {
		PRICE: {
			RU: 'Цена самого автомобиля (без учёта составляющих)',
			EN: 'Der Preis des Autos selbst (ohne die Komponenten)',
			DE: 'The price of the car itself (excluding components)'
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
			RU: 'ID данной коробки передач',
			EN: 'ID of this gearbox',
			DE: 'ID dieses Getriebes'
		},
		AWD_CONSUMPTION_MODIFIER: {
			RU: 'Коэффициент изменения расхода топлива при использовании полного привода',
			EN: 'Coefficient of change in fuel consumption when using all-wheel drive',
			DE: 'Der Faktor der Veränderung des Kraftstoffverbrauchs bei der Nutzung des Allradantriebs'
		},
		CRITICAL_DAMAGE_THRESHOLD: {
			RU: 'Процент повреждений (значение * 100 = процент), после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива',
			EN: 'The percentage of damage (value * 100 = percentage), after which the box begins to show signs of failure - flying gears and increased fuel consumption',
			DE: 'Prozentsatz des Schadens (Wert * 100 = Prozent), nach dem die Box beginnt, Anzeichen von Bruch zu zeigen-fliegende Getriebe und erhöhter Kraftstoffverbrauch'
		},
		DAMAGE_CAPACITY: {
			RU: 'Запас прочности данной коробки передач',
			EN: 'The safety margin of this gearbox',
			DE: 'Sicherheitsfaktor dieses Getriebes'
		},
		DAMAGED_CONSUMPTION_MODIFIER: {
			RU: 'Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана.',
			EN: 'The maximum fuel consumption multiplier, to this multiplier the fuel consumption comes when the box is completely broken.',
			DE: 'Der maximale Kraftstoffverbrauch Multiplikator, zu diesem Verbrauch Multiplikator kommt, wenn die Box vollständig gebrochen ist.'
		},
		FUEL_CONSUMPTION: {
			RU: 'Базовое потребление топлива коробкой передач',
			EN: 'Basic fuel consumption of the gearbox',
			DE: 'Der standardverbrauch von Kraftstoff Getriebe'
		},
		IDLE_FUEL_CONSUMPTION: {
			RU: 'Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем.',
			EN: 'The fuel consumption multiplier when the car is stationary with the engine running.',
			DE: 'Multiplikator des Kraftstoffverbrauchs, wenn das Auto stillsteht mit dem laufenden Motor.'
		},
		IS_HIGH_GEAR_EXISTS: {
			RU: 'Есть ли повышенная передача в коробке передач',
			EN: 'Is there an upshift in the gearbox',
			DE: 'Gibt es ein erhöhtes Getriebe im Getriebe'
		},
		IS_LOWER_GEAR_EXISTS: {
			RU: 'Есть ли пониженная передача в коробке передач',
			EN: 'Is there a downshift in the gearbox',
			DE: 'Gibt es ein reduziertes Getriebe im Getriebe'
		},
		IS_LOWER_PLUS_GEAR_EXISTS: {
			RU: 'Есть ли пониженная+ передача в коробке передач',
			EN: 'Is there a downshift+ in the gearbox',
			DE: 'Gibt es ein reduziertes+ Getriebe im Getriebe'
		},
		IS_LOWER_MINUS_GEAR_EXISTS: {
			RU: 'Есть ли повышенная+ передача в коробке передач',
			EN: 'Is there an upshift+ in the gearbox',
			DE: 'Gibt es ein erhöhte+s Getriebe im Getriebe'
		},
		ANGEL_VELOCITY: {
			RU: 'Максимальная угловая скорость колеса',
			EN: 'Maximum angular velocity of the wheel',
			DE: 'Maximale Winkelgeschwindigkeit des Rades'
		},
		FUEL_MODIFIER: {
			RU: 'Множитель потребления топлива на данной передаче',
			EN: 'Fuel consumption multiplier in this gear',
			DE: 'Multiplikator des Kraftstoffverbrauchs in diesem Getriebe'
		}
	},
	translations: {
		EN: {
			ID: 'ID',
			AWD_CONSUMPTION_MODIFIER: 'AWD consumption modifier',
			CRITICAL_DAMAGE_THRESHOLD: 'Critical damage threshold',
			DAMAGE_CAPACITY: 'Damage capacity',
			DAMAGE_CONSUMPTION_MODIFIER: 'Damage consumption modifier',
			FUEL_CONSUMPTION: 'Fuel consumption',
			IDLE_FUEL_CONSUMPTION: 'IDLE fuel consumption',
			GEARBOX_PARAMS: 'Gears availability',
			HIGH_GEAR: 'High gear',
			ALLOW: 'Available',
			NOT_ALLOW: 'Not Available',
			LOWER_GEAR: 'Lower gear',
			LOWER_PLUS_GEAR: 'Lower+',
			LOWER_MINUS_GEAR: 'Lower-',
			REVERCE_GEAR: 'Reverce gear',
			ANGEL_VELOCITY: 'Max wheel angular velocity',
			FUEL_MODIFIER: 'Fuel modifier',
			GEAR: 'Gear',
			UNLOCK_GROUP_NAME: 'Unlock',
			PRICE: 'Price',
			BY_EXPLORATION: 'Unlock method',
			FIND_ON_MAP: 'Find on map',
			BY_RANK: 'By rank',
			BY_RANK_LEVEL: 'Unlock level'
		},
		RU: {
			ID: 'ID',
			AWD_CONSUMPTION_MODIFIER: 'Модификатор потребления топлива при полном приводе',
			CRITICAL_DAMAGE_THRESHOLD: 'Порог критического повреждения',
			DAMAGE_CAPACITY: 'Прочность',
			DAMAGE_CONSUMPTION_MODIFIER: 'Множитель потребления топлива при повреждении',
			FUEL_CONSUMPTION: 'Потребление топлива',
			IDLE_FUEL_CONSUMPTION: 'Множитель потребления топлива в бездействии',
			GEARBOX_PARAMS: 'Наличие передач',
			HIGH_GEAR: 'Повышенная передача',
			ALLOW: 'Доступно',
			NOT_ALLOW: 'Недоступно',
			LOWER_GEAR: 'Пониженная передача',
			LOWER_PLUS_GEAR: 'Пониженная+',
			LOWER_MINUS_GEAR: 'Пониженная-',
			REVERCE_GEAR: 'Задняя передача',
			ANGEL_VELOCITY: 'Макс. угловая скорость колеса',
			FUEL_MODIFIER: 'Модификатор потребления топлива',
			GEAR: 'Передача',
			UNLOCK_GROUP_NAME: 'Разблокировка',
			PRICE: 'Цена',
			BY_EXPLORATION: 'Способ разблокировки',
			FIND_ON_MAP: 'Найти на карте',
			BY_RANK: 'По достижению уровня',
			BY_RANK_LEVEL: 'Уровень разблокировки'
		},
		DE: {
			ID: 'ID',
			AWD_CONSUMPTION_MODIFIER: 'AWD-Verbrauchsmodifikator',
			CRITICAL_DAMAGE_THRESHOLD: 'Kritische Schadensschwelle',
			DAMAGE_CAPACITY: 'Schadenskapazität',
			DAMAGE_CONSUMPTION_MODIFIER: 'Schadensverbrauchsmodifikator',
			FUEL_CONSUMPTION: 'Kraftstoffverbrauch',
			IDLE_FUEL_CONSUMPTION: 'Leerlaufverbrauch',
			GEARBOX_PARAMS: 'Zahnräder Verfügbarkeit',
			HIGH_GEAR: 'Hoher Gang',
			ALLOW: 'Verfügbar',
			NOT_ALLOW: 'Nicht verfügbar',
			LOWER_GEAR: 'Unterer Gang',
			LOWER_PLUS_GEAR: 'Unterer+',
			LOWER_MINUS_GEAR: 'Unterer-',
			REVERCE_GEAR: 'Rückwärtsgang',
			ANGEL_VELOCITY: 'Winkelgeschwindigkeit',
			FUEL_MODIFIER: 'Kraftstoffmodifikator',
			GEAR: 'Gang',
			UNLOCK_GROUP_NAME: 'Freischalten',
			PRICE: 'Preis',
			BY_EXPLORATION: 'Methode entsperren',
			FIND_ON_MAP: 'Auf Karte finden',
			BY_RANK: 'Nach Rang',
			BY_RANK_LEVEL: 'Level freischalten'
		}
	}
};
