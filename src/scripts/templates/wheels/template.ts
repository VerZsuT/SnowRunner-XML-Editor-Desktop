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
	truckWheels: 'TruckWheels',
	truckTire: 'TruckWheels.TruckTires.TruckTire',
	truckTireItem: '{truckTire}#every',
	truckTireItemText: '{truckTireItem}.GameData.UiDesc',
	wheelFriction: '{truckTireItem}.WheelFriction',
	gameData: '{truckTireItem}.GameData'
})

export default <ITemplate> {
	selector: 'TruckWheels',
	template: Template({selectors: selectors}, [
		Group({
			name: texts.general,
			defaultSelector: 'truckWheels'
		}, [
			Input({
				attribute: 'DamageCapacity',
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				min: 0,
				max: 64000,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Input({
				attribute: 'Radius',
				numberType: 'float',
				text: texts.radius,
				desc: descs.radius,
				min: 0,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Width',
				numberType: 'float',
				text: texts.width,
				desc: descs.width,
				min: 0,
				onlyDeveloper: true
			})
		]),
		Template({
			type: 'multiply',
			itemSelector: 'truckTire'
		}, [
			Group({
				nameType: 'computed',
				nameSelector: 'truckTireItemText',
				resNameSelector: 'truckTireItem',
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				defaultSelector: 'wheelFriction'
			}, [
				Input({
					attribute: 'Name',
					text: texts.id,
					desc: descs.id,
					type: 'text',
					onlyDeveloper: true,
					selector: 'truckTireItem'
				}),
				Input({
					attribute: 'BodyFriction',
					text: texts.bodyFriction,
					desc: descs.bodyFriction,
					numberType: 'float',
					max: 10,
					step: 0.1,
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
					numberType: 'float',
					max: 10,
					step: 0.1,
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
					numberType: 'float',
					max: 10,
					step: 0.1,
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
					default: 'false'
				}, [
					Opt({
						text: texts.yes,
						value: 'true'
					}),
					Opt({
						text: texts.no,
						value: 'false'
					})
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
						text: texts.unlockByRank,
						desc: descs.unlockByRank,
						min: 1
					})
				])
			])
		]),	
	])
}
