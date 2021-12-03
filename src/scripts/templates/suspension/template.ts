import {
	Template,
	Group,
	Select,
	ForEach,
	Number,
	Text
} from '../items'
import { NameType, NumberType } from '../enums'
import { getSelectors } from '../service'
import { descs, texts } from './texts'
import { unlockGroup } from '../presets'

const selectors = getSelectors(function() {
	const suspensionSet = `SuspensionSetVariants.SuspensionSet${this.forEach}`
	const suspensionSetText = `${suspensionSet}.GameData.UiDesc`
	const suspension = `${suspensionSet}.Suspension${this.forEachBy(2)}`
	const gameData = `${suspensionSet}.GameData`
	return {suspensionSet, suspensionSetText, suspension, gameData}
})

export default <ITemplate> {
	selector: 'SuspensionSetVariants',
	template: Template(selectors, [
		ForEach(selectors.suspensionSet, [
			Group({
				nameType: NameType.computed,
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				nameSelector: selectors.suspensionSetText,
				resNameSelector: selectors.suspensionSet,
				defaultSelector: selectors.suspensionSet
			}, [
				Text({
					attribute: 'Name',
					text: texts.id,
					desc: descs.name,
					onlyDev: true
				}),
				Number({
					attribute: 'CriticalDamageThreshold',
					text: texts.criticalDamageThreshold,
					desc: descs.criticalDamageThreshold,
					max: 0.999,
					min: 0,
					step: 0.01,
					default: 0.7
				}),
				Number({
					attribute: 'DamageCapacity',
					type: NumberType.integer,
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
				ForEach(selectors.suspension, [
					Group({
						name: texts.suspension,
						defaultSelector: selectors.suspension,
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
						Number({
							attribute: 'Height',
							text: texts.height,
							max: 1000,
							min: -1000,
							areas: {
								yellow: [[-2, -1], [1, 2]],
								red: [[-1000, -2.1], [2.1, 1000]]
							}
						}),
						Number({
							attribute: 'Strength',
							text: texts.strength,
							step: 0.01,
							areas: {
								yellow: [[0.5, 1.5]],
								red: [[1.6, Infinity]]
							}
						}),
						Number({
							attribute: 'Damping',
							text: texts.damping,
							max: 1000,
							areas: {
								yellow: [[1, 3]],
								red: [[3, 1000]]
							}
						}),
						Number({
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
						Number({
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
						Number({
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
	])
}
