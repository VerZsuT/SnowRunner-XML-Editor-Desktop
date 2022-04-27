import type IGetParamsProps from "./IGetParamsProps";
import type ITemplateParams from "./ITemplateParams";

interface ITemplateClass {
    getParams(props: IGetParamsProps): ITemplateParams
}

export default ITemplateClass;
