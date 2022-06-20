import NameType from "enums/NameType";
import NumberType from "enums/NumberType";
import type ITemplate from "types/ITemplate";

import { ForEach, Group, Number, Select, Template } from "../items";
import unlockGroup from "../presets/unlockGroup";
import { getSelectors } from "../service";
import { descs, texts } from "./texts";

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
                nameType: NameType.computed,
                nameAttribute: "UiName",
                resNameAttribute: "Name",
                nameSelector: selectors.winchText,
                resNameSelector: selectors.winch,
                defaultSelector: selectors.winch
            }, [
                Number({
                    attribute: "Length",
                    type: NumberType.integer,
                    text: texts.length,
                    desc: descs.length,
                    max: 100,
                    default: 14,
                    areas: {
                        yellow: [[30, 50]],
                        red: [[51, 100]]
                    }
                }),
                Number({
                    attribute: "StrengthMult",
                    text: texts.strengthMult,
                    desc: descs.strengthMult,
                    max: 10,
                    default: 1,
                    areas: {
                        yellow: [[2, 5]],
                        red: [[5.1, 10]]
                    }
                }),
                Select({
                    attribute: "IsEngineIgnitionRequired",
                    text: texts.isEngineIgnitionRequired,
                    desc: descs.isEngineIgnitionRequired,
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
