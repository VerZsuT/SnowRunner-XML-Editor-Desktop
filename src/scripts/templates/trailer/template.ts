import {
	Template,
	Group,
	Input,
	Selectors
} from '../../service'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors({
	truckData: 'Truck.TruckData',
	modelBody: 'Truck.PhysicsModel.Body',
	fuelMass: 'Truck.FuelMass.Body',
	gameData: 'Truck.GameData',
	addonSlots: '{gameData}.AddonSlots'
})

export default <ITemplate> {
	selector: 'Truck[Type="Trailer"]',
	template: Template({selectors: selectors}, [
		Group({
			name: texts.inner,
			defaultSelector: 'truckData'
		}, [
			Input({
				attribute: 'FuelCapacity',
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
				text: texts.quantity,
				desc: descs.quantity,
				selector: 'addonSlots'
			})
		]),
		Group({
			name: texts.mass
		}, [
			Input({
				attribute: 'Mass',
				text: texts.trailerMass,
				desc: descs.trailerMass,
				selector: 'modelBody'
			}),
			Input({
				attribute: 'Mass',
				text: texts.fuelMass,
				desc: descs.fuelMass,
				selector: 'fuelMass'
			})
		]),
		Group({
			name: texts.other,
			defaultSelector: 'gameData'
		}, [
			Input({
				attribute: 'Price',
				text: texts.price,
				desc: descs.price
			})
		])
	])
}
