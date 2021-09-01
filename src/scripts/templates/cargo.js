import {
	Template,
	Group,
	Input,
	Selectors,
	Selector
} from '../service/templateItems.js'

const desc = {
	Mass: {
		RU: 'Масса части груза',
		EN: 'Weight of the cargo part',
		DE: 'Gewicht der Ladung'
	},
	CargoLenght: {
		RU: 'Количество занимаемого грузом места (слотов)',
		EN: 'The amount of space occupied by the cargo (slots)',
		DE: 'Anzahl der belegten Plätze (Slots)'
	},
	CargoType: {
		RU: 'ID груза',
		EN: 'Cargo ID',
		DE: 'Fracht-ID'
	},
	Offset: {
		RU: 'Смещение каждого нового груза относительно предыдущего',
		EN: 'Offset of each new load relative to the previous one',
		DE: 'Versatz jeder neuen Ladung relativ zur vorherigen Ladung'
	}
}

const cargo = {
	main: [
		Template({}, [
			Group({
				name: '[PART]',
				defaultSelector: '[CARGO_PART_ITEM]'
			}, [
				Template({
					type: 'Multiply',
					itemSelector: '[CARGO_PART]'
				}, [
					Input({
						attribute: 'Mass',
						text: '[MASS]',
						desc: desc.Mass
					})
				])
			]),
			Group({
				name: '[MAIN]',
				defaultSelector: '[SLOT]'
			}, [
				Input({
					attribute: 'CargoLength',
					text: '[LENGTH]',
					onlyDeveloper: 'true',
					desc: desc.CargoLenght
				}),
				Input({
					attribute: 'CargoType',
					onlyDeveloper: 'true',
					type: 'text',
					text: '[TYPE]',
					desc: desc.CargoType
				}),
				Input({
					type: 'coordinates',
					onlyDeveloper: 'true',
					attribute: 'Offset',
					text: '[OFFSET]',
					desc: desc.Offset
				})
			])
		]),
		Selectors([
			Selector({
				id: 'CARGO_PART',
				value: 'Body'
			}),
			Selector({
				id: 'CARGO_PART_ITEM',
				value: 'Body#every'
			}),
			Selector({
				id: 'SLOT',
				value: 'TruckAddon.GameData.InstallSlot'
			})
		])
	],
	selector: 'TruckAddon > GameData > InstallSlot[CargoType]',
	translation: {
		EN: {
			MASS: 'Mass',
			PART: 'Parts',
			MAIN: 'Main',
			LENGTH: 'Length',
			TYPE: 'Type',
			OFFSET: 'Offset',
		},
		RU: {
			MASS: 'Масса',
			PART: 'Части',
			MAIN: 'Основное',
			LENGTH: 'Длина',
			TYPE: 'Тип',
			OFFSET: 'Смещение',
		},
		DE: {
			MASS: 'Masse',
			PART: 'Teilе',
			MAIN: 'Grundlegende',
			LENGTH: 'Länge',
			TYPE: 'Typ',
			OFFSET: 'Offset',
		}
	}
}

export default cargo
