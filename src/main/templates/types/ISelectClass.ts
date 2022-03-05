import type IGetParamsProps from './IGetParamsProps'
import type ISelectParams from './ISelectParams'

interface ISelectClass {
    getParams(props: IGetParamsProps): [ISelectParams] | []
}

export default ISelectClass
