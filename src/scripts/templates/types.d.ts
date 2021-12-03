type InputAreas = {
    red?: [number, number][]
    green?: [number, number][]
    yellow?: [number, number][]
}

type InputElementProps = {
    /** __Имя атрибута__, который будет устанавливаться у элемента по селектору. */
    attribute: string
    /** __Название параметра__ в таблице. */
    text: string
    /**
     * __Значение по умолчанию.__ Устанавливается если у элемента отсутствует значение атрибута.
     * 
     * Для `Input['number'|'text']` устанавливает прямое значение по умолчанию.
     * 
     * У `Select` выбирается `option` с соответствующим значением.
    */
    default?: string | number
    /**
     * __Селектор элемента__, у которого устанавливается атрибут.
     * 
     * Если установлен, то является более приоритетным чем {@link IGroupClassProps.defaultSelector defaultSelector} у родительской группы.
    */
    selector?: string
    /**
     * __Выделять ли жирным__ название параметра в таблице.
     * 
     * @default false
    */
    bold?: boolean
    /**
     * `false` - можно редактировать в обычном режиме.
     * 
     * `true` - редактирование только при `devMode=true`
     * 
     * @default false
    */
    onlyDeveloper?: boolean
    /**
     * __Разрешается ли добавлять элемент__ по указанному селектору в случае его отсутствия.
     * 
     * @default false
    */
    canAddTag?: boolean
    /** __Текст при наведении на знак вопроса__ возле параметра в таблице. */
    desc?: string
}

type ISelectors = {
    [name: string]: string
}

type ITemplateClassProps = {
    /**
     * Тип шаблона.
     * 
     * @default TemplateType.single
    */
    type?: import('./enums').TemplateType
    /**
     * Селектор итерируемых элементов.
     * 
     * Работает только при {@link type}=`TemplateType.multiply`
    */
    itemSelector?: string
    /**
     * Селекторы, используемые у потомков шаблона.
     * 
     * Устанавливается у `root` шаблона.
    */
    selectors?: ISelectors
}

type TemplateClassProps = ITemplateClassProps & ({
    type: import('./enums').TemplateType.multiply
    itemSelector: string
} | {
    type?: import('./enums').TemplateType.single
})

interface ITemplateClass {
    getParams(props: IGetParamsProps): ITemplateParams
}

interface IGetParamsProps {
    selectors?: ISelectors
    defaultSelector?: string
    multiply?: boolean
    fileDOM?: import('cheerio').CheerioAPI
    cycleNumber?: number
    tCycleNumber?: number
    tNumber?: number
    counter?: number
}

type ITemplateParams = (IGroupParams | IInputParams | ISelectParams)[]

type IGroupClassProps = {
    /** __Название группы__, отображаемое в таблице. */
    name?: string
    /**
     * Тип названия группы.
     * 
     * @default NameType.static
    */
    nameType?: import('./enums').NameType
    /**
     * __Селектор элемента__, у которого будет взято название группы.
     * 
     * Используется вместе с {@link nameAttribute}.
     * 
     * _Только при {@link nameType}=`NameType.computed` | `NameType.tagName`_
    */
    nameSelector?: string
    /**
     * __Дополнительный селектор элемента__ названия.
     * 
     * Используется если элемент по селектору {@link nameSelector} не найден.
    */
    resNameSelector?: string
    /**
     * __Имя атрибута__, который будет взят у элемента названия.
     * 
     * Используется вместе с {@link nameSelector} или {@link resNameSelector}
     * 
     * _Только при {@link nameType}=`NameType.computed`_
    */
    nameAttribute?: string
    /**
     * __Дополнительное имя атрибута.__
     * 
     * Используется если атрибут {@link nameAttribute} не найден.
    */
    resNameAttribute?: string
    /** __Селектор по умолчанию__ у всех элементов группы. */
    defaultSelector?: string
    /** __Добавлять ли номер__ текущей итерации к названию группы. */
    withCounter?: boolean
}

type GroupClassProps = IGroupClassProps & ({
    nameType?: import('./enums').NameType.static
    name: string
} | {
    nameType: import('./enums').NameType.tagName
    nameSelector: string
    resNameSelector?: string
} | {
    nameType: import('./enums').NameType.computed
    nameAttribute: string
    resNameAttribute?: string
    nameSelector: string
    resNameSelector?: string
})

