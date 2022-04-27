import type KeyEventName from "./KeyEventName";

interface ISetHotKeyParams {
    key: string
    eventName?: KeyEventName
    ctrlKey?: boolean
    shiftKey?: boolean
    prevent?: boolean
}

export default ISetHotKeyParams;
