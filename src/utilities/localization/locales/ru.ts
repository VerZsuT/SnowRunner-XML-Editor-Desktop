/**
 * Русская локализация интерфейса.
 *
 * Эталон структуры: остальные языки обязаны содержать те же ключи, полнота
 * проверяется компилятором. Английский — подстраховка для переводов.
 */
export const ru = {
	/** Список автомобилей. */
	lists: {
		title: 'Список авто',
		trucksCategory: 'Автомобили',
		trailersCategory: 'Прицепы',
		allSources: 'Все источники',
		mainSource: 'Основная игра',
		dlcSource: 'DLC',
		modsSource: 'Моды',
		editMods: 'Изменить',
		favoritesSource: 'Избранное',
		editedSource: 'Изменённые',
		addFavorite: 'Добавить в избранное',
		removeFavorite: 'Убрать из избранного',
		editedMark: 'Файл изменён',
		allTypes: 'Все классы',
		heavyType: 'Тяжёлый',
		heavyDutyType: 'Сверхтяжёлый',
		highwayType: 'Шоссейный',
		offroadType: 'Внедорожный',
		scoutType: 'Разведывательный',
		specialType: 'Специальный',
		search: 'Поиск по имени',
		nothingFound: 'Ничего не найдено',
		noGameFiles: 'Файлы игры не найдены. Укажите initial.pak, чтобы распаковать их.',
		openArchive: 'Выбрать initial.pak',
		unpacking: 'Распаковка...',
		unpacked: 'Распаковано файлов: {}',
		retry: 'Повторить',
		filtersToggle: 'Фильтры',
		cardsMode: 'Карточки',
		listMode: 'Список',
		export: 'Экспорт',
		import: 'Импорт',
		reset: 'Сбросить',
		resetConfirm: 'Сбросить правки файла и записать файл заново?',
		exported: 'Экспортировано атрибутов: {}',
		imported: 'Импортировано атрибутов: {}',
		resetDone: 'Файл сброшен',
		cancel: 'Отмена',
		close: 'Закрыть'
	},

	/** Экран настройки. */
	welcome: {
		title: 'Первоначальная настройка',
		language: 'Язык программы',
		gameData: 'Игровые данные',
		hint: 'Укажите папку с игрой или сам файл initial.pak',
		gameFolder: 'Папка с игрой',
		initialFile: 'initial.pak',
		next: 'Дальше',
		invalidFolder: 'В выбранной папке нет initial.pak. Укажите папку игры или файл вручную.',
		unpacking: 'Распаковка...',
		unpacked: 'Распаковано файлов: {}',
		loadError: 'Не удалось прочитать настройки'
	},

	/** Верхнее меню. */
	menu: {
		file: 'Файл',
		backup: 'Бэкап',
		settings: 'Настройки',
		help: 'Помощь',
		openFiles: 'Открыть файлы',
		updateArchive: 'Обновить архив',
		unpackArchive: 'Распаковать архив',
		exit: 'Выход',
		openBackup: 'Открыть',
		saveBackup: 'Сохранить',
		restoreBackup: 'Восстановить',
		openSettings: 'Настройки',
		reset: 'Сбросить',
		resetConfirm: 'Сбросить настройки, удалить распакованные данные игры, бэкап и модификации?',
		uninstall: 'Удалить программу',
		uninstallConfirm: 'Запустить удаление программы?',
		version: 'Версия',
		howToUse: 'Как пользоваться',
		github: 'Github',
		youtube: 'YouTube(RU)',
		support: 'Поддержать'
	},

	setup: {
		title: 'Данные игры',
		paths: 'Пути программы',
		dataRoot: 'Каталог данных',
		mode: 'Режим хранения',
		modeInstalled: 'Установленная сборка',
		modePortable: 'Портативная сборка',
		modeDev: 'Режим разработки',
		classes: 'Файлы игры',
		mainTemp: 'Распакованные данные',
		backupFolder: 'Каталог бэкапов',
		backupInitial: 'Бэкап initial.pak',
		game: 'Файлы игры',
		archivePath: 'Путь к initial.pak',
		noPath: 'Архив не выбран',
		choose: 'Выбрать',
		unpack: 'Распаковать',
		unpackConfirm: 'Сначала будет сделан бэкап архива, затем файлы игры распакуются заново. Продолжить?',
		unpacked: 'Распаковано файлов: {}',
		backup: 'Бэкап',
		backedUp: 'Бэкап сохранён: {}',
		update: 'Обновить архив',
		updateMod: 'Записать мод в .pak',
		updated: 'Записей обновлено: {}',
		verify: 'Проверить',
		verified: 'Записей проверено: {}',
		restore: 'Восстановить из бэкапа',
		restoreConfirm: 'Заменить initial.pak копией из каталога данных? Несохранённые изменения архива будут потеряны.',
		restored: 'Архив восстановлен из бэкапа',
		mods: 'Моды',
		noMods: 'Моды не добавлены',
		foundMods: 'Найденные моды',
		addSelected: 'Добавить выбранные',
		noFoundMods: 'Моды не найдены',
		addMod: 'Добавить мод (.pak)',
		syncMods: 'Обновить моды',
		removeMod: 'Убрать мод из списка',
		modeConfirm: 'Сменить режим хранения данных? JSON-файлы программы будут перенесены в новый каталог, файлы игры и бэкапы нужно будет распаковать заново.',
		modeSwitched: 'Режим изменён. Перенесено файлов: {}. Перезапустите программу.',
		restartConfirm: 'Перезапустить программу сейчас?',
		restart: 'Перезапустить',
		cancel: 'Отмена',
		saved: 'Настройки сохранены',
		loadError: 'Не удалось прочитать настройки'
	},

	/** Окно настроек. */
	settings: {
		title: 'Настройки',
		language: 'Язык программы',
		updates: 'Обновлять программу',
		mods: 'Редактировать модификации',
		advanced: 'Продвинутый режим',
		portable: 'Портативный режим'
	},

	/** Редактор. */
	editor: {
		title: 'Редактор',
		type: 'Тип',
		trucks: 'Автомобили и прицепы',
		noGameFiles: 'Файлы игры не найдены. Укажите initial.pak, чтобы распаковать их.',
		openArchive: 'Выбрать initial.pak',
		unpacking: 'Распаковка...',
		unpacked: 'Распаковано файлов: {}',
		refresh: 'Обновить',
		save: 'Сохранить',
		saved: 'Сохранено',
		exportEpf: 'Экспорт параметров',
		importEpf: 'Импорт параметров',
		exported: 'Экспортировано атрибутов: {}',
		imported: 'Импортировано атрибутов: {}',
		unsaved: 'Есть несохранённые изменения',
		name: 'Название',
		files: 'Файлы',
		main: 'Основной',
		openFile: 'Открыть файл',
		inputMin: 'Минимум: {}',
		inputMax: 'Максимум: {}',
		inputDefault: 'По умолчанию: {}',
		inputGreenArea: 'Зелёная зона: {}',
		inputYellowArea: 'Жёлтая зона: {}',
		inputRedArea: 'Красная зона: {}',
		available: 'Доступно',
		notAvailable: 'Недоступно',
		engineDriven: 'Двигателя',
		batteryDriven: 'Аккумулятора',
		wheelExtra: 'Дополнительно',
		reset: 'Сбросить',
		resetDocument: 'Сбросить всё',
		resetConfirm: 'Сбросить все параметры документа к исходным значениям?',
		resetDone: 'Параметры сброшены. Не забудьте сохранить изменения',
		discardConfirm: 'Изменения не сохранены и будут потеряны. Закрыть редактор?',
		loadError: 'Не удалось открыть файл',
		cancel: 'Отмена',
		close: 'Закрыть',
		yes: 'Да',
		no: 'Нет',
		texts: 'Тексты',
		control: 'Управление',
		winch: 'Лебёдка',
		winches: 'Лебёдки',
		wheels: 'Колёса',
		wheel: 'Колесо',
		extraWheel: 'Доп. колесо',
		wheelSizes: 'Доступные размеры колёс',
		wheelSet: 'Набор колёс',
		suspension: 'Подвеска',
		suspensions: 'Подвески',
		suspensionSet: 'Набор подвесок',
		frontSuspension: 'Передняя подвеска',
		middleSuspension: 'Средняя подвеска',
		rearSuspension: 'Задняя подвеска',
		gearbox: 'Коробка передач',
		gearboxes: 'Коробки передач',
		gearboxParams: 'Параметры коробки',
		gears: 'Передачи',
		gear: 'Передача',
		reverseGear: 'Задняя передача',
		highGear: 'Повышенная передача',
		engine: 'Двигатель',
		engines: 'Двигатели',
		fuel: 'Топливный бак',
		physicsModel: 'Физическая модель',
		extra: 'Дополнительно',
		trailerInner: 'Полезное содержимое',
		massLabel: 'Масса',
		trailerMass: 'Масса прицепа',
		fuelMass: 'Масса топлива',
		trailerOther: 'Прочее',
		unlock: 'Разблокировка',
		tire: 'Покрышка',
		truck: 'Тягач',
		trailer: 'Прицеп',
		russia: 'Россия',
		usa: 'США',
		cas: 'Центральная Азия',
		ne: 'Северная Европа',
		findOnMap: 'Найти на карте',
		byRank: 'По достижению уровня',
		torqueDefault: 'Всегда ведущее',
		torqueFull: 'Ведущее при полном приводе',
		torqueNone: 'Ведомое',
		torqueConnectable: 'Определяется аддоном',
		diffLockAlways: 'Всегда включена',
		diffLockInstalled: 'Устанавливается',
		diffLockUninstalled: 'Не устанавливается',
		diffLockNone: 'Отсутствует',
		wheelFront: 'Переднее',
		wheelMiddle: 'Среднее',
		wheelRear: 'Заднее',
		drive: 'Привод',
		addonsContent: 'Содержимое аддонов',
		loadAddons: 'Загрузить аддоны',
		loadingAddons: 'Загрузка аддонов...',
		addonFilter: 'Фильтр по имени',
		noAddons: 'Аддоны не найдены',
		allAddons: 'Все',
		installedAddons: 'Установленные',
		installedAddon: 'Установлен',
		notInstalledAddon: 'Не установлен',
		createTruckData: 'Создать блок TruckData',
		addonSockets: 'Сокеты аддонов',
		socket: 'Сокет',
		shift: 'Сдвиг',
		addSocket: 'Добавить сокет',
		addShift: 'Добавить сдвиг',
		moveUp: 'Выше',
		moveDown: 'Ниже',
		removeConfirm: 'Удалить элемент?',
		cranes: 'Краны',
		crane: 'кран',
		cranesWarnTitle: 'Внимание!',
		cranesWarnMessage: 'Перед удалением крана требуется обязательно его снять с машины.',
		banditCrane: 'Банан бандита',
		banditWarnMessage: 'Для использования требуется купленное DLC с автомобилем KRS 58 "Бандит".',
		trailers: 'Прицепы',
		scoutTrailers: 'Прицепы для скаута',
		truckTrailers: 'Обычные прицепы',
		add: 'Добавить',
		remove: 'Удалить'
	},

	/** Окно обновления. */
	updateAlert: {
		title: 'Обновление',
		available: 'Доступна новая версия программы ({})',
		installer: 'Установщик (.exe)',
		portable: 'Портативная (.zip)',
		update: 'Обновить',
		ignore: 'Игнорировать',
		downloading: 'Загрузка обновления',
		downloaded: 'Загрузка завершена. Запускаем установщик...',
		downloadError: 'Не удалось загрузить обновление',
		close: 'Закрыть'
	},

	/** Окно «Что нового». */
	whatsNew: {
		title: 'Изменения в версии',
		changes: [
			'Программа переведена на Tauri (Rust): меньше размер и потребление памяти',
			'Портативная версия поставляется в архиве .zip',
			'Нужны Windows 10 или 11 (x64) и WebView2'
		]
	},

	/** Подписи параметров файлов игры. */
	dictionaries: {
		/** Двигатель. */
		engine: {
			name: 'Название',
			responsiveness: 'Отзывчивость',
			responsivenessDesc: 'Отзывчивость двигателя (скорость набирания оборотов)',
			fuelConsumption: 'Потребление топлива',
			fuelConsumptionDesc: 'Базовое потребление топлива двигателем',
			damagedConsumptionModifier: 'Множитель потребления топлива при повреждении',
			damagedConsumptionModifierDesc: 'Максимальное значение изменения расхода при поломке двигателя',
			torque: 'Крутящий момент',
			torqueDesc: 'Мощность двигателя',
			damagedMinTorqueModifier: 'Мин. множитель мощности при повреждении',
			damagedMinTorqueModifierDesc: 'Множитель мощности, когда ущерб движка достиг порога поломки',
			damagedMaxTorqueModifier: 'Макс. множитель мощности при повреждении',
			damagedMaxTorqueModifierDesc: 'Множитель мощности, когда движок близок к полной поломке (к 0 прочности)',
			brakesDelay: 'Задержка торможения',
			brakesDelayDesc: 'Задержка при торможении',
			maxDeltaAngVel: 'Макс. дельта угловой скорости',
			maxDeltaAngVelDesc: 'Ограничитель максимального углового ускорения колёс. Чем он меньше, тем медленнее разгоняется машина',
			criticalDamageThreshold: 'Порог критического повреждения',
			criticalDamageThresholdDesc: 'Порог критической поломки. После этого порога изменяется расход топлива и мощность двигателя',
			damageCapacity: 'Прочность',
			damageCapacityDesc: 'Размер допустимого ущерба двигателю'
		},

		/** Коробка передач. */
		gearbox: {
			name: 'Название',
			awdConsumptionModifier: 'Модификатор потребления топлива при полном приводе',
			awdConsumptionModifierDesc: 'Коэффициент изменения расхода топлива при использовании полного привода',
			criticalDamageThreshold: 'Порог критического повреждения',
			criticalDamageThresholdDesc: 'Порог повреждений, после которого коробка начинает проявлять признаки поломки - вылетающие передачи и увеличение расхода топлива',
			damageCapacity: 'Прочность',
			damageCapacityDesc: 'Размер допустимого ущерба коробке передач',
			damagedConsumptionModifier: 'Множитель потребления топлива при повреждении',
			damagedConsumptionModifierDesc: 'Максимальный множитель расхода топлива, к этому множителю расход приходит, когда коробка полностью сломана',
			fuelConsumption: 'Потребление топлива',
			fuelConsumptionDesc: 'Базовое потребление топлива коробкой передач',
			idleFuelConsumption: 'Множитель потребления топлива в бездействии',
			idleFuelConsumptionDesc: 'Множитель потребления топлива, когда автомобиль стоит на месте с заведенным двигателем',
			minBreakFreqDesc: 'Минимальная частота вылетания передачи, на момент, когда прочность достигла критического порога',
			maxBreakFreqDesc: 'Максимальная частота вылетания передачи, на момент, когда прочность приближается к нулю'
		},

		/** Передачи коробки. */
		gearboxParams: {
			isHighGearExists: 'Повышенная',
			isHighGearExistsDesc: 'Доступна ли повышенная передача',
			isLowerPlusGearExists: 'Пониженная+',
			isLowerPlusGearExistsDesc: 'Доступна ли пониженная+ (первая) передача',
			isLowerGearExists: 'Пониженная',
			isLowerGearExistsDesc: 'Доступна ли пониженная передача (45% скорости первой передачи)',
			isManualLowGear: 'Точная регулировка',
			isManualLowGearDesc: 'Доступна ли точная регулировка',
			isLowerMinusGearExists: 'Пониженная-',
			isLowerMinusGearExistsDesc: 'Доступна ли пониженная- передача (20% скорости первой передачи)'
		},

		/** Передача. */
		gear: {
			angVel: 'Макс. угловая скорость колеса',
			angVelDesc: 'Максимальная угловая скорость колеса на данной передаче',
			fuelModifier: 'Модификатор потребления топлива',
			fuelModifierDesc: 'Множитель потребления топлива на данной передаче'
		},

		/** Подвеска. */
		suspension: {
			height: 'Высота',
			heightDesc: 'Высота подвески',
			strength: 'Жёсткость',
			strengthDesc: 'Жесткость подвески',
			damping: 'Демпинг',
			dampingDesc: 'Снижение скорости и интенсивности вибраций',
			suspensionMin: 'Минимальная высота подвески',
			suspensionMinDesc: 'Минимальный ход подвески (Позиция, которую колесо может принять при полной просадке подвески)',
			suspensionMax: 'Максимальная высота подвески',
			suspensionMaxDesc: 'Максимальный ход подвески (Позиция, которую может принять колесо, если подвеска в рабочем состоянии и ее жесткость равна нулю, когда колесо висит в воздухе)',
			brokenSuspensionMax: 'Максимальная высота подвески (когда сломана)',
			brokenSuspensionMaxDesc: 'Максимальный ход сломанной подвески'
		},

		/** Набор подвесок. */
		suspensionSet: {
			name: 'Название',
			damageCapacity: 'Прочность',
			damageCapacityDesc: 'Размер допустимого ущерба подвеске',
			criticalDamageThreshold: 'Порог критического повреждения',
			criticalDamageThresholdDesc: 'Порог критического урона подвески',
			brokenWheelDamageMultiplierDesc: 'Коэффициент увеличения повреждения подвески при пробитом колесе'
		},

		/** Лебёдка. */
		winch: {
			name: 'Название',
			length: 'Длина',
			lengthDesc: 'Максимальная длина веревки лебедки',
			strengthMult: 'Сила',
			isEngineIgnitionRequired: 'Работает от',
			isEngineIgnitionRequiredDesc: 'Может ли лебёдка работать с заглушенным двигателем'
		},

		/** Лебёдка тягача. */
		truckWinch: {
			winchLength: 'Длина лебёдки',
			winchLengthDesc: 'Максимальная длина веревки лебедки',
			strengthMult: 'Сила лебёдки'
		},

		/** Колесо тягача. */
		truckWheel: {
			torque: 'Привод',
			torqueDesc: 'Тип привода колеса',
			steeringAngle: 'Угол поворота',
			steeringAngleDesc: 'Максимальный угол поворота колеса при рулении',
			steeringCastorDesc: 'Угол наклона колеса в сторону поворота',
			suspensionHeight: 'Высота подвески',
			suspensionHeightDesc: 'Высота подвески колеса',
			suspensionStrength: 'Жёсткость подвески',
			suspensionStrengthDesc: 'Жесткость подвески колеса'
		},

		/** Данные тягача. */
		truckData: {
			backSteerSpeed: 'Скорость возврата колёс',
			backSteerSpeedDesc: 'Скорость, с которой руль возвращается в исходное положение после поворота',
			diffLockType: 'Блокировка дифференциала',
			engineStartDelay: 'Задержка запуска двигателя',
			engineStartDelayDesc: 'Задержка после нажатия "включить двигатель"',
			exhaustStartTime: 'Время начала выхлопа',
			exhaustStartTimeDesc: 'Время начала выхлопа',
			responsiveness: 'Чувствительность руля',
			responsivenessDesc: 'Чувствительность рулевого управления',
			steerSpeed: 'Скорость руля',
			steerSpeedDesc: 'Скорость поворота руля'
		},

		/** Данные аддона. */
		addonTruckData: {
			fuelCapacity: 'Объём',
			fuelCapacityDesc: 'Объём топлива в аддоне',
			waterCapacity: 'Объём воды',
			waterCapacityDesc: 'Объём воды в аддоне',
			repairsCapacity: 'Кол-во запчастей',
			repairsCapacityDesc: 'Количество ремонтных частей в аддоне',
			wheelRepairsCapacity: 'Кол-во колёс для ремонта',
			wheelRepairsCapacityDesc: 'Количество ремонтных колёс в аддоне'
		},

		/** Данные тягача в игре. */
		truckGameData: {
			country: 'Страна',
			countryDesc: 'Регион, в котором автомобиль доступен для покупки'
		},

		/** Сокеты аддонов. */
		addonSlots: {
			quantity: 'Кол-во груза',
			quantityDesc: 'Количество слотов для груза'
		},

		/** Совместимые колёса. */
		compatibleWheels: {
			scale: 'Размер колеса',
			type: 'Название'
		},

		/** Топливный бак. */
		fuelTank: {
			damageCapacity: 'Прочность',
			damageCapacityDesc: 'Размер допустимого ущерба бензобака'
		},

		/** Данные игры. */
		gameData: {
			price: 'Цена',
			priceDesc: 'Стоимость предмета / автомобиля в магазине. В случае автомобиля это лишь базовая стоимость, не включающая стоимость стандартного оборудования при покупке в магазине',
			unlockByExploration: 'Способ разблокировки',
			unlockByExplorationDesc: 'Разблокируется ли предмет / автомобиль при помощи поиска на локации (разведки)',
			unlockByRank: 'Уровень разблокировки',
			unlockByRankDesc: 'При достижении какого уровня открывается предмет / автомобиль. Игнорируется если стоит разблокировка разведкой'
		},

		/** Тексты игры. */
		uiDesc: {
			uiDesc: 'Описание',
			uiDescDesc: 'Описание предмета',
			uiName: 'Название',
			uiNameDesc: 'Название предмета'
		},

		/** Физическая модель. */
		physicsBody: {
			mass: 'Масса',
			centerOfMassOffset: 'Смещение центра масс'
		},

		/** Диск. */
		rim: {
			name: 'Название'
		},

		/** Покрышка. */
		tire: {
			name: 'Название'
		},

		/** Сцепление колёс. */
		wheelFriction: {
			bodyFriction: 'Сцепление на бездорожье',
			bodyFrictionDesc: 'Трение с грунтом, без грязи и других объектов',
			bodyFrictionAsphalt: 'Сцепление на асфальте',
			bodyFrictionAsphaltDesc: 'Трение с дорогой',
			substanceFriction: 'Сцепление в грязи',
			substanceFrictionDesc: 'Трение с грязью',
			isIgnoreIce: 'Едет по льду',
			isIgnoreIceDesc: 'Имеет ли колесо хорошее сцепление на льду'
		}
	}
}