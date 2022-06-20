import type TemplateGetter from "./TemplateGetter";

interface ITemplate {
    template: TemplateGetter;
    selector: string;
    actions?: string[];
    exclude?: string[];
}

export default ITemplate;
