import { getIngameText } from './funcs'

function getSelectorName(selector: string): string {
    return selector.split('||')[0].split('SELECTOR_ID:')[1]
}

type TemplateChildren = GroupClass|InputClass|SelectClass|TemplateClass

/** Тип XML файла, открываемого по нажатию кнопки. */
export enum FileType {
    /** Файл содержит набор двигателей. */
    engines = 'engines',
    /** Файл содержит набор КПП. */
    gearboxes = 'gearboxes',
    /** Файл содержит набор подвесок. */
    suspensions = 'suspensions',
    /** Файл содержит набор колёс. */
    wheels = 'wheels',
    /** Файл содержит набор лебёдок. */
    winches = 'winches'
}

/** Тип шаблона. */
export enum TemplateType {
    /** 
     * Шаблон будет запускать итерацию по всем элементам, найденным по переданному селектору.
     * 
     * _Требуется {@link ITemplateClassProps.itemSelector itemSelector}_
    */
    multiply = 'multiply',
    /**
     * Шаблон будет отрисован только один раз.
     * 
     * _{@link ITemplateClassProps.itemSelector itemSelector} игнорируется_
    */
    single = 'single'
}

/** Тип поля ввода. */
export enum InputType {
    /** Значение поля - `текст` */
    text = 'text',
    /** Значение поля - `число` */
    number = 'number',
    /** Значение поля - `координата` */
    coordinates = 'coordinates',
    /** Значение поля - `кнопки открытия XML файла(ов)` */
    file = 'file'
}

/** Тип числового значение поля ввода. */
export enum NumberType {
    /** Целочисленное */
    integer = 'int',
    /** С плавающей точкой */
    float = 'float'
}

/** Тип названия группы. */
export enum NameType {
    /** Статическое. */
    static = 'static',
    /** 
     * Значение атрибута {@link IGroupClassProps.nameAttribute nameAttribute}
     * по селектору {@link IGroupClassProps.nameSelector nameSelector} 
    */
    computed = 'computed',
    /** Название элемента по селектору {@link IGroupClassProps.nameSelector nameSelector} */
    tagName = 'tagName'
}

class InputElement {
    protected attribute: string
    protected text: string
    protected default: string | number
    protected selector: string
    protected bold: boolean
    protected onlyDeveloper: boolean
    protected canAddTag: boolean
    protected desc: string

    constructor(props: IInputElementProps) {
        this.attribute = props.attribute
        this.text = props.text
        this.bold = props.bold
        this.onlyDeveloper = props.onlyDeveloper
        this.default = props.default
        this.canAddTag = props.canAddTag
        this.desc = props.desc ?? ''
        if (props.selector) {
            this.selector = getSelectorName(props.selector)
        }
    }
}

class TemplateClass implements ITemplateClass {
    private children: TemplateChildren[]
    private replaceName = 'CYCLE'
    private type: TTemplateType
    private itemSelector: string
    private selectors: {[name: string]: string}

    constructor(props: ITemplateClassProps, children: TemplateChildren[]) {
        this.children = children
        this.type = props.type
        this.selectors = props.selectors
        if (props.itemSelector) {
            this.itemSelector = getSelectorName(props.itemSelector)
        }
    }

