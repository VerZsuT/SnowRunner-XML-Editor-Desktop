export const descs = {
	RU: {
		UIName: 'Название авто в игре (либо ключ перевода)',
		UIDesc: 'Описание авто в игре (либо ключ перевода)',
		backSteerSpeed: 'Скорость, с которой колёса возвращаются на исходную позицию после поворота',
		steerSpeed: 'Скорость, с которой поворачивается руль.',
		defaultWinch: 'ID лебёдки по умолчанию',
		isUpgradable: 'Улучшается ли лебёдка',
		winchesFile: 'Кнопки для редактирования лебёдок',
		defaultRim: 'ID обода по умолчанию',
		defaultTire: 'ID покрышки по умолчанию',
		defaultWheelType: 'Название xml-файла с колёсами',
		defaultSuspension: 'ID подвески по умолчанию',
		suspensionsFile: 'Название файла с подвесками',
		diffLock: 'Настройки блокировки дифференциала',
		defaultGearbox: 'ID КПП по умолчанию',
		gearboxesFile: 'Название файла с коробками передач',
		defaultEngine: 'ID двигателя по умолчанию',
		exhaustStartTime: 'Время начала визуализации выхлопа.',
		engineStartDelay: 'Задержка после нажатия "включить двигатель"',
		damageCapacity: 'Запас прочности бензобака',
		fuelCapacity: 'Максимальное количество топлива в баке',
		country: 'Страна разблокировки',
		price: 'Цена самого автомобиля (без учёта составляющих)',
		byExploration: 'Способ разблокировки автомобиля',
		unlockByRank: 'Уровень разблокировки автомобиля',
		enginesFile: 'Название файла с двигателями',
		centerOfMass: 'Смещение центра масс тела относительно центра масс, рассчитанного движком игры',
		location: 'Используется только для составных колес, для определения того, переднее это колесо или заднее.',
		torque: 'То, когда колесо будет ведущим',
		steeringAngle: 'Максимальный угол поворота колеса при рулении'
	},
	EN: {
		UIName: 'The name of the car in the game (or the transfer key)',
		UIDesc: 'Description of the car in the game (or the transfer key)',
		backSteerSpeed: 'The speed at which the wheels return to their original position after turning',
		steerSpeed: 'The speed at which the steering wheel turns.',
		defaultWinch: 'Default winch ID',
		isUpgradable: 'Is the winch improving',
		winchesFile: 'Buttons for editing winches',
		defaultRim: 'Default rim ID',
		defaultTire: 'Default tire ID',
		defaultWheelType: 'Name of the xml file with wheels',
		defaultSuspension: 'Default suspension ID',
		suspensionsFile: 'Name of the file with suspensions',
		diffLock: 'Differential Lock Settings',
		defaultGearbox: 'Default gearbox ID',
		gearboxesFile: 'Name of the transmission file',
		defaultEngine: 'Default engine ID',
		exhaustStartTime: 'The start time of the exhaust visualization.',
		engineStartDelay: 'Delay after pressing "turn on the engine"',
		damageCapacity: 'Fuel tank safety margin',
		fuelCapacity: 'Maximum amount of fuel in the tank',
		country: 'Unlock country',
		price: 'Der Preis des Autos selbst (ohne die Komponenten)',
		byExploration: 'How to unlock the car',
		unlockByRank: 'Car Unlock Level',
		enginesFile: 'Name of the file with engines',
		centerOfMass: 'The displacement of the center of mass of the body relative to the center of mass calculated by the game engine',
		location: 'Used only for compound wheels, to determine whether it is a front wheel or a rear wheel.',
		torque: 'When the wheel will be leading',
		steeringAngle: 'Maximum steering angle of the wheel'
	},
	DE: {
		UIName: 'Name des Autos im Spiel (oder Übersetzungsschlüssel)',
		UIDesc: 'Beschreibung von Auto im Spiel (oder Schlüssel Übersetzung)',
		backSteerSpeed: 'Die Geschwindigkeit, mit der die Räder nach dem Abbiegen in die Ausgangsposition zurückkehren',
		steerSpeed: 'Die Geschwindigkeit, mit der sich das Lenkrad dreht.',
		defaultWinch: 'Standard-Winde-ID',
		isUpgradable: 'Verbessert sich die Winde',
		winchesFile: 'Schaltflächen zum Bearbeiten von Winden',
		defaultRim: 'Standard-Felge-ID',
		defaultTire: 'Standard-Reifen-ID',
		defaultWheelType: 'Name der XML - Datei mit den Standardrädern',
		defaultSuspension: 'Standard-Suspension-ID',
		suspensionsFile: 'Dateiname mit Aufhängungen',
		diffLock: 'Differentialsperre Einstellungen',
		defaultGearbox: 'Standard-Getriebe-ID',
		gearboxesFile: 'Dateiname mit Getriebe',
		defaultEngine: 'Standard-Motor-ID',
		exhaustStartTime: 'Startzeit Visualisierung Auspuff.',
		engineStartDelay: 'Verzögerung nach dem Drücken von "Motor einschalten"',
		damageCapacity: 'Sicherheitsmarge des Benzinbehälters',
		fuelCapacity: 'Maximale Kraftstoffmenge im Tank',
		country: 'Land entsperren',
		price: 'The price of the car itself (excluding components)',
		byExploration: 'Methode zum Entsperren des Autos',
		unlockByRank: 'Auto entsperren Ebene',
		enginesFile: 'Dateiname mit Motoren',
		centerOfMass: 'Verschiebung der Körpermassenmitte relativ zum von der Spiel-Engine berechneten Massenzentrum',
		location: 'Wird nur für zusammengesetzte Räder verwendet, um zu bestimmen, ob das Vorderrad oder das Hinterrad ist.',
		torque: 'Wann das Rad fahren wird',
		steeringAngle: 'Maximaler Lenkwinkel des Rades beim Lenken'
	}
}[config.lang]

