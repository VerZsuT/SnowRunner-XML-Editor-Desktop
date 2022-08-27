import type {CheerioAPI} from 'cheerio'

import type {TemplateSelectors} from './TemplateSelectors'

export interface ItemGetterProps {
    formattedSelectors?: TemplateSelectors;
    providedSelector?: string;
    multiply?: boolean;
    fileDOM?: CheerioAPI;
    cycleNumber?: number;
    tNumber?: number;
    counter?: number;
}