    getParams(props: IGetParamsProps): ITemplateParams {
        const { 
            defaultSelector = null,
            tCycleNumber = 1,
            tNumber = 1,
            selectors = this.selectors,
            fileDOM,
            templateName,
            multiply = (this.type === TemplateType.multiply)
        } = props

        let { counter = 1 } = props

        let params = []
        let newSelectors = {}
        for (const selector in selectors) {
            if (selectors[selector].includes('||')) {
                selectors[selector] = selectors[selector].split('||')[1]
            }
        }
        if (multiply) {
            const items = fileDOM.querySelectorAll(selectors[this.itemSelector])
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

class GroupClass implements IGroupClass {
    private children: TemplateChildren[]
    private name: string
    private nameType: TNameType
    private nameSelector: string
    private resNameSelector: string
    private nameAttribute: string
    private resNameAttribute: string
    private defaultSelector: string
    private withCounter: boolean

    constructor(props: IGroupClassProps, children: TemplateChildren[]) {
        this.children = children
        this.name = props.name
        this.nameType = props.nameType ?? NameType.static
        this.nameAttribute = props.nameAttribute
        this.resNameAttribute = props.resNameAttribute
        this.withCounter = props.withCounter ?? false
        if (props.nameSelector) {
            this.nameSelector = getSelectorName(props.nameSelector)
        }
        if (props.resNameSelector) {
            this.resNameSelector = getSelectorName(props.resNameSelector)
        }
        if (props.defaultSelector) {
            this.defaultSelector = getSelectorName(props.defaultSelector)
        }
    }

    getParams(props: IGetParamsProps): [IGroupParams] | [] {
        let params = []
        let groupName: string
        if (this.nameType !== NameType.static) {
            const nameSelector = this.nameSelector
            const resNameSelector = this.resNameSelector
            const $nameElement = props.fileDOM.querySelector(props.selectors[nameSelector])
            const $resNameElement = props.fileDOM.querySelector(props.selectors[resNameSelector])

            if (!$nameElement && !$resNameElement) {
                return []
            }

            if (this.nameType === NameType.computed) {
                groupName = getIngameText($nameElement.getAttribute(this.nameAttribute)) || $resNameElement.getAttribute(this.resNameAttribute)
            } else if (this.nameType === NameType.tagName) {
                groupName = $nameElement.nodeName
            }
        } else {
            groupName = this.name
        }

        for (const child of this.children) {
            params = params.concat(child.getParams({
                selectors: props.selectors,
                defaultSelector: this.defaultSelector? this.defaultSelector :  (props.defaultSelector || null),
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

class InputClass extends InputElement implements IInputClass {
    private type: TInputType
    private min: number
    private max: number
    private step: number
    private numberType: TNumberType
    private fileType: TInputFileType
    private areas: InputAreas

    constructor(props: IInputClassProps) {
        super(props)
        this.type = props.type ?? InputType.number
        this.min = props.min ?? (props.numberType === NumberType.float? 0.01 : 0)
        this.max = props.max
        this.numberType = props.numberType ?? NumberType.float
        this.step = props.step ?? (this.numberType === NumberType.float? 0.1 : 1)
        this.fileType = props.fileType
        this.areas = props.areas
    }

    getParams(props: IGetParamsProps): [IInputParams] | [] {
        const selector = this.selector? (props.selectors[this.selector] || this.selector) : props.selectors[props.defaultSelector]
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

class SelectClass extends InputElement implements ISelectClass {
    private options: ISelectOptions

    constructor(params: ISelectClassProps) {
        super(params as unknown as IInputElementProps)
        this.options = params.options
    }
    
    getParams(props: IGetParamsProps): [ISelectParams] | [] {
        const selectorType = this.selector? this.selector : undefined
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
        for (const optionValue in this.options) {
            const optionText = this.options[optionValue]
            if (optionValue === 'EMPTY') {
                options.push({
                    text: optionText,
                    value: ''
                })
            } else {
                options.push({
                    text: optionText,
                    value: optionValue
                })
            }
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

/** Шаблон таблицы параметров. Может иметь вложенные под-шаблоны. */
export function Template(params: ITemplateClassProps, children: TemplateChildren[]) {
    return new TemplateClass(params, children)
}

/** Объединение параметров в раскрывающуюся группу. */
export function Group(params: IGroupClassProps, children: TemplateChildren[]) {
    return new GroupClass(params, children)
}

/** Поле ввода. */
export function Input(params: IInputClassProps) {
    return new InputClass(params)
}

/** Поле выбора значения из предложенных. */
export function Select(params: ISelectClassProps) {
    return new SelectClass(params)
}

/** По каждому элементу с перед-стоящим селектором. */
export const forEach = '[SXMLE_ID="-CYCLE1-"]'
/** Первый среди элементов с перед-стоящим селектором. */
export const first = '[SXMLE_ID="-F_CYCLE1-"]'
/** Последний среди элементов с перед-стоящим селектором. */
export const last = '[SXMLE_ID="-L_CYCLE1-"]'

/** 
 * По каждому элементу с перед-стоящим селектором в указанном цикле.
 * 
 * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
*/
export const forEachBy = (cycleNum: number) => `[SXMLE_ID="-CYCLE${cycleNum}-"]`
/** 
 * Первый среди элементов с перед-стоящим селектором в указанном цикле.
 * 
 * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
*/
export const firstBy = (cycleNum: number) => `[SXMLE_ID="-F_CYCLE${cycleNum}-"]`
/** 
 * Последний среди элементов с перед-стоящим селектором в указанном цикле.
 * 
 * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
*/
export const lastBy = (cycleNum: number) => `[SXMLE_ID="-L_CYCLE${cycleNum}-"]`
/** 
 * Элемент, стоящий на позиции `pos` в указанном цикле.
 * 
 * __Цикл__ - номер по порядку шаблона с итерацией `Template[type=TemplateType.multiply]`
*/
export const th = (pos: number, cycleNum: number = 1) => `[SXMLE_ID="-N${pos}_CYCLE${cycleNum}-"]`

/** 
 * Создаёт объект селекторов на основе `obj`. 
 * 
 * Все точки в селекторе после обработки заменяются на `>`.
 * 
 * Для вставки другого селектора используется `{id}`, где _id_ - название селектора для вставки.
 * 
 * _Внимение!_ Сначала должен идти тот селектор, **который** будет вставляться, а потом уже тот, **в который** происходит вставка.
 * 
 * _Пример:_
 * ```
 * {
 *     selector1: 'el1.el2',
 *     selector2: '{selector1}.el3', // Правильно, после обработки будет 'el1.el2.el3'
 *     ...
 *     selector3: '{selector4}.el6', // Неправильно, вставка должна быть ПОСЛЕ инициализации
 *     selector4: 'el4.el5'
 * }
 * ```
 * Для относительной навигации в селекторе могут применяться следующие элементы:
 * - {@link forEach} или {@link forEachBy}()
 * - {@link first} или {@link firstBy}()
 * - {@link last} или {@link lastBy}()
 * - {@link th}()
 * 
 * _Внимание!_ Вставка для относительной навигации проводится без точки после селектора.
 * 
 * _Пример:_
 * ```
 * {
 *     selector1: `el1.el2${first}`, // Правильно
 *     selector2: `el1.el2.${first}` // Неправильно
 * }
 * ```
 * _Пример возможных селекторов:_
 * ```
 * {
 *     // Вместо forEach каждую итерацию будет вставляться `ID` текущего элемента.
 *     first: `Truck.Wheel${forEach}`,
 *     // После обработки будет 'Truck.Wheel${forEach}.GameData'
 *     second: '{first}.GameData',
 *     // Последний <Bone> в <PhysicsModel>,
 *     third: `PhysicsModel.Bone${last}`, 
 *     // Аналогично первому, но вставка происходит только во второй итерации.
 *     example: `Example${forEachBy(2)}` 
 * }
 * ```
 * Допустим, у нас есть такой XML файл:
 * ```xml
 * <Truck>
 *     <Wheels>
 *          <Wheel number='1'/>
 *          ...
 *          <Wheel number='30'/>
 *     </Wheels>
 * </Truck>
 * ```
 * Нам требуется получить доступ к каждому Wheel. Для этого мы используем два селектора.
 * ```
 * {
 *     // Вставим его как itemSelector в Template и он запустит итерацию по всем <Wheel>.
 *     wheel: 'Truck.Wheels.Wheel',
 *     // Во время итерации этот селектор будет указывать на текущий элемент <Wheel>.
 *     currentWheel: `{wheel}${forEach}`
 * }
 * ```
*/
export function Selectors<T extends {[id: string]: string}>(obj: T): T {
    type ItemType = T[Extract<keyof T, string>]
    const newObj: T = Object.assign({}, obj)

    for (const id in newObj) {
        for (const id2 in newObj) {
            newObj[id2] = newObj[id2].replace(`{${id}}`, newObj[id]) as ItemType
        }
    }
    for (const id in obj) {
        newObj[id] = `SELECTOR_ID:${id}||${newObj[id]}` as ItemType
        newObj[id] = newObj[id].replaceAll('.', '>') as ItemType
    }
    return newObj
}
