import localize from "scripts/localize";

export const texts = localize({
    RU: {
        length: "Длина",
        strengthMult: "Сила",
        isEngineIgnitionRequired: "Работает от",
        engine: "Двигателя",
        battery: "Аккумулятора"
    },
    EN: {
        length: "Length",
        strengthMult: "Strength",
        isEngineIgnitionRequired: "Works from",
        engine: "Engine",
        battery: "Battery"
    },
    DE: {
        length: "Länge",
        strengthMult: "Stärke",
        isEngineIgnitionRequired: "Arbeitet von",
        engine: "Motor",
        battery: "Batterie"
    },
    CH: {
        length: "长度",
        strengthMult: "的力量",
        isEngineIgnitionRequired: "由以下单位提供",
        engine: "发动机",
        battery: "电池"
    }
});

export const descs = localize({
    RU: {
        length: "Максимальная длина лебёдки",
        strengthMult: "Сила лебёдки",
        isEngineIgnitionRequired: "От чего работает (аккумулятор - автономная)."
    },
    EN: {
        length: "Maximum winch length",
        strengthMult: "Winch power",
        isEngineIgnitionRequired: "What it works on (battery-autonomous)."
    },
    DE: {
        length: "Maximale Länge der Winde",
        strengthMult: "Kraft der Winde",
        isEngineIgnitionRequired: "Was funktioniert (Batterie-autonom)."
    },
    CH: {
        length: "最大绞盘长度",
        strengthMult: "绞车的动力",
        isEngineIgnitionRequired: "在其上运行（电池驱动--自成一体）。"
    }
});
