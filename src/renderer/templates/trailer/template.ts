import {NumberType} from 'enums'
import type {XMLTemplate} from 'types'

import {ForEach, Group, Number, Template} from '../items'
import {getSelectors} from '../service'
import {trailerTexts} from './texts'

const selectors = getSelectors(({ forEach }) => {
    const truckData = 'Truck.TruckData'
    const wheels = `${truckData}.Wheels`
    const wheel = `${wheels}.Wheel${forEach}`
    const modelBody = 'Truck.PhysicsModel.Body'
    const fuelMass = 'Truck.FuelMass.Body'
    const gameData = 'Truck.GameData'
    const addonSlots = `${gameData}.AddonSlots`

    return { truckData, modelBody, fuelMass, gameData, addonSlots, wheel }
})

export const trailerTemplate = {
    selector: 'Truck[Type="Trailer"]',
    template: Template(selectors, [
        Group({
            label: trailerTexts.inner,
            provided: selectors.truckData
        }, [
            Number({
                attribute: 'FuelCapacity',
                type: NumberType.integer,
                label: trailerTexts.fuelCapacity,
                max: 64000,
                step: 10,
                default: 0,
                areas: {
                    yellow: [[1000, 5000]],
                    red: [[5001, Infinity]]
                }
            }),
            Number({
                attribute: 'RepairsCapacity',
                type: NumberType.integer,
                label: trailerTexts.repairsCapacity,
                default: 0,
                areas: {
                    yellow: [[1000, 5000]],
                    red: [[5001, Infinity]]
                }
            }),
            Number({
                attribute: 'WheelRepairsCapacity',
                type: NumberType.integer,
                label: trailerTexts.wheelRepairsCapacity,
                default: 0,
                areas: {
                    yellow: [[100, 500]],
                    red: [[501, Infinity]]
                }
            }),
            Number({
                attribute: 'Quantity',
                type: NumberType.integer,
                selector: selectors.addonSlots,
                label: trailerTexts.quantity
            })
        ]),
        Group(trailerTexts.mass, [
            Number({
                attribute: 'Mass',
                type: NumberType.integer,
                selector: selectors.modelBody,
                label: trailerTexts.trailerMass
            }),
            Number({
                attribute: 'Mass',
                type: NumberType.integer,
                selector: selectors.fuelMass,
                label: trailerTexts.fuelMass
            })
        ]),
        Group({
            label: trailerTexts.wheels
        }, [
            ForEach(selectors.wheel, [
                Group({
                    label: trailerTexts.wheel,
                    provided: selectors.wheel,
                    addCounter: true
                }, [
                    Number({
                        attribute: 'SuspensionHeight',
                        label: trailerTexts.suspHeight
                    }),
                    Number({
                        attribute: 'SuspensionStrength',
                        label: trailerTexts.suspStrength
                    })
                ])
            ])
        ]),
        Group({
            label: trailerTexts.other,
            provided: selectors.gameData
        }, [
            Number({
                attribute: 'Price',
                type: NumberType.integer,
                label: trailerTexts.price
            })
        ])
    ])
} as XMLTemplate
