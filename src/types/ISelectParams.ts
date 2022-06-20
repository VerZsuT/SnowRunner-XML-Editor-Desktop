import type ParamType from "enums/ParamType";

interface ISelectParams {
    name: string;
    text: string;
    value: string;
    selectParams: {
        text: string;
        value: string;
    }[];
    selector: string;
    paramType: ParamType;
    inputType: string;
    desc: string;
    default: string;
}

export default ISelectParams;
