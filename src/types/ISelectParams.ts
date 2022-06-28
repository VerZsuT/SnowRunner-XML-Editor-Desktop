import type ParamType from "enums/ParamType";

interface ISelectParams {
    attribute: string;
    label: string;
    value: string;
    selectParams: {
        label: string;
        value: string;
    }[];
    selector: string;
    paramType: ParamType;
    inputType: string;
    default: string;
}

export default ISelectParams;
