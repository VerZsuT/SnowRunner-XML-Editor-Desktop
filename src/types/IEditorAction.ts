import type { JSXElementConstructor } from "react";

import type Action from "templates/actions/Action";
import type IActionData from "types/IActionData";
import type IActionProps from "types/IActionProps";

interface IEditorAction extends IActionData {
    object: Action;
    component: JSXElementConstructor<IActionProps>;
}

export default IEditorAction;
