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
