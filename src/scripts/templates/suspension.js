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
					desc: '[NAME]',
					type: 'text',
					onlyDeveloper: true
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
					default: 0,
					bold: true
				}),
				Template({
					type: 'Multiply',
					itemSelector: '[SUSPENSION]'
				}, [
					Group({
						name: '[SUSPENSION]',
						defaultSelector: '[SUSPENSION_ITEM]',
						withCounter: true
					}, [
						Select({
							attribute: 'WheelType',
							text: '[WHEEL_TYPE]',
							desc: '[WHEEL_TYPE]'
						}, [
							Opt({
								text: '[FRONT]',
								value: 'front'
							}),
							Opt({
								text: '[REAR]',
								value: 'rear'
							})
						]),
						Input({
							attribute: 'Height',
							type: 'number',
							numberType: 'float',
							text: '[HEIGHT]',
							desc: '[HEIGHT]',
							min: -1000,
							max: 1000
						}),
						Input({
							attribute: 'Strength',
							type: 'number',
							numberType: 'float',
							text: '[STRENGTH]',
							desc: '[STRENGTH]'
						}),
						Input({
							attribute: 'Damping',
							type: 'number',
							numberType: 'float',
							text: '[DAMPING]',
							desc: '[DAMPING]',
							min: 0,
							max: 1000
						}),
						Input({
							attribute: 'SuspensionMin',
							type: 'number',
							numberType: 'float',
							text: '[SUSPENSION_MIN]',
							desc: '[SUSPENSION_MIN]',
							min: -1000,
							max: 1000
						}),
						Input({
							attribute: 'SuspensionMax',
							type: 'number',
							numberType: 'float',
							text: '[SUSPENSION_MAX]',
							desc: '[SUSPENSION_MAX]',
							min: -1000,
							max: 1000,
							default: 1
						}),
						Input({
							attribute: 'BrokenSuspensionMax',
							type: 'number',
							numberType: 'float',
							text: '[BROKEN_SUSPENSION_MAX]',
							desc: '[BROKEN_SUSPENSION_MAX]',
							min: -1000,
							max: 1000
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
						onlyDeveloper: 'true'
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
				id: 'SUSPENSION_SET',
				value: 'SuspensionSetVariants.SuspensionSet'
			}),
			Selector({
				id: 'SUSPENSION_SET_ITEM',
				value: '{SUSPENSION_SET}#every'
			}),
			Selector({
				id: 'SUSPENSION_SET_ITEM_TEXT',
				value: '{SUSPENSION_SET_ITEM}.GameData.UiDesc'
			}),
			Selector({
				id: 'SUSPENSION',
				value: '{SUSPENSION_SET_ITEM}.Suspension'
			}),
			Selector({
				id: 'SUSPENSION_ITEM',
				value: '{SUSPENSION}#every(2)'
			}),
			Selector({
				id: 'GAME_DATA',
				value: '{SUSPENSION_SET_ITEM}.GameData'
			})
		])
	],
	selector: 'SuspensionSetVariants',
	descriptions: {
		PRICE: {
			RU: 'Цена самого автомобиля (без учёта составляющих)',
			EN: 'Der Preis des Autos selbst (ohne die Komponenten)',
			DE: 'The price of the car itself (excluding components)'
		},
		WHEEL_TYPE: {
			RU: 'Тип колеса, к которому будет применены параметры',
			EN: 'The type of wheel to which the parameters will be applied',
			DE: 'Der Radtyp, auf den die Parameter angewendet werden sollen'
		},
		SUSPENSION_MIN: {
			RU: 'Минимальный ход подвески (позиция, которую колесо может принять при полной просадке подвески).',
			EN: 'The minimum suspension stroke (the position that the wheel can take when the suspension is completely sagged).',
			DE: 'Minimaler Federweg (die Position, die das Rad nehmen kann, wenn die Federung vollständig Drawdown).'
		},
		SUSPENSION_MAX: {
			RU: 'Максимальный ход подвески (позиция, которую может принять колесо, если подвеска в рабочем состоянии и ее жесткость равна нулю, когда колесо висит в воздухе).',
			EN: 'Maximum suspension travel (the position that the wheel can take if the suspension is in working condition and its stiffness is zero when the wheel is hanging in the air)',
			DE: 'Maximaler Federweg (die Position, die das Rad nehmen kann, wenn die Federung in Betrieb ist und ihre Steifigkeit Null ist, wenn das Rad in der Luft hängt)'
		},
		BROKEN_SUSPENSION_MAX: {
			RU: 'Максимальный ход сломанной подвески.',
			EN: 'The maximum stroke of the broken suspension.',
			DE: 'Maximaler Hub der gebrochenen Federung.'
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
			RU: 'ID данной подвески',
			EN: 'ID of this suspension',
			DE: 'ID dieser Aufhängung'
		},
		CRITICAL_DAMAGE_THRESHOLD: {
			RU: 'Процент повреждения (процент = значение * 100), при котором подвеска будет проявлять признаки поломки',
			EN: 'The percentage of damage (percentage = value * 100) at which the suspension will show signs of failure',
			DE: 'Prozentsatz des Schadens (Prozent = Wert * 100), bei dem die Federung Anzeichen von Bruch zeigt'
		},
		DAMAGE_CAPACITY: {
			RU: 'Запас прочности данной подвески',
			EN: 'The safety margin of this suspension',
			DE: 'Sicherheitsmarge dieser Aufhängung'
		}
	},
	translations: {
		EN: {
			ID: 'ID',
			WHEEL_TYPE: 'Wheel type',
			FRONT: 'Front',
			REAR: 'Rear',
			HEIGHT: 'Height',
			STRENGTH: 'Strength',
			DAMPING: 'Damping',
			SUSPENSION_MIN: 'Minimum suspension height',
			SUSPENSION_MAX: 'Maximum suspension height',
			BROKEN_SUSPENSION_MAX: 'Minimum suspension height in broken condition',
			SUSPENSION: 'Suspension',
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
			FRONT: 'Переднее',
			REAR: 'Заднее',
			WHEEL_TYPE: 'Тип колеса',
			HEIGHT: 'Высота',
			STRENGTH: 'Жёсткость',
			DAMPING: 'Затухание',
			SUSPENSION_MIN: 'Минимальная высота подвески',
			SUSPENSION_MAX: 'Максимальная высота подвески',
			BROKEN_SUSPENSION_MAX: 'Максимальная высота подвески (когда сломана)',
			SUSPENSION: 'Подвеска',
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
			FRONT: 'Front',
			REAR: 'Hinter',
			WHEEL_TYPE: 'Rad-Typ',
			HEIGHT: 'Höhe',
			STRENGTH: 'Stärke',
			DAMPING: 'Dämpfung',
			SUSPENSION_MIN: 'Minimale Aufhängungshöhe',
			SUSPENSION_MAX: 'Maximale Aufhängungshöhe',
			BROKEN_SUSPENSION_MAX: 'Minimale Aufhängungshöhe in gebrochenem Zustand',
			SUSPENSION: 'Aussetzung',
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
};
