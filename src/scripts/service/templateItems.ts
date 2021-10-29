import { removePars, getTextFromTemplate, getIngameText, getDescription } from './funcs'

class TemplateInputElement {
    protected attribute: string
    protected text: string
    protected default: string | number
    protected selector: string
    protected bold: boolean
    protected onlyDeveloper: boolean
    protected canAddTag: boolean
    protected desc: string

    constructor(params: TInputElementCParams) {
        this.attribute = params.attribute
        this.text = params.text
        this.selector = params.selector
        this.bold = params.bold
        this.onlyDeveloper = params.onlyDeveloper
        this.default = params.default
        this.canAddTag = params.canAddTag
        this.desc = params.desc
    }
}

class CTemplate implements ICTemplate {
    private children: TemplateChildren[]
    private replaceName = 'CYCLE'
    private type: TemplateType
    private itemSelector: string

    constructor(params: TTemplateCParams, children: TemplateChildren[]) {
        this.children = children
        this.type = params.type
        this.itemSelector = params.itemSelector
    }

    getParams(props: GetParamsProps): TemplateGetParams {
        const { 
            defaultSelector = null,
            tCycleNumber = 1,
            tNumber = 1,
            selectors,
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
            const items = fileDOM.querySelectorAll(selectors[removePars(this.itemSelector)])
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

class CGroup implements ICGroup {
    private children: TemplateChildren[]
    private name: string
    private nameType: GroupNameType
    private nameSelector: string
    private resNameSelector: string
    private nameAttribute: string
    private resNameAttribute: string
    private defaultSelector: string
    private withCounter: boolean

    constructor(params: TGroupCParams, children: TemplateChildren[]) {
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
            const nameSelector = removePars(this.nameSelector)
            const resNameSelector = removePars(this.resNameSelector)
            const $nameElement = props.fileDOM.querySelector(props.selectors[nameSelector] || nameSelector)
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
                defaultSelector: removePars(this.defaultSelector) || (props.defaultSelector || null),
                tNumber: props.tNumber,
                fileDOM: props.fileDOM,
                templateName: props.templateName
            }))
        }
        groupName = getTextFromTemplate(groupName, props.templateName)
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

class CInput extends TemplateInputElement implements ICInput {
    private type: InputType
    private min: number
    private max: number
    private step: number
    private numberType: InputNumberType
    private fileType: string
    private areas: InputAreas

    constructor(params: TInputCParams) {
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
        const selector = props.selectors[removePars(this.selector)] || removePars(this.selector) || props.selectors[props.defaultSelector]
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
            text: getTextFromTemplate(this.text, props.templateName),
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
            desc: getDescription(this.desc, props.templateName),
            default: this.default,
            areas: this.areas
        }]
    }
}

class CSelect extends TemplateInputElement implements ICSelect {
    private children: ICOption[]

    constructor(params: TInputElementCParams, children: ICOption[]) {
        super(params)
        this.children = children
    }

    getParams(props: GetParamsProps): [ISelectGetParams] | [] {
        const selectorType = removePars(this.selector)
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
                text: getTextFromTemplate(text_1, props.templateName),
                value: option.value
            })
        }

        return [{
            name: this.attribute,
            text: getTextFromTemplate(this.text, props.templateName),
            value: value,
            selectParams: options,
            selector: selector,
            paramType: 'input',
            inputType: 'select',
            onlyDeveloper: this.onlyDeveloper,
            bold: this.bold,
            desc: getDescription(this.desc, props.templateName),
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

class CSelectors implements ICSelectors {
    private children: ICSelector[]

    constructor(children: ICSelector[]) {
        this.children = children
    }

    toObject() {
        const obj = {}
        for (const child of this.children) {
            obj[child.id] = child.value
                .replaceAll('#every(', '[SXMLE_ID="-CYCLE')
                .replaceAll('#first(', '[SXMLE_ID="-F_CYCLE')
                .replaceAll('#last(', '[SXMLE_ID="-L_CYCLE')
                .replaceAll('#every', '[SXMLE_ID="-CYCLE1-"]')
                .replaceAll('#first', '[SXMLE_ID="-F_CYCLE1-"]')
                .replaceAll('#last', '[SXMLE_ID="-L_CYCLE1-"]')

            for (let i = 1; i <= 20; i++) {
                obj[child.id] = obj[child.id].replaceAll(`#${i}-th(`, `[SXMLE_ID="-N${i}_CYCLE`)
            }
            obj[child.id] = obj[child.id].replaceAll(')', '-"]').replaceAll('.', ' > ')
        }

        for (const id in obj) {
            for (const id2 in obj) {
                obj[id2] = obj[id2].replace(`{${id}}`, obj[id])
            }
        }
        return obj
    }
}

class CSelector implements ICSelector {
    id: string
    value: string

    constructor(params: TSelectorCParams) {
        this.id = params.id
        this.value = params.value
    }
}

export function Template(params: TTemplateCParams, children: (ICInput|ICSelect|ICGroup|ICTemplate)[]) {
    return new CTemplate(params, children)
}

export function Group(params: TGroupCParams, children: (ICInput|ICSelect|ICGroup|ICTemplate)[]) {
    return new CGroup(params, children)
}

export function Input(params: TInputCParams) {
    return new CInput(params)
}

export function Select(params: TInputElementCParams, children: ICOption[]) {
    return new CSelect(params, children)
}

export function Opt(params: TOptionCParams) {
    return new COption(params)
}

export function Selectors(children: ICSelector[]) {
    return new CSelectors(children)
}

export function Selector(params: TSelectorCParams) {
    return new CSelector(params)
}
