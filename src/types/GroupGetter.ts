import type IGroupParams from "./IGroupParams";
import type IItemGetterProps from "./IItemGetterProps";

type GroupGetter = (props: IItemGetterProps) => [IGroupParams] | any[];

export default GroupGetter;
