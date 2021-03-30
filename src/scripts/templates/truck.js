import { Template, Group, Input, Select, Opt, Selectors, Selector } from '../service/templateItems.js'
const truck = {
	main: [
		Template({}, [
			Group({name: '[TEXT_GROUP_NAME]', defaultSelector: '[UIDESC]'}, [
				Input({attribute: 'UiName', text: '[UINAME]', type: 'text'}),
				Input({attribute: 'UiDesc', text: '[UIDESC]', type: 'text'})
			]),
			Group({name: '[CONTROL_GROUP_NAME]', defaultSelector: '[TRUCK_DATA]'}, [
				Input({attribute: 'BackSteerSpeed', text: '[BACK_STEER_SPEED]', numberType: 'float', max: '1.0'}),
				Input({attribute: 'SteerSpeed', text: '[STEER_SPEED]', numberType: 'float'})
			]),
			Group({name: '[WINCH_GROUP_NAME]', defaultSelector: '[WINCH]'}, [
				Input({attribute: 'Default', text: '[DEFAULT_WINCH]', type: 'text', onlyDeveloper: 'true'}),
				Select({attribute: 'IsUpgradable', text: '[IS_UPGRADABLE]'}, [
					Opt({text: '[ALLOW]', value: 'true'}),
					Opt({text: '[NOT_ALLOW]', value: 'false'})
				]),
				Input({attribute: 'Type', text: '[WINCHES_FILE]', type: 'file', fileType: 'winches'})
			]),
			Group({name: '[WHEELS_GROUP_NAME]', defaultSelector: '[WHEELS]'}, [
				Input({attribute: 'DefaultRim', text: '[DEFAULT_RIM]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'DefaultTire', text: '[DEFAULT_TIRE]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'DefaultWheelType', text: '[TIRES_FILE]', type: 'file', fileType: 'wheels'}),
				Group({name: '[COMPATIBLE_WHEELS]'}, [
					Template({type: 'Multiply', itemSelector: '[COMPATIBLE_WHEELS]'}, [
						Group({nameType: 'Computed', nameAttribute: 'Type', nameSelector: '[COMPATIBLE_WHEELS_ITEM]', defaultSelector: '[COMPATIBLE_WHEELS_ITEM]'}, [
							Input({attribute: 'Scale', text: '[COMPATIBLE_WHEELS_SCALE]', numberType: 'float'})
						])
					])
				])
			]),
			Group({name: '[SUSPENSION_GROUP_NAME]', defaultSelector: '[SUSPENSION]'}, [
				Input({attribute: 'Default', text: '[DEFAULT_SUSPENSION]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'Type', text: '[SUSPENSIONS_FILE]', type: 'file', fileType: 'suspensions'}),
				Select({attribute: 'DiffLockType', text: '[DIFF_LOCK]', selector: '[TRUCK_DATA]'}, [
					Opt({text: '[NONE]', value: 'None'}),
					Opt({text: '[INSTALLED]', value: 'Installed'}),
					Opt({text: '[UNINSTALLED]', value: 'Uninstalled'}),
					Opt({text: '[ALWAYS]', value: 'Always'})
				])
			]),
			Group({name: '[GEARBOX_GROUP_NAME]', defaultSelector: '[GEARBOX]'}, [
				Input({attribute: 'Default', text: '[DEFAULT_GEARBOX]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'Type', text: '[GEARBOXES_FILE]', type: 'file', fileType: 'gearboxes'})
			]),
			Group({name: '[ENGINE_GROUP_NAME]', defaultSelector: '[ENGINE]'}, [
				Input({attribute: 'Default', text: '[DEFAULT_ENGINE]', type: 'text', onlyDeveloper: 'true'}),
				Input({attribute: 'Type', text: '[ENGINES_FILE]', type: 'file', fileType: 'engines'}),
				Input({attribute: 'EngineStartDelay', text: '[ENGINE_START_DELAY]', selector: '[TRUCK_DATA]', numberType: 'float', max: '8.0'}),
				Input({attribute: 'ExhaustStartTime', text: '[EXHAUST_START_TIME]', selector: '[TRUCK_DATA]', numberType: 'float'})
			]),
			Group({name: '[FUEL_GROUP_NAME]', defaultSelector: '[FUEL_TANK]'}, [
				Input({attribute: 'DamageCapacity', text: '[DAMAGE_CAPACITY]', max: '64000'}),
				Input({attribute: 'FuelCapacity', text: '[FUEL_CAPACITY]', selector: '[TRUCK_DATA]'})
			]),
			Group({name: '[UNLOCK_GROUP_NAME]', defaultSelector: '[GAME_DATA]'}, [
				Select({attribute: 'Country', text: '[COUNTRY]'}, [
					Opt({text: '[RUSSIA]', value: 'RU'}),
					Opt({text: '[USA]', value: 'US'})
				]),
				Input({attribute: 'Price', text: '[PRICE]'}),
				Select({attribute: 'UnlockByExploration', text: '[BY_EXPLORATION]'}, [
					Opt({text: '[FIND_ON_MAP]', value: 'true'}),
					Opt({text: '[BY_RANK]', value: 'false'})
				]),
				Input({attribute: 'UnlockByRank', text: '[BY_RANK_LEVEL]'})
			])
		]),
		Selectors([
			Selector({id: 'TRUCK_DATA', value: 'Truck.TruckData'}),
			Selector({id: 'GAME_DATA', value: 'Truck.GameData'}),
			Selector({id: 'UIDESC', value: '{GAME_DATA}.UiDesc'}),
			Selector({id: 'WHEELS', value: '{TRUCK_DATA}.Wheels'}),
			Selector({id: 'COMPATIBLE_WHEELS', value: '{TRUCK_DATA}.CompatibleWheels'}),
			Selector({id: 'COMPATIBLE_WHEELS_ITEM', value: '{COMPATIBLE_WHEELS}#every'}),
			Selector({id: 'WINCH', value: '{TRUCK_DATA}.WinchUpgradeSocket'}),
			Selector({id: 'SUSPENSION', value: '{TRUCK_DATA}.SuspensionSocket'}),
			Selector({id: 'GEARBOX', value: '{TRUCK_DATA}.GearboxSocket'}),
			Selector({id: 'ENGINE', value: '{TRUCK_DATA}.EngineSocket'}),
			Selector({id: 'FUEL_TANK', value: '{TRUCK_DATA}.FuelTank'})
		])
	],
	selector: 'Truck',
	translation: {
		EN: {
			"NONE": "None",
			"TEXT_GROUP_NAME": "Texts",
			"UIDESC": "Description",
			"UINAME": "Name",
			"CONTROL_GROUP_NAME": "Control",
			"BACK_STEER_SPEED": "Back steer speed",
			"STEER_SPEED": "Steer speed",
			"WINCH_GROUP_NAME": "Winch",
			"DEFAULT_WINCH": "Default winch",
			"IS_UPGRADABLE": "Winch upgrade",
			"ALLOW": "Available",
			"NOT_ALLOW": "Not Available",
			"WINCHES_FILE": "Winches file",
			"WHEELS_GROUP_NAME": "Wheels",
			"DEFAULT_RIM": "Default rim",
			"DEFAULT_TIRE": "Default tire",
			"TIRES_FILE": "Tires file",
			"SUSPENSION_GROUP_NAME": "Suspension",
			"DEFAULT_SUSPENSION": "Default suspension",
			"SUSPENSIONS_FILE": "Suspensions file",
			"DIFF_LOCK": "Differential lock",
			"INSTALLED": "Installed",
			"UNINSTALLED": "Uninstalled",
			"ALWAYS": "Always",
			"GEARBOX_GROUP_NAME": "Gearbox",
			"DEFAULT_GEARBOX": "Default gearbox",
			"GEARBOXES_FILE": "Gearboxes file",
			"ENGINE_GROUP_NAME": "Engine",
			"DEFAULT_ENGINE": "Default engine",
			"ENGINES_FILE": "Engines file",
			"ENGINE_START_DELAY": "Engine start delay",
			"EXHAUST_START_TIME": "Exhaust start time",
			"FUEL_GROUP_NAME": "Fuel",
			"DAMAGE_CAPACITY": "Damage capacity",
			"FUEL_CAPACITY": "Fuel capacity",
			"UNLOCK_GROUP_NAME": "Unlock",
			"COUNTRY": "Country",
			"RUSSIA": "Russia",
			"USA": "USA",
			"PRICE": "Price",
			"BY_EXPLORATION": "Unlock method",
			"FIND_ON_MAP": "Find on map",
			"BY_RANK": "By rank",
			"BY_RANK_LEVEL": "Unlock level",
			"COMPATIBLE_WHEELS": "Allowed wheels",
			"COMPATIBLE_WHEELS_SCALE": "Scale",
		},
		RU: {
			"NONE": "Отсутствует",
			"TEXT_GROUP_NAME": "Тексты",
			"UIDESC": "Описание",
			"UINAME": "Название",
			"CONTROL_GROUP_NAME": "Управление",
			"BACK_STEER_SPEED": "Скорость возврата руля",
			"STEER_SPEED": "Скорость руля",
			"WINCH_GROUP_NAME": "Лебёдка",
			"DEFAULT_WINCH": "Лебёдка по умолчанию",
			"IS_UPGRADABLE": "Улучшение лебёдки",
			"ALLOW": "Доступно",
			"NOT_ALLOW": "Недоступно",
			"WINCHES_FILE": "Файл с лебёдками",
			"WHEELS_GROUP_NAME": "Колёса",
			"DEFAULT_RIM": "Обод по умолчанию",
			"DEFAULT_TIRE": "Колёса по умолчанию",
			"TIRES_FILE": "Файл с колёсами",
			"SUSPENSION_GROUP_NAME": "Подвеска",
			"DEFAULT_SUSPENSION": "Подвеска по умолчанию",
			"SUSPENSIONS_FILE": "Файл с подвесками",
			"DIFF_LOCK": "Блокировка дифференциала",
			"INSTALLED": "Установлена",
			"UNINSTALLED": "Не установлена",
			"ALWAYS": "Всегда",
			"GEARBOX_GROUP_NAME": "Коробка передач",
			"DEFAULT_GEARBOX": "Коробка передач по умолчанию",
			"GEARBOXES_FILE": "Файл с коробками передач",
			"ENGINE_GROUP_NAME": "Двигатель",
			"DEFAULT_ENGINE": "Двигатель по умолчанию",
			"ENGINES_FILE": "Файл с двигателями",
			"ENGINE_START_DELAY": "Задержка запуска двигателя",
			"EXHAUST_START_TIME": "Время начала выхлопа",
			"FUEL_GROUP_NAME": "Топливо",
			"DAMAGE_CAPACITY": "Прочность",
			"FUEL_CAPACITY": "Объём топлива",
			"UNLOCK_GROUP_NAME": "Разблокировка",
			"COUNTRY": "Страна",
			"RUSSIA": "Россия",
			"USA": "США",
			"PRICE": "Цена",
			"BY_EXPLORATION": "Способ разблокировки",
			"FIND_ON_MAP": "Найти на карте",
			"BY_RANK": "По достижению уровня",
			"BY_RANK_LEVEL": "Уровень разблокировки",
			"COMPATIBLE_WHEELS": "Доступные колёса",
			"COMPATIBLE_WHEELS_SCALE": "Размер",
		},
		DE: {
			"NONE": "Fehlt",
			"TEXT_GROUP_NAME": "Texte",
			"UINAME": "Der Name",
			"UIDESC": "Die Beschreibung",
			"CONTROL_GROUP_NAME": "Kontrolle",
			"BACK_STEER_SPEED": "Die Rücklaufquote der Spitze",
			"STEER_SPEED": "Geschwindigkeit lenken",
			"WINCH_GROUP_NAME": "Winde",
			"DEFAULT_WINCH": "Standardwinde",
			"IS_UPGRADABLE": "Winde Upgrade",
			"ALLOW": "Verfügbar",
			"NOT_ALLOW": "Nicht verfügbar",
			"WINCHES_FILE": "Winden Datei",
			"WHEELS_GROUP_NAME": "Räder",
			"DEFAULT_RIM": "Standard-Felge",
			"DEFAULT_TIRE": "Standardreifen",
			"TIRES_FILE": "Reifendatei",
			"SUSPENSION_GROUP_NAME": "Aufhängung",
			"DEFAULT_SUSPENSION": "Standardaufhängung",
			"SUSPENSIONS_FILE": "aufhängungs datei",
			"DIFF_LOCK": "Differenzialsperre",
			"INSTALLED": "Installiert",
			"UNINSTALLED": "nicht Installiert",
			"ALWAYS": "Immer",
			"GEARBOX_GROUP_NAME": "Getriebe",
			"DEFAULT_GEARBOX": "Standardgetriebe",
			"GEARBOXES_FILE": "Getriebe datei",
			"ENGINE_GROUP_NAME": "Motor",
			"DEFAULT_ENGINE": "Standardmotor",
			"ENGINES_FILE": "Motor datei",
			"ENGINE_START_DELAY": "Motorstartverzögerung",
			"EXHAUST_START_TIME": "Startzeit des Abgases",
			"FUEL_GROUP_NAME": "Treibstoff",
			"DAMAGE_CAPACITY": "Schadenskapazität",
			"FUEL_CAPACITY": "Kraftstoffkapazität",
			"UNLOCK_GROUP_NAME": "Freischalten",
			"COUNTRY": "Land",
			"RUSSIA": "Russland",
			"USA": "Vereinigte Staaten von Amerika",
			"PRICE": "Preis",
			"BY_EXPLORATION": "Methode entsperren",
			"FIND_ON_MAP": "Auf Karte finden",
			"BY_RANK": "Nach Rang",
			"BY_RANK_LEVEL": "Level freischalten",
			"COMPATIBLE_WHEELS": "Auch unterstützt",
			"COMPATIBLE_WHEELS_SCALE": "Die Größe",
		}
	}
}

export default truck
