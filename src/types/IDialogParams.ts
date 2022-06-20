import type DialogProperties from "./DialogProperties";

interface IDialogParams {
    properties?: DialogProperties;
    filters?: {
        name: string;
        extensions: string[];
    }[];
}

export default IDialogParams;
