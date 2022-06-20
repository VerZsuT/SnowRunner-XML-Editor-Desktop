import type TemplateType from "enums/TemplateType";

import type TemplateProps from "./TemplateProps";

type TemplateTypedProps = TemplateProps & ({
    type: TemplateType.multiply;
    itemSelector: TemplateProps["itemSelector"];
} | {
    type?: TemplateType.single;
})

export default TemplateTypedProps;
