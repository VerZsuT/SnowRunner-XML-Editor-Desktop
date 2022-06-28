import FileType from "enums/FileType";
import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { Coordinates, File, ForEach, Group, Number, Select, Template, Text } from "../items";
import { getSelectors } from "../service";
import texts from "./texts";

const selectors = getSelectors(({ forEach }) => {
    const truckData = "Truck.TruckData";
    const gameData = "Truck.GameData";
    const UIDesc = `${gameData}.UiDesc`;
    const wheels = `${truckData}.Wheels`;
    const extraWheels = `${truckData}.ExtraWheels`;
    const extraWheel = `${extraWheels}.Wheel${forEach}`;
    const compatibleWheels = `${truckData}.CompatibleWheels${forEach}`;
    const upgradableWinch = `${truckData}.WinchUpgradeSocket`;
    const staticWinch = `${truckData}.Winch`;
    const suspension = `${truckData}.SuspensionSocket`;
    const gearbox = `${truckData}.GearboxSocket`;
    const engine = `${truckData}.EngineSocket`;
    const fuelTank = `${truckData}.FuelTank`;
    const physicsBody = "Truck.PhysicsModel.Body";
    const wheel = `${wheels}.Wheel${forEach}`;

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
    };
});

export default <ITemplate> {
    selector: "Truck",
    actions: [
        "cranes",
        "addonsContent",
        "trailers",
        "zikz_605r/banditCrane"
    ],
    template: Template(selectors, [
        Group({
            label: texts.textGroupName,
            providedSelector: selectors.UIDesc,
            iconName: "texts.png"
        }, [
            Text({
                attribute: "UiName",
                label: texts.UIName
            }),
            Text({
                attribute: "UiDesc",
                label: texts.UIDesc
            })
        ]),
        Group({
            label: texts.controlGroupName,
            providedSelector: selectors.truckData,
            iconName: "steering-wheel.png"
        }, [
            Number({
                attribute: "Responsiveness",
                label: texts.responsiveness,
                max: 1.0,
                min: 0.0,
                step: 0.01
            }),
            Number({
                attribute: "BackSteerSpeed",
                label: texts.backSteerSpeed,
                max: 1.0,
                min: 0.0,
                step: 0.01
            }),
            Number({
                attribute: "SteerSpeed",
                label: texts.steerSpeed,
                max: 1.0,
                min: 0.0,
                step: 0.01
            })
        ]),
        Group({
            label: texts.winchGroupName,
            iconName: "winches.png"
        }, [
            Number({
                attribute: "Length",
                selector: selectors.staticWinch,
                label: texts.winchLength,
                max: 100,
                min: 0,
                step: 1,
                default: 14
            }),
            Number({
                attribute: "StrengthMult",
                selector: selectors.staticWinch,
                label: texts.winchStrength,
                max: 10,
                min: 0,
                default: 1
            }),
            File({
                attribute: "Type",
                selector: selectors.upgradableWinch,
                type: FileType.winches
            })
        ]),
        Group({
            label: texts.wheelsGroupName,
            providedSelector: selectors.wheels,
            iconName: "wheels.png"
        }, [
            Group(texts.physicsWheels, [
                ForEach(selectors.wheel, [
                    Group({
                        label: texts.wheel,
                        providedSelector: selectors.wheel,
                        addCounter: true
                    }, [
                        Select({
                            attribute: "Torque",
                            label: texts.torque,
                            options: {
                                default: texts.torqueDefault,
                                full: texts.torqueFull,
                                none: texts.torqueNone,
                                connectable: texts.torqueConnectable
                            },
                            default: "none"
                        }),
                        Number({
                            attribute: "SteeringAngle",
                            label: texts.steeringAngle,
                            max: 90,
                            min: -90,
                            step: 1,
                            default: 0
                        })
                    ])
                ]),
                ForEach(selectors.extraWheel, [
                    Group({
                        label: texts.extraWheel,
                        providedSelector: selectors.extraWheel,
                        addCounter: true
                    }, [
                        Select({
                            attribute: "Torque",
                            label: texts.torque,
                            options: {
                                default: texts.torqueDefault,
                                full: texts.torqueFull,
                                none: texts.torqueNone,
                                connectable: texts.torqueConnectable
                            },
                            default: "none"
                        }),
                        Number({
                            attribute: "SteeringAngle",
                            label: texts.steeringAngle,
                            max: 90,
                            min: -90,
                            step: 1,
                            default: 0
                        })
                    ])
                ])
            ]),
            Group(texts.wheelsSizes, [
                ForEach(selectors.compatibleWheels, [
                    Group({
                        label: texts.wheelsSet,
                        providedSelector: selectors.compatibleWheels,
                        addCounter: true
                    }, [
                        Number({
                            attribute: "Scale",
                            label: texts.wheelScale
                        })
                    ])
                ])
            ]),
            File({
                attribute: "DefaultWheelType",
                type: FileType.wheels
            })
        ]),
        Group({
            label: texts.suspensionGroupName,
            providedSelector: selectors.suspension,
            iconName: "suspensions.png"
        }, [
            Coordinates({
                attribute: "CenterOfMassOffset",
                selector: selectors.physicsBody,
                label: texts.centerOfMass
            }),
            Select({
                attribute: "DiffLockType",
                selector: selectors.truckData,
                label: texts.diffLock,
                options: {
                    None: texts.none,
                    Installed: texts.installed,
                    Uninstalled: texts.uninstalled,
                    Always: texts.always
                }
            }),
            File({
                attribute: "Type",
                type: FileType.suspensions
            })
        ]),
        Group({
            label: texts.gearboxGroupName,
            providedSelector: selectors.gearbox,
            iconName: "gearboxes.png"
        }, [
            File({
                attribute: "Type",
                type: FileType.gearboxes
            })
        ]),
        Group({
            label: texts.engineGroupName,
            providedSelector: selectors.engine,
            iconName: "engines.png"
        }, [
            Number({
                attribute: "EngineStartDelay",
                selector: selectors.truckData,
                label: texts.engineStartDelay,
                max: 8,
                min: 0
            }),
            Number({
                attribute: "ExhaustStartTime",
                selector: selectors.truckData,
                label: texts.exhaustStartTime,
                min: 0
            }),
            File({
                attribute: "Type",
                type: FileType.engines
            })
        ]),
        Group({
            label: texts.fuelGroupName,
            providedSelector: selectors.fuelTank,
            iconName: "fuel.png"
        }, [
            Number({
                attribute: "DamageCapacity",
                type: NumberType.integer,
                label: texts.damageCapacity,
                step: 10,
                default: 0,
                areas: {
                    yellow: [[1000, 5000]],
                    red: [[5001, Infinity]]
                }
            }),
            Number({
                attribute: "FuelCapacity",
                type: NumberType.integer,
                selector: selectors.truckData,
                label: texts.fuelCapacity,
                step: 10,
                areas: {
                    yellow: [[1000, 5000]],
                    red: [[5001, Infinity]]
                }
            })
        ]),
        Group({
            label: texts.unlockGroupName,
            providedSelector: selectors.gameData,
            iconName: "unlock.png"
        }, [
            Select({
                attribute: "Country",
                label: texts.country,
                default: "",
                options: {
                    RU: texts.russia,
                    US: texts.us,
                    EMPTY: texts.any
                }
            }),
            Number({
                attribute: "Price",
                type: NumberType.integer,
                label: texts.price
            }),
            Select({
                attribute: "UnlockByExploration",
                label: texts.byExploration,
                options: {
                    true: texts.findOnMap,
                    false: texts.byRank
                }
            }),
            Number({
                attribute: "UnlockByRank",
                type: NumberType.integer,
                label: texts.unlockByRank,
                max: 30,
                min: 1
            })
        ])
    ])
};
