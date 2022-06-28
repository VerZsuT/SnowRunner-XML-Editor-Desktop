import NameType from "enums/NameType";
import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Select, Template } from "../items";
import gear from "../presets/gear";
import unlockGroup from "../presets/unlockGroup";
import { getSelectors } from "../service";
import texts from "./texts";

const selectors = getSelectors(({ forEach, forEachBy }) => {
    const gearbox = `GearboxVariants.Gearbox${forEach}`;
    const gearboxText = `${gearbox}.GameData.UiDesc`;
    const reverseGear = `${gearbox}.ReverseGear`;
    const highGear = `${gearbox}.HighGear`;
    const gearItem = `${gearbox}.Gear${forEachBy(2)}`;
    const gameData = `${gearbox}.GameData`;
    const gearboxParams = `${gameData}.GearboxParams`;

    return { gearbox, gearboxText, reverseGear, highGear, gearItem, gameData, gearboxParams };
});

export default <ITemplate> {
    selector: "GearboxVariants",
    template: Template(selectors, [
        ForEach(selectors.gearbox, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: "UiName",
                    extraAttribute: "Name",
                    selector: selectors.gearboxText,
                    extraSelector: selectors.gearbox
                },
                providedSelector: selectors.gearbox
            }, [
                Number({
                    attribute: "AWDConsumptionModifier",
                    label: texts.awdConsumptionModifier,
                    max: 32,
                    min: 0,
                    default: 1
                }),
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
                Number({
                    attribute: "DamagedConsumptionModifier",
                    label: texts.damagedConsumptionModifier,
                    max: 32,
                    min: 0,
                    step: 0.01,
                    default: 1
                }),
                Number({
                    attribute: "FuelConsumption",
                    label: texts.fuelConsumption,
                    max: 10,
                    min: 0,
                    default: 0.1
                }),
                Number({
                    attribute: "IdleFuelModifier",
                    label: texts.idleFuelConsumption,
                    max: 10,
                    min: 0,
                    default: 0.3
                }),
                Select({
                    attribute: "IsManualLowGear",
                    selector: selectors.gearboxParams,
                    label: texts.lowerManualGear,
                    options: {
                        true: texts.allow,
                        false: texts.notAllow
                    },
                    default: "false"
                }),
                Group({
                    label: texts.gearboxParams,
                    providedSelector: selectors.gearboxParams
                }, [
                    Select({
                        attribute: "IsHighGearExists",
                        label: texts.highGear,
                        options: {
                            true: texts.allow,
                            false: texts.notAllow
                        },
                        default: "true"
                    }),
                    Select({
                        attribute: "IsLowerGearExists",
                        label: texts.lowerGear,
                        options: {
                            true: texts.allow,
                            false: texts.notAllow
                        },
                        default: "true"
                    }),
                    Select({
                        attribute: "IsLowerPlusGearExists",
                        label: texts.lowerPlusGear,
                        options: {
                            true: texts.allow,
                            false: texts.notAllow
                        },
                        default: "true"
                    }),
                    Select({
                        attribute: "IsLowerMinusGearExists",
                        label: texts.lowerMinusGear,
                        options: {
                            true: texts.allow,
                            false: texts.notAllow
                        },
                        default: "true"
                    })
                ]),
                Group(texts.gears, [
                    Group({
                        label: texts.reverseGear,
                        providedSelector: selectors.reverseGear
                    }, gear),
                    Group({
                        label: texts.highGear,
                        providedSelector: selectors.highGear
                    }, gear),
                    ForEach(selectors.gearItem, [
                        Group({
                            label: "",
                            providedSelector: selectors.gearItem,
                            addCounter: true
                        }, gear)
                    ])
                ]),
                unlockGroup(selectors.gameData)
            ])
        ])
    ])
};
