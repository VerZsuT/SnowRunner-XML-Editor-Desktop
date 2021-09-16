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
			itemSelector: '[ENGINE]'
		}, [
			Group({
				nameType: 'Computed',
				nameSelector: '[ENGINE_ITEM_TEXT]',
				resNameSelector: '[ENGINE_ITEM]',
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				defaultSelector: '[ENGINE_ITEM]'
			}, [
				Input({
					attribute: 'Name',
					text: '[ID]',
					desc: '[NAME]',
					type: 'text',
					onlyDeveloper: 'true'
				}),
				Input({
					attribute: 'CriticalDamageThreshold',
					text: '[CRITICAL_DAMAGE_THRESHOLD]',
					desc: '[CRITICAL_DAMAGE_THRESHOLD]',
					numberType: 'float',
					default: 0.7,
					step: 0.01,
					max: 0.99
				}),
				Input({
					attribute: 'DamageCapacity',
					text: '[DAMAGE_CAPACITY]',
					desc: '[DAMAGE_CAPACITY]',
					max: 64000,
					step: 1,
					default: 0,
					bold: true
				}),
				Input({
					attribute: 'DamagedConsumptionModifier',
					text: '[DAMAGE_CONSUMPTION_MODIFIER]',
					desc: '[DAMAGE_CONSUMPTION_MODIFIER]',
					numberType: 'float',
					min: 0.1,
					step: 0.1,
					max: 32,
					default: 1
				}),
				Input({
					attribute: 'EngineResponsiveness',
					text: '[RESPONSIVENESS]',
					desc: '[ENGINE_RESPONSIVENESS]',
					numberType: 'float',
					max: 1,
					step: 0.01,
					default: 0.04
				}),
				Input({
					attribute: 'FuelConsumption',
					text: '[FUEL_CONSUMPTION]',
					desc: '[FUEL_CONSUMPTION]',
					numberType: 'float',
					max: 100.0,
					step: 0.1,
					bold: true,
					default: 0.5
				}),
				Input({
					attribute: 'Torque',
					text: '[TORQUE]',
					desc: '[TORQUE]',
					max: 1000000,
					step: 100,
					bold: true,
					default: 0
				}),
				Input({
					attribute: 'DamagedMinTorqueMultiplier',
					text: '[DAMAGED_MIN_TORQUE_MODIFIER]',
					desc: '[DAMAGED_MIN_TORQUE_MODIFIER]',
					numberType: 'float',
					min: 0,
					step: 0.01,
					max: 1,
					default: 0
				}),
				Input({
					attribute: 'DamagedMaxTorqueMultiplier',
					text: '[DAMAGED_MAX_TORQUE_MODIFIER]',
					desc: '[DAMAGED_MAX_TORQUE_MODIFIER]',
					numberType: 'float',
					min: 0,
					step: 0.01,
					max: 1,
					default: 0
				}),
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
				id: 'ENGINE',
				value: 'EngineVariants.Engine'
			}),
			Selector({
				id: 'ENGINE_ITEM',
				value: '{ENGINE}#every'
			}),
			Selector({
				id: 'ENGINE_ITEM_TEXT',
				value: '{ENGINE_ITEM}.GameData.UiDesc'
			}),
			Selector({
				id: 'GAME_DATA',
				value: '{ENGINE}#every.GameData'
			})
		])
	],
	selector: 'EngineVariants',
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
			RU: 'ID данного двигателя',
			EN: 'ID of this engine',
			DE: 'ID dieses Motors'
		},
		CRITICAL_DAMAGE_THRESHOLD: {
			RU: 'Порог повреждения (значение * 100 = процент), при котором двигатель будет вести себя как сломанный.',
			EN: 'The damage threshold (value * 100 = percentage) at which the engine will behave as broken.',
			DE: 'Die Schadensschwelle (Wert * 100 = Prozent), bei der sich der Motor als defekt verhält.'
		},
		DAMAGE_CAPACITY: {
			RU: 'Запас прочности данного двигателя.',
			EN: 'The safety margin of this engine.',
			DE: 'Die Sicherheitsmarge dieses Motors.'
		},
		DAMAGE_CONSUMPTION_MODIFIER: {
			RU: 'Множитель потребления топлива в сломанном состоянии',
			EN: 'Fuel consumption modifier in the damaged state',
			DE: 'Modifikator des Kraftstoffverbrauchs in beschädigtem Zustand'
		},
		ENGINE_RESPONSIVENESS: {
			RU: 'Скорость набора оборотов двигателя',
			EN: 'Engine speed set',
			DE: 'Motordrehzahl'
		},
		FUEL_CONSUMPTION: {
			RU: 'Множитель потребления топлива двигателя.',
			EN: 'The multiplier of the engine fuel consumption.',
			DE: 'Multiplikator des Kraftstoffverbrauchs des Motors.'
		},
		TORQUE: {
			RU: 'Мощность данного двигателя',
			EN: 'Power of this engine',
			DE: 'Leistung dieses Motors'
		},
		DAMAGED_MIN_TORQUE_MODIFIER: {
			RU: 'Множитель мощности, когда ущерб движка достиг порога CriticalDamageThresold',
			EN: 'Power multiplier when engine damage has reached the CriticalDamageThresold threshold',
			DE: 'Leistungsmultiplikator, wenn der Motorschaden den CriticalDamageThresold-Schwellenwert erreicht hat'
		},
		DAMAGED_MAX_TORQUE_MODIFIER: {
			RU: 'Множитель мощности, когда движок близок к полной поломке',
			EN: 'Power multiplier when the engine is close to complete failure',
			DE: 'Leistungsmultiplikator, wenn der Motor kurz vor einem Totalausfall steht'
		}
	},
	translations: {
		EN: {
			ID: 'ID',
			CRITICAL_DAMAGE_THRESHOLD: 'Critical damage threshold',
			DAMAGE_CAPACITY: 'Damage capacity',
			DAMAGE_CONSUMPTION_MODIFIER: 'Damage consumption modifier',
			RESPONSIVENESS: 'Responsiveness',
			FUEL_CONSUMPTION: 'Fuel consumption',
			TORQUE: 'Torque',
			DAMAGED_MIN_TORQUE_MODIFIER: 'Damaged min torque modifier',
			DAMAGED_MAX_TORQUE_MODIFIER: 'Damaged max torque modifier',
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
			DAMAGE_CONSUMPTION_MODIFIER: 'Множитель потребления топлива при повреждении',
			RESPONSIVENESS: 'Отзывчивость',
			FUEL_CONSUMPTION: 'Потребление топлива',
			TORQUE: 'Крутящий момент',
			DAMAGED_MIN_TORQUE_MODIFIER: 'Минимальный множитель мощности при повреждении',
			DAMAGED_MAX_TORQUE_MODIFIER: 'Максимальный множитель мощности при повреждении',
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
			DAMAGE_CONSUMPTION_MODIFIER: 'Schadensverbrauchsmodifikator',
			RESPONSIVENESS: 'Empfänglichkeit',
			FUEL_CONSUMPTION: 'Kraftstoffverbrauch',
			TORQUE: 'Drehmoment',
			DAMAGED_MIN_TORQUE_MODIFIER: 'Beschädigter min Drehmomentmodifikator',
			DAMAGED_MAX_TORQUE_MODIFIER: 'Beschädigte max Drehmoment-Modifikator',
			UNLOCK_GROUP_NAME: 'Freischalten',
			PRICE: 'Preis',
			BY_EXPLORATION: 'Methode entsperren',
			FIND_ON_MAP: 'Auf Karte finden',
			BY_RANK: 'Nach Rang',
			BY_RANK_LEVEL: 'Level freischalten'
		}
	}
};
