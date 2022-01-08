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

const selectors = getSelectors(function () {
	const truckData = 'Truck.TruckData'
	const gameData = 'Truck.GameData'
	const UIDesc = `${gameData}.UiDesc`
	const wheels = `${truckData}.Wheels`
	const extraWheels = `${truckData}.ExtraWheels`
	const extraWheel = `${extraWheels}.Wheel${this.forEach}`
	const compatibleWheels = `${truckData}.CompatibleWheels${this.forEach}`
	const upgradableWinch = `${truckData}.WinchUpgradeSocket`
	const staticWinch = `${truckData}.Winch`
	const suspension = `${truckData}.SuspensionSocket`
	const gearbox = `${truckData}.GearboxSocket`
	const engine = `${truckData}.EngineSocket`
	const fuelTank = `${truckData}.FuelTank`
	const physicsBody = 'Truck.PhysicsModel.Body'
	const wheel = `${wheels}.Wheel${this.forEach}`
	return {
		truckData, gameData, UIDesc, wheels, compatibleWheels, upgradableWinch, suspension, gearbox,
		engine, fuelTank, physicsBody, wheel, staticWinch, extraWheel, extraWheels
	}
})

export const truck = <ITemplate>{
	selector: 'Truck',
	template: Template(selectors, [
		Group({
			name: texts.textGroupName,
			defaultSelector: selectors.UIDesc,
			icon: 'texts.png'
		}, [
			Text({
				attribute: 'UiName',
				text: texts.UIName,
				desc: descs.UIName
			}),
			Text({
				attribute: 'UiDesc',
				text: texts.UIDesc,
				desc: descs.UIDesc
			})
		]),
		Group({
			name: texts.controlGroupName,
			defaultSelector: selectors.truckData,
			icon: 'steering-wheel.png'
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
				step: 0.01
			})
		]),
		Group({
			name: texts.winchGroupName,
			icon: 'winch.png'
		}, [
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
			File({
				attribute: 'Type',
				selector: selectors.upgradableWinch,
				type: FileType.winches,
				text: texts.winchesFile,
				desc: descs.winchesFile
			})
		]),
		Group({
			name: texts.wheelsGroupName,
			defaultSelector: selectors.wheels,
			icon: 'wheel.png'
		}, [
			Group(texts.physicsWheels, [
				Group({
					name: texts.extraWheels,
					defaultSelector: selectors.extraWheels
				}, [
					Number({
						attribute: 'Scale',
						text: texts.wheelScale
					}),
					Text({
						attribute: 'Tire',
						text: texts.tireName
					}),
					ForEach(selectors.extraWheel, [
						Group({
							name: texts.wheel,
							defaultSelector: selectors.extraWheel,
							withCounter: true
						}, [
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
				ForEach(selectors.wheel, [
					Group({
						name: texts.wheel,
						defaultSelector: selectors.wheel,
						withCounter: true
					}, [
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
						Number({
							attribute: 'Scale',
							text: texts.wheelScale
						})
					])
				])
			]),
			File({
				attribute: 'DefaultWheelType',
				type: FileType.wheels,
				text: texts.defaultWheelType,
				desc: descs.wheelType
			})
		]),
		Group({
			name: texts.suspensionGroupName,
			defaultSelector: selectors.suspension,
			icon: 'suspension.png'
		}, [
			Coordinates({
				attribute: 'CenterOfMassOffset',
				selector: selectors.physicsBody,
				text: texts.centerOfMass,
				desc: descs.centerOfMass
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
				}
			}),
			File({
				attribute: 'Type',
				type: FileType.suspensions,
				text: texts.suspensionsFile,
				desc: descs.suspensionsFile
			})
		]),
		Group({
			name: texts.gearboxGroupName,
			defaultSelector: selectors.gearbox,
			icon: 'gearbox.png'
		}, [
			File({
				attribute: 'Type',
				type: FileType.gearboxes,
				text: texts.gearboxesFile,
				desc: descs.gearboxesFile
			})
		]),
		Group({
			name: texts.engineGroupName,
			defaultSelector: selectors.engine,
			icon: 'engine.png'
		}, [
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
			}),
			File({
				attribute: 'Type',
				type: FileType.engines,
				text: texts.enginesFile,
				desc: descs.enginesFile
			})
		]),
		Group({
			name: texts.fuelGroupName,
			defaultSelector: selectors.fuelTank,
			icon: 'fuel.png'
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
				desc: descs.fuelCapacity,
				text: texts.fuelCapacity,
				step: 10,
				areas: {
					yellow: [[1000, 5000]],
					red: [[5001, Infinity]]
				}
			})
		]),
		Group({
			name: texts.unlockGroupName,
			defaultSelector: selectors.gameData,
			icon: 'unlock.png'
		}, [
			Select({
				attribute: 'Country',
				text: texts.country,
				desc: descs.country,
				options: {
					RU: texts.russia,
					US: texts.us,
					EMPTY: texts.any
				}
			}),
			Number({
				attribute: 'Price',
				type: NumberType.integer,
				text: texts.price,
				desc: descs.price
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
