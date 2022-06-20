import type NumberType from "enums/NumberType";

import type DefaultInputProps from "./DefaultInputProps";
import type IInputProps from "./IInputProps";

type NumberProps = DefaultInputProps & {
    type?: NumberType;
    min?: IInputProps["min"];
    max?: IInputProps["max"];
    step?: number;
    default?: number;
    areas?: IInputProps["areas"];
};

export default NumberProps;
