import type { IGroupParams } from './IGroupParams'
import type { IInputParams } from './IInputParams'
import type { ISelectParams } from './ISelectParams'

export type TemplateParams = (IInputParams & IGroupParams & ISelectParams)[]
