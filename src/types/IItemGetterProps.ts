import type { CheerioAPI } from "cheerio";

import type TSelectors from "./TSelectors";

interface IItemGetterProps {
    formattedSelectors?: TSelectors;
    providedSelector?: string;
    multiply?: boolean;
    fileDOM?: CheerioAPI;
    cycleNumber?: number;
    tNumber?: number;
    counter?: number;
}

export default IItemGetterProps;
