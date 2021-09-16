import {
	Template,
	Group,
	Input,
	Selectors,
	Selector
} from '../service/templateItems.js';

export default {
	main: [
		Template({}, [
			Group({
				name: '[INNER]',
				defaultSelector: '[TRUCK_DATA]'
			}, [
				Input({
					attribute: 'FuelCapacity',
					text: '[FUEL_CAPACITY]',
					desc: '[FUEL_CAPACITY]',
					max: '64000',
					default: 0
				}),
				Input({
					attribute: 'RepairsCapacity',
					text: '[REPAIRS_CAPACITY]',
					desc: '[REPAIRS_CAPACITY]',
					default: 0
				}),
				Input({
					attribute: 'WheelRepairsCapacity',
					text: '[WHEELS_CAPACITY]',
					desc: '[WHEEL_REPAIRS_CAPACITY]',
					default: 0
				}),
				Input({
					attribute: 'Quantity',
					text: '[QUANTITY]',
					desc: '[QUANTITY]',
					selector: '[ADDON_SLOTS]'
				})
			]),
			Group({
				name: '[MASS]'
			}, [
				Input({
					attribute: 'Mass',
					text: '[TRAILER_MASS]',
					desc: '[TRAILER_MASS]',
					selector: '[MODEL_BODY]'
				}),
				Input({
					attribute: 'Mass',
					text: '[FUEL_MASS]',
					desc: '[FUEL_MASS]',
					selector: '[FUEL_MASS]'
				})
			]),
			Group({
				name: '[OTHER]',
				defaultSelector: '[GAME_DATA]'
			}, [
				Input({
					attribute: 'Price',
					text: '[PRICE]',
					desc: '[PRICE]'
				})
			])
		]),
		Selectors([
			Selector({
				id: 'TRUCK_DATA',
				value: 'Truck.TruckData'
			}),
			Selector({
				id: 'MODEL_BODY',
				value: 'Truck.PhysicsModel.Body'
			}),
			Selector({
				id: 'FUEL_MASS',
				value: 'Truck.FuelMass.Body'
			}),
			Selector({
				id: 'GAME_DATA',
				value: 'Truck.GameData'
			}),
			Selector({
				id: 'ADDON_SLOTS',
				value: '{GAME_DATA}.AddonSlots'
			})
		])
	],
	selector: 'Truck[Type="Trailer"]',
	descriptions: {
		PRICE: {
			RU: 'Цена самого автомобиля (без учёта составляющих)',
			EN: 'Der Preis des Autos selbst (ohne die Komponenten)',
			DE: 'The price of the car itself (excluding components)'
		},
		UNLOCK_BY_EXPLORATION: {
			RU: 'Способ разблокировки автомобиля',
			EN: 'How to unlock the car',
			DE: 'Methode zum Entsperren des Autos'
		},
		UNLOCK_BY_RANK: {
			RU: 'Уровень разблокировки автомобиля',
			EN: 'Car Unlock Level',
			DE: 'Auto entsperren Ebene'
		},
		FUEL_CAPACITY: {
			RU: 'Кол-во топлива у прицепа',
			EN: 'Fuel quantity of the trailer',
			DE: 'Kraftstoffmenge am Anhänger'
		},
		REPAIRS_CAPACITY: {
			RU: 'Кол-во запчастей у прицепа',
			EN: 'Number of spare parts for the trailer',
			DE: 'Anzahl der Ersatzteile am Anhänger'
		},
		WHEEL_REPAIRS_CAPACITY: {
			RU: 'Кол-во запасных колёс у прицепа',
			EN: 'Number of spare wheels in the trailer',
			DE: 'Anzahl der Ersatzräder am Anhänger'
		},
		TRAILER_MASS: {
			RU: 'Масса прицепа',
			EN: 'Trailer mass',
			DE: 'Gewicht des Anhängers'
		},
		FUEL_MASS: {
			RU: 'Масса топлива',
			EN: 'Fuel mass',
			DE: 'Gewicht des Kraftstoffs'
		},
		QUANTITY: {
			RU: 'Максимальное кол-во перевозимого груза',
			EN: 'Maximum quantity of cargo to be transported',
			DE: 'Maximale Menge der Fracht'
		}
	},
	translations: {
		EN: {
			QUANTITY: 'Cargo quantity',
			INNER: 'Useful content',
			MASS: 'Mass',
			OTHER: 'Other',
			FALSE_ATTRIBUTE_VALUE: 'false',
			TRUE_ATTRIBUTE_VALUE: 'true',
			PRICE: 'Price',
			FUEL_CAPACITY: 'Fuel capacity',
			REPAIRS_CAPACITY: 'Repairs capacity',
			WHEELS_CAPACITY: 'Wheel repairs capacity',
			TRAILER_MASS: 'Trailer mass',
			FUEL_MASS: 'Fuel mass'
		},
		RU: {
			QUANTITY: 'Кол-во груза',
			INNER: 'Полезное содержимое',
			MASS: 'Масса',
			OTHER: 'Прочее',
			FALSE_ATTRIBUTE_VALUE: 'нет',
			TRUE_ATTRIBUTE_VALUE: 'да',
			PRICE: 'Цена',
			FUEL_CAPACITY: 'Объём топлива',
			REPAIRS_CAPACITY: 'Кол-во запчастей',
			WHEELS_CAPACITY: 'Кол-во колёс для ремонта',
			TRAILER_MASS: 'Масса прицепа',
			FUEL_MASS: 'Масса топлива'
		},
		DE: {
			QUANTITY: 'Menge der Ladung',
			INNER: 'Nützliche Inhalte',
			MASS: 'Masse',
			OTHER: 'Ander',
			FALSE_ATTRIBUTE_VALUE: 'nein',
			TRUE_ATTRIBUTE_VALUE: 'ja',
			PRICE: 'Preis',
			FUEL_CAPACITY: 'Kraftstoffmenge',
			REPAIRS_CAPACITY: 'Anzahl der Ersatzteile',
			WHEELS_CAPACITY: 'Anzahl der Räder zu reparieren',
			TRAILER_MASS: 'Gewicht des Anhängers',
			FUEL_MASS: 'Gewicht des Kraftstoffs'
		}
	}
};
