import type IXMLElement from './IXMLElement'
import type TemplateSelectors from './TemplateSelectors'

export default interface IItemGetterProps {
  fileDOM: IXMLElement
  formattedSelectors?: TemplateSelectors
  providedSelector?: string
  multiply?: boolean
  cycleNumber?: number
  tCount?: number
  counter?: number
}
