import NameType from "enums/NameType";
import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Template } from "../items";
import unlockGroup from "../presets/unlockGroup";
import { getSelectors } from "../service";
import texts from "./texts";

const selectors = getSelectors(({ forEach }) => {
    const engine = `EngineVariants.Engine${forEach}`;
    const engineText = `${engine}.GameData.UiDesc`;
    const engineGameData = `${engine}.GameData`;

    return { engine, engineText, engineGameData };
});

export default <ITemplate> {
    selector: "EngineVariants",
    template: Template(selectors, [
        ForEach(selectors.engine, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: "UiName",
                    extraAttribute: "Name",
                    selector: selectors.engineText,
                    extraSelector: selectors.engine
                },
                providedSelector: selectors.engine
            }, [
                Number({
                    attribute: "CriticalDamageThreshold",
                    label: texts.criticalDamageThreshold,
                    max: 0.990,
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
                        yellow: [[1001, 5000]],
                        red: [[5001, Infinity]]
                    }
                }),
                Number({
                    attribute: "DamagedConsumptionModifier",
                    label: texts.damagedConsumptionModifier,
                    max: 32,
                    default: 1
                }),
                Number({
                    attribute: "EngineResponsiveness",
                    label: texts.responsiveness,
                    max: 1,
                    min: 0.01,
                    step: 0.01,
                    default: 0.04,
                    areas: {
                        yellow: [[0.1, 0.5]],
                        red: [[0.5, 1]]
                    }
                }),
                Number({
                    attribute: "FuelConsumption",
                    label: texts.fuelConsumption,
                    max: 100.0,
                    default: 0.5
                }),
                Number({
                    attribute: "Torque",
                    type: NumberType.integer,
                    label: texts.torque,
                    max: 1000000,
                    step: 100,
                    default: 0,
                    areas: {
                        yellow: [[700000, 800000]],
                        red: [[800001, Infinity]]
                    }
                }),
                Number({
                    attribute: "DamagedMinTorqueMultiplier",
                    label: texts.damagedMinTorqueModifier,
                    max: 1,
                    min: 0,
                    step: 0.01,
                    default: 0
                }),
                Number({
                    attribute: "DamagedMaxTorqueMultiplier",
                    label: texts.damagedMaxTorqueModifier,
                    max: 1,
                    min: 0,
                    step: 0.01,
                    default: 0
                }),
                Number({
                    attribute: "BrakesDelay",
                    label: texts.breakesDelay,
                    max: 1,
                    min: 0,
                    default: 0
                }),
                Number({
                    attribute: "MaxDeltaAngVel",
                    label: texts.maxDeltaAngVel,
                    max: 1000000,
                    min: 0,
                    default: 0
                }),
                unlockGroup(selectors.engineGameData)
            ])
        ])
    ])
};
