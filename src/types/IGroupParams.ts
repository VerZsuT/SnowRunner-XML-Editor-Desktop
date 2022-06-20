import type ParamType from "enums/ParamType";

interface IGroupParams {
    paramType: ParamType;
    groupName: string;
    groupItems: any;
    icon: string;
}

export default IGroupParams;
