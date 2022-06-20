import type Action from "templates/actions/Action";

import type IActionData from "./IActionData";

interface IActionModule {
    data: IActionData;
    default: typeof Action;
}

export default IActionModule;
