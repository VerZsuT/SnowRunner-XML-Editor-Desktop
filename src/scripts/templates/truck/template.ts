import {
	Template,
	Group,
	Select,
	Coordinates,
	ForEach,
	File,
	Number,
	Text
} from '../items'
import { NumberType, FileType } from '../enums'
import { getSelectors } from '../service'
import { descs, texts } from './texts'

const selectors = getSelectors(function() {
	const truckData = 'Truck.TruckData'
	const gameData = 'Truck.GameData'
	const UIDesc = `${gameData}.UiDesc`
	const wheels = `${truckData}.Wheels`
	const compatibleWheels = `${truckData}.CompatibleWheels${this.forEach}`
	const upgradableWinch = `${truckData}.WinchUpgradeSocket`
	const staticWinch = `${truckData}.Winch`
	const suspension = `${truckData}.SuspensionSocket`
	const gearbox = `${truckData}.GearboxSocket`
	const engine = `${truckData}.EngineSocket`
	const fuelTank = `${truckData}.FuelTank`
	const physicsBody = 'Truck.PhysicsModel.Body'
	const wheel = `${wheels}.Wheel${this.forEach}`
	return {truckData, gameData, UIDesc, wheels, compatibleWheels, upgradableWinch, suspension, gearbox,
		    engine, fuelTank, physicsBody, wheel, staticWinch}
})

export default <ITemplate> {
	selector: 'Truck',
	template: Template(selectors, [
		Group({
			name: texts.textGroupName,
			defaultSelector: selectors.UIDesc
		}, [
			Text({
				attribute: 'UiName',
				text: texts.UIName,
				desc: descs.UIName,
				bold: true
			}),
			Text({
				attribute: 'UiDesc',
				text: texts.UIDesc,
				desc: descs.UIDesc
			})
		]),
		Group({
			name: texts.controlGroupName,
			defaultSelector: selectors.truckData
		}, [
			Number({
				attribute: 'Responsiveness',
				text: texts.responsiveness,
				max: 1.0,
				min: 0.0,
				step: 0.01
			}),
			Number({
				attribute: 'BackSteerSpeed',
				text: texts.backSteerSpeed,
				desc: descs.backSteerSpeed,
				max: 1.0,
				min: 0.0,
				step: 0.01
			}),
			Number({
				attribute: 'SteerSpeed',
				text: texts.steerSpeed,
				desc: descs.steerSpeed,
				max: 1.0,
				min: 0.0,
				step: 0.01,
				bold: true
			})
		]),
		Group(texts.winchGroupName, [
			// Static
			Number({
				attribute: 'Length',
				selector: selectors.staticWinch,
				text: texts.winchLength,
				max: 100,
				min: 0,
				step: 1,
				default: 14
			}),
			Number({
				attribute: 'StrengthMult',
				selector: selectors.staticWinch,
				text: texts.winchStrength,
				max: 10,
				min: 0,
				default: 1
			}),
			// Upgradable
			Text({
				attribute: 'Default',
				selector: selectors.upgradableWinch,
				text: texts.defaultWinch,
				desc: descs.defaultWinch,
				onlyDev: true
			}),
			Select({
				attribute: 'IsUpgradable',
				selector: selectors.upgradableWinch,
				text: texts.isUpgradable,
				desc: descs.isUpgradable,
				options: {
					true: texts.allow,
					false: texts.notAllow
				}
			}),
			File({
				attribute: 'Type',
				selector: selectors.upgradableWinch,
				type: FileType.winches,
				text: texts.winchesFile,
				desc: descs.winchesFile,
				bold: true
			})
		]),
		Group({
			name: texts.wheelsGroupName,
			defaultSelector: selectors.wheels
		}, [
			Text({
				attribute: 'DefaultRim',
				text: texts.defaultRim,
				desc: descs.defaultRim,
				onlyDev: true
			}),
			Text({
				attribute: 'DefaultTire',
				text: texts.defaultTire,
				desc: descs.defaultTire,
				onlyDev: true
			}),
			File({
				attribute: 'DefaultWheelType',
				type: FileType.wheels,
				text: texts.defaultWheelType,
				desc: descs.wheelType,
				bold: true
			}),
			Group(texts.physicsWheels, [
				ForEach(selectors.wheel, [
					Group({
						name: texts.wheel,
						defaultSelector: selectors.wheel,
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
						Number({
							attribute: 'SteeringAngle',
							text: texts.steeringAngle,
							desc: descs.steeringAngle,
							max: 90,
							min: -90,
							step: 1,
							default: 0
						}),
						Number({
							attribute: 'SteeringCastor',
							text: texts.steeringCastor,
							desc: descs.steeringCastor,
							max: 45,
							min: 0,
							step: 1,
							default: 0
						})
					])
				])
			]),
			Group(texts.wheelsSizes, [
				ForEach(selectors.compatibleWheels, [
					Group({
						name: texts.wheelsSet,
						defaultSelector: selectors.compatibleWheels,
						withCounter: true
					}, [
						File({
							attribute: 'Type',
							type: FileType.wheels,
							text: texts.defaultWheelType,
							desc: descs.wheelType
						}),
						Number({
							attribute: 'Scale',
							text: texts.wheelScale
						})
					])
				])
			])
		]),
		Group({
			name: texts.suspensionGroupName,
			defaultSelector: selectors.suspension
		}, [
			Coordinates({
				attribute: 'CenterOfMassOffset',
				selector: selectors.physicsBody,
				text: texts.centerOfMass,
				desc: descs.centerOfMass
			}),
			Text({
				attribute: 'Default',
				text: texts.defaultSuspension,
				desc: descs.defaultSuspension,
				onlyDev: true
			}),
			File({
				attribute: 'Type',
				type: FileType.suspensions,
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
			Text({
				attribute: 'Default',
				text: texts.defaultGearbox,
				desc: descs.defaultGearbox,
				onlyDev: true
			}),
			File({
				attribute: 'Type',
				type: FileType.gearboxes,
				text: texts.gearboxesFile,
				desc: descs.gearboxesFile,
				bold: true
			})
		]),
		Group({
			name: texts.engineGroupName,
			defaultSelector: selectors.engine
		}, [
			Text({
				attribute: 'Default',
				text: texts.defaultEngine,
				desc: descs.defaultEngine,
				onlyDev: true
			}),
			File({
				attribute: 'Type',
				type: FileType.engines,
				text: texts.enginesFile,
				desc: descs.enginesFile,
				bold: true
			}),
			Number({
				attribute: 'EngineStartDelay',
				selector: selectors.truckData,
				text: texts.engineStartDelay,
				desc: descs.engineStartDelay,
				max: 8,
				min: 0
			}),
			Number({
				attribute: 'ExhaustStartTime',
				selector: selectors.truckData,
				text: texts.exhaustStartTime,
				desc: descs.exhaustStartTime,
				min: 0
			})
		]),
		Group({
			name: texts.fuelGroupName,
			defaultSelector: selectors.fuelTank
		}, [
			Number({
				attribute: 'DamageCapacity',
				type: NumberType.integer,
				text: texts.damageCapacity,
				desc: descs.damageCapacity,
				step: 10,
				default: 0,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			}),
			Number({
				attribute: 'FuelCapacity',
				type: NumberType.integer,
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
			Number({
				attribute: 'Price',
				type: NumberType.integer,
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
			Number({
				attribute: 'UnlockByRank',
				type: NumberType.integer,
				text: texts.unlockByRank,
				desc: descs.unlockByRank,
				max: 30,
				min: 1
			})
		])
	])
}
