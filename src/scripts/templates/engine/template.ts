import {
	Template,
	Group,
	Input,
	Select,
	Opt,
	Selectors
} from '../../service'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors({
	engine: 'EngineVariants.Engine',
	engineItem: '{engine}#every',
	engineItemText: '{engineItem}.GameData.UiDesc',
	gameData: '{engine}#every.GameData'
})

export default <ITemplate> {
	selector: 'EngineVariants',
	template: Template({
		type: 'multiply',
		itemSelector: 'engine',
		selectors: selectors
	}, [
		Group({
			nameType: 'computed',
			nameSelector: 'engineItemText',
			resNameSelector: 'engineItem',
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			defaultSelector: 'engineItem'
		}, [
			Input({
				attribute: 'Name',
				text: texts.id,
				desc: descs.name,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'CriticalDamageThreshold',
				text: texts.criticalDamageThreshold,
				desc: descs.criticalDamageTheshold,
				numberType: 'float',
				default: 0.7,
				step: 0.01,
				max: 0.99
			}),
			Input({
				attribute: 'DamageCapacity',
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				areas: {
					yellow: [[1001, 5000]],
					red: [[5001, Infinity]]
				},
				step: 10,
				default: 0,
				bold: true
			}),
			Input({
				attribute: 'DamagedConsumptionModifier',
				text: texts.damagedConsumptionModifier,
				desc: descs.damagedConsumptionModifier,
				numberType: 'float',
				min: 0.1,
				step: 0.1,
				max: 32,
				default: 1
			}),
			Input({
				attribute: 'EngineResponsiveness',
				text: texts.responsiveness,
				desc: descs.responsiveness,
				numberType: 'float',
				max: 1,
				areas: {
					yellow: [[0.1, 0.5]],
					red: [[0.5, 1]]
				},
				step: 0.01,
				default: 0.04
			}),
			Input({
				attribute: 'FuelConsumption',
				text: texts.fuelConsumption,
				desc: descs.fuelConsumption,
				numberType: 'float',
				max: 100.0,
				step: 0.1,
				default: 0.5,
				bold: true
			}),
			Input({
				attribute: 'Torque',
				text: texts.torque,
				desc: descs.torque,
				max: 1000000,
				step: 100,
				bold: true,
				default: 0,
				areas: {
					yellow: [[700000, 80000]],
					red: [[800001, Infinity]]
				}
			}),
			Input({
				attribute: 'DamagedMinTorqueMultiplier',
				text: texts.damagedMinTorqueModifier,
				desc: descs.damagedMinTorqueModifier,
				numberType: 'float',
				min: 0,
				step: 0.01,
				max: 1,
				default: 0
			}),
			Input({
				attribute: 'DamagedMaxTorqueMultiplier',
				text: texts.damagedMaxTorqueModifier,
				desc: descs.damagedMaxTorqueModifier,
				numberType: 'float',
				min: 0,
				step: 0.01,
				max: 1,
				default: 0
			}),
			Group({
				name: texts.unlockGroupName,
				defaultSelector: 'gameData'
			}, [
				Input({
					attribute: 'Price',
					text: texts.price,
					desc: descs.price,
					bold: true
				}),
				Select({
					attribute: 'UnlockByExploration',
					text: texts.byExploration,
					desc: descs.byExploration,
					onlyDeveloper: true
				}, [
					Opt({
						text: texts.findOnMap,
						value: 'true'
					}),
					Opt({
						text: texts.byRank,
						value: 'false'
					})
				]),
				Input({
					attribute: 'UnlockByRank',
					text: texts.byRank,
					desc: descs.unlockByRank,
					min: 1
				})
			])
		])
	])
}
