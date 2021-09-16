import {
	Template,
	Group,
	Input,
	Select,
	Opt,
	Selectors,
	Selector
} from '../service/templateItems.js';

export default {
	main: [
		Template({}, [
			Group({
				name: '[TEXT_GROUP_NAME]',
				defaultSelector: '[UIDESC]'
			}, [
				Input({
					attribute: 'UiName',
					text: '[UINAME]',
					desc: '[UI_NAME]',
					type: 'text',
					bold: true
				}),
				Input({
					attribute: 'UiDesc',
					text: '[UIDESC]',
					desc: '[UI_DESC]',
					type: 'text'
				})
			]),
			Group({
				name: '[CONTROL_GROUP_NAME]',
				defaultSelector: '[TRUCK_DATA]'
			}, [
				Input({
					attribute: 'BackSteerSpeed',
					text: '[BACK_STEER_SPEED]',
					desc: '[BACK_STEER_SPEED]',
					numberType: 'float',
					step: 0.01,
					max: 1
				}),
				Input({
					attribute: 'SteerSpeed',
					text: '[STEER_SPEED]',
					desc: '[STEER_SPEED]',
					numberType: 'float',
					bold: true
				})
			]),
			Group({
				name: '[WINCH_GROUP_NAME]',
				defaultSelector: '[WINCH]'
			}, [
				Input({
					attribute: 'Default',
					text: '[DEFAULT_WINCH]',
					desc: '[DEFAULT_WINCH]',
					type: 'text',
					onlyDeveloper: 'true'
				}),
				Select({
					attribute: 'IsUpgradable',
					text: '[IS_UPGRADABLE]',
					desc: '[IS_UPGRADABLE]'
				}, [
					Opt({
						text: '[ALLOW]',
						value: 'true'
					}),
					Opt({
						text: '[NOT_ALLOW]',
						value: 'false'
					})
				]),
				Input({
					attribute: 'Type',
					text: '[WINCHES_FILE]',
					desc: '[WINCHES_FILE]',
					type: 'file',
					fileType: 'winches',
					bold: true
				})
			]),
			Group({
				name: '[WHEELS_GROUP_NAME]',
				defaultSelector: '[WHEELS]'
			}, [
				Input({
					attribute: 'DefaultRim',
					text: '[DEFAULT_RIM]',
					desc: '[DEFAULT_RIM]',
					type: 'text',
					onlyDeveloper: true
				}),
				Input({
					attribute: 'DefaultTire',
					text: '[DEFAULT_TIRE]',
					desc: '[DEFAULT_TIRE]',
					type: 'text',
					onlyDeveloper: true
				}),
				Input({
					attribute: 'DefaultWheelType',
					text: '[TIRES_FILE]',
					desc: '[DEFAULT_WHEEL_TYPE]',
					type: 'file',
					fileType: 'wheels',
					bold: true
				}),
				Group({
					name: '[PHYSICS_WHEELS]'
				}, [
					Template({
						type: 'Multiply',
						itemSelector: '[WHEEL]'
					}, [
						Group({
							name: '[WHEEL]',
							defaultSelector: '[WHEEL_ITEM]',
							withCounter: true
						}, [
							Select({
								attribute: 'Location',
								text: '[WHEEL_TYPE]',
								desc: '[LOCATION]',
								default: 'front'
							}, [
								Opt({
									text: '[FRONT]',
									value: 'front'
								}),
								Opt({
									text: '[REAR]',
									value: 'rear'
								})
							]),
							Select({
								attribute: 'Torque',
								text: '[TORQUE]',
								desc: '[TORQUE]',
								default: 'none'
							}, [
								Opt({
									text: '[TORQUE_DEFAULT]',
									value: 'default'
								}),
								Opt({
									text: '[TORQUE_FULL]',
									value: 'full'
								}),
								Opt({
									text: '[TORQUE_NONE]',
									value: 'none'
								}),
								Opt({
									text: '[TORQUE_CONNECTABLE]',
									value: 'connectable'
								})
							]),
							Input({
								attribute: 'SteeringAngle',
								text: '[STEERING_ANGLE]',
								desc: '[STEERING_ANGLE]',
								type: 'number',
								step: 1,
								min: -50,
								max: 50,
								default: 0
							})
						])
					])
				])
			]),
			Group({
				name: '[SUSPENSION_GROUP_NAME]',
				defaultSelector: '[SUSPENSION]'
			}, [
				Input({
					attribute: 'CenterOfMassOffset',
					text: '[CENTER_OF_MASS]',
					desc: '[CENTER_OF_MASS]',
					type: 'coordinates',
					selector: '[PHYSICS_BODY]'
				}),
				Input({
					attribute: 'Default',
					text: '[DEFAULT_SUSPENSION]',
					desc: '[DEFAULT_SUSPENSION]',
					type: 'text',
					onlyDeveloper: true
				}),
				Input({
					attribute: 'Type',
					text: '[SUSPENSIONS_FILE]',
					desc: '[SUSPENSIONS_FILE]',
					type: 'file',
					fileType: 'suspensions',
					bold: true
				}),
				Select({
					attribute: 'DiffLockType',
					text: '[DIFF_LOCK]',
					desc: '[DIFF_LOCK]',
					selector: '[TRUCK_DATA]',
					bold: true
				}, [
					Opt({
						text: '[NONE]',
						value: 'None'
					}),
					Opt({
						text: '[INSTALLED]',
						value: 'Installed'
					}),
					Opt({
						text: '[UNINSTALLED]',
						value: 'Uninstalled'
					}),
					Opt({
						text: '[ALWAYS]',
						value: 'Always'
					})
				])
			]),
			Group({
				name: '[GEARBOX_GROUP_NAME]',
				defaultSelector: '[GEARBOX]'
			}, [
				Input({
					attribute: 'Default',
					text: '[DEFAULT_GEARBOX]',
					desc: '[DEFAULT_GEARBOX]',
					type: 'text',
					onlyDeveloper: true
				}),
				Input({
					attribute: 'Type',
					text: '[GEARBOXES_FILE]',
					desc: '[GEARBOXES_FILE]',
					type: 'file',
					fileType: 'gearboxes',
					bold: true
				})
			]),
			Group({
				name: '[ENGINE_GROUP_NAME]',
				defaultSelector: '[ENGINE]'
			}, [
				Input({
					attribute: 'Default',
					text: '[DEFAULT_ENGINE]',
					desc: '[DEFAULT_ENGINE]',
					type: 'text',
					onlyDeveloper: true
				}),
				Input({
					attribute: 'Type',
					text: '[ENGINES_FILE]',
					desc: '[ENGINES_FILE]',
					type: 'file',
					fileType: 'engines',
					bold: true
				}),
				Input({
					attribute: 'EngineStartDelay',
					text: '[ENGINE_START_DELAY]',
					desc: '[ENGINE_START_DELAY]',
					selector: '[TRUCK_DATA]',
					numberType: 'float',
					step: 0.1,
					max: 8.0
				}),
				Input({
					attribute: 'ExhaustStartTime',
					text: '[EXHAUST_START_TIME]',
					desc: '[EXHAUST_START_TIME]',
					selector: '[TRUCK_DATA]',
					numberType: 'float'
				})
			]),
			Group({
				name: '[FUEL_GROUP_NAME]',
				defaultSelector: '[FUEL_TANK]'
			}, [
				Input({
					attribute: 'DamageCapacity',
					text: '[DAMAGE_CAPACITY]',
					desc: '[DAMAGE_CAPACITY]',
					max: 64000,
					default: 0
				}),
				Input({
					attribute: 'FuelCapacity',
					desc: '[FUEL_CAPACITY]',
					text: '[FUEL_CAPACITY]',
					selector: '[TRUCK_DATA]',
					bold: true
				})
			]),
			Group({
				name: '[UNLOCK_GROUP_NAME]',
				defaultSelector: '[GAME_DATA]'
			}, [
				Select({
					attribute: 'Country',
					text: '[COUNTRY]',
					desc: '[COUNTRY]',
					bold: true
				}, [
					Opt({
						text: '[RUSSIA]',
						value: 'RU'
					}),
					Opt({
						text: '[USA]',
						value: 'US'
					}),
					Opt({
						text: '[ANY]',
						value: ''
					})
				]),
				Input({
					attribute: 'Price',
					text: '[PRICE]',
					desc: '[PRICE]',
					bold: true
				}),
				Select({
					attribute: 'UnlockByExploration',
					text: '[BY_EXPLORATION]',
					desc: '[BY_EXPLORATION]'
				}, [
					Opt({
						text: '[FIND_ON_MAP]',
						value: 'true'
					}),
					Opt({
						text: '[BY_RANK]',
						value: 'false'
					})
				]),
				Input({
					attribute: 'UnlockByRank',
					text: '[BY_RANK_LEVEL]',
					desc: '[BY_RANK_LEVEL]',
					min: 1
				})
			])
		]),
		Selectors([
			Selector({
				id: 'TRUCK_DATA',
				value: 'Truck.TruckData'
			}),
			Selector({
				id: 'GAME_DATA',
				value: 'Truck.GameData'
			}),
			Selector({
				id: 'UIDESC',
				value: '{GAME_DATA}.UiDesc'
			}),
			Selector({
				id: 'WHEELS',
				value: '{TRUCK_DATA}.Wheels'
			}),
			Selector({
				id: 'COMPATIBLE_WHEELS',
				value: '{TRUCK_DATA}.CompatibleWheels'
			}),
			Selector({
				id: 'COMPATIBLE_WHEELS_ITEM',
				value: '{COMPATIBLE_WHEELS}#every'
			}),
			Selector({
				id: 'WINCH',
				value: '{TRUCK_DATA}.WinchUpgradeSocket'
			}),
			Selector({
				id: 'SUSPENSION',
				value: '{TRUCK_DATA}.SuspensionSocket'
			}),
			Selector({
				id: 'GEARBOX',
				value: '{TRUCK_DATA}.GearboxSocket'
			}),
			Selector({
				id: 'ENGINE',
				value: '{TRUCK_DATA}.EngineSocket'
			}),
			Selector({
				id: 'FUEL_TANK',
				value: '{TRUCK_DATA}.FuelTank'
			}),
			Selector({
				id: 'PHYSICS_BODY',
				value: 'Truck.PhysicsModel.Body'
			}),
			Selector({
				id: 'WHEEL',
				value: '{WHEELS}.Wheel'
			}),
			Selector({
				id: 'WHEEL_ITEM',
				value: '{WHEEL}#every'
			})
		])
	],
	selector: 'Truck',
	descriptions: {
		UI_NAME: {
			RU: 'Название авто в игре (либо ключ перевода)',
			EN: 'The name of the car in the game (or the transfer key)',
			DE: 'Name des Autos im Spiel (oder Übersetzungsschlüssel)'
		},
		UI_DESC: {
			RU: 'Описание авто в игре (либо ключ перевода)',
			EN: 'Description of the car in the game (or the transfer key)',
			DE: 'Beschreibung von Auto im Spiel (oder Schlüssel Übersetzung)'
		},
		BACK_STEER_SPEED: {
			RU: 'Скорость, с которой колёса возвращаются на исходную позицию после поворота',
			EN: 'The speed at which the wheels return to their original position after turning',
			DE: 'Die Geschwindigkeit, mit der die Räder nach dem Abbiegen in die Ausgangsposition zurückkehren'
		},
		STEER_SPEED: {
			RU: 'Скорость, с которой поворачивается руль.',
			EN: 'The speed at which the steering wheel turns.',
			DE: 'Die Geschwindigkeit, mit der sich das Lenkrad dreht.'
		},
		DEFAULT_WINCH: {
			RU: 'ID лебёдки по умолчанию',
			EN: 'Default winch ID',
			DE: 'Standard-Winde-ID'
		},
		IS_UPGRADABLE: {
			RU: 'Улучшается ли лебёдка',
			EN: 'Is the winch improving',
			DE: 'Verbessert sich die Winde'
		},
		WINCHES_FILE: {
			RU: 'Кнопки для редактирования лебёдок',
			EN: 'Buttons for editing winches',
			DE: 'Schaltflächen zum Bearbeiten von Winden'
		},
		DEFAULT_RIM: {
			RU: 'ID обода по умолчанию',
			EN: 'Default rim ID',
			DE: 'Standard-Felge-ID'
		},
		DEFAULT_TIRE: {
			RU: 'ID покрышки по умолчанию',
			EN: 'Default tire ID',
			DE: 'Standard-Reifen-ID'
		},
		DEFAULT_WHEEL_TYPE: {
			RU: 'Название xml-файла с колёсами',
			EN: 'Name of the xml file with wheels',
			DE: 'Name der XML - Datei mit den Standardrädern'
		},
		DEFAULT_SUSPENSION: {
			RU: 'ID подвески по умолчанию',
			EN: 'Default suspension ID',
			DE: 'Standard-Suspension-ID'
		},
		SUSPENSIONS_FILE: {
			RU: 'Название файла с подвесками',
			EN: 'Name of the file with suspensions',
			DE: 'Dateiname mit Aufhängungen'
		},
		DIFF_LOCK: {
			RU: 'Настройки блокировки дифференциала',
			EN: 'Differential Lock Settings',
			DE: 'Differentialsperre Einstellungen'
		},
		DEFAULT_GEARBOX: {
			RU: 'ID КПП по умолчанию',
			EN: 'Default gearbox ID',
			DE: 'Standard-Getriebe-ID'
		},
		GEARBOXES_FILE: {
			RU: 'Название файла с коробками передач',
			EN: 'Name of the transmission file',
			DE: 'Dateiname mit Getriebe'
		},
		DEFAULT_ENGINE: {
			RU: 'ID двигателя по умолчанию',
			EN: 'Default engine ID',
			DE: 'Standard-Motor-ID'
		},
		EXHAUST_START_TIME: {
			RU: 'Время начала визуализации выхлопа.',
			EN: 'The start time of the exhaust visualization.',
			DE: 'Startzeit Visualisierung Auspuff.'
		},
		ENGINE_START_DELAY: {
			RU: 'Задержка после нажатия "включить двигатель"',
			EN: 'Delay after pressing "turn on the engine"',
			DE: 'Verzögerung nach dem Drücken von "Motor einschalten"'
		},
		DAMAGE_CAPACITY: {
			RU: 'Запас прочности бензобака',
			EN: 'Fuel tank safety margin',
			DE: 'Sicherheitsmarge des Benzinbehälters'
		},
		FUEL_CAPACITY: {
			RU: 'Максимальное количество топлива в баке',
			EN: 'Maximum amount of fuel in the tank',
			DE: 'Maximale Kraftstoffmenge im Tank'
		},
		COUNTRY: {
			RU: 'Страна разблокировки',
			EN: 'Unlock country',
			DE: 'Land entsperren'
		},
		PRICE: {
			RU: 'Цена самого автомобиля (без учёта составляющих)',
			EN: 'Der Preis des Autos selbst (ohne die Komponenten)',
			DE: 'The price of the car itself (excluding components)'
		},
		BY_EXPLORATION: {
			RU: 'Способ разблокировки автомобиля',
			EN: 'How to unlock the car',
			DE: 'Methode zum Entsperren des Autos'
		},
		BY_RANK_LEVEL: {
			RU: 'Уровень разблокировки автомобиля',
			EN: 'Car Unlock Level',
			DE: 'Auto entsperren Ebene'
		},
		ENGINES_FILE: {
			RU: 'Название файла с двигателями',
			EN: 'Name of the file with engines',
			DE: 'Dateiname mit Motoren'
		},
		CENTER_OF_MASS: {
			RU: 'Смещение центра масс тела относительно центра масс, рассчитанного движком игры',
			EN: 'The displacement of the center of mass of the body relative to the center of mass calculated by the game engine',
			DE: 'Verschiebung der Körpermassenmitte relativ zum von der Spiel-Engine berechneten Massenzentrum'
		},
		LOCATION: {
			RU: 'Используется только для составных колес, для определения того, переднее это колесо или заднее.',
			EN: 'Used only for compound wheels, to determine whether it is a front wheel or a rear wheel.',
			DE: 'Wird nur für zusammengesetzte Räder verwendet, um zu bestimmen, ob das Vorderrad oder das Hinterrad ist.'
		},
		TORQUE: {
			RU: 'То, когда колесо будет ведущим',
			EN: 'When the wheel will be leading',
			DE: 'Wann das Rad fahren wird'
		},
		STEERING_ANGLE: {
			RU: 'Максимальный угол поворота колеса при рулении',
			EN: 'Maximum steering angle of the wheel',
			DE: 'Maximaler Lenkwinkel des Rades beim Lenken'
		}
	},
	translations: {
		EN: {
			PHYSICS_WHEELS: 'Wheels (physical)',
			WHEEL: 'Wheel',
			WHEEL_TYPE: 'Type',
			FRONT: 'Front',
			REAR: 'Back',
			TORQUE: 'Torsion type',
			TORQUE_DEFAULT: 'Always leading',
			TORQUE_FULL: 'Driving with all-wheel drive',
			TORQUE_NONE: 'Slave',
			TORQUE_CONNECTABLE: 'Defined by the addon',
			STEERING_ANGLE: 'Angle of rotation',
			CENTER_OF_MASS: 'Center of mass offset',
			ANY: 'AnyA',
			NONE: 'None',
			TEXT_GROUP_NAME: 'Texts',
			UIDESC: 'Description',
			UINAME: 'Name',
			CONTROL_GROUP_NAME: 'Control',
			BACK_STEER_SPEED: 'Back steer speed',
			STEER_SPEED: 'Steer speed',
			WINCH_GROUP_NAME: 'Winch',
			DEFAULT_WINCH: 'Default winch',
			IS_UPGRADABLE: 'Winch upgrade',
			ALLOW: 'Available',
			NOT_ALLOW: 'Not Available',
			WINCHES_FILE: 'Winches file',
			WHEELS_GROUP_NAME: 'Wheels',
			DEFAULT_RIM: 'Default rim',
			DEFAULT_TIRE: 'Default tire',
			TIRES_FILE: 'Tires file',
			SUSPENSION_GROUP_NAME: 'Suspension',
			DEFAULT_SUSPENSION: 'Default suspension',
			SUSPENSIONS_FILE: 'Suspensions file',
			DIFF_LOCK: 'Differential lock',
			INSTALLED: 'Installed',
			UNINSTALLED: 'Uninstalled',
			ALWAYS: 'Always',
			GEARBOX_GROUP_NAME: 'Gearbox',
			DEFAULT_GEARBOX: 'Default gearbox',
			GEARBOXES_FILE: 'Gearboxes file',
			ENGINE_GROUP_NAME: 'Engine',
			DEFAULT_ENGINE: 'Default engine',
			ENGINES_FILE: 'Engines file',
			ENGINE_START_DELAY: 'Engine start delay',
			EXHAUST_START_TIME: 'Exhaust start time',
			FUEL_GROUP_NAME: 'Fuel',
			DAMAGE_CAPACITY: 'Damage capacity',
			FUEL_CAPACITY: 'Fuel capacity',
			UNLOCK_GROUP_NAME: 'Unlock',
			COUNTRY: 'Country',
			RUSSIA: 'Russia',
			USA: 'USA',
			PRICE: 'Price',
			BY_EXPLORATION: 'Unlock method',
			FIND_ON_MAP: 'Find on map',
			BY_RANK: 'By rank',
			BY_RANK_LEVEL: 'Unlock level',
			COMPATIBLE_WHEELS: 'Allowed wheels',
			COMPATIBLE_WHEELS_SCALE: 'Scale'
		},
		RU: {
			PHYSICS_WHEELS: 'Колёса (физические)',
			WHEEL: 'Колесо',
			WHEEL_TYPE: 'Тип',
			FRONT: 'Переднее',
			REAR: 'Заднее',
			TORQUE: 'Тип кручения',
			TORQUE_DEFAULT: 'Всегда ведущее',
			TORQUE_FULL: 'Ведущее при полном приводе',
			TORQUE_NONE: 'Ведомое',
			TORQUE_CONNECTABLE: 'Определяется аддоном',
			STEERING_ANGLE: 'Угол поворота',
			CENTER_OF_MASS: 'Смещение центра масс',
			ANY: 'Любая',
			NONE: 'Отсутствует',
			TEXT_GROUP_NAME: 'Тексты',
			UIDESC: 'Описание',
			UINAME: 'Название',
			CONTROL_GROUP_NAME: 'Управление',
			BACK_STEER_SPEED: 'Скорость возврата колёс',
			STEER_SPEED: 'Скорость руля',
			WINCH_GROUP_NAME: 'Лебёдка',
			DEFAULT_WINCH: 'Лебёдка по умолчанию',
			IS_UPGRADABLE: 'Улучшение лебёдки',
			ALLOW: 'Доступно',
			NOT_ALLOW: 'Недоступно',
			WINCHES_FILE: 'Файл с лебёдками',
			WHEELS_GROUP_NAME: 'Колёса',
			DEFAULT_RIM: 'Обод по умолчанию',
			DEFAULT_TIRE: 'Колёса по умолчанию',
			TIRES_FILE: 'Файл с колёсами',
			SUSPENSION_GROUP_NAME: 'Подвеска',
			DEFAULT_SUSPENSION: 'Подвеска по умолчанию',
			SUSPENSIONS_FILE: 'Файл с подвесками',
			DIFF_LOCK: 'Блокировка дифференциала',
			INSTALLED: 'Установлена',
			UNINSTALLED: 'Не установлена',
			ALWAYS: 'Всегда',
			GEARBOX_GROUP_NAME: 'Коробка передач',
			DEFAULT_GEARBOX: 'Коробка передач по умолчанию',
			GEARBOXES_FILE: 'Файл с коробками передач',
			ENGINE_GROUP_NAME: 'Двигатель',
			DEFAULT_ENGINE: 'Двигатель по умолчанию',
			ENGINES_FILE: 'Файл с двигателями',
			ENGINE_START_DELAY: 'Задержка запуска двигателя',
			EXHAUST_START_TIME: 'Время начала выхлопа',
			FUEL_GROUP_NAME: 'Топливо',
			DAMAGE_CAPACITY: 'Прочность',
			FUEL_CAPACITY: 'Объём топлива',
			UNLOCK_GROUP_NAME: 'Разблокировка',
			COUNTRY: 'Страна',
			RUSSIA: 'Россия',
			USA: 'США',
			PRICE: 'Цена',
			BY_EXPLORATION: 'Способ разблокировки',
			FIND_ON_MAP: 'Найти на карте',
			BY_RANK: 'По достижению уровня',
			BY_RANK_LEVEL: 'Уровень разблокировки',
			COMPATIBLE_WHEELS: 'Доступные колёса',
			COMPATIBLE_WHEELS_SCALE: 'Размер'
		},
		DE: {
			PHYSICS_WHEELS: 'Räder (physikalisch)',
			WHEEL: 'Rad',
			WHEEL_TYPE: 'Typ',
			FRONT: 'Vorne',
			REAR: 'Hinten',
			TORQUE: 'Torsionsart',
			TORQUE_DEFAULT: 'Immer Moderator',
			TORQUE_FULL: 'Allradantrieb',
			TORQUE_NONE: 'Slave',
			TORQUE_CONNECTABLE: 'Definiert durch Addon',
			STEERING_ANGLE: 'Drehwinkel',
			CENTER_OF_MASS: 'Versatz des Massenzentrums',
			ANY: 'Jede',
			NONE: 'Fehlt',
			TEXT_GROUP_NAME: 'Texte',
			UINAME: 'Der Name',
			UIDESC: 'Die Beschreibung',
			CONTROL_GROUP_NAME: 'Kontrolle',
			BACK_STEER_SPEED: 'Die Rücklaufquote der Spitze',
			STEER_SPEED: 'Geschwindigkeit lenken',
			WINCH_GROUP_NAME: 'Winde',
			DEFAULT_WINCH: 'Standardwinde',
			IS_UPGRADABLE: 'Winde Upgrade',
			ALLOW: 'Verfügbar',
			NOT_ALLOW: 'Nicht verfügbar',
			WINCHES_FILE: 'Winden Datei',
			WHEELS_GROUP_NAME: 'Räder',
			DEFAULT_RIM: 'Standard-Felge',
			DEFAULT_TIRE: 'Standardreifen',
			TIRES_FILE: 'Reifendatei',
			SUSPENSION_GROUP_NAME: 'Aufhängung',
			DEFAULT_SUSPENSION: 'Standardaufhängung',
			SUSPENSIONS_FILE: 'aufhängungs datei',
			DIFF_LOCK: 'Differenzialsperre',
			INSTALLED: 'Installiert',
			UNINSTALLED: 'nicht Installiert',
			ALWAYS: 'Immer',
			GEARBOX_GROUP_NAME: 'Getriebe',
			DEFAULT_GEARBOX: 'Standardgetriebe',
			GEARBOXES_FILE: 'Getriebe datei',
			ENGINE_GROUP_NAME: 'Motor',
			DEFAULT_ENGINE: 'Standardmotor',
			ENGINES_FILE: 'Motor datei',
			ENGINE_START_DELAY: 'Motorstartverzögerung',
			EXHAUST_START_TIME: 'Startzeit des Abgases',
			FUEL_GROUP_NAME: 'Treibstoff',
			DAMAGE_CAPACITY: 'Schadenskapazität',
			FUEL_CAPACITY: 'Kraftstoffkapazität',
			UNLOCK_GROUP_NAME: 'Freischalten',
			COUNTRY: 'Land',
			RUSSIA: 'Russland',
			USA: 'Vereinigte Staaten von Amerika',
			PRICE: 'Preis',
			BY_EXPLORATION: 'Methode entsperren',
			FIND_ON_MAP: 'Auf Karte finden',
			BY_RANK: 'Nach Rang',
			BY_RANK_LEVEL: 'Level freischalten',
			COMPATIBLE_WHEELS: 'Auch unterstützt',
			COMPATIBLE_WHEELS_SCALE: 'Die Größe'
		}
	}
};
