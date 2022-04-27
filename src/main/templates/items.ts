import { getIngameText } from "./service";

import FileType from "./enums/FileType";
import NameType from "./enums/NameType";
import NumberType from "./enums/NumberType";
import InputType from "./enums/InputType";
import TemplateType from "./enums/TemplateType";
import ParamType from "./enums/ParamType";

import type GroupClassProps from "./types/GroupClassProps";
import type IGetParamsProps from "./types/IGetParamsProps";
import type IGroupClass from "./types/IGroupClass";
import type IGroupClassProps from "./types/IGroupClassProps";
import type IGroupParams from "./types/IGroupParams";

import type FileProps from "./types/FileProps";
import type NumberProps from "./types/NumberProps";

import type ISelectClass from "./types/ISelectClass";
import type ISelectClassProps from "./types/ISelectClassProps";
import type ISelectOptions from "./types/ISelectOptions";
import type ISelectParams from "./types/ISelectParams";

import type TSelectors from "./types/TSelectors";
import type ITemplateClass from "./types/ITemplateClass";
import type ITemplateParams from "./types/ITemplateParams";
import type TemplateClassProps from "./types/TemplateClassProps";

import type DefaultInputProps from "./types/DefaultInputProps";
import type IInputClass from "./types/IInputClass";
import type IInputClassProps from "./types/IInputClassProps";
import type IInputParams from "./types/IInputParams";
import type InputAreas from "./types/InputAreas";
import type InputClassProps from "./types/InputClassProps";
import type InputElementProps from "./types/InputElementProps";

function getSelectorName(selector: string): string {
    return selector.split("||")[0].split("SELECTOR_ID:")[1];
}

// MARK: Пропущенные параметры
const showWarns = false;

type TemplateChildren = GroupClass | InputClass | SelectClass<null> | TemplateClass;

class InputElement {
    protected attribute: string;
    protected text: string;
    protected default: string | number;
    protected selector: string;
    protected canAddTag: boolean;
    protected desc: string;

    constructor(props: InputElementProps) {
        this.attribute = props.attribute;
        this.text = props.text;
        this.default = props.default;
        this.canAddTag = props.canAddTag;
        this.desc = props.desc ?? "";
        if (props.selector)
            this.selector = getSelectorName(props.selector);
    }
}

class TemplateClass implements ITemplateClass {
    private children: TemplateChildren[];
    private replaceName = "CYCLE";
    private type: TemplateType;
    private itemSelector: string;
    private selectors: { [name: string]: string };

    constructor(props: TemplateClassProps, children: TemplateChildren[]) {
        this.children = children;
        this.type = props.type;
        this.selectors = props.selectors;
        if (props.itemSelector)
            this.itemSelector = getSelectorName(props.itemSelector);
    }

