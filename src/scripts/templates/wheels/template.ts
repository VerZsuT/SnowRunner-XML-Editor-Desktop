import {
	Template,
	Group,
	Input,
	Select,
	Selectors,
	forEach,
	NumberType,
	NameType,
	TemplateType,
	InputType
} from '../../service'
import unlockGroup from '../presets/unlockGroup'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors({
	truckWheels: 'TruckWheels',
	truckTire: 'TruckWheels.TruckTires.TruckTire',
	truckTireItem: `{truckTire}${forEach}`,
	truckTireItemText: '{truckTireItem}.GameData.UiDesc',
	wheelFriction: '{truckTireItem}.WheelFriction',
	gameData: '{truckTireItem}.GameData'
})

export default <ITemplate> {
	selector: 'TruckWheels',
	template: Template({selectors}, [
		Group({
			name: texts.general,
			defaultSelector: selectors.truckWheels
		}, [
			Input({
				attribute: 'DamageCapacity',
				numberType: NumberType.integer,
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Input({
				attribute: 'Radius',
				text: texts.radius,
				desc: descs.radius,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Width',
				text: texts.width,
				desc: descs.width,
				onlyDeveloper: true
			})
		]),
		Template({
			type: TemplateType.multiply,
			itemSelector: selectors.truckTire
		}, [
			Group({
				nameType: NameType.computed,
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				nameSelector: selectors.truckTireItemText,
				resNameSelector: selectors.truckTireItem,
				defaultSelector: selectors.wheelFriction
			}, [
				Input({
					attribute: 'Name',
					selector: selectors.truckTireItem,
					type: InputType.text,
					text: texts.id,
					desc: descs.id,
					onlyDeveloper: true
				}),
				Input({
					attribute: 'BodyFriction',
					text: texts.bodyFriction,
					desc: descs.bodyFriction,
					max: 10,
					default: 1,
					areas: {
						yellow: [[7, 8]],
						red: [[8.1, 10]]
					},
					bold: true,
					canAddTag: true
				}),
				Input({
					attribute: 'BodyFrictionAsphalt',
					text: texts.bodyFrictionAsphalt,
					desc: descs.bodyFrictionAsphalt,
					max: 10,
					default: 1,
					areas: {
						yellow: [[7, 8]],
						red: [[8.1, 10]]
					},
					bold: true,
					canAddTag: true
				}),
				Input({
					attribute: 'SubstanceFriction',
					text: texts.substanceFriction,
					desc: descs.substanceFriction,
					max: 10,
					default: 1,
					areas: {
						yellow: [[7, 8]],
						red: [[8.1, 10]]
					},
					bold: true,
					canAddTag: true
				}),
				Select({
					attribute: 'IsIgnoreIce',
					text: texts.ignoreIse,
					desc: descs.ignoreIse,
					bold: true,
					canAddTag: true,
					options: {
						true: texts.yes,
						false: texts.no
					},
					default: 'false'
				}),
				unlockGroup(selectors.gameData)
			])
		])
	])
}
