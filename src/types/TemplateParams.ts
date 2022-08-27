import type {GroupParams} from './GroupParams'
import type {InputParams} from './InputParams'
import type {SelectParams} from './SelectParams'

export type TemplateParams = (InputParams & GroupParams & SelectParams)[]
