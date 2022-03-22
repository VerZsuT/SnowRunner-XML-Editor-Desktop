import type { CheerioAPI } from 'cheerio'
import type TSelectors from './TSelectors'

interface IGetParamsProps {
    selectors?: TSelectors
    defaultSelector?: string
    multiply?: boolean
    fileDOM?: CheerioAPI
    cycleNumber?: number
    tCycleNumber?: number
    tNumber?: number
    counter?: number
}

export default IGetParamsProps
