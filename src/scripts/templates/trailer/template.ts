import {
	Template,
	Group,
	Input,
	Selectors,
	NumberType
} from '../../service'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors(() => {
	const truckData = 'Truck.TruckData'
	const modelBody = 'Truck.PhysicsModel.Body'
	const fuelMass = 'Truck.FuelMass.Body'
	const gameData = 'Truck.GameData'
	const addonSlots = `${gameData}.AddonSlots`
	return {truckData, modelBody, fuelMass, gameData, addonSlots}
})

export default <ITemplate> {
	selector: 'Truck[Type="Trailer"]',
	template: Template({selectors}, [
		Group({
			name: texts.inner,
			defaultSelector: selectors.truckData
		}, [
			Input({
				attribute: 'FuelCapacity',
				numberType: NumberType.integer,
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
			Input({
				attribute: 'RepairsCapacity',
				numberType: NumberType.integer,
				text: texts.repairsCapacity,
				desc: descs.repairsCapacity,
				default: 0,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Input({
				attribute: 'WheelRepairsCapacity',
				numberType: NumberType.integer,
				text: texts.wheelRepairsCapacity,
				desc: descs.wheelRepairsCapacity,
				default: 0,
				areas: {
					yellow: [[100, 500]],
					red: [[501, Infinity]]
				}
			}),
			Input({
				attribute: 'Quantity',
				numberType: NumberType.integer,
				selector: selectors.addonSlots,
				text: texts.quantity,
				desc: descs.quantity
			})
		]),
		Group({
			name: texts.mass
		}, [
			Input({
				attribute: 'Mass',
				numberType: NumberType.integer,
				selector: selectors.modelBody,
				text: texts.trailerMass,
				desc: descs.trailerMass
			}),
			Input({
				attribute: 'Mass',
				numberType: NumberType.integer,
				selector: selectors.fuelMass,
				text: texts.fuelMass,
				desc: descs.fuelMass
			})
		]),
		Group({
			name: texts.other,
			defaultSelector: selectors.gameData
		}, [
			Input({
				attribute: 'Price',
				numberType: NumberType.integer,
				text: texts.price,
				desc: descs.price
			})
		])
	])
}
