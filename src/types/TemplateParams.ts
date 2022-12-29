import type IGroupParams from './IGroupParams'
import type IInputParams from './IInputParams'
import type ISelectParams from './ISelectParams'

type TemplateParams = (IInputParams & IGroupParams & ISelectParams)[]

export default TemplateParams
