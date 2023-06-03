import type TemplateParams from './TemplateParams'

import type { ParamType } from '#g/enums'

export default interface IGroupParams {
  paramType: ParamType
  groupName: string
  resGroupName: string
  groupItems: TemplateParams
  iconName: string
}
