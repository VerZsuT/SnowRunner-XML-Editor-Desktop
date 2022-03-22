import type IGroupParams from './IGroupParams'
import type IInputParams from './IInputParams'
import type ISelectParams from './ISelectParams'

type ITemplateParams = (IInputParams | IGroupParams | ISelectParams)[]

export default ITemplateParams
