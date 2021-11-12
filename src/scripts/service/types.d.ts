interface CreateAttributes {
    innerText?: string
    style?: Object
    checked?: boolean
    disabled?: boolean
    listeners?: {
        [eventName: string]: Function | Function[]
    }
    [attrName: string]: any
}

interface SetHotKeyParams {
    key: string
    eventName?: KeyEventName
    ctrlKey?: boolean
    shiftKey?: boolean
    prevent?: boolean
}

type KeyEventName = 'keypress' | 'keyup' | 'keydown'
type TemplateType = 'multiply' | 'single'
type InputType = 'text' | 'number' | 'coordinates' | 'file'
type InputNumberType = 'int' | 'float'
type GroupNameType = 'static' | 'computed' | 'tagName'

interface InputAreas {
    red?: [number, number][]
    green?: [number, number][]
    yellow?: [number, number][]
}

interface TInputElementCParams<T> {
    attribute: string
    text: string
    default?: string | number
    selector?: keyof T
    bold?: boolean
    onlyDeveloper?: boolean
    canAddTag?: boolean
    desc?: string
}

interface TTemplateCParams<T> {
    type?: TemplateType
    itemSelector?: keyof T
    selectors?: T
}

interface ICTemplate {
    getParams(props: GetParamsProps): TemplateGetParams
}

interface GetParamsProps {
    selectors?: {
        [selector: string]: string
    }
    defaultSelector?: string
    multiply?: boolean
    fileDOM?: Document
    templateName?: string
    cycleNumber?: number
    tCycleNumber?: number
    tNumber?: number
    counter?: number
}

type TemplateGetParams = (IGroupGetParams | IInputGetParams | ISelectGetParams)[]

interface TGroupCParams<T> {
    name?: string
    nameType?: GroupNameType
    nameSelector?: keyof T
    resNameSelector?: keyof T
    nameAttribute?: string
    resNameAttribute?: string
    defaultSelector?: keyof T
    withCounter?: boolean
}

interface ICGroup {
    getParams(props: GetParamsProps): [IGroupGetParams] | []
}

interface IGroupGetParams {
    paramType: string
    groupName: string
    groupItems: any
}

interface TInputCParams<T> extends TInputElementCParams<T> {
    type?: InputType
    min?: number
    max?: number
    step?: number
    numberType?: InputNumberType
    fileType?: string
    areas?: InputAreas
}

interface ICInput {
    getParams(props: GetParamsProps): [IInputGetParams] | []
}

interface IInputGetParams {
    name: string
    text: string
    value: string | number
    selector: string
    paramType: string
    inputType: string
    onlyDeveloper: boolean
    type: InputType
    min: number
    max: number
    step: number
    numberType: InputNumberType
    fileType: string
    bold: boolean
    desc: string
    default: string | number
    areas: InputAreas
}

interface ICSelect {
    getParams(props: GetParamsProps): [ISelectGetParams] | []
}

interface ISelectGetParams {
    name: string
    text: string
    value: string
    selectParams: {
        text: string
        value: string
    }[]
    selector: string
    paramType: string
    inputType: string
    onlyDeveloper: boolean
    bold: boolean
    desc: string
    default: string
}

interface TOptionCParams {
    text: string
    value: string
}

interface ICOption {
    text: string
    value: string
}

interface ITemplate {
    template: ICTemplate
    selector: string
}

interface ITemplates {
    cargo: ITemplate
    engine: ITemplate
    gearbox: ITemplate
    suspension: ITemplate
    trailer: ITemplate
    truck: ITemplate
    wheels: ITemplate
    winch: ITemplate
}

type MenuRole = 
    'openSettings' | 
    'resetConfig' | 
    'devTools' | 
    'reload' | 
    'quitApp' | 
    'showFolder' |
    'separator' |
    'saveBackup' | 
    'restoreInitial' |
    'joinExported' |
    'seeExported' |
    'openURL'

interface IMenuTemplate {
    label?: string
    role?: MenuRole
    submenu?: IMenuTemplate[]
    path?: string
    url?: string
}
