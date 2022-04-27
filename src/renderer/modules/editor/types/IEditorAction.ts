import type ActionBase from "main/templates/actions/ActionBase";
import type IActionData from "main/templates/types/IActionData";
import type IActionProps from "main/templates/types/IActionProps";
import type { JSXElementConstructor } from "react";

interface IEditorAction extends IActionData {
    object: ActionBase
    component: JSXElementConstructor<IActionProps>
}

export default IEditorAction;
