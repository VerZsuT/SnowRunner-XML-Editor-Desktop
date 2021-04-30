import { Template, Group, Input, Selectors, Selector } from '../service/templateItems.js'

const cargo = {
	main: [
		Template({}, [
			Group({name: '[PART]', defaultSelector: '[CARGO_PART_ITEM]'}, [
				Template({type: 'Multiply', itemSelector: '[CARGO_PART]'}, [
					Input({attribute: 'Mass', text: '[MASS]'})
				])
			]),
			Group({name: '[MAIN]', defaultSelector: '[SLOT]'}, [
				Input({attribute: 'CargoLength', text: '[LENGTH]', onlyDeveloper: 'true'}),
				Input({attribute: 'CargoType', onlyDeveloper: 'true', type: 'text', text: '[TYPE]'}),
				Input({type: 'coordinates', onlyDeveloper: 'true', attribute: 'Offset', text: '[OFFSET]'})
			])
		]),
		Selectors([
			Selector({id: 'CARGO_PART', value: 'Body'}),
			Selector({id: 'CARGO_PART_ITEM', value: 'Body#every'}),
			Selector({id: 'SLOT', value: 'TruckAddon.GameData.InstallSlot'})
		])
	],
	selector: 'TruckAddon > GameData > InstallSlot[CargoType]',
	translation: {
		EN: {
			"MASS": "Mass",
			"PART": "Parts",
			"MAIN": "Main",
			"LENGTH": "Length",
			"TYPE": "Type",
			"OFFSET": "Offset",
		},
		RU: {
			"MASS": "Масса",
			"PART": "Части",
			"MAIN": "Основное",
			"LENGTH": "Длина",
			"TYPE": "Тип",
			"OFFSET": "Смещение",
		},
		DE: {
			"MASS": "Masse",
			"PART": "Teilе",
			"MAIN": "Grundlegende",
			"LENGTH": "Länge",
			"TYPE": "Typ",
			"OFFSET": "Offset",
		}
	}
}

export default cargo
