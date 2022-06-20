import localize from "scripts/localize";

export const texts = localize({
    RU: {
        height: "Высота",
        strength: "Жёсткость",
        damping: "Затухание",
        suspensionMin: "Минимальная высота подвески",
        suspensionMax: "Максимальная высота подвески",
        brokenSuspensionMax: "Максимальная высота подвески (когда сломана)",
        suspension: "Подвеска",
        criticalDamageThreshold: "Порог критического повреждения",
        damageCapacity: "Прочность"
    },
    EN: {
        height: "Height",
        strength: "Strength",
        damping: "Damping",
        suspensionMin: "Minimum suspension height",
        suspensionMax: "Maximum suspension height",
        brokenSuspensionMax: "Minimum suspension height in broken condition",
        suspension: "Suspension",
        criticalDamageThreshold: "Critical damage threshold",
        damageCapacity: "Damage capacity"
    },
    DE: {
        height: "Höhe",
        strength: "Stärke",
        damping: "Dämpfung",
        suspensionMin: "Minimale Aufhängungshöhe",
        suspensionMax: "Maximale Aufhängungshöhe",
        brokenSuspensionMax: "Minimale Aufhängungshöhe in gebrochenem Zustand",
        suspension: "Aussetzung",
        criticalDamageThreshold: "Kritische Schadensschwelle",
        damageCapacity: "Schadenskapazität"
    },
    CH: {
        height: "高度",
        strength: "刚性",
        damping: "衰减",
        suspensionMin: "最小悬挂高度",
        suspensionMax: "最大悬挂高度",
        brokenSuspensionMax: "最大悬挂高度（断裂时）",
        suspension: "悬浮液",
        criticalDamageThreshold: "危急伤害阈值",
        damageCapacity: "耐用性"
    }
});

export const descs = localize({
    RU: {
        suspensionMin: "Минимальный ход подвески (позиция, которую колесо может принять при полной просадке подвески).",
        suspensionMax: "Максимальный ход подвески (позиция, которую может принять колесо, если подвеска в рабочем состоянии и ее жесткость равна нулю, когда колесо висит в воздухе).",
        brokenSuspensionMax: "Максимальный ход сломанной подвески.",
        criticalDamageThreshold: "Процент повреждения (процент = значение * 100), при котором подвеска будет проявлять признаки поломки",
        damageCapacity: "Запас прочности данной подвески"
    },
    EN: {
        suspensionMin: "The minimum suspension stroke (the position that the wheel can take when the suspension is completely sagged).",
        suspensionMax: "Maximum suspension travel (the position that the wheel can take if the suspension is in working condition and its stiffness is zero when the wheel is hanging in the air)",
        brokenSuspensionMax: "The maximum stroke of the broken suspension.",
        criticalDamageThreshold: "The percentage of damage (percentage = value * 100) at which the suspension will show signs of failure",
        damageCapacity: "The safety margin of this suspension"
    },
    DE: {
        suspensionMin: "Minimaler Federweg (die Position, die das Rad nehmen kann, wenn die Federung vollständig Drawdown).",
        suspensionMax: "Maximaler Federweg (die Position, die das Rad nehmen kann, wenn die Federung in Betrieb ist und ihre Steifigkeit Null ist, wenn das Rad in der Luft hängt)",
        brokenSuspensionMax: "Maximaler Hub der gebrochenen Federung.",
        criticalDamageThreshold: "Prozentsatz des Schadens (Prozent = Wert * 100), bei dem die Federung Anzeichen von Bruch zeigt",
        damageCapacity: "Sicherheitsmarge dieser Aufhängung"
    },
    CH: {
        suspensionMin: "悬架的最小行程（当悬架完全压下时，车轮可以采取的位置）。",
        suspensionMax: "悬架的最大行程（当悬架处于工作状态时，车轮悬在空中时，其刚度为零，车轮可以采取的位置）。",
        brokenSuspensionMax: "破损悬架的最大行程。",
        criticalDamageThreshold: "损坏百分比（百分比=数值*100) , 在这个百分比上, 悬架会出现故障的迹象",
        damageCapacity: "这种悬挂的安全系数"
    }
});
