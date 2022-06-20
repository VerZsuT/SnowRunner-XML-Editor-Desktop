import type IInputParams from "./IInputParams";
import type IItemGetterProps from "./IItemGetterProps";

type InputGetter = (props: IItemGetterProps) => [IInputParams] | [];

export default InputGetter;
