import type {ParamType} from 'enums'

import type {TemplateParams} from './TemplateParams'

export interface GroupParams {
    paramType: ParamType
    groupName: string
    resGroupName: string
    groupItems: TemplateParams
    iconName: string
}
