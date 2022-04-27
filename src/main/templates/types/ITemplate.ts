import type ITemplateClass from "./ITemplateClass";

interface ITemplate {
    template: ITemplateClass
    selector: string
    actions?: string[]
    exclude?: string[]
}

export default ITemplate;
