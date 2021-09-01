import {
	Template,
	Group,
	Input,
	Select,
	Opt,
	Selectors,
	Selector
} from '../service/templateItems.js'

const desc = {
	Price: {
		RU: 'Цена самого автомобиля (без учёта составляющих)',
		EN: 'Der Preis des Autos selbst (ohne die Komponenten)',
		DE: 'The price of the car itself (excluding components)'
	},
	UnlockByExporation: {
		RU: 'Способ разблокировки автомобиля',
		EN: 'How to unlock the car',
		DE: 'Methode zum Entsperren des Autos'
	},
	UnlockByRank: {
		RU: 'Уровень разблокировки автомобиля',
		EN: 'Car Unlock Level',
		DE: 'Auto entsperren Ebene'
	},
	FuelCapacity: {
		RU: 'Кол-во топлива у прицепа',
		EN: 'Fuel quantity of the trailer',
		DE: 'Kraftstoffmenge am Anhänger'
	},
	RepairsCapacity: {
		RU: 'Кол-во запчастей у прицепа',
		EN: 'Number of spare parts for the trailer',
		DE: 'Anzahl der Ersatzteile am Anhänger'
	},
	WheelRepairsCapacity: {
		RU: 'Кол-во запасных колёс у прицепа',
		EN: 'Number of spare wheels in the trailer',
		DE: 'Anzahl der Ersatzräder am Anhänger'
	},
	TrailerMass: {
		RU: 'Масса прицепа',
		EN: 'Trailer mass',
		DE: 'Gewicht des Anhängers'
	},
	FuelMass: {
		RU: 'Масса топлива',
		EN: 'Fuel mass',
		DE: 'Gewicht des Kraftstoffs'
	},
	Quantity: {
		RU: 'Максимальное кол-во перевозимого груза',
		EN: 'Maximum quantity of cargo to be transported',
		DE: 'Maximale Menge der Fracht'
	}
}

const trailer = {
	main: [
		Template({}, [
			Group({
				name: '[INNER]',
				defaultSelector: '[TRUCK_DATA]'
			}, [
				Input({
					attribute: 'FuelCapacity',
					text: '[FUEL_CAPACITY]',
					max: '64000',
					default: 0,
					desc: desc.FuelCapacity
				}),
				Input({
					attribute: 'RepairsCapacity',
					text: '[REPAIRC_CAPACITY]',
					default: 0,
					desc: desc.RepairsCapacity
				}),
				Input({
					attribute: 'WheelRepairsCapacity',
					text: '[WHEELS_CAPACITY]',
					default: 0,
					desc: desc.WheelRepairsCapacity
				}),
				Input({
					attribute: 'Quantity',
					text: '[QUANTITY]',
					selector: '[ADDON_SLOTS]',
					desc: desc.Quantity
				})
			]),
			Group({
				name: '[MASS]'
			}, [
				Input({
					attribute: 'Mass',
					text: '[TRAILER_MASS]',
					selector: '[MODEL_BODY]',
					desc: desc.TrailerMass
				}),
				Input({
					attribute: 'Mass',
					text: '[FUEL_MASS]',
					selector: '[FUEL_MASS]',
					desc: desc.FuelMass
				})
			]),
			Group({
				name: '[OTHER]',
				defaultSelector: '[GAME_DATA]'
			}, [
				Input({
					attribute: 'Price',
					text: '[PRICE]',
					desc: desc.Price
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
	translation: {
		EN: {
			QUANTITY: 'Cargo quantity',
			INNER: 'Useful content',
			MASS: 'Mass',
			OTHER: 'Other',
			FALSE_ATTRIBUTE_VALUE: 'false',
			TRUE_ATTRIBUTE_VALUE: 'true',
			PRICE: 'Price',
			FUEL_CAPACITY: 'Fuel capacity',
			REPAIRC_CAPACITY: 'Repairs capacity',
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
			REPAIRC_CAPACITY: 'Кол-во запчастей',
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
			REPAIRC_CAPACITY: 'Anzahl der Ersatzteile',
			WHEELS_CAPACITY: 'Anzahl der Räder zu reparieren',
			TRAILER_MASS: 'Gewicht des Anhängers',
			FUEL_MASS: 'Gewicht des Kraftstoffs'
		}
	}
}

export default trailer
