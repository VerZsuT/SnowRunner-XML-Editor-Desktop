import {
	Template,
	Group,
	Input,
	Select,
	Opt,
	Selectors
} from '../../service'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors({
	truckData: 'Truck.TruckData',
	gameData: 'Truck.GameData',
	UIDesc: '{gameData}.UiDesc',
	wheels: '{truckData}.Wheels',
	compatibleWheels: '{truckData}.CompatibleWheels',
	compatibleWheelsItem: '{compatibleWheels}#every',
	winch: '{truckData}.WinchUpgradeSocket',
	suspension: '{truckData}.SuspensionSocket',
	gearbox: '{truckData}.GearboxSocket',
	engine: '{truckData}.EngineSocket',
	fuelTank: '{truckData}.FuelTank',
	physicsBody: 'Truck.PhysicsModel.Body',
	wheel: '{wheels}.Wheel',
	wheelItem: '{wheel}#every'
})

export default <ITemplate> {
	selector: 'Truck',
	template: Template({selectors: selectors}, [
		Group({
			name: texts.textGroupName,
			defaultSelector: 'UIDesc'
		}, [
			Input({
				attribute: 'UiName',
				text: texts.UIName,
				desc: descs.UIName,
				type: 'text',
				bold: true
			}),
			Input({
				attribute: 'UiDesc',
				text: texts.UIDesc,
				desc: descs.UIDesc,
				type: 'text'
			})
		]),
		Group({
			name: texts.controlGroupName,
			defaultSelector: 'truckData'
		}, [
			Input({
				attribute: 'BackSteerSpeed',
				text: texts.backSteerSpeed,
				desc: descs.backSteerSpeed,
				numberType: 'float',
				step: 0.01,
				max: 1,
				areas: {
					yellow: [[0.1, 0.3]],
					red: [[0.31, 1]]
				}
			}),
			Input({
				attribute: 'SteerSpeed',
				text: texts.steerSpeed,
				desc: descs.steerSpeed,
				numberType: 'float',
				bold: true,
				step: 0.01,
				areas: {
					yellow: [[0.1, 0.5]],
					red: [[0.5, Infinity]]
				}
			})
		]),
		Group({
			name: texts.winchGroupName,
			defaultSelector: 'winch'
		}, [
			Input({
				attribute: 'Default',
				text: texts.defaultWinch,
				desc: descs.defaultWinch,
				type: 'text',
				onlyDeveloper: true
			}),
			Select({
				attribute: 'IsUpgradable',
				text: texts.isUpgradable,
				desc: descs.isUpgradable
			}, [
				Opt({
					text: texts.allow,
					value: 'true'
				}),
				Opt({
					text: texts.notAllow,
					value: 'false'
				})
			]),
			Input({
				attribute: 'Type',
				text: texts.winchesFile,
				desc: descs.winchesFile,
				type: 'file',
				fileType: 'winches',
				bold: true
			})
		]),
		Group({
			name: texts.wheelsGroupName,
			defaultSelector: 'wheels'
		}, [
			Input({
				attribute: 'DefaultRim',
				text: texts.defaultRim,
				desc: descs.defaultRim,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'DefaultTire',
				text: texts.defaultTire,
				desc: descs.defaultTire,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'DefaultWheelType',
				text: texts.defaultWheelType,
				desc: descs.defaultWheelType,
				type: 'file',
				fileType: 'wheels',
				bold: true
			}),
			Group({
				name: texts.physicsWheels
			}, [
				Template({
					type: 'multiply',
					itemSelector: 'wheel'
				}, [
					Group({
						name: texts.wheel,
						defaultSelector: 'wheelItem',
						withCounter: true
					}, [
						Select({
							attribute: 'Location',
							text: texts.location,
							desc: descs.location,
							default: 'front',
							onlyDeveloper: true
						}, [
							Opt({
								text: texts.front,
								value: 'front'
							}),
							Opt({
								text: texts.rear,
								value: 'rear'
							})
						]),
						Select({
							attribute: 'Torque',
							text: texts.torque,
							desc: descs.torque,
							default: 'none'
						}, [
							Opt({
								text: texts.torqueDefault,
								value: 'default'
							}),
							Opt({
								text: texts.torqueFull,
								value: 'full'
							}),
							Opt({
								text: texts.torqueNone,
								value: 'none'
							}),
							Opt({
								text: texts.torqueConnectable,
								value: 'connectable'
							})
						]),
						Input({
							attribute: 'SteeringAngle',
							text: texts.steeringAngle,
							desc: descs.steeringAngle,
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
			name: texts.suspensionGroupName,
			defaultSelector: 'suspension'
		}, [
			Input({
				attribute: 'CenterOfMassOffset',
				text: texts.centerOfMass,
				desc: descs.centerOfMass,
				type: 'coordinates',
				selector: 'physicsBody',
				step: 0.1
			}),
			Input({
				attribute: 'Default',
				text: texts.defaultSuspension,
				desc: descs.defaultSuspension,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Type',
				text: texts.suspensionsFile,
				desc: descs.suspensionsFile,
				type: 'file',
				fileType: 'suspensions',
				bold: true
			}),
			Select({
				attribute: 'DiffLockType',
				text: texts.diffLock,
				desc: descs.diffLock,
				selector: 'truckData',
				bold: true
			}, [
				Opt({
					text: texts.none,
					value: 'None'
				}),
				Opt({
					text: texts.installed,
					value: 'Installed'
				}),
				Opt({
					text: texts.uninstalled,
					value: 'Uninstalled'
				}),
				Opt({
					text: texts.always,
					value: 'Always'
				})
			])
		]),
		Group({
			name: texts.gearboxGroupName,
			defaultSelector: 'gearbox'
		}, [
			Input({
				attribute: 'Default',
				text: texts.defaultGearbox,
				desc: descs.defaultGearbox,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Type',
				text: texts.gearboxesFile,
				desc: descs.gearboxesFile,
				type: 'file',
				fileType: 'gearboxes',
				bold: true
			})
		]),
		Group({
			name: texts.engineGroupName,
			defaultSelector: 'engine'
		}, [
			Input({
				attribute: 'Default',
				text: texts.defaultEngine,
				desc: descs.defaultEngine,
				type: 'text',
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Type',
				text: texts.enginesFile,
				desc: descs.enginesFile,
				type: 'file',
				fileType: 'engines',
				bold: true
			}),
			Input({
				attribute: 'EngineStartDelay',
				text: texts.engineStartDelay,
				desc: descs.engineStartDelay,
				selector: 'truckData',
				numberType: 'float',
				step: 0.1,
				max: 8.0
			}),
			Input({
				attribute: 'ExhaustStartTime',
				text: texts.exhaustStartTime,
				desc: descs.exhaustStartTime,
				selector: 'truckData',
				numberType: 'float',
				step: 0.1
			})
		]),
		Group({
			name: texts.fuelGroupName,
			defaultSelector: 'fuelTank'
		}, [
			Input({
				attribute: 'DamageCapacity',
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				default: 0,
				step: 10,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Input({
				attribute: 'FuelCapacity',
				desc: texts.fuelCapacity,
				text: descs.fuelCapacity,
				selector: 'truckData',
				bold: true,
				step: 10,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			})
		]),
		Group({
			name: texts.unlockGroupName,
			defaultSelector: 'gameData'
		}, [
			Select({
				attribute: 'Country',
				text: texts.country,
				desc: descs.country,
				bold: true
			}, [
				Opt({
					text: texts.russia,
					value: 'RU'
				}),
				Opt({
					text: texts.usa,
					value: 'US'
				}),
				Opt({
					text: texts.any,
					value: ''
				})
			]),
			Input({
				attribute: 'Price',
				text: texts.price,
				desc: descs.price,
				bold: true
			}),
			Select({
				attribute: 'UnlockByExploration',
				text: texts.byExploration,
				desc: descs.byExploration
			}, [
				Opt({
					text: texts.findOnMap,
					value: 'true'
				}),
				Opt({
					text: texts.byRank,
					value: 'false'
				})
			]),
			Input({
				attribute: 'UnlockByRank',
				text: texts.unlockByRank,
				desc: descs.unlockByRank,
				min: 1
			})
		]),
	])
}
