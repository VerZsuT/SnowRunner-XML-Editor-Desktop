import {NameType, NumberType} from 'enums'
import type {XMLTemplate} from 'types'

import {ForEach, Group, Number, Template} from '../items'
import {unlockGroup} from '../presets/unlockGroup'
import {getSelectors} from '../service'
import {suspensionTexts} from './texts'

const selectors = getSelectors(({ forEach, forEachBy }) => {
    const suspensionSet = `SuspensionSetVariants.SuspensionSet${forEach}`
    const suspensionSetText = `${suspensionSet}.GameData.UiDesc`
    const suspension = `${suspensionSet}.Suspension${forEachBy(2)}`
    const gameData = `${suspensionSet}.GameData`

    return { suspensionSet, suspensionSetText, suspension, gameData }
})

export const suspensionTemplate = {
    selector: 'SuspensionSetVariants',
    template: Template(selectors, [
        ForEach(selectors.suspensionSet, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: ['UiName', 'Name'],
                    selector: [selectors.suspensionSetText, selectors.suspensionSet]
                },
                provided: selectors.suspensionSet
            }, [
                Number({
                    attribute: 'CriticalDamageThreshold',
                    label: suspensionTexts.criticalDamageThreshold,
                    max: 0.999,
                    min: 0,
                    step: 0.01,
                    default: 0.7
                }),
                Number({
                    attribute: 'DamageCapacity',
                    type: NumberType.integer,
                    label: suspensionTexts.damageCapacity,
                    max: 64000,
                    step: 10,
                    default: 0,
                    areas: {
                        yellow: [[1000, 10000]],
                        red: [[10001, Infinity]]
                    }
                }),
                ForEach(selectors.suspension, [
                    Group({
                        label: suspensionTexts.suspension,
                        provided: selectors.suspension,
                        addCounter: true
                    }, [
                        Number({
                            attribute: 'Height',
                            label: suspensionTexts.height,
                            max: 1000,
                            min: -1000,
                            areas: {
                                yellow: [[-2, -1], [1, 2]],
                                red: [[-1000, -2.1], [2.1, 1000]]
                            }
                        }),
                        Number({
                            attribute: 'Strength',
                            label: suspensionTexts.strength,
                            step: 0.01,
                            areas: {
                                yellow: [[0.5, 1.5]],
                                red: [[1.6, Infinity]]
                            }
                        }),
                        Number({
                            attribute: 'Damping',
                            label: suspensionTexts.damping,
                            max: 1000,
                            areas: {
                                yellow: [[1, 3]],
                                red: [[3, 1000]]
                            }
                        }),
                        Number({
                            attribute: 'SuspensionMin',
                            label: suspensionTexts.suspensionMin,
                            max: 1000,
                            min: -1000,
                            step: 0.01,
                            areas: {
                                yellow: [[-5, -2], [2, 5]],
                                red: [[-1000, -5.1], [5.1, 1000]]
                            }
                        }),
                        Number({
                            attribute: 'SuspensionMax',
                            label: suspensionTexts.suspensionMax,
                            max: 1000,
                            min: -1000,
                            step: 0.01,
                            default: 1,
                            areas: {
                                yellow: [[-5, -2], [2, 5]],
                                red: [[-1000, -5.1], [5.1, 1000]]
                            }
                        }),
                        Number({
                            attribute: 'BrokenSuspensionMax',
                            label: suspensionTexts.brokenSuspensionMax,
                            max: 1000,
                            min: -1000,
                            step: 0.01,
                            areas: {
                                yellow: [[-5, -2], [2, 5]],
                                red: [[-1000, -5.1], [5.1, 1000]]
                            }
                        })
                    ])
                ]),
                unlockGroup(selectors.gameData)
            ])
        ])
    ])
} as XMLTemplate
