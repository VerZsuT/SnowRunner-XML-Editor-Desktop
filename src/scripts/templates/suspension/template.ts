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
	suspensionSet: 'SuspensionSetVariants.SuspensionSet',
	suspensionSetItem: '{suspensionSet}#every',
	suspensionSetItemText: '{suspensionSetItem}.GameData.UiDesc',
	suspension: '{suspensionSetItem}.Suspension',
	suspensionItem: '{suspension}#every(2)',
	gameData: '{suspensionSetItem}.GameData'
})

export default <ITemplate> {
	selector: 'SuspensionSetVariants',
	template: Template({
		type: 'multiply',
		itemSelector: 'suspensionSet',
		selectors: selectors
	}, [
		Group({
			nameType: 'computed',
			nameSelector: 'suspensionSetItemText',
			resNameSelector: 'suspensionSetItem',
			nameAttribute: 'UiName',
			resNameAttribute: 'Name',
			defaultSelector: 'suspensionSetItem'
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
				desc: descs.criticalDamageThreshold,
				numberType: 'float',
				max: 0.99,
				step: 0.01,
				default: 0.7
			}),
			Input({
				attribute: 'DamageCapacity',
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				step: 10,
				default: 0,
				bold: true,
				areas: {
					yellow: [[1000, 10000]],
					red: [[10001, Infinity]]
				}
			}),
			Template({
				type: 'multiply',
				itemSelector: 'suspension'
			}, [
				Group({
					name: texts.suspension,
					defaultSelector: 'suspensionItem',
					withCounter: true
				}, [
					Select({
						attribute: 'WheelType',
						text: texts.wheelType,
						desc: descs.wheelType,
						onlyDeveloper: true
					}, [
						Opt({
							text: texts.front,
							value: 'front'
						}),
						Opt({
							text: texts.rear,
							value: 'rear'
						})
					]),
					Input({
						attribute: 'Height',
						numberType: 'float',
						text: texts.height,
						step: 0.1,
						areas: {
							yellow: [[-2, -1], [1, 2]],
							red: [[-1000, -2.1], [2.1, 1000]]
						},
						min: -1000,
						max: 1000
					}),
					Input({
						attribute: 'Strength',
						numberType: 'float',
						text: texts.strength,
						step: 0.01,
						areas: {
							yellow: [[0.5, 1.5]],
							red: [[1.6, Infinity]]
						}
					}),
					Input({
						attribute: 'Damping',
						numberType: 'float',
						text: texts.damping,
						max: 1000,
						step: 0.1,
						areas: {
							yellow: [[1, 3]],
							red: [[3, 1000]]
						}
					}),
					Input({
						attribute: 'SuspensionMin',
						numberType: 'float',
						text: texts.suspensionMin,
						desc: descs.suspensionMin,
						min: -1000,
						step: 0.01,
						max: 1000,
						areas: {
							yellow: [[-5, -2], [2, 5]],
							red: [[-1000, -5.1], [5.1, 1000]]
						}
					}),
					Input({
						attribute: 'SuspensionMax',
						numberType: 'float',
						text: texts.suspensionMax,
						desc: descs.suspensionMax,
						min: -1000,
						step: 0.01,
						max: 1000,
						default: 1,
						areas: {
							yellow: [[-5, -2], [2, 5]],
							red: [[-1000, -5.1], [5.1, 1000]]
						}
					}),
					Input({
						attribute: 'BrokenSuspensionMax',
						type: 'number',
						numberType: 'float',
						text: texts.brokenSuspensionMax,
						desc: descs.brokenSuspensionMax,
						min: -1000,
						step: 0.01,
						max: 1000,
						areas: {
							yellow: [[-5, -2], [2, 5]],
							red: [[-1000, -5.1], [5.1, 1000]]
						}
					})
				])
			]),
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
					text: texts.unlockByExploration,
					desc: descs.unlockByExploration,
					onlyDeveloper: true
				}, [
					Opt({
						text: texts.fincOnMap,
						value: 'true'
					}),
					Opt({
						text: texts.byRank,
						value: 'false'
					})
				]),
				Input({
					attribute: 'UnlockByRank',
					text: texts.unlockByRank,
					desc: descs.unlockByRank,
					min: 1
				})
			])
		])
	])
}
