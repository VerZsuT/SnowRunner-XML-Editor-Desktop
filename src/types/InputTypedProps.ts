import type InputType from "enums/InputType";

import type IInputProps from "./IInputProps";

type InputTypedProps = IInputProps & ({
    type?: InputType.number;
    numberType?: IInputProps["numberType"];
    step?: IInputProps["step"];
    areas?: IInputProps["areas"];
    min?: IInputProps["min"];
    max?: IInputProps["max"];
    default?: IInputProps["default"];
} | {
    type: InputType.coordinates;
} | {
    type: InputType.text;
    default?: IInputProps["default"];
} | {
    type: InputType.file;
    fileType: IInputProps["fileType"];
});

export default InputTypedProps;
