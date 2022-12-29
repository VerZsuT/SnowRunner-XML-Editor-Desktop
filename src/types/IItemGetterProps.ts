import type { CheerioAPI } from 'cheerio'

import type TemplateSelectors from './TemplateSelectors'

interface IItemGetterProps {
  fileDOM: CheerioAPI
  formattedSelectors?: TemplateSelectors
  providedSelector?: string
  multiply?: boolean
  cycleNumber?: number
  tNumber?: number
  counter?: number
}

export default IItemGetterProps
