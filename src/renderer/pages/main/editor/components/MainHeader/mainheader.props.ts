import type { ResetList } from '../../helpers/getResetProvider'

import type { IXMLElement, IXMLTemplate, TemplateParams } from '#g/types'

export default interface IMainHeaderProps {
  fileDOM: IXMLElement
  filePath: string
  mod: string
  dlc: string
  actions: IXMLTemplate['extraActions']
  tableItems: TemplateParams
  resetList: ResetList
}
