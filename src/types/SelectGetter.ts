import type IItemGetterProps from "./IItemGetterProps";
import type ISelectParams from "./ISelectParams";

type SelectGetter = (props: IItemGetterProps) => [ISelectParams] | [];

export default SelectGetter;
