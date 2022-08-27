import {NameType} from 'enums'
import type {XMLTemplate} from 'types'

import {ForEach, Group, Number, Select, Template} from '../items'
import {unlockGroup} from '../presets/unlockGroup'
import {getSelectors} from '../service'
import {wheelsTexts} from './texts'

const selectors = getSelectors(({ forEach }) => {
    const truckWheels = 'TruckWheels'
    const truckTire = `${truckWheels}.TruckTires.TruckTire${forEach}`
    const truckTireText = `${truckTire}.GameData.UiDesc`
    const wheelFriction = `${truckTire}.WheelFriction`
    const gameData = `${truckTire}.GameData`

    return { truckTire, truckTireText, wheelFriction, gameData }
})

export const wheelsTemplate = {
    selector: 'TruckWheels',
    template: Template(selectors, [
        ForEach(selectors.truckTire, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: ['UiName', 'Name'],
                    selector: [selectors.truckTireText, selectors.truckTire]
                },
                provided: selectors.wheelFriction
            }, [
                Number({
                    attribute: 'BodyFriction',
                    label: wheelsTexts.bodyFriction,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[7, 8]],
                        red: [[8.1, 10]]
                    },
                    addMissedTag: true
                }),
                Number({
                    attribute: 'BodyFrictionAsphalt',
                    label: wheelsTexts.bodyFrictionAsphalt,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[7, 8]],
                        red: [[8.1, 10]]
                    },
                    addMissedTag: true
                }),
                Number({
                    attribute: 'SubstanceFriction',
                    label: wheelsTexts.substanceFriction,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[7, 8]],
                        red: [[8.1, 10]]
                    },
                    addMissedTag: true
                }),
                Select({
                    attribute: 'IsIgnoreIce',
                    label: wheelsTexts.ignoreIse,
                    addMissedTag: true,
                    options: {
                        true: wheelsTexts.yes,
                        false: wheelsTexts.no
                    },
                    default: 'false'
                }),
                unlockGroup(selectors.gameData)
            ])
        ])
    ])
} as XMLTemplate
