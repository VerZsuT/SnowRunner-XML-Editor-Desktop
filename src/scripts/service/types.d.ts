interface ICreateAttributes {
    innerText?: string
    style?: Object
    checked?: boolean
    disabled?: boolean
    listeners?: {
        [eventName: string]: Function | Function[]
    }
    [attrName: string]: any
}

interface ISetHotKeyParams {
    key: string
    eventName?: KeyEventName
    ctrlKey?: boolean
    shiftKey?: boolean
    prevent?: boolean
}

type KeyEventName =
    'keypress' |
    'keyup' |
    'keydown'
