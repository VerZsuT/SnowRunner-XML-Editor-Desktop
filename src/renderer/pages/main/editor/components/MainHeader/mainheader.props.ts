import type { ResetList } from '../../helpers/getResetProvider'

import type { IXMLElement, IXMLTemplate, TemplateParams } from '#g/types'

interface IMainHeaderProps {
  fileDOM: IXMLElement
  filePath: string
  mod: string
  dlc: string
  actions: IXMLTemplate['actions']
  tableItems: TemplateParams
  resetList: ResetList
}

export default IMainHeaderProps
