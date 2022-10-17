import type { TemplateParams } from './TemplateParams'

import type { ParamType } from '#enums'

export interface IGroupParams {
  paramType: ParamType
  groupName: string
  resGroupName: string
  groupItems: TemplateParams
  iconName: string
}
