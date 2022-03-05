import Config from 'main/classes/Config'

export const texts = {
	RU: {
		physicsWheels: 'Дополнительно',
		wheel: 'Колесо',
		extraWheel: 'Доп. колесо',
		wheelsSizes: 'Доступные размеры колёс',
		wheelsSet: 'Набор колёс',
		wheelScale: 'Размер колеса',
		winchLength: 'Длина лебёдки',
		winchStrength: 'Сила лебёдки',
		responsiveness: 'Чувствительность руля',
		torque: 'Привод',
		torqueDefault: 'Всегда ведущее',
		torqueFull: 'Ведущее при полном приводе',
		torqueNone: 'Ведомое',
		torqueConnectable: 'Определяется аддоном',
		steeringAngle: 'Угол поворота',
		centerOfMass: 'Смещение центра масс',
		any: 'Любая',
		none: 'Отсутствует',
		textGroupName: 'Тексты',
		UIDesc: 'Описание',
		UIName: 'Название',
		controlGroupName: 'Управление',
		backSteerSpeed: 'Скорость возврата колёс',
		steerSpeed: 'Скорость руля',
		winchGroupName: 'Лебёдка',
		wheelsGroupName: 'Колёса',
		suspensionGroupName: 'Подвеска',
		diffLock: 'Блокировка дифференциала',
		installed: 'Установлена',
		uninstalled: 'Не установлена',
		always: 'Всегда',
		gearboxGroupName: 'Коробка передач',
		engineGroupName: 'Двигатель',
		engineStartDelay: 'Задержка запуска двигателя',
		exhaustStartTime: 'Время начала выхлопа',
		fuelGroupName: 'Топливный бак',
		damageCapacity: 'Прочность',
		fuelCapacity: 'Объём',
		unlockGroupName: 'Разблокировка',
		country: 'Страна',
		russia: 'Россия',
		us: 'США',
		price: 'Цена',
		byExploration: 'Способ разблокировки',
		findOnMap: 'Найти на карте',
		byRank: 'По достижению уровня',
		unlockByRank: 'Уровень разблокировки'
	},
	EN: {
		physicsWheels: 'Extra',
		wheel: 'Wheel',
		extraWheel: 'Extra wheel',
		wheelsSizes: 'Available wheel sizes',
		wheelsSet: 'Set of wheels',
		wheelScale: 'Wheel size',
		winchLength: 'Winch length',
		winchStrength: 'Winch strength',
		responsiveness: 'Steering wheel sensitivity',
		torque: 'Drive',
		torqueDefault: 'Always leading',
		torqueFull: 'Driving with all-wheel drive',
		torqueNone: 'Slave',
		torqueConnectable: 'Defined by the addon',
		steeringAngle: 'Steering angle',
		centerOfMass: 'Center of mass offset',
		any: 'Any',
		none: 'None',
		textGroupName: 'Texts',
		UIDesc: 'Description',
		UIName: 'Name',
		controlGroupName: 'Control',
		backSteerSpeed: 'Back steer speed',
		steerSpeed: 'Steer speed',
		winchGroupName: 'Winch',
		wheelsGroupName: 'Wheels',
		suspensionGroupName: 'Suspension',
		diffLock: 'Differential lock',
		installed: 'Installed',
		uninstalled: 'Uninstalled',
		always: 'Always',
		gearboxGroupName: 'Gearbox',
		engineGroupName: 'Engine',
		engineStartDelay: 'Engine start delay',
		exhaustStartTime: 'Exhaust start time',
		fuelGroupName: 'Fuel',
		damageCapacity: 'Damage capacity',
		fuelCapacity: 'Fuel capacity',
		unlockGroupName: 'Unlock',
		country: 'Country',
		russia: 'Russia',
		us: 'USA',
		price: 'Price',
		byExploration: 'Unlock method',
		findOnMap: 'Find on map',
		byRank: 'By rank',
		unlockByRank: 'Unlock level'
	},
	DE: {
		physicsWheels: 'Radantrieb',
		wheel: 'Rad',
		extraWheel: 'Zusätzliches Rad',
		wheelsSizes: 'Verfügbare Radgrößen',
		wheelsSet: 'Satz von Rädern',
		wheelScale: 'Rad-Größe',
		winchLength: 'Länge der Winde',
		winchStrength: 'Kraft der Winde',
		responsiveness: 'Empfindlichkeit des Lenkers',
		torque: 'Torsionsart',
		torqueDefault: 'Immer Moderator',
		torqueFull: 'Allradantrieb',
		torqueNone: 'Slave',
		torqueConnectable: 'Definiert durch Addon',
		steeringAngle: 'Drehwinkel',
		centerOfMass: 'Versatz des Massenzentrums',
		any: 'Jede',
		none: 'Fehlt',
		textGroupName: 'Texte',
		UIName: 'Der Name',
		UIDesc: 'Die Beschreibung',
		controlGroupName: 'Kontrolle',
		backSteerSpeed: 'Die Rücklaufquote der Spitze',
		steerSpeed: 'Geschwindigkeit lenken',
		winchGroupName: 'Winde',
		wheelsGroupName: 'Räder',
		suspensionGroupName: 'Aufhängung',
		diffLock: 'Differenzialsperre',
		installed: 'Installiert',
		uninstalled: 'nicht Installiert',
		always: 'Immer',
		gearboxGroupName: 'Getriebe',
		engineGroupName: 'Motor',
		engineStartDelay: 'Motorstartverzögerung',
		exhaustStartTime: 'Startzeit des Abgases',
		fuelGroupName: 'Treibstoff',
		damageCapacity: 'Schadenskapazität',
		fuelCapacity: 'Kraftstoffkapazität',
		unlockGroupName: 'Freischalten',
		country: 'Land',
		russia: 'Russland',
		us: 'Vereinigte Staaten von Amerika',
		price: 'Preis',
		byExploration: 'Methode entsperren',
		findOnMap: 'Auf Karte finden',
		byRank: 'Nach Rang',
		unlockByRank: 'Level freischalten'
	}
}[Config.obj.lang]

