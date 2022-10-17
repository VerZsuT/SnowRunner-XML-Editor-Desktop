import type { CheerioAPI } from 'cheerio'

import type { ITemplateSelectors } from './ITemplateSelectors'

export interface IItemGetterProps {
  fileDOM: CheerioAPI
  formattedSelectors?: ITemplateSelectors
  providedSelector?: string
  multiply?: boolean
  cycleNumber?: number
  tNumber?: number
  counter?: number
}
