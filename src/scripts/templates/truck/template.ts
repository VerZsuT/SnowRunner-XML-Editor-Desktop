import {
	Template,
	Group,
	Input,
	Select,
	Selectors,
	forEach,
	InputType,
	NumberType,
	FileType,
	TemplateType
} from '../../service'
import {
	descs,
	texts
} from './texts'

const selectors = Selectors(() => {
	const truckData = 'Truck.TruckData'
	const gameData = 'Truck.GameData'
	const UIDesc = `${gameData}.UiDesc`
	const wheels = `${truckData}.Wheels`
	const compatibleWheels = `${truckData}.CompatibleWheels`
	const currentCompatibleWheels = `${compatibleWheels}${forEach}`
	const winch = `${truckData}.WinchUpgradeSocket`
	const suspension = `${truckData}.SuspensionSocket`
	const gearbox = `${truckData}.GearboxSocket`
	const engine = `${truckData}.EngineSocket`
	const fuelTank = `${truckData}.FuelTank`
	const physicsBody = 'Truck.PhysicsModel.Body'
	const wheel = `${wheels}.Wheel`
	const currentWheel = `${wheel}${forEach}`
	return {truckData, gameData, UIDesc, wheels, compatibleWheels, currentCompatibleWheels, winch, suspension, gearbox,
		    engine, fuelTank, physicsBody, wheel, currentWheel}
})

