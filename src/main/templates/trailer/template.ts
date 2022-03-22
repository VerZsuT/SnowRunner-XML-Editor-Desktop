import type ITemplate from '../types/ITemplate'
import NumberType from '../enums/NumberType'

import { Template, Group, Number, ForEach } from '../items'
import { getSelectors } from '../service'
import { descs, texts } from './texts'

const selectors = getSelectors(function () {
	const truckData = 'Truck.TruckData'
	const wheels = `${truckData}.Wheels`
	const wheel = `${wheels}.Wheel${this.forEach}`
	const modelBody = 'Truck.PhysicsModel.Body'
	const fuelMass = 'Truck.FuelMass.Body'
	const gameData = 'Truck.GameData'
	const addonSlots = `${gameData}.AddonSlots`
	
	return { truckData, modelBody, fuelMass, gameData, addonSlots, wheel }
})

export default <ITemplate>{
	selector: 'Truck[Type="Trailer"]',
	template: Template(selectors, [
		Group({
			name: texts.inner,
			defaultSelector: selectors.truckData
		}, [
			Number({
				attribute: 'FuelCapacity',
				type: NumberType.integer,
				text: texts.fuelCapacity,
				desc: descs.fuelCapacity,
				max: 64000,
				step: 10,
				default: 0,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Number({
				attribute: 'RepairsCapacity',
				type: NumberType.integer,
				text: texts.repairsCapacity,
				desc: descs.repairsCapacity,
				default: 0,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Number({
				attribute: 'WheelRepairsCapacity',
				type: NumberType.integer,
				text: texts.wheelRepairsCapacity,
				desc: descs.wheelRepairsCapacity,
				default: 0,
				areas: {
					yellow: [[100, 500]],
					red: [[501, Infinity]]
				}
			}),
			Number({
				attribute: 'Quantity',
				type: NumberType.integer,
				selector: selectors.addonSlots,
				text: texts.quantity,
				desc: descs.quantity
			})
		]),
		Group(texts.mass, [
			Number({
				attribute: 'Mass',
				type: NumberType.integer,
				selector: selectors.modelBody,
				text: texts.trailerMass,
				desc: descs.trailerMass
			}),
			Number({
				attribute: 'Mass',
				type: NumberType.integer,
				selector: selectors.fuelMass,
				text: texts.fuelMass,
				desc: descs.fuelMass
			})
		]),
		Group({
			name: texts.wheels
		}, [
			ForEach(selectors.wheel, [
				Group({
					name: texts.wheel,
					defaultSelector: selectors.wheel,
					withCounter: true
				}, [
					Number({
						attribute: 'SuspensionHeight',
						text: texts.suspHeight
					}),
					Number({
						attribute: 'SuspensionStrength',
						text: texts.suspStrength
					})
				])
			])
		]),
		Group({
			name: texts.other,
			defaultSelector: selectors.gameData
		}, [
			Number({
				attribute: 'Price',
				type: NumberType.integer,
				text: texts.price,
				desc: descs.price
			})
		])
	])
}