export const descs = {
	RU: {
		UIName: 'Название авто в игре (либо ключ перевода)',
		UIDesc: 'Описание авто в игре (либо ключ перевода)',
		backSteerSpeed: 'Скорость, с которой колёса возвращаются на исходную позицию после поворота',
		steerSpeed: 'Скорость, с которой поворачивается руль.',
		isUpgradable: 'Улучшается ли лебёдка',
		diffLock: 'Настройки блокировки дифференциала',
		exhaustStartTime: 'Время начала визуализации выхлопа.',
		engineStartDelay: 'Задержка после нажатия "включить двигатель"',
		damageCapacity: 'Запас прочности бензобака',
		fuelCapacity: 'Максимальное количество топлива в баке',
		country: 'Страна разблокировки',
		price: 'Цена самого автомобиля (без учёта составляющих)',
		byExploration: 'Способ разблокировки автомобиля',
		unlockByRank: 'Уровень разблокировки автомобиля',
		centerOfMass: 'Смещение центра масс тела относительно центра масс, рассчитанного движком игры',
		torque: 'То, когда колесо будет ведущим',
		steeringAngle: 'Максимальный угол поворота колеса при рулении'
	},
	EN: {
		UIName: 'The name of the car in the game (or the transfer key)',
		UIDesc: 'Description of the car in the game (or the transfer key)',
		backSteerSpeed: 'The speed at which the wheels return to their original position after turning',
		steerSpeed: 'The speed at which the steering wheel turns.',
		isUpgradable: 'Is the winch improving',
		diffLock: 'Differential Lock Settings',
		exhaustStartTime: 'The start time of the exhaust visualization.',
		engineStartDelay: 'Delay after pressing "turn on the engine"',
		damageCapacity: 'Fuel tank safety margin',
		fuelCapacity: 'Maximum amount of fuel in the tank',
		country: 'Unlock country',
		price: 'Der Preis des Autos selbst (ohne die Komponenten)',
		byExploration: 'How to unlock the car',
		unlockByRank: 'Car Unlock Level',
		centerOfMass: 'The displacement of the center of mass of the body relative to the center of mass calculated by the game engine',
		torque: 'When the wheel will be leading',
		steeringAngle: 'Maximum steering angle of the wheel'
	},
	DE: {
		UIName: 'Name des Autos im Spiel (oder Übersetzungsschlüssel)',
		UIDesc: 'Beschreibung von Auto im Spiel (oder Schlüssel Übersetzung)',
		backSteerSpeed: 'Die Geschwindigkeit, mit der die Räder nach dem Abbiegen in die Ausgangsposition zurückkehren',
		steerSpeed: 'Die Geschwindigkeit, mit der sich das Lenkrad dreht.',
		isUpgradable: 'Verbessert sich die Winde',
		diffLock: 'Differentialsperre Einstellungen',
		exhaustStartTime: 'Startzeit Visualisierung Auspuff.',
		engineStartDelay: 'Verzögerung nach dem Drücken von "Motor einschalten"',
		damageCapacity: 'Sicherheitsmarge des Benzinbehälters',
		fuelCapacity: 'Maximale Kraftstoffmenge im Tank',
		country: 'Land entsperren',
		price: 'The price of the car itself (excluding components)',
		byExploration: 'Methode zum Entsperren des Autos',
		unlockByRank: 'Auto entsperren Ebene',
		centerOfMass: 'Verschiebung der Körpermassenmitte relativ zum von der Spiel-Engine berechneten Massenzentrum',
		torque: 'Wann das Rad fahren wird',
		steeringAngle: 'Maximaler Lenkwinkel des Rades beim Lenken'
	}
}[Config.obj.lang]
