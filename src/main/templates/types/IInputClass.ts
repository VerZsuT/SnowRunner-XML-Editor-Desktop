import type IGetParamsProps from './IGetParamsProps'
import type IInputParams from './IInputParams'

interface IInputClass {
    getParams(props: IGetParamsProps): [IInputParams] | []
}

export default IInputClass
