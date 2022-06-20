import type GroupGetter from "types/GroupGetter";
import type InputGetter from "types/InputGetter";
import type SelectGetter from "types/SelectGetter";
import type TemplateGetter from "types/TemplateGetter";

type TemplateItems = GroupGetter | InputGetter | SelectGetter | TemplateGetter;

export default TemplateItems;
