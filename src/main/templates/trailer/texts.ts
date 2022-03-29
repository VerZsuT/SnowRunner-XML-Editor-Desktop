import Config from 'main/classes/Config'

export const texts = {
	RU: {
		quantity: 'Кол-во груза',
		inner: 'Полезное содержимое',
		mass: 'Масса',
		other: 'Прочее',
		price: 'Цена',
		fuelCapacity: 'Объём топлива',
		repairsCapacity: 'Кол-во запчастей',
		wheelRepairsCapacity: 'Кол-во колёс для ремонта',
		trailerMass: 'Масса прицепа',
		fuelMass: 'Масса топлива',
		wheels: 'Колёса',
		wheel: 'Колесо',
		suspHeight: 'Высота подвески',
		suspStrength: 'Жёсткость подвески'
	},
	EN: {
		quantity: 'Cargo quantity',
		inner: 'Useful content',
		mass: 'Mass',
		other: 'Other',
		price: 'Price',
		fuelCapacity: 'Fuel capacity',
		repairsCapacity: 'Repairs capacity',
		wheelRepairsCapacity: 'Wheel repairs capacity',
		trailerMass: 'Trailer mass',
		fuelMass: 'Fuel mass',
		wheels: 'Wheels',
		wheel: 'Wheel',
		suspHeight: 'Suspension height',
		suspStrength: 'Suspension strength'
	},
	DE: {
		quantity: 'Menge der Ladung',
		inner: 'Nützliche Inhalte',
		mass: 'Masse',
		other: 'Ander',
		price: 'Preis',
		fuelCapacity: 'Kraftstoffmenge',
		repairsCapacity: 'Anzahl der Ersatzteile',
		wheelRepairsCapacity: 'Anzahl der Räder zu reparieren',
		trailerMass: 'Gewicht des Anhängers',
		fuelMass: 'Gewicht des Kraftstoffs',
		wheels: 'Räder',
		wheel: 'Das Rad',
		suspHeight: 'Höhe der Aufhängung',
		suspStrength: 'Federungssteifigkeit'
	},
	CH: {
		quantity: '货物数量',
		inner: '有用的内容',
		mass: '重量',
		other: '其他',
		price: '价格',
		fuelCapacity: '燃油容量',
		repairsCapacity: '零部件的数量',
		wheelRepairsCapacity: '需要修复的车轮数量',
		trailerMass: '拖车重量',
		fuelMass: '燃料重量',
		wheels: '轮子',
		wheel: '轮子',
		suspHeight: '悬架高度',
		suspStrength: '悬架刚度'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		price: 'Цена самого автомобиля (без учёта составляющих)',
		fuelCapacity: 'Кол-во топлива у прицепа',
		repairsCapacity: 'Кол-во запчастей у прицепа',
		wheelRepairsCapacity: 'Кол-во запасных колёс у прицепа',
		trailerMass: 'Масса прицепа',
		fuelMass: 'Масса топлива',
		quantity: 'Максимальное кол-во перевозимого груза'
	},
	EN: {
		price: 'Der Preis des Autos selbst (ohne die Komponenten)',
		fuelCapacity: 'Fuel quantity of the trailer',
		repairsCapacity: 'Number of spare parts for the trailer',
		wheelRepairsCapacity: 'Number of spare wheels in the trailer',
		trailerMass: 'Trailer mass',
		fuelMass: 'Fuel mass',
		quantity: 'Maximum quantity of cargo to be transported'
	},
	DE: {
		price: 'The price of the car itself (excluding components)',
		fuelCapacity: 'Kraftstoffmenge am Anhänger',
		repairsCapacity: 'Anzahl der Ersatzteile am Anhänger',
		wheelRepairsCapacity: 'Anzahl der Ersatzräder am Anhänger',
		trailerMass: 'Gewicht des Anhängers',
		fuelMass: 'Gewicht des Kraftstoffs',
		quantity: 'Maximale Menge der Fracht'
	},
	CH: {
		price: '汽车本身的价格（不包括零部件）。',
		fuelCapacity: '拖车的燃料容量',
		repairsCapacity: '拖车上的备件数量',
		wheelRepairsCapacity: '拖车上的备胎数量',
		trailerMass: '拖车重量',
		fuelMass: '燃料重量',
		quantity: '携带的最大负荷数'
	}
}[Config.obj.lang]