export default <ITemplate> {
	selector: 'Truck',
	template: Template({selectors}, [
		Group({
			name: texts.textGroupName,
			defaultSelector: selectors.UIDesc
		}, [
			Input({
				attribute: 'UiName',
				type: InputType.text,
				text: texts.UIName,
				desc: descs.UIName,
				bold: true
			}),
			Input({
				attribute: 'UiDesc',
				type: InputType.text,
				text: texts.UIDesc,
				desc: descs.UIDesc
			})
		]),
		Group({
			name: texts.controlGroupName,
			defaultSelector: selectors.truckData
		}, [
			Input({
				attribute: 'BackSteerSpeed',
				text: texts.backSteerSpeed,
				desc: descs.backSteerSpeed,
				max: 1,
				step: 0.01,
				areas: {
					yellow: [[0.1, 0.3]],
					red: [[0.31, 1]]
				}
			}),
			Input({
				attribute: 'SteerSpeed',
				text: texts.steerSpeed,
				desc: descs.steerSpeed,
				step: 0.01,
				areas: {
					yellow: [[0.1, 0.5]],
					red: [[0.5, Infinity]]
				},
				bold: true
			})
		]),
		Group({
			name: texts.winchGroupName,
			defaultSelector: selectors.winch
		}, [
			Input({
				attribute: 'Default',
				type: InputType.text,
				text: texts.defaultWinch,
				desc: descs.defaultWinch,
				onlyDeveloper: true
			}),
			Select({
				attribute: 'IsUpgradable',
				text: texts.isUpgradable,
				desc: descs.isUpgradable,
				options: {
					true: texts.allow,
					false: texts.notAllow
				}
			}),
			Input({
				attribute: 'Type',
				type: InputType.file,
				fileType: FileType.winches,
				text: texts.winchesFile,
				desc: descs.winchesFile,
				bold: true
			})
		]),
		Group({
			name: texts.wheelsGroupName,
			defaultSelector: selectors.wheels
		}, [
			Input({
				attribute: 'DefaultRim',
				type: InputType.text,
				text: texts.defaultRim,
				desc: descs.defaultRim,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'DefaultTire',
				type: InputType.text,
				text: texts.defaultTire,
				desc: descs.defaultTire,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'DefaultWheelType',
				type: InputType.file,
				fileType: FileType.wheels,
				text: texts.defaultWheelType,
				desc: descs.defaultWheelType,
				bold: true
			}),
			Group({
				name: texts.physicsWheels
			}, [
				Template({
					type: TemplateType.multiply,
					itemSelector: selectors.wheel
				}, [
					Group({
						name: texts.wheel,
						defaultSelector: selectors.currentWheel,
						withCounter: true
					}, [
						Select({
							attribute: 'Location',
							text: texts.location,
							desc: descs.location,
							options: {
								front: texts.front,
								rear: texts.rear
							},
							default: 'front',
							onlyDeveloper: true
						}),
						Select({
							attribute: 'Torque',
							text: texts.torque,
							desc: descs.torque,
							options: {
								default: texts.torqueDefault,
								full: texts.torqueFull,
								none: texts.torqueNone,
								connectable: texts.torqueConnectable
							},
							default: 'none'
						}),
						Input({
							attribute: 'SteeringAngle',
							numberType: NumberType.integer,
							text: texts.steeringAngle,
							desc: descs.steeringAngle,
							max: 50,
							min: -50,
							default: 0
						})
					])
				])
			])
		]),
		Group({
			name: texts.suspensionGroupName,
			defaultSelector: selectors.suspension
		}, [
			Input({
				attribute: 'CenterOfMassOffset',
				type: InputType.coordinates,
				selector: selectors.physicsBody,
				text: texts.centerOfMass,
				desc: descs.centerOfMass
			}),
			Input({
				attribute: 'Default',
				type: InputType.text,
				text: texts.defaultSuspension,
				desc: descs.defaultSuspension,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Type',
				type: InputType.file,
				fileType: FileType.suspensions,
				text: texts.suspensionsFile,
				desc: descs.suspensionsFile,
				bold: true
			}),
			Select({
				attribute: 'DiffLockType',
				selector: selectors.truckData,
				text: texts.diffLock,
				desc: descs.diffLock,
				options: {
					None: texts.none,
					Installed: texts.installed,
					Uninstalled: texts.uninstalled,
					Always: texts.always
				},
				bold: true
			})
		]),
		Group({
			name: texts.gearboxGroupName,
			defaultSelector: selectors.gearbox
		}, [
			Input({
				attribute: 'Default',
				type: InputType.text,
				text: texts.defaultGearbox,
				desc: descs.defaultGearbox,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Type',
				type: InputType.file,
				fileType: FileType.gearboxes,
				text: texts.gearboxesFile,
				desc: descs.gearboxesFile,
				bold: true
			})
		]),
		Group({
			name: texts.engineGroupName,
			defaultSelector: selectors.engine
		}, [
			Input({
				attribute: 'Default',
				type: InputType.text,
				text: texts.defaultEngine,
				desc: descs.defaultEngine,
				onlyDeveloper: true
			}),
			Input({
				attribute: 'Type',
				type: InputType.file,
				fileType: FileType.engines,
				text: texts.enginesFile,
				desc: descs.enginesFile,
				bold: true
			}),
			Input({
				attribute: 'EngineStartDelay',
				selector: selectors.truckData,
				text: texts.engineStartDelay,
				desc: descs.engineStartDelay,
				max: 8.0
			}),
			Input({
				attribute: 'ExhaustStartTime',
				selector: selectors.truckData,
				text: texts.exhaustStartTime,
				desc: descs.exhaustStartTime
			})
		]),
		Group({
			name: texts.fuelGroupName,
			defaultSelector: selectors.fuelTank
		}, [
			Input({
				attribute: 'DamageCapacity',
				numberType: NumberType.integer,
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				max: 64000,
				step: 10,
				default: 0,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Input({
				attribute: 'FuelCapacity',
				numberType: NumberType.integer,
				selector: selectors.truckData,
				desc: texts.fuelCapacity,
				text: descs.fuelCapacity,
				step: 10,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				},
				bold: true,
			})
		]),
		Group({
			name: texts.unlockGroupName,
			defaultSelector: selectors.gameData
		}, [
			Select({
				attribute: 'Country',
				text: texts.country,
				desc: descs.country,
				options: {
					RU: texts.russia,
					US: texts.us,
					EMPTY: texts.any
				},
				bold: true
			}),
			Input({
				attribute: 'Price',
				numberType: NumberType.integer,
				text: texts.price,
				desc: descs.price,
				bold: true
			}),
			Select({
				attribute: 'UnlockByExploration',
				text: texts.byExploration,
				desc: descs.byExploration,
				options: {
					true: texts.findOnMap,
					false: texts.byRank
				}
			}),
			Input({
				attribute: 'UnlockByRank',
				numberType: NumberType.integer,
				text: texts.unlockByRank,
				desc: descs.unlockByRank,
				min: 1
			})
		])
	])
}
