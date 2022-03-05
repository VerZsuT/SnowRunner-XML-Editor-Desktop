import Config from 'main/classes/Config'

export const texts = {
	RU: {
		bodyFriction: 'Сцепление на бездорожье',
		bodyFrictionAsphalt: 'Сцепление на асфальте',
		substanceFriction: 'Сцепление в грязи',
		ignoreIse: 'Едет по льду',
		yes: 'Да',
		no: 'Нет'
	},
	EN: {
		bodyFriction: 'Body friction',
		bodyFrictionAsphalt: 'Body friction asphalt',
		substanceFriction: 'Substance friction',
		ignoreIse: 'Rides on ice',
		yes: 'Yes',
		no: 'No'
	},
	DE: {
		bodyFriction: 'Körperreibung',
		bodyFrictionAsphalt: 'Körperreibung asphalt',
		substanceFriction: 'Substanzreibung',
		ignoreIse: 'Fahrten auf Eis',
		yes: 'Ja',
		no: 'Nein'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		bodyFriction: 'Коэффициент сцепления на твёрдом грунте',
		bodyFrictionAsphalt: 'Коэффициент сцепления на асфальте (статических камнях)',
		substanceFriction: 'Коэффициент сцепления в грязи',
		ignoreIse: 'Будет ли колесо ехать по льду как цепное'
	},
	EN: {
		bodyFriction: 'Coefficient of adhesion on solid ground',
		bodyFrictionAsphalt: 'Coefficient of adhesion on asphalt (static stones)',
		substanceFriction: 'Coefficient of grip in mud',
		ignoreIse: 'Will the wheel ride on the ice like a chain wheel'
	},
	DE: {
		bodyFriction: 'Koeffizient der Haftung auf hartem Boden',
		bodyFrictionAsphalt: 'Koeffizient der Haftung auf Asphalt (statische Steine)',
		substanceFriction: 'Koeffizient der Kupplung im Schlamm',
		ignoreIse: 'Wird das Rad wie eine Kette auf dem Eis fahren'
	}
}[Config.obj.lang]
