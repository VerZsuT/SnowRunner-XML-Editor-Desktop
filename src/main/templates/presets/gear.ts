import { Number } from "../items";
import { config } from "main/classes/Config";

const texts = {
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
}[config.lang];

const descs = {
    RU: {
        angelVelocity: "Максимальная угловая скорость колеса",
        fuelModifier: "Множитель потребления топлива на данной передаче"
    },
    EN: {
        angelVelocity: "Maximum angular velocity of the wheel",
        fuelModifier: "Fuel consumption multiplier in this gear"
    },
    DE: {
        angelVelocity: "Maximale Winkelgeschwindigkeit des Rades",
        fuelModifier: "Multiplikator des Kraftstoffverbrauchs in diesem Getriebe"
    },
    CH: {
        angelVelocity: "轮子的最大角速度",
        fuelModifier: "该档位的油耗倍率"
    }
}[config.lang];

export default [
    Number({
        attribute: "AngVel",
        text: texts.angelVelocity,
        desc: descs.angelVelocity,
        max: 32,
        default: 0
    }),
    Number({
        attribute: "FuelModifier",
        text: texts.fuelModifier,
        desc: descs.fuelModifier,
        max: 10,
        min: 0,
        default: 1
    })
];
