import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'
const trailer = {
	main: [
		Template({}, [
			Group({name: '[INNER]', defaultSelector: '[TRUCK_DATA]'}, [
				Input({attribute: 'FuelCapacity', text: '[FUEL_CAPACITY]', max: '64000'}),
				Input({attribute: 'RepairsCapacity', text: '[REPAIRC_CAPACITY]'}),
				Input({attribute: 'WheelRepairsCapacity', text: '[WHEELS_CAPACITY]'})
			]),
			Group({name: '[MASS]'}, [
				Input({attribute: 'Mass', text: '[TRAILER_MASS]', selector: '[MODEL_BODY]'}),
				Input({attribute: 'Mass', text: '[FUEL_MASS]', selector: '[FUEL_MASS]'})
			]),
			Group({name: '[OTHER]', defaultSelector: '[GAME_DATA]'}, [
				Input({attribute: 'Price', text: '[PRICE]'}),
				Select({attribute: 'IsQuest', text: '[QUEST]', onlyDeveloper: 'true'}, [
					Opt({value: '__DefaultSelectValue__', text: '[FALSE_ATTRIBUTE_VALUE]'}),
					Opt({value: 'True', text: '[TRUE_ATTRIBUTE_VALUE]'})
				])
			])
		]),
		Selectors([
			Selector({id: 'TRUCK_DATA', value: 'Truck.TruckData'}),
			Selector({id: 'MODEL_BODY', value: 'Truck.PhysicsModel.Body'}),
			Selector({id: 'FUEL_MASS', value: 'Truck.FuelMass.Body'}),
			Selector({id: 'GAME_DATA', value: 'Truck.GameData'})
		])
	],
	selector: 'Truck[Type="Trailer"]',
	translation: {
		EN: {
			"INNER": "Useful content",
			"MASS": "Mass",
			"OTHER": "Other",
			"FALSE_ATTRIBUTE_VALUE": "false",
			"TRUE_ATTRIBUTE_VALUE": "true",
			"QUEST": "For the quest",
			"PRICE": "Price",
			"FUEL_CAPACITY": "Fuel capacity",
			"REPAIRC_CAPACITY": "Repairs capacity",
			"WHEELS_CAPACITY": "Wheel repairs capacity",
			"TRAILER_MASS": "Trailer mass",
			"FUEL_MASS": "Fuel mass",
		},
		RU: {
			"INNER": "Полезное содержимое",
			"MASS": "Масса",
			"OTHER": "Прочее",
			"FALSE_ATTRIBUTE_VALUE": "нет",
			"TRUE_ATTRIBUTE_VALUE": "да",
			"QUEST": "Для задания",
			"PRICE": "Цена",
			"FUEL_CAPACITY": "Объём топлива",
			"REPAIRC_CAPACITY": "Кол-во запчастей",
			"WHEELS_CAPACITY": "Кол-во колёс для ремонта",
			"TRAILER_MASS": "Масса прицепа",
			"FUEL_MASS": "Масса топлива",
		},
		DE: {
			"INNER": "Nützliche Inhalte",
			"MASS": "Masse",
			"OTHER": "Ander",
			"FALSE_ATTRIBUTE_VALUE": "nein",
			"TRUE_ATTRIBUTE_VALUE": "ja",
			"QUEST": "Für die Aufgabe",
			"PRICE": "Preis",
			"FUEL_CAPACITY": "Kraftstoffmenge",
			"REPAIRC_CAPACITY": "Anzahl der Ersatzteile",
			"WHEELS_CAPACITY": "Anzahl der Räder zu reparieren",
			"TRAILER_MASS": "Gewicht des Anhängers",
			"FUEL_MASS": "Gewicht des Kraftstoffs",
		}
	}
}

export default trailer