export const texts = {
	EN: {
		physicsWheels: 'Additional settings',
		wheel: 'Wheel',
		location: 'Type',
		front: 'Front',
		rear: 'Back',
		torque: 'Torsion type',
		torqueDefault: 'Always leading',
		torqueFull: 'Driving with all-wheel drive',
		torqueNone: 'Slave',
		torqueConnectable: 'Defined by the addon',
		steeringAngle: 'Angle of rotation',
		centerOfMass: 'Center of mass offset',
		any: 'AnyA',
		none: 'None',
		textGroupName: 'Texts',
		UIDesc: 'Description',
		UIName: 'Name',
		controlGroupName: 'Control',
		backSteerSpeed: 'Back steer speed',
		steerSpeed: 'Steer speed',
		winchGroupName: 'Winch',
		defaultWinch: 'Default winch',
		isUpgradable: 'Winch upgrade',
		allow: 'Available',
		notAllow: 'Not Available',
		winchesFile: 'Winches file',
		wheelsGroupName: 'Wheels',
		defaultRim: 'Default rim',
		defaultTire: 'Default tire',
		defaultWheelType: 'Tires file',
		suspensionGroupName: 'Suspension',
		defaultSuspension: 'Default suspension',
		suspensionsFile: 'Suspensions file',
		diffLock: 'Differential lock',
		installed: 'Installed',
		uninstalled: 'Uninstalled',
		always: 'Always',
		gearboxGroupName: 'Gearbox',
		defaultGearbox: 'Default gearbox',
		gearboxesFile: 'Gearboxes file',
		engineGroupName: 'Engine',
		defaultEngine: 'Default engine',
		enginesFile: 'Engines file',
		engineStartDelay: 'Engine start delay',
		exhaustStartTime: 'Exhaust start time',
		fuelGroupName: 'Fuel',
		damageCapacity: 'Damage capacity',
		fuelCapacity: 'Fuel capacity',
		unlockGroupName: 'Unlock',
		country: 'Country',
		russia: 'Russia',
		usa: 'USA',
		price: 'Price',
		byExploration: 'Unlock method',
		findOnMap: 'Find on map',
		byRank: 'By rank',
		unlockByRank: 'Unlock level'
	},
	RU: {
		physicsWheels: 'Доп. настройки',
		wheel: 'Колесо',
		location: 'Тип',
		front: 'Переднее',
		rear: 'Заднее',
		torque: 'Тип кручения',
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
		defaultWinch: 'Лебёдка по умолчанию',
		isUpgradable: 'Улучшение лебёдки',
		allow: 'Доступно',
		notAllow: 'Недоступно',
		winchesFile: 'Файл с лебёдками',
		wheelsGroupName: 'Колёса',
		defaultRim: 'Обод по умолчанию',
		defaultTire: 'Колёса по умолчанию',
		defaultWheelType: 'Файл с колёсами',
		suspensionGroupName: 'Подвеска',
		defaultSuspension: 'Подвеска по умолчанию',
		suspensionsFile: 'Файл с подвесками',
		diffLock: 'Блокировка дифференциала',
		installed: 'Установлена',
		uninstalled: 'Не установлена',
		always: 'Всегда',
		gearboxGroupName: 'Коробка передач',
		defaultGearbox: 'Коробка передач по умолчанию',
		gearboxesFile: 'Файл с коробками передач',
		engineGroupName: 'Двигатель',
		defaultEngine: 'Двигатель по умолчанию',
		enginesFile: 'Файл с двигателями',
		engineStartDelay: 'Задержка запуска двигателя',
		exhaustStartTime: 'Время начала выхлопа',
		fuelGroupName: 'Топливо',
		damageCapacity: 'Прочность',
		fuelCapacity: 'Объём топлива',
		unlockGroupName: 'Разблокировка',
		country: 'Страна',
		russia: 'Россия',
		usa: 'США',
		price: 'Цена',
		byExploration: 'Способ разблокировки',
		findOnMap: 'Найти на карте',
		byRank: 'По достижению уровня',
		unlockByRank: 'Уровень разблокировки'
	},
	DE: {
		physicsWheels: 'Weitere Einstellungen',
		wheel: 'Rad',
		location: 'Typ',
		front: 'Vorne',
		rear: 'Hinten',
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
		defaultWinch: 'Standardwinde',
		isUpgradable: 'Winde Upgrade',
		allow: 'Verfügbar',
		notAllow: 'Nicht verfügbar',
		winchesFile: 'Winden Datei',
		wheelsGroupName: 'Räder',
		defaultRim: 'Standard-Felge',
		defaultTire: 'Standardreifen',
		defaultWheelType: 'Reifendatei',
		suspensionGroupName: 'Aufhängung',
		defaultSuspension: 'Standardaufhängung',
		suspensionsFile: 'aufhängungs datei',
		diffLock: 'Differenzialsperre',
		installed: 'Installiert',
		uninstalled: 'nicht Installiert',
		always: 'Immer',
		gearboxGroupName: 'Getriebe',
		defaultGearbox: 'Standardgetriebe',
		gearboxesFile: 'Getriebe datei',
		engineGroupName: 'Motor',
		defaultEngine: 'Standardmotor',
		enginesFile: 'Motor datei',
		engineStartDelay: 'Motorstartverzögerung',
		exhaustStartTime: 'Startzeit des Abgases',
		fuelGroupName: 'Treibstoff',
		damageCapacity: 'Schadenskapazität',
		fuelCapacity: 'Kraftstoffkapazität',
		unlockGroupName: 'Freischalten',
		country: 'Land',
		russia: 'Russland',
		usa: 'Vereinigte Staaten von Amerika',
		price: 'Preis',
		byExploration: 'Methode entsperren',
		findOnMap: 'Auf Karte finden',
		byRank: 'Nach Rang',
		unlockByRank: 'Level freischalten'
	}
}[config.lang]
