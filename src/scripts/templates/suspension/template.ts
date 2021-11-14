import {
	Template,
	Group,
	Input,
	Select,
	Selectors,
	forEach,
	forEachBy,
	TemplateType,
	InputType,
	NameType,
	NumberType
} from '../../service'
import unlockGroup from '../presets/unlockGroup'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors({
	suspensionSet: 'SuspensionSetVariants.SuspensionSet',
	suspensionSetItem: `{suspensionSet}${forEach}`,
	suspensionSetItemText: '{suspensionSetItem}.GameData.UiDesc',
	suspension: '{suspensionSetItem}.Suspension',
	suspensionItem: `{suspension}${forEachBy(2)}`,
	gameData: '{suspensionSetItem}.GameData'
})

export default <ITemplate> {
	selector: 'SuspensionSetVariants',
	template: Template({
		type: TemplateType.multiply,
		itemSelector: selectors.suspensionSet,
		selectors: selectors
	}, [
		Group({
			nameType: NameType.computed,
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			nameSelector: selectors.suspensionSetItemText,
			resNameSelector: selectors.suspensionSetItem,
			defaultSelector: selectors.suspensionSetItem
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
				desc: descs.criticalDamageThreshold,
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
					yellow: [[1000, 10000]],
					red: [[10001, Infinity]]
				},
				bold: true
			}),
			Template({
				type: TemplateType.multiply,
				itemSelector: selectors.suspension
			}, [
				Group({
					name: texts.suspension,
					defaultSelector: selectors.suspensionItem,
					withCounter: true
				}, [
					Select({
						attribute: 'WheelType',
						text: texts.wheelType,
						desc: descs.wheelType,
						options: {
							front: texts.front,
							rear: texts.rear
						},
						onlyDeveloper: true
					}),
					Input({
						attribute: 'Height',
						text: texts.height,
						max: 1000,
						min: -1000,
						areas: {
							yellow: [[-2, -1], [1, 2]],
							red: [[-1000, -2.1], [2.1, 1000]]
						}
					}),
					Input({
						attribute: 'Strength',
						text: texts.strength,
						step: 0.01,
						areas: {
							yellow: [[0.5, 1.5]],
							red: [[1.6, Infinity]]
						}
					}),
					Input({
						attribute: 'Damping',
						text: texts.damping,
						max: 1000,
						areas: {
							yellow: [[1, 3]],
							red: [[3, 1000]]
						}
					}),
					Input({
						attribute: 'SuspensionMin',
						text: texts.suspensionMin,
						desc: descs.suspensionMin,
						max: 1000,
						min: -1000,
						step: 0.01,
						areas: {
							yellow: [[-5, -2], [2, 5]],
							red: [[-1000, -5.1], [5.1, 1000]]
						}
					}),
					Input({
						attribute: 'SuspensionMax',
						text: texts.suspensionMax,
						desc: descs.suspensionMax,
						max: 1000,
						min: -1000,
						step: 0.01,
						default: 1,
						areas: {
							yellow: [[-5, -2], [2, 5]],
							red: [[-1000, -5.1], [5.1, 1000]]
						}
					}),
					Input({
						attribute: 'BrokenSuspensionMax',
						text: texts.brokenSuspensionMax,
						desc: descs.brokenSuspensionMax,
						max: 1000,
						min: -1000,
						step: 0.01,
						areas: {
							yellow: [[-5, -2], [2, 5]],
							red: [[-1000, -5.1], [5.1, 1000]]
						}
					})
				])
			]),
			unlockGroup(selectors.gameData)
		])
	])
}
