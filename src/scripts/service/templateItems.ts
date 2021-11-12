import { getIngameText } from './funcs'

type TemplateChildren<T extends {[selector: string]: string}> = CGroup<T>|CInput<T>|CSelect<T>|CTemplate<T>

class TemplateInputElement<T> {
    protected attribute: string
    protected text: string
    protected default: string | number
    protected selector: keyof T
    protected bold: boolean
    protected onlyDeveloper: boolean
    protected canAddTag: boolean
    protected desc: string

    constructor(params: TInputElementCParams<T>) {
        this.attribute = params.attribute
        this.text = params.text
        this.selector = params.selector
        this.bold = params.bold
        this.onlyDeveloper = params.onlyDeveloper
        this.default = params.default
        this.canAddTag = params.canAddTag
        this.desc = params.desc ?? ''
    }
}

class CTemplate<T extends {[selector: string]: string}> implements ICTemplate {
    private children: TemplateChildren<T>[]
    private replaceName = 'CYCLE'
    private type: TemplateType
    private itemSelector: keyof T
    private selectors: T

    constructor(params: TTemplateCParams<T>, children: TemplateChildren<T>[]) {
        this.children = children
        this.type = params.type
        this.itemSelector = params.itemSelector
        this.selectors = params.selectors
    }

    getParams(props: GetParamsProps): TemplateGetParams {
        const { 
            defaultSelector = null,
            tCycleNumber = 1,
            tNumber = 1,
            selectors = this.selectors,
            fileDOM,
            templateName
        } = props

        let { 
            counter = 1,
            multiply
        } = props

        if (multiply === undefined) {
            multiply = (this.type === 'multiply');
        }

        let params = []
        let newSelectors = {}
        if (multiply) {
            const items = fileDOM.querySelectorAll(selectors[<string>this.itemSelector])
            const name = this.replaceName + tNumber
            let currentNum = 1
            for (const item of items) {
                item.setAttribute('SXMLE_ID', String(counter))
                for (const selector in selectors) {
                    newSelectors[selector] = selectors[selector].replaceAll(`-${name}-`, String(counter))
                    if (currentNum === 1) {
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-F_${name}-`, String(counter))
                    } else if (currentNum === items.length) {
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-L_${name}-`, String(counter))
                    }
                    newSelectors[selector] = newSelectors[selector].replaceAll(`-N${currentNum}_${name}-`, String(counter))
                }

                counter++
                params = params.concat(this.getParams({
                    selectors: newSelectors,
                    defaultSelector: defaultSelector,
                    multiply: false,
                    tCycleNumber: currentNum,
                    fileDOM: fileDOM,
                    tNumber: multiply? tNumber+1 : tNumber,
                    templateName: templateName,
                    counter: counter
                }))
                currentNum++
            }
        } else {
            for (const child of this.children) {
                params = params.concat(child.getParams({
                    selectors: selectors,
                    defaultSelector: defaultSelector,
                    cycleNumber: tCycleNumber,
                    tNumber: multiply? tNumber+1 : tNumber,
                    fileDOM: fileDOM,
                    templateName: templateName
                }))
            }
        }
        return params
    }
}

class CGroup<T extends {[selector: string]: string}> implements ICGroup {
    private children: TemplateChildren<T>[]
    private name: string
    private nameType: GroupNameType
    private nameSelector: keyof T
    private resNameSelector: keyof T
    private nameAttribute: string
    private resNameAttribute: string
    private defaultSelector: keyof T
    private withCounter: boolean

    constructor(params: TGroupCParams<T>, children: TemplateChildren<T>[]) {
        this.children = children
        this.name = params.name
        this.nameType = params.nameType ?? 'static'
        this.nameSelector = params.nameSelector
        this.resNameSelector = params.resNameSelector
        this.nameAttribute = params.nameAttribute
        this.resNameAttribute = params.resNameAttribute
        this.defaultSelector = params.defaultSelector
        this.withCounter = params.withCounter ?? false
    }

    getParams(props: GetParamsProps): [IGroupGetParams] | [] {
        let params = []
        let groupName: string
        if (this.nameType !== 'static') {
            const nameSelector = <string>this.nameSelector
            const resNameSelector = <string>this.resNameSelector
            const $nameElement = props.fileDOM.querySelector(props.selectors[nameSelector] ||<string>nameSelector)
            const $resNameElement = props.fileDOM.querySelector(props.selectors[resNameSelector] || resNameSelector)

            if (!$nameElement && !$resNameElement) {
                return []
            }

            if (this.nameType === 'computed') {
                groupName = getIngameText($nameElement.getAttribute(this.nameAttribute)) || $resNameElement.getAttribute(this.resNameAttribute)
            } else if (this.nameType === 'tagName') {
                groupName = $nameElement.nodeName
            }
        } else {
            groupName = this.name
        }

        for (const child of this.children) {
            params = params.concat(child.getParams({
                selectors: props.selectors,
                defaultSelector: <string>(this.defaultSelector? this.defaultSelector :  (props.defaultSelector || null)),
                tNumber: props.tNumber,
                fileDOM: props.fileDOM,
                templateName: props.templateName
            }))
        }
        if (this.withCounter) {
            groupName += ` ${props.cycleNumber}`
        }

        return [{
            paramType: 'group',
            groupName: groupName,
            groupItems: params
        }]
    }
}

