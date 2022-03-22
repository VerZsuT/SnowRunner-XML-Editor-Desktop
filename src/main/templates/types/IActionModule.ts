import type ActionBase from '../actions/ActionBase'
import type IActionData from './IActionData'

interface IActionModule {
    data: IActionData
    default: typeof ActionBase
}

export default IActionModule
