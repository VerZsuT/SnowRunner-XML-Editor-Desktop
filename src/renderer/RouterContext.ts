import { createContext } from "react";

import type Page from "enums/Page";

export interface IRouterContext {
    route(page: Page): void;
}

export default createContext<IRouterContext>(null);
