import {FileType, NumberType} from 'enums'
import type {XMLTemplate} from 'types'

import {AddonsContent} from '../actions/addonsContent'
import {Cranes} from '../actions/cranes'
import {Trailers} from '../actions/trailers'
import {BanditCrane} from '../actions/zikz_605r/banditCrane'
import {Coordinates, File, ForEach, Group, Number, Select, Template, Text} from '../items'
import {getSelectors} from '../service'
import {truckTexts} from './texts'

const selectors = getSelectors(({ forEach }) => {
    const truckData = 'Truck.TruckData'
    const gameData = 'Truck.GameData'
    const UIDesc = `${gameData}.UiDesc`
    const wheels = `${truckData}.Wheels`
    const extraWheels = `${truckData}.ExtraWheels`
    const extraWheel = `${extraWheels}.Wheel${forEach}`
    const compatibleWheels = `${truckData}.CompatibleWheels${forEach}`
    const upgradableWinch = `${truckData}.WinchUpgradeSocket`
    const staticWinch = `${truckData}.Winch`
    const suspension = `${truckData}.SuspensionSocket`
    const gearbox = `${truckData}.GearboxSocket`
    const engine = `${truckData}.EngineSocket`
    const fuelTank = `${truckData}.FuelTank`
    const physicsBody = 'Truck.PhysicsModel.Body'
    const wheel = `${wheels}.Wheel${forEach}`

    return {
        truckData,
        gameData,
        UIDesc,
        wheels,
        compatibleWheels,
        upgradableWinch,
        suspension,
        gearbox,
        engine,
        fuelTank,
        physicsBody,
        wheel,
        staticWinch,
        extraWheel
    }
})

