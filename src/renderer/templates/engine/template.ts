import NameType from "enums/NameType";
import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Template } from "../items";
import unlockGroup from "../presets/unlockGroup";
import { getSelectors } from "../service";
import { descs, texts } from "./texts";

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
                nameType: NameType.computed,
                nameAttribute: "UiName",
                resNameAttribute: "Name",
                nameSelector: selectors.engineText,
                resNameSelector: selectors.engine,
                defaultSelector: selectors.engine
            }, [
                Number({
                    attribute: "CriticalDamageThreshold",
                    text: texts.criticalDamageThreshold,
                    desc: descs.criticalDamageThreshold,
                    max: 0.990,
                    min: 0,
                    step: 0.01,
                    default: 0.7
                }),
                Number({
                    attribute: "DamageCapacity",
                    type: NumberType.integer,
                    text: texts.damageCapacity,
                    desc: descs.damageCapacity,
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
                    text: texts.damagedConsumptionModifier,
                    desc: descs.damagedConsumptionModifier,
                    max: 32,
                    default: 1
                }),
                Number({
                    attribute: "EngineResponsiveness",
                    text: texts.responsiveness,
                    desc: descs.responsiveness,
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
                    text: texts.fuelConsumption,
                    desc: descs.fuelConsumption,
                    max: 100.0,
                    default: 0.5
                }),
                Number({
                    attribute: "Torque",
                    type: NumberType.integer,
                    text: texts.torque,
                    desc: descs.torque,
                    max: 1000000,
                    step: 100,
                    default: 0,
                    areas: {
                        yellow: [[700000, 80000]],
                        red: [[800001, Infinity]]
                    }
                }),
                Number({
                    attribute: "DamagedMinTorqueMultiplier",
                    text: texts.damagedMinTorqueModifier,
                    desc: descs.damagedMinTorqueModifier,
                    max: 1,
                    min: 0,
                    step: 0.01,
                    default: 0
                }),
                Number({
                    attribute: "DamagedMaxTorqueMultiplier",
                    text: texts.damagedMaxTorqueModifier,
                    desc: descs.damagedMaxTorqueModifier,
                    max: 1,
                    min: 0,
                    step: 0.01,
                    default: 0
                }),
                Number({
                    attribute: "BrakesDelay",
                    text: texts.breakesDelay,
                    max: 1,
                    min: 0,
                    default: 0
                }),
                Number({
                    attribute: "MaxDeltaAngVel",
                    text: texts.maxDeltaAngVel,
                    desc: descs.maxDeltaAngVel,
                    max: 1000000,
                    min: 0,
                    default: 0
                }),
                unlockGroup(selectors.engineGameData)
            ])
        ])
    ])
};
