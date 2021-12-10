import Config from '@sxmle-app/classes/Config'

export const texts = {
	RU: {
		id: 'ID',
		width: 'Ширина',
		radius: 'Радиус',
		general: 'Общие настройки',
		damageCapacity: 'Прочность',
		bodyFriction: 'Сцепление на бездорожье',
		bodyFrictionAsphalt: 'Сцепление на асфальте',
		substanceFriction: 'Сцепление в грязи',
		ignoreIse: 'Едет по льду',
		yes: 'Да',
		no: 'Нет'
	},
	EN: {
		id: 'ID',
		general: 'General',
		damageCapacity: 'Damage capacity',
		width: 'Width',
		radius: 'Radius',
		bodyFriction: 'Body friction',
		bodyFrictionAsphalt: 'Body friction asphalt',
		substanceFriction: 'Substance friction',
		ignoreIse: 'Rides on ice',
		yes: 'Yes',
		no: 'No'
	},
	DE: {
		id: 'ID',
		width: 'Breite',
		radius: 'Radius',
		general: 'Allgemeines',
		damageCapacity: 'Schadenskapazität',
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
		damageCapacity: 'Запас прочности колёс',
		radius: 'Базовый радиус колёс (без учёта изменения в файле конкретной машины)',
		width: 'Ширина колёс. Также этот параметр определяет ширину следа и область налипания грязи на колесо',
		id: 'ID данных колёс',
		bodyFriction: 'Коэффициент сцепления на твёрдом грунте',
		bodyFrictionAsphalt: 'Коэффициент сцепления на асфальте (статических камнях)',
		substanceFriction: 'Коэффициент сцепления в грязи',
		ignoreIse: 'Будет ли колесо ехать по льду как цепное'
	},
	EN: {
		damageCapacity: 'Wheel safety margin',
		radius: 'The base radius of the wheels (without taking into account changes in the file of a specific machine)',
		width: 'The width of the wheels. This parameter also determines the width of the track and the area of dirt sticking to the wheel',
		id: 'Wheel data ID',
		bodyFriction: 'Coefficient of adhesion on solid ground',
		bodyFrictionAsphalt: 'Coefficient of adhesion on asphalt (static stones)',
		substanceFriction: 'Coefficient of grip in mud',
		ignoreIse: 'Will the wheel ride on the ice like a chain wheel'
	},
	DE: {
		damageCapacity: 'Sicherheitsmarge der Räder',
		radius: 'Basisradius der Räder (ohne Änderungen in der Datei einer bestimmten Maschine)',
		width: 'Breite der Räder. Dieser Parameter bestimmt auch die Breite der Spur und den Bereich, in dem sich Schmutz am Rad anhaftet',
		id: 'Rad-ID',
		bodyFriction: 'Koeffizient der Haftung auf hartem Boden',
		bodyFrictionAsphalt: 'Koeffizient der Haftung auf Asphalt (statische Steine)',
		substanceFriction: 'Koeffizient der Kupplung im Schlamm',
		ignoreIse: 'Wird das Rad wie eine Kette auf dem Eis fahren'
	}
}[Config.obj.lang]