export const truckTemplate = {
    selector: 'Truck',
    actions: [
        BanditCrane,
        AddonsContent,
        Cranes,
        Trailers
    ],
    template: Template(selectors, [
        Group({
            label: truckTexts.textGroupName,
            provided: selectors.UIDesc,
            iconName: 'texts.png'
        }, [
            Text({
                attribute: 'UiName',
                label: truckTexts.UIName
            }),
            Text({
                attribute: 'UiDesc',
                label: truckTexts.UIDesc
            })
        ]),
        Group({
            label: truckTexts.controlGroupName,
            provided: selectors.truckData,
            iconName: 'steering-wheel.png'
        }, [
            Number({
                attribute: 'Responsiveness',
                label: truckTexts.responsiveness,
                max: 1.0,
                min: 0.0,
                step: 0.01
            }),
            Number({
                attribute: 'BackSteerSpeed',
                label: truckTexts.backSteerSpeed,
                max: 1.0,
                min: 0.0,
                step: 0.01
            }),
            Number({
                attribute: 'SteerSpeed',
                label: truckTexts.steerSpeed,
                max: 1.0,
                min: 0.0,
                step: 0.01
            })
        ]),
        Group({
            label: truckTexts.winchGroupName,
            iconName: 'winches.png'
        }, [
            Number({
                attribute: 'Length',
                selector: selectors.staticWinch,
                label: truckTexts.winchLength,
                max: 100,
                min: 0,
                step: 1,
                default: 14
            }),
            Number({
                attribute: 'StrengthMult',
                selector: selectors.staticWinch,
                label: truckTexts.winchStrength,
                max: 10,
                min: 0,
                default: 1
            }),
            File({
                attribute: 'Type',
                selector: selectors.upgradableWinch,
                type: FileType.winches
            })
        ]),
        Group({
            label: truckTexts.wheelsGroupName,
            provided: selectors.wheels,
            iconName: 'wheels.png'
        }, [
            Group(truckTexts.physicsWheels, [
                ForEach(selectors.wheel, [
                    Group({
                        label: truckTexts.wheel,
                        provided: selectors.wheel,
                        addCounter: true
                    }, [
                        Select({
                            attribute: 'Torque',
                            label: truckTexts.torque,
                            options: {
                                default: truckTexts.torqueDefault,
                                full: truckTexts.torqueFull,
                                none: truckTexts.torqueNone,
                                connectable: truckTexts.torqueConnectable
                            },
                            default: 'none'
                        }),
                        Number({
                            attribute: 'SteeringAngle',
                            label: truckTexts.steeringAngle,
                            max: 90,
                            min: -90,
                            step: 1,
                            default: 0
                        })
                    ])
                ]),
                ForEach(selectors.extraWheel, [
                    Group({
                        label: truckTexts.extraWheel,
                        provided: selectors.extraWheel,
                        addCounter: true
                    }, [
                        Select({
                            attribute: 'Torque',
                            label: truckTexts.torque,
                            options: {
                                default: truckTexts.torqueDefault,
                                full: truckTexts.torqueFull,
                                none: truckTexts.torqueNone,
                                connectable: truckTexts.torqueConnectable
                            },
                            default: 'none'
                        }),
                        Number({
                            attribute: 'SteeringAngle',
                            label: truckTexts.steeringAngle,
                            max: 90,
                            min: -90,
                            step: 1,
                            default: 0
                        })
                    ])
                ])
            ]),
            Group(truckTexts.wheelsSizes, [
                ForEach(selectors.compatibleWheels, [
                    Group({
                        label: truckTexts.wheelsSet,
                        provided: selectors.compatibleWheels,
                        addCounter: true
                    }, [
                        Number({
                            attribute: 'Scale',
                            label: truckTexts.wheelScale
                        })
                    ])
                ])
            ]),
            File({
                attribute: 'DefaultWheelType',
                type: FileType.wheels
            })
        ]),
        Group({
            label: truckTexts.suspensionGroupName,
            provided: selectors.suspension,
            iconName: 'suspensions.png'
        }, [
            Coordinates({
                attribute: 'CenterOfMassOffset',
                selector: selectors.physicsBody,
                label: truckTexts.centerOfMass
            }),
            Select({
                attribute: 'DiffLockType',
                selector: selectors.truckData,
                label: truckTexts.diffLock,
                options: {
                    None: truckTexts.none,
                    Installed: truckTexts.installed,
                    Uninstalled: truckTexts.uninstalled,
                    Always: truckTexts.always
                }
            }),
            File({
                attribute: 'Type',
                type: FileType.suspensions
            })
        ]),
        Group({
            label: truckTexts.gearboxGroupName,
            provided: selectors.gearbox,
            iconName: 'gearboxes.png'
        }, [
            File({
                attribute: 'Type',
                type: FileType.gearboxes
            })
        ]),
        Group({
            label: truckTexts.engineGroupName,
            provided: selectors.engine,
            iconName: 'engines.png'
        }, [
            Number({
                attribute: 'EngineStartDelay',
                selector: selectors.truckData,
                label: truckTexts.engineStartDelay,
                max: 8,
                min: 0
            }),
            Number({
                attribute: 'ExhaustStartTime',
                selector: selectors.truckData,
                label: truckTexts.exhaustStartTime,
                min: 0
            }),
            File({
                attribute: 'Type',
                type: FileType.engines
            })
        ]),
        Group({
            label: truckTexts.fuelGroupName,
            provided: selectors.fuelTank,
            iconName: 'fuel.png'
        }, [
            Number({
                attribute: 'DamageCapacity',
                type: NumberType.integer,
                label: truckTexts.damageCapacity,
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
                label: truckTexts.fuelCapacity,
                step: 10,
                areas: {
                    yellow: [[1000, 5000]],
                    red: [[5001, Infinity]]
                }
            })
        ]),
        Group({
            label: truckTexts.unlockGroupName,
            provided: selectors.gameData,
            iconName: 'unlock.png'
        }, [
            Select({
                attribute: 'Country',
                label: truckTexts.country,
                default: '',
                options: {
                    RU: truckTexts.russia,
                    US: truckTexts.us,
                    EMPTY: truckTexts.any
                }
            }),
            Number({
                attribute: 'Price',
                type: NumberType.integer,
                label: truckTexts.price
            }),
            Select({
                attribute: 'UnlockByExploration',
                label: truckTexts.byExploration,
                options: {
                    true: truckTexts.findOnMap,
                    false: truckTexts.byRank
                }
            }),
            Number({
                attribute: 'UnlockByRank',
                type: NumberType.integer,
                label: truckTexts.unlockByRank,
                max: 30,
                min: 1
            })
        ])
    ])
} as XMLTemplate
