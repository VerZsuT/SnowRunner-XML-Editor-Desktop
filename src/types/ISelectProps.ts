import type IInputBaseProps from "./IInputBaseProps";
import type ISelectOptions from "./ISelectOptions";

interface ISelectProps<T extends ISelectOptions> extends IInputBaseProps {
    options: T;
}

export default ISelectProps;
