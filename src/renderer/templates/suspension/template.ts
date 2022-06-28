import NameType from "enums/NameType";
import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Template } from "../items";
import unlockGroup from "../presets/unlockGroup";
import { getSelectors } from "../service";
import texts from "./texts";

const selectors = getSelectors(({ forEach, forEachBy }) => {
    const suspensionSet = `SuspensionSetVariants.SuspensionSet${forEach}`;
    const suspensionSetText = `${suspensionSet}.GameData.UiDesc`;
    const suspension = `${suspensionSet}.Suspension${forEachBy(2)}`;
    const gameData = `${suspensionSet}.GameData`;

    return { suspensionSet, suspensionSetText, suspension, gameData };
});

export default <ITemplate> {
    selector: "SuspensionSetVariants",
    template: Template(selectors, [
        ForEach(selectors.suspensionSet, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: "UiName",
                    extraAttribute: "Name",
                    selector: selectors.suspensionSetText,
                    extraSelector: selectors.suspensionSet
                },
                providedSelector: selectors.suspensionSet
            }, [
                Number({
                    attribute: "CriticalDamageThreshold",
                    label: texts.criticalDamageThreshold,
                    max: 0.999,
                    min: 0,
                    step: 0.01,
                    default: 0.7
                }),
                Number({
                    attribute: "DamageCapacity",
                    type: NumberType.integer,
                    label: texts.damageCapacity,
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
                        label: texts.suspension,
                        providedSelector: selectors.suspension,
                        addCounter: true
                    }, [
                        Number({
                            attribute: "Height",
                            label: texts.height,
                            max: 1000,
                            min: -1000,
                            areas: {
                                yellow: [[-2, -1], [1, 2]],
                                red: [[-1000, -2.1], [2.1, 1000]]
                            }
                        }),
                        Number({
                            attribute: "Strength",
                            label: texts.strength,
                            step: 0.01,
                            areas: {
                                yellow: [[0.5, 1.5]],
                                red: [[1.6, Infinity]]
                            }
                        }),
                        Number({
                            attribute: "Damping",
                            label: texts.damping,
                            max: 1000,
                            areas: {
                                yellow: [[1, 3]],
                                red: [[3, 1000]]
                            }
                        }),
                        Number({
                            attribute: "SuspensionMin",
                            label: texts.suspensionMin,
                            max: 1000,
                            min: -1000,
                            step: 0.01,
                            areas: {
                                yellow: [[-5, -2], [2, 5]],
                                red: [[-1000, -5.1], [5.1, 1000]]
                            }
                        }),
                        Number({
                            attribute: "SuspensionMax",
                            label: texts.suspensionMax,
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
                            attribute: "BrokenSuspensionMax",
                            label: texts.brokenSuspensionMax,
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
};
