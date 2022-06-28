import NameType from "enums/NameType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Select, Template } from "../items";
import unlockGroup from "../presets/unlockGroup";
import { getSelectors } from "../service";
import texts from "./texts";

const selectors = getSelectors(({ forEach }) => {
    const truckWheels = "TruckWheels";
    const truckTire = `${truckWheels}.TruckTires.TruckTire${forEach}`;
    const truckTireText = `${truckTire}.GameData.UiDesc`;
    const wheelFriction = `${truckTire}.WheelFriction`;
    const gameData = `${truckTire}.GameData`;

    return { truckTire, truckTireText, wheelFriction, gameData };
});

export default <ITemplate> {
    selector: "TruckWheels",
    template: Template(selectors, [
        ForEach(selectors.truckTire, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: "UiName",
                    extraAttribute: "Name",
                    selector: selectors.truckTireText,
                    extraSelector: selectors.truckTire
                },
                providedSelector: selectors.wheelFriction
            }, [
                Number({
                    attribute: "BodyFriction",
                    label: texts.bodyFriction,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[7, 8]],
                        red: [[8.1, 10]]
                    },
                    addMissedTag: true
                }),
                Number({
                    attribute: "BodyFrictionAsphalt",
                    label: texts.bodyFrictionAsphalt,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[7, 8]],
                        red: [[8.1, 10]]
                    },
                    addMissedTag: true
                }),
                Number({
                    attribute: "SubstanceFriction",
                    label: texts.substanceFriction,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[7, 8]],
                        red: [[8.1, 10]]
                    },
                    addMissedTag: true
                }),
                Select({
                    attribute: "IsIgnoreIce",
                    label: texts.ignoreIse,
                    addMissedTag: true,
                    options: {
                        true: texts.yes,
                        false: texts.no
                    },
                    default: "false"
                }),
                unlockGroup(selectors.gameData)
            ])
        ])
    ])
};
