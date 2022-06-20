import type IItemGetterProps from "./IItemGetterProps";
import type ITemplateParams from "./ITemplateParams";

type TemplateGetter = (props: IItemGetterProps) => ITemplateParams;

export default TemplateGetter;
