import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Template } from "../items";
import { getSelectors } from "../service";
import texts from "./texts";

const selectors = getSelectors(({ forEach }) => {
    const truckData = "Truck.TruckData";
    const wheels = `${truckData}.Wheels`;
    const wheel = `${wheels}.Wheel${forEach}`;
    const modelBody = "Truck.PhysicsModel.Body";
    const fuelMass = "Truck.FuelMass.Body";
    const gameData = "Truck.GameData";
    const addonSlots = `${gameData}.AddonSlots`;

    return { truckData, modelBody, fuelMass, gameData, addonSlots, wheel };
});

export default <ITemplate> {
    selector: "Truck[Type=\"Trailer\"]",
    template: Template(selectors, [
        Group({
            label: texts.inner,
            providedSelector: selectors.truckData
        }, [
            Number({
                attribute: "FuelCapacity",
                type: NumberType.integer,
                label: texts.fuelCapacity,
                max: 64000,
                step: 10,
                default: 0,
                areas: {
                    yellow: [[1000, 5000]],
                    red: [[5001, Infinity]]
                }
            }),
            Number({
                attribute: "RepairsCapacity",
                type: NumberType.integer,
                label: texts.repairsCapacity,
                default: 0,
                areas: {
                    yellow: [[1000, 5000]],
                    red: [[5001, Infinity]]
                }
            }),
            Number({
                attribute: "WheelRepairsCapacity",
                type: NumberType.integer,
                label: texts.wheelRepairsCapacity,
                default: 0,
                areas: {
                    yellow: [[100, 500]],
                    red: [[501, Infinity]]
                }
            }),
            Number({
                attribute: "Quantity",
                type: NumberType.integer,
                selector: selectors.addonSlots,
                label: texts.quantity
            })
        ]),
        Group(texts.mass, [
            Number({
                attribute: "Mass",
                type: NumberType.integer,
                selector: selectors.modelBody,
                label: texts.trailerMass
            }),
            Number({
                attribute: "Mass",
                type: NumberType.integer,
                selector: selectors.fuelMass,
                label: texts.fuelMass
            })
        ]),
        Group({
            label: texts.wheels
        }, [
            ForEach(selectors.wheel, [
                Group({
                    label: texts.wheel,
                    providedSelector: selectors.wheel,
                    addCounter: true
                }, [
                    Number({
                        attribute: "SuspensionHeight",
                        label: texts.suspHeight
                    }),
                    Number({
                        attribute: "SuspensionStrength",
                        label: texts.suspStrength
                    })
                ])
            ])
        ]),
        Group({
            label: texts.other,
            providedSelector: selectors.gameData
        }, [
            Number({
                attribute: "Price",
                type: NumberType.integer,
                label: texts.price
            })
        ])
    ])
};