class CInput<T> extends TemplateInputElement<T> implements ICInput {
    private type: InputType
    private min: number
    private max: number
    private step: number
    private numberType: InputNumberType
    private fileType: string
    private areas: InputAreas

    constructor(params: TInputCParams<T>) {
        super(params)
        this.type = params.type ?? 'number'
        this.min = params.min ?? (params.numberType === 'float'? 0.01 : 0)
        this.max = params.max
        this.step = params.step
        this.numberType = params.numberType ?? 'int'
        this.fileType = params.fileType
        this.areas = params.areas
    }

    getParams(props: GetParamsProps): [IInputGetParams] | [] {
        const selector = this.selector? (props.selectors[<string>this.selector] || <string>this.selector) : props.selectors[props.defaultSelector]
        let value: string

        if (!props.fileDOM.querySelector(selector)) {
            if (!this.canAddTag) {
                console.warn(`Missing parameter\n\tName: '${this.attribute}',\n\tText: '${this.text}',\n\tSelector: '${selector}'.`)
                return []
            }
        } else {
            value = props.fileDOM.querySelector(selector).getAttribute(this.attribute)
        }

        return [{
            name: this.attribute,
            text: this.text,
            value: value,
            selector: selector,
            paramType: 'input',
            inputType: 'text',
            onlyDeveloper: this.onlyDeveloper,
            type: this.type,
            min: this.min,
            max: this.max,
            step: this.step,
            numberType: this.numberType,
            fileType: this.fileType,
            bold: this.bold,
            desc: this.desc,
            default: this.default,
            areas: this.areas
        }]
    }
}

class CSelect<T> extends TemplateInputElement<T> implements ICSelect {
    private children: ICOption[]

    constructor(params: TInputElementCParams<T>, children: ICOption[]) {
        super(params)
        this.children = children
    }
    
    getParams(props: GetParamsProps): [ISelectGetParams] | [] {
        const selectorType = <string>(this.selector? this.selector : undefined)
        const selector = props.selectors[selectorType] || selectorType || props.selectors[props.defaultSelector]
        let value: string

        if (!props.fileDOM.querySelector(selector)) {
            if (!this.canAddTag) {
                console.warn(`Missing parameter\n\tName: '${this.attribute}',\n\tText: '${this.text}',\n\tSelector: '${selector}'.`)
                return []
            }
        } else {
            value = props.fileDOM.querySelector(selector).getAttribute(this.attribute)
        }

        let options = []
        for (const option of this.children) {
            const text_1 = option.text
            options.push({
                text: text_1,
                value: option.value
            })
        }

        return [{
            name: this.attribute,
            text: this.text,
            value: value,
            selectParams: options,
            selector: selector,
            paramType: 'input',
            inputType: 'select',
            onlyDeveloper: this.onlyDeveloper,
            bold: this.bold,
            desc: this.desc,
            default: <string>this.default
        }]
    }
}

class COption implements ICOption {
    public text: string
    public value: string

    constructor(params: TOptionCParams) {
        this.text = params.text
        this.value = params.value
    }
}

export function Template<T extends {[selector: string]: string}>(params: TTemplateCParams<T>, children: TemplateChildren<T>[]) {
    return new CTemplate<T>(params, children)
}

export function Group<T extends {[selector: string]: string}>(params: TGroupCParams<T>, children: TemplateChildren<T>[]) {
    return new CGroup<T>(params, children)
}

export function Input<T>(params: TInputCParams<T>) {
    return new CInput<T>(params)
}

export function Select<T>(params: TInputElementCParams<T>, children: ICOption[]) {
    return new CSelect<T>(params, children)
}

export function Opt(params: TOptionCParams) {
    return new COption(params)
}

export function Selectors<T extends {[id: string]: string}>(obj: T): T {
    const newObj: T = Object.assign({}, obj)
    for (const id in obj) {
        newObj[id] = <T[Extract<keyof T, string>]>obj[id]
            .replaceAll('#every(', '[SXMLE_ID="-CYCLE')
            .replaceAll('#first(', '[SXMLE_ID="-F_CYCLE')
            .replaceAll('#last(', '[SXMLE_ID="-L_CYCLE')
            .replaceAll('#every', '[SXMLE_ID="-CYCLE1-"]')
            .replaceAll('#first', '[SXMLE_ID="-F_CYCLE1-"]')
            .replaceAll('#last', '[SXMLE_ID="-L_CYCLE1-"]')

        for (let i = 1; i <= 20; i++) {
            newObj[id] = <T[Extract<keyof T, string>]>newObj[id].replaceAll(`#${i}-th(`, `[SXMLE_ID="-N${i}_CYCLE`)
        }
        newObj[id] = <T[Extract<keyof T, string>]>newObj[id].replaceAll(')', '-"]').replaceAll('.', ' > ')
    }

    for (const id in newObj) {
        for (const id2 in newObj) {
            newObj[id2] = <T[Extract<keyof T, string>]>newObj[id2].replace(`{${id}}`, newObj[id])
        }
    }
    return newObj
}
