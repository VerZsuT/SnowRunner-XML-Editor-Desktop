import localize from "scripts/localize";

import { Number } from "../items";

const texts = localize({
    RU: {
        angelVelocity: "Макс. угловая скорость колеса",
        fuelModifier: "Модификатор потребления топлива"
    },
    EN: {
        angelVelocity: "Max wheel angular velocity",
        fuelModifier: "Fuel modifier"
    },
    DE: {
        angelVelocity: "Winkelgeschwindigkeit",
        fuelModifier: "Kraftstoffmodifikator"
    },
    CH: {
        angelVelocity: "最大车轮角速度",
        fuelModifier: "燃油消耗改性剂"
    }
});

export default [
    Number({
        attribute: "AngVel",
        label: texts.angelVelocity,
        max: 32,
        default: 0
    }),
    Number({
        attribute: "FuelModifier",
        label: texts.fuelModifier,
        max: 10,
        min: 0,
        default: 1
    })
];