    public getParams(props: IGetParamsProps): ITemplateParams {
        const {
            defaultSelector = null,
            tCycleNumber    = 1,
            tNumber         = 1,
            selectors       = this.selectors,
            multiply        = (this.type === TemplateType.multiply),
            fileDOM
        } = props;

        let { counter = 1 } = props;

        let params = [];
        let newSelectors = {};
        for (const selector in selectors) {
            if (selectors[selector].includes("||"))
                selectors[selector] = selectors[selector].split("||")[1];
        }
        if (multiply) {
            let itemSelector = selectors[this.itemSelector];
            if (itemSelector.endsWith("\"]")) {
                const temp1 = itemSelector.split(" ");
                const temp2 = temp1[temp1.length - 1].split("[SXMLE_ID");
                itemSelector = `${temp1.slice(0, temp1.length - 1).join(" ")} ${temp2[temp2.length - 2]}`;
            }

            const items = fileDOM(itemSelector);
            const name = this.replaceName + tNumber;
            let currentNum = 1;
            items.each((_, el) => {
                fileDOM(el).attr("SXMLE_ID", String(counter));
                for (const selector in selectors) {
                    newSelectors[selector] = selectors[selector].replaceAll(`-${name}-`, String(counter));
                    if (currentNum === 1)
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-F_${name}-`, String(counter));
                    else if (currentNum === items.length)
                        newSelectors[selector] = newSelectors[selector].replaceAll(`-L_${name}-`, String(counter));

                    newSelectors[selector] = newSelectors[selector].replaceAll(`-N${currentNum}_${name}-`, String(counter));
                }

                ++counter;
                params = params.concat(this.getParams({
                    selectors: newSelectors,
                    defaultSelector: defaultSelector,
                    multiply: false,
                    tCycleNumber: currentNum,
                    fileDOM: fileDOM,
                    tNumber: multiply ? tNumber + 1 : tNumber,
                    counter: counter
                }));
                ++currentNum;
            })
        } else {
            for (const child of this.children) {
                params = params.concat(child.getParams({
                    selectors: selectors,
                    defaultSelector: defaultSelector,
                    cycleNumber: tCycleNumber,
                    tNumber: multiply ? tNumber + 1 : tNumber,
                    fileDOM: fileDOM
                }));
            }
        }
        return params;
    }
}

export class GroupClass implements IGroupClass {
    private children: TemplateChildren[];
    private name: string;
    private icon: string;
    private nameType: NameType;
    private nameSelector: string;
    private resNameSelector: string;
    private nameAttribute: string;
    private resNameAttribute: string;
    private defaultSelector: string;
    private withCounter: boolean;

    constructor(props: IGroupClassProps, children: TemplateChildren[]) {
        this.children = children;
        this.name = props.name;
        this.icon = props.icon;
        this.nameType = props.nameType ?? NameType.static;
        this.nameAttribute = props.nameAttribute;
        this.resNameAttribute = props.resNameAttribute;
        this.withCounter = props.withCounter ?? false;
        if (props.nameSelector)
            this.nameSelector = getSelectorName(props.nameSelector);

        if (props.resNameSelector)
            this.resNameSelector = getSelectorName(props.resNameSelector);

        if (props.defaultSelector)
            this.defaultSelector = getSelectorName(props.defaultSelector);
    }

    public getParams(props: IGetParamsProps): [IGroupParams] | any[] {
        let params = [];
        let groupName: string;
        if (this.nameType !== NameType.static) {
            const nameSelector = this.nameSelector;
            const resNameSelector = this.resNameSelector;
            const $nameElement = props.fileDOM(props.selectors[nameSelector]);
            const $resNameElement = props.fileDOM(props.selectors[resNameSelector]);

            if ($nameElement.length === 0 && $resNameElement.length === 0)
                return [];

            if (this.nameType === NameType.computed)
                groupName = getIngameText($nameElement.attr(this.nameAttribute)) || $resNameElement.attr(this.resNameAttribute);
            else if (this.nameType === NameType.tagName)
                groupName = $nameElement.html().split("<")[1].split(" ")[0];
        }
        else {
            groupName = this.name;
        }

        for (const child of this.children) {
            params = params.concat(child.getParams({
                selectors: props.selectors,
                defaultSelector: this.defaultSelector ? this.defaultSelector : (props.defaultSelector || null),
                tNumber: props.tNumber,
                fileDOM: props.fileDOM
            }));
        }
        if (this.withCounter)
            groupName += ` ${props.cycleNumber}`;

        if (this.name === "_ONLY_FOR_SELECTOR_")
            return params;

        if (!params.length)
            return [];

        return [{
            paramType: ParamType.group,
            groupName: groupName,
            groupItems: params,
            icon: this.icon
        }];
    }
}

export class InputClass extends InputElement implements IInputClass {
    private type: InputType;
    private min: number;
    private max: number;
    private step: number;
    private numberType: NumberType;
    private fileType: FileType;
    private areas: InputAreas;

    constructor(props: IInputClassProps) {
        super(props);
        this.type = props.type ?? InputType.number;
        this.min = props.min ?? (props.numberType === NumberType.float ? 0.01 : 0);
        this.max = props.max;
        this.numberType = props.numberType ?? NumberType.float;
        this.step = props.step ?? (this.numberType === NumberType.float ? 0.1 : 1);
        this.fileType = props.fileType;
        this.areas = props.areas;
    }

    public getParams(props: IGetParamsProps): [IInputParams] | [] {
        const selector = this.selector ? (props.selectors[this.selector] || this.selector) : props.selectors[props.defaultSelector];
        let value: string;

        if (props.fileDOM(selector).length === 0) {
            if (!this.canAddTag) {
                if (showWarns)
                    console.warn(`Missing parameter\n\tName: "${this.attribute}",\n\tText: "${this.text}",\n\tSelector: "${selector}".`);
                return [];
            }
        }
        else {
            value = props.fileDOM(selector).attr(this.attribute);
        }

        return [{
            name: this.attribute,
            text: this.text,
            value: value,
            selector: selector,
            paramType: ParamType.input,
            inputType: "text",
            type: this.type,
            min: this.min,
            max: this.max,
            step: this.step,
            numberType: this.numberType,
            fileType: this.fileType,
            desc: this.desc,
            default: this.default,
            areas: this.areas
        }];
    }
}

class SelectClass<T extends ISelectOptions> extends InputElement implements ISelectClass {
    private options: ISelectOptions;

    constructor(params: ISelectClassProps<T>) {
        super(params as unknown as InputElementProps);
        this.options = params.options;
    }

    getParams(props: IGetParamsProps): [ISelectParams] | [] {
        const selectorType = this.selector ? this.selector : undefined;
        const selector = props.selectors[selectorType] || selectorType || props.selectors[props.defaultSelector];
        let value: string;

        if (props.fileDOM(selector).length === 0) {
            if (!this.canAddTag) {
                if (showWarns)
                    console.warn(`Missing parameter\n\tName: "${this.attribute}",\n\tText: "${this.text}",\n\tSelector: "${selector}".`);
                return [];
            }
        }
        else {
            value = props.fileDOM(selector).attr(this.attribute);
        }

        let options = [];
        for (const optionValue in this.options) {
            const optionText = this.options[optionValue];
            if (optionValue === "EMPTY") {
                options.push({
                    text: optionText,
                    value: ""
                });
            }
            else {
                options.push({
                    text: optionText,
                    value: optionValue
                });
            }
        }

        return [{
            name: this.attribute,
            text: this.text,
            value: value,
            selectParams: options,
            selector: selector,
            paramType: ParamType.input,
            inputType: "select",
            desc: this.desc,
            default: this.default as string
        }];
    }
}

/** 
 * Шаблон таблицы параметров. Может иметь вложенные под-шаблоны.
 * @param props объект селекторов или параметры шаблона.
*/
export function Template(props: TSelectors | TemplateClassProps, children: TemplateChildren[]) {
    if (props.type || props.itemSelector)
        return new TemplateClass(props, children);
    else
        return new TemplateClass({ selectors: props as TSelectors }, children);
}

/** 
 * Объединение параметров в раскрывающуюся группу.
 * @param props имя или параметры группы.
*/
export function Group(props: string | GroupClassProps, children: TemplateChildren[]) {
    if (typeof props === "string")
        return new GroupClass({ name: props }, children);
    else
        return new GroupClass(props, children);
}

/** Поле ввода. */
export function Input(props: InputClassProps) {
    return new InputClass(props);
}

/** Кнопки для редактирования файла. */
export function File(props: FileProps) {
    return Input({
        attribute: props.attribute,
        selector: props.selector,
        type: InputType.file,
        fileType: props.type,
        text: "",
        desc: "",
        canAddTag: false
    });
}

/** Числовое поле ввода. */
export function Number(props: NumberProps) {
    return Input({
        attribute: props.attribute,
        selector: props.selector,
        type: InputType.number,
        text: props.text,
        numberType: props.type,
        desc: props.desc,
        min: props.min,
        max: props.max,
        step: props.step,
        default: props.default,
        areas: props.areas,
        canAddTag: props.canAddTag
    });
}

/** Текстовое поле ввода. */
export function Text(props: DefaultInputProps) {
    return Input({
        type: InputType.text,
        ...props
    });
}

/** Поля ввода координат. */
export function Coordinates(props: DefaultInputProps) {
    return Input({
        type: InputType.coordinates,
        ...props
    });
}

/** 
 * Итерация по всем элементам с данным селектором.
 * 
 * @param selector селектор элементов, по которым будет проходить итерация.
 * _Может иметь окончание `forEach | forEachBy(...)`._
*/
export function ForEach(selector: string, children: TemplateChildren[]) {
    return Template({
        type: TemplateType.multiply,
        itemSelector: selector
    }, children);
}

/** Поле выбора значения из предложенных. */
export function Select<T extends ISelectOptions>(props: ISelectClassProps<T>) {
    return new SelectClass(props);
}
