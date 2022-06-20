import InputType from "enums/InputType";
import TemplateType from "enums/TemplateType";
import type DefaultInputProps from "types/DefaultInputProps";
import type FileProps from "types/FileProps";
import type NumberProps from "types/NumberProps";
import type TemplateItems from "types/TemplateItems";

import Input from "./Input";
import Template from "./Template";

export { default as Group } from "./Group";
export { default as Input } from "./Input";
export { default as Select } from "./Select";
export { default as Template } from "./Template";

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
 * @param children
 */
export function ForEach(selector: string, children: TemplateItems[]) {
    return Template({
        type: TemplateType.multiply,
        itemSelector: selector
    }, children);
}
