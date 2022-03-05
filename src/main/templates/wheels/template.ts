import {
	Template,
	Group,
	Select,
	Text,
	ForEach,
	Number
} from '../items'
import { NameType } from '../enums'
import { getSelectors } from '../service'
import { descs, texts } from './texts'
import { unlockGroup } from '../presets'

const selectors = getSelectors(function () {
	const truckWheels = 'TruckWheels'
	const truckTire = `TruckWheels.TruckTires.TruckTire${this.forEach}`
	const truckTireText = `${truckTire}.GameData.UiDesc`
	const wheelFriction = `${truckTire}.WheelFriction`
	const gameData = `${truckTire}.GameData`
	return { truckWheels, truckTire, truckTireText, wheelFriction, gameData }
})

export const wheels = <ITemplate>{
	selector: 'TruckWheels',
	template: Template(selectors, [
		ForEach(selectors.truckTire, [
			Group({
				nameType: NameType.computed,
				nameAttribute: 'UiName',
				resNameAttribute: 'Name',
				nameSelector: selectors.truckTireText,
				resNameSelector: selectors.truckTire,
				defaultSelector: selectors.wheelFriction
			}, [
				Number({
					attribute: 'BodyFriction',
					text: texts.bodyFriction,
					desc: descs.bodyFriction,
					max: 10,
					default: 1,
					areas: {
						yellow: [[7, 8]],
						red: [[8.1, 10]]
					},
					canAddTag: true
				}),
				Number({
					attribute: 'BodyFrictionAsphalt',
					text: texts.bodyFrictionAsphalt,
					desc: descs.bodyFrictionAsphalt,
					max: 10,
					default: 1,
					areas: {
						yellow: [[7, 8]],
						red: [[8.1, 10]]
					},
					canAddTag: true
				}),
				Number({
					attribute: 'SubstanceFriction',
					text: texts.substanceFriction,
					desc: descs.substanceFriction,
					max: 10,
					default: 1,
					areas: {
						yellow: [[7, 8]],
						red: [[8.1, 10]]
					},
					canAddTag: true
				}),
				Select({
					attribute: 'IsIgnoreIce',
					text: texts.ignoreIse,
					desc: descs.ignoreIse,
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