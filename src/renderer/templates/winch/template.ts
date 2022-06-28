import NameType from "enums/NameType";
import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Select, Template } from "../items";
import unlockGroup from "../presets/unlockGroup";
import { getSelectors } from "../service";
import texts from "./texts";

const selectors = getSelectors(({ forEach }) => {
    const winch = `WinchVariants.Winch${forEach}`;
    const winchText = `${winch}.GameData.UiDesc`;
    const gameData = `${winch}.GameData`;

    return { winch, winchText, gameData };
});

export default <ITemplate> {
    selector: "WinchVariants",
    template: Template(selectors, [
        ForEach(selectors.winch, [
            Group({
                label: {
                    type: NameType.computed,
                    attribute: "UiName",
                    extraAttribute: "Name",
                    selector: selectors.winchText,
                    extraSelector: selectors.winch
                },
                providedSelector: selectors.winch
            }, [
                Number({
                    attribute: "Length",
                    type: NumberType.integer,
                    label: texts.length,
                    max: 100,
                    default: 14,
                    areas: {
                        yellow: [[30, 50]],
                        red: [[51, 100]]
                    }
                }),
                Number({
                    attribute: "StrengthMult",
                    label: texts.strengthMult,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[2, 5]],
                        red: [[5.1, 10]]
                    }
                }),
                Select({
                    attribute: "IsEngineIgnitionRequired",
                    label: texts.isEngineIgnitionRequired,
                    options: {
                        true: texts.engine,
                        false: texts.battery
                    },
                    default: "true"
                }),
                unlockGroup(selectors.gameData)
            ])
        ])
    ])
};
