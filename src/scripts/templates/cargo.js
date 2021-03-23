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
	systemData: {
		name: 'Cargo',
		author: 'VerZsuT',
		description: '[media]/classes/trucks/cargo/...',
		id: 9388306582,
		defaultState: 'enabled',
		type: 'system',
		selector: 'TruckAddon > GameData > InstallSlot[CargoType]',
		version: '1.2'
	},
	translation: {
		3478485900: {
			"MASS": "Mass",
			"PART": "Parts",
			"MAIN": "Main",
			"LENGTH": "Length",
			"TYPE": "Type",
			"OFFSET": "Offset",
		},
		7081350102: {
			"MASS": "Масса",
			"PART": "Части",
			"MAIN": "Основное",
			"LENGTH": "Длина",
			"TYPE": "Тип",
			"OFFSET": "Смещение",
		},
		6042577539: {
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