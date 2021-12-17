import { Config } from'@sxmle-app/classes/Config'

export const texts = {
	RU: {
		mass: 'Масса',
		part: 'Части',
		main: 'Основное',
		cargoLength: 'Длина',
		cargoType: 'Тип',
		offset: 'Смещение'
	},
	EN: {
		mass: 'Mass',
		part: 'Parts',
		main: 'Main',
		cargoLength: 'Length',
		cargoType: 'Type',
		offset: 'Offset'
	},
	DE: {
		mass: 'Masse',
		part: 'Teilе',
		main: 'Grundlegende',
		cargoLength: 'Länge',
		cargoType: 'Typ',
		offset: 'Offset'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		mass: 'Масса части груза',
		cargoLength: 'Количество занимаемого грузом места (слотов)',
		cargoType: 'ID груза',
		offset: 'Смещение каждого нового груза относительно предыдущего'
	},
	EN: {
		mass: 'Weight of the cargo part',
		cargoLength: 'The amount of space occupied by the cargo (slots)',
		cargoType: 'Cargo ID',
		offset: 'Offset of each new load relative to the previous one'
	},
	DE: {
		mass: 'Gewicht der Ladung',
		cargoLength: 'Anzahl der belegten Plätze (Slots)',
		cargoType: 'Fracht-ID',
		offset: 'Versatz jeder neuen Ladung relativ zur vorherigen Ladung'
	}
}[Config.obj.lang]
