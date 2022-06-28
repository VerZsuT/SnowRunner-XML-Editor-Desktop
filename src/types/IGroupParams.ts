import type ParamType from "enums/ParamType";

import type ITemplateParams from "./ITemplateParams";

interface IGroupParams {
    paramType: ParamType;
    groupName: string;
    groupItems: ITemplateParams;
    iconName: string;
}

export default IGroupParams;
