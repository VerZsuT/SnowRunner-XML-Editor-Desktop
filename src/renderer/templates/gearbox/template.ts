import {NameType, NumberType} from 'enums'
import type {XMLTemplate} from 'types'

import {ForEach, Group, Number, Select, Template} from '../items'
import {gearPreset} from '../presets/gear'
import {unlockGroup} from '../presets/unlockGroup'
import {getSelectors} from '../service'
import {gearboxTexts} from './texts'

const selectors = getSelectors(({ forEach, forEachBy }) => {
    const gearbox = `GearboxVariants.Gearbox${forEach}`
    const gearboxText = `${gearbox}.GameData.UiDesc`
    const reverseGear = `${gearbox}.ReverseGear`
    const highGear = `${gearbox}.HighGear`
    const gearItem = `${gearbox}.Gear${forEachBy(2)}`
    const gameData = `${gearbox}.GameData`
    const gearboxParams = `${gameData}.GearboxParams`

    return { gearbox, gearboxText, reverseGear, highGear, gearItem, gameData, gearboxParams }
})

export const gearboxTemplate = {
    selector: 'GearboxVariants',
    template: Template(selectors, [
        ForEach(selectors.gearbox, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: ['UiName', 'Name'],
                    selector: [selectors.gearboxText, selectors.gearbox]
                },
                provided: selectors.gearbox
            }, [
                Number({
                    attribute: 'AWDConsumptionModifier',
                    label: gearboxTexts.awdConsumptionModifier,
                    max: 32,
                    min: 0,
                    default: 1
                }),
                Number({
                    attribute: 'CriticalDamageThreshold',
                    label: gearboxTexts.criticalDamageThreshold,
                    max: 0.999,
                    min: 0,
                    step: 0.01,
                    default: 0.7
                }),
                Number({
                    attribute: 'DamageCapacity',
                    type: NumberType.integer,
                    label: gearboxTexts.damageCapacity,
                    max: 64000,
                    step: 10,
                    default: 0,
                    areas: {
                        yellow: [[1000, 10000]],
                        red: [[10001, Infinity]]
                    }
                }),
                Number({
                    attribute: 'DamagedConsumptionModifier',
                    label: gearboxTexts.damagedConsumptionModifier,
                    max: 32,
                    min: 0,
                    step: 0.01,
                    default: 1
                }),
                Number({
                    attribute: 'FuelConsumption',
                    label: gearboxTexts.fuelConsumption,
                    max: 10,
                    min: 0,
                    default: 0.1
                }),
                Number({
                    attribute: 'IdleFuelModifier',
                    label: gearboxTexts.idleFuelConsumption,
                    max: 10,
                    min: 0,
                    default: 0.3
                }),
                Select({
                    attribute: 'IsManualLowGear',
                    selector: selectors.gearboxParams,
                    label: gearboxTexts.lowerManualGear,
                    options: {
                        true: gearboxTexts.allow,
                        false: gearboxTexts.notAllow
                    },
                    default: 'false'
                }),
                Group({
                    label: gearboxTexts.gearboxParams,
                    provided: selectors.gearboxParams
                }, [
                    Select({
                        attribute: 'IsHighGearExists',
                        label: gearboxTexts.highGear,
                        options: {
                            true: gearboxTexts.gearAllow,
                            false: gearboxTexts.gearNotAllow
                        },
                        default: 'true'
                    }),
                    Select({
                        attribute: 'IsLowerGearExists',
                        label: gearboxTexts.lowerGear,
                        options: {
                            true: gearboxTexts.gearAllow,
                            false: gearboxTexts.gearNotAllow
                        },
                        default: 'true'
                    }),
                    Select({
                        attribute: 'IsLowerPlusGearExists',
                        label: gearboxTexts.lowerPlusGear,
                        options: {
                            true: gearboxTexts.gearAllow,
                            false: gearboxTexts.gearNotAllow
                        },
                        default: 'true'
                    }),
                    Select({
                        attribute: 'IsLowerMinusGearExists',
                        label: gearboxTexts.lowerMinusGear,
                        options: {
                            true: gearboxTexts.gearAllow,
                            false: gearboxTexts.gearNotAllow
                        },
                        default: 'true'
                    })
                ]),
                Group(gearboxTexts.gears, [
                    Group({
                        label: gearboxTexts.reverseGear,
                        provided: selectors.reverseGear
                    }, gearPreset),
                    Group({
                        label: gearboxTexts.highGear,
                        provided: selectors.highGear
                    }, gearPreset),
                    ForEach(selectors.gearItem, [
                        Group({
                            label: '',
                            provided: selectors.gearItem,
                            addCounter: true
                        }, gearPreset)
                    ])
                ]),
                unlockGroup(selectors.gameData)
            ])
        ])
    ])
} as XMLTemplate