interface IGroupClass {
    getParams(props: IGetParamsProps): [IGroupParams] | any[]
}

interface IGroupParams {
    paramType: string
    groupName: string
    groupItems: any
}

type IInputClassProps = InputElementProps & {
    /**
     * Тип поля ввода.
     * 
     * @default InputType.number
    */
    type?: import('./enums').InputType
    /**
     * Тип числового значения.
     * 
     * _Только при {@link type}=`InputType.number`_
     * 
     * @default NumberType.float
    */
    numberType?: import('./enums').NumberType
    /**
     * __Минимальное__ числовое значение.
     * 
     * _Только при {@link type}=`InputType.number`_
     * 
     * @default
     * 0 при (numberType === NumberType.integer)
     * 0.1 при (numberType === NumberType.float)
    */
    min?: number
    /**
     * __Максимальное__ числовое значение.
     * 
     * _Только при {@link type}=`InputType.number`_
     * 
     * @default Infinity
    */
    max?: number
    /**
     * __Шаг изменения значения__ с помощью стрелочек.
     * 
     * _Только при {@link type}=`InputType.number`_
     * 
     * @default
     * 0.1 при (numberType === NumberType.float)
     * 0 при (numberType === NumberType.integer)
    */
    step?: number
    /**
     * __Тип XML файла__, который будет открываться по нажатию кнопки.
     * 
     * _Только при {@link type}=`InputType.file`_
    */
    fileType?: import('./enums').FileType
    /**
     * __Шаблон цветовых зон__ значений.
     * 
     * _Только при {@link type}=`InputType.number`_
    */
    areas?: InputAreas
}

type InputClassProps = IInputClassProps & ({
    type?: import('./enums').InputType.number
    numberType?: import('./enums').NumberType
    step?: number
    areas?: InputAreas
    min?: number
    max?: number
    default?: number
} | {
    type: import('./enums').InputType.coordinates
} | {
    type: import('./enums').InputType.text
    default?: string
} | {
    type: import('./enums').InputType.file
    fileType: import('./enums').FileType
})

interface IInputClass {
    getParams(props: IGetParamsProps): [IInputParams] | []
}

interface IInputParams {
    name: string
    text: string
    value: string | number
    selector: string
    paramType: string
    inputType: string
    onlyDeveloper: boolean
    type: import('./enums').InputType
    min: number
    max: number
    step: number
    numberType: import('./enums').NumberType
    fileType: import('./enums').FileType
    bold: boolean
    desc: string
    default: string | number
    areas: InputAreas
}

interface ISelectOptions {
    /**
     * Ключ - `value`
     * 
     * Значение - `text`
    */
    [value: string]: string
}

interface ISelectClass {
    getParams(props: IGetParamsProps): [ISelectParams] | []
}

interface ISelectClassProps<T extends ISelectOptions> extends InputElementProps {
    /** Доступные для выбора опции. */
    default?: keyof T
    options: T
}

interface ISelectParams {
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

interface ITemplate {
    template: ITemplateClass
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
    'recoverFromBackup' |
    'joinEPF' |
    'seeEPF' |
    'openURL'

interface IMenuTemplate {
    /** __Текст__ кнопки. */
    label?: string
    /** __Роль__ кнопки (название шаблона поведения). */
    role?: MenuRole
    /** __Меню__, выводимое при наведении на кнопку. */
    submenu?: IMenuTemplate[]
    /**
     * Путь к файлу/папке.
     * 
     * _Только при {@link role}=`'showFolder'`_
    */
    path?: string
    /**
     * URL страницы.
     * 
     * _Только при {@link role}=`'openURL'`_
    */
    url?: string
}

type DefaultInputProps = {
    attribute: string
    selector?: string
    text: string
    desc?: string
    bold?: boolean
    onlyDev?: boolean
    canAddTag?: boolean
}

type FileProps = Exclude<DefaultInputProps, 'onlyDeveloper'|'canAddTag'> & {
    type: import('./enums').FileType
}

type NumberProps = DefaultInputProps & {
    type?: import('./enums').NumberType
    min?: number
    max?: number
    step?: number
    default?: number
    areas?: InputAreas
}
