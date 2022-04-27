import type DialogSourceType from "../enums/DialogSourceType";
import type DialogType from "../enums/DialogType";
import type DialogProperties from "./DialogProperties";

interface IOpenDialogParams {
    type?: DialogType
    source?: DialogSourceType
    extention?: string
    defaultPath?: string
    properties?: DialogProperties
}

export default IOpenDialogParams;
