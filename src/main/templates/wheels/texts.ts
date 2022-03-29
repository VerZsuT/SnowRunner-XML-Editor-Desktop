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
	},
	CH: {
		bodyFriction: '越野车离合器',
		bodyFrictionAsphalt: '在沥青上的抓地力',
		substanceFriction: '泥浆中的离合器',
		ignoreIse: '在冰上驾驶',
		yes: '是',
		no: '没有'
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
	},
	CH: {
		bodyFriction: '固体地面附着系数',
		bodyFrictionAsphalt: '沥青上的粘附系数（静石）',
		substanceFriction: '泥浆中的粘附系数',
		ignoreIse: '轮子会像链子一样在冰上吗'
	}
}[Config.obj.lang]
