import type IGetParamsProps from "./IGetParamsProps";
import type IGroupParams from "./IGroupParams";

interface IGroupClass {
    getParams(props: IGetParamsProps): [IGroupParams] | any[]
}

export default IGroupClass;
