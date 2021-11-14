import {
	Template,
	Group,
	Input,
	Selectors,
	forEach,
	TemplateType,
	NameType,
	InputType,
	NumberType
} from '../../service'
import {
	descs,
	texts
} from './texts'
import unlockGroup from '../presets/unlockGroup'

const selectors = Selectors({
	engine: 'EngineVariants.Engine',
	engineItem: `{engine}${forEach}`,
	engineItemText: `{engineItem}.GameData.UiDesc`,
	gameData: `{engine}${forEach}.GameData`
})

export default <ITemplate> {
	selector: 'EngineVariants',
	template: Template({
		type: TemplateType.multiply,
		itemSelector: selectors.engine,
		selectors: selectors
	}, [
		Group({
			nameType: NameType.computed,
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			nameSelector: selectors.engineItemText,
			resNameSelector: selectors.engineItem,
			defaultSelector: selectors.engineItem,
		}, [
			Input({
				attribute: 'Name',
				type: InputType.text,
				text: texts.id,
				desc: descs.name,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'CriticalDamageThreshold',
				text: texts.criticalDamageThreshold,
				desc: descs.criticalDamageTheshold,
				max: 0.99,
				step: 0.01,
				default: 0.7
			}),
			Input({
				attribute: 'DamageCapacity',
				numberType: NumberType.integer,
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				step: 10,
				default: 0,
				areas: {
					yellow: [[1001, 5000]],
					red: [[5001, Infinity]]
				},
				bold: true
			}),
			Input({
				attribute: 'DamagedConsumptionModifier',
				text: texts.damagedConsumptionModifier,
				desc: descs.damagedConsumptionModifier,
				max: 32,
				min: 0.1,
				default: 1
			}),
			Input({
				attribute: 'EngineResponsiveness',
				text: texts.responsiveness,
				desc: descs.responsiveness,
				max: 1,
				step: 0.01,
				default: 0.04,
				areas: {
					yellow: [[0.1, 0.5]],
					red: [[0.5, 1]]
				}
			}),
			Input({
				attribute: 'FuelConsumption',
				text: texts.fuelConsumption,
				desc: descs.fuelConsumption,
				max: 100.0,
				default: 0.5,
				bold: true
			}),
			Input({
				attribute: 'Torque',
				numberType: NumberType.integer,
				text: texts.torque,
				desc: descs.torque,
				max: 1000000,
				step: 100,
				default: 0,
				areas: {
					yellow: [[700000, 80000]],
					red: [[800001, Infinity]]
				},
				bold: true
			}),
			Input({
				attribute: 'DamagedMinTorqueMultiplier',
				text: texts.damagedMinTorqueModifier,
				desc: descs.damagedMinTorqueModifier,
				max: 1,
				step: 0.01,
				default: 0
			}),
			Input({
				attribute: 'DamagedMaxTorqueMultiplier',
				text: texts.damagedMaxTorqueModifier,
				desc: descs.damagedMaxTorqueModifier,
				max: 1,
				step: 0.01,
				default: 0
			}),
			unlockGroup(selectors.gameData)
		])
	])
}
