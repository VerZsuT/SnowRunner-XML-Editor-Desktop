import {InputType, TemplateType} from 'enums'
import type {DefaultInputProps, FileProps, NumberProps, TemplateItems} from 'types'

import {Input} from './Input'
import {Template} from './Template'

export {Group} from './Group'
export {Select} from './Select'
export {Template} from './Template'

/** Кнопки для редактирования файла. */
export function File(props: FileProps) {
    return Input({
        attribute: props.attribute,
        selector: props.selector,
        type: InputType.file,
        fileType: props.type,
        label: '',
        addMissedTag: false
    })
}

/** Числовое поле ввода. */
export function Number(props: NumberProps) {
    return Input({
        attribute: props.attribute,
        selector: props.selector,
        type: InputType.number,
        label: props.label,
        numberType: props.type,
        min: props.min,
        max: props.max,
        step: props.step,
        default: props.default,
        areas: props.areas,
        addMissedTag: props.addMissedTag
    })
}

/** Текстовое поле ввода. */
export function Text(props: DefaultInputProps) {
    return Input({
        type: InputType.text,
        ...props
    })
}

/** Поля ввода координат. */
export function Coordinates(props: DefaultInputProps) {
    return Input({
        type: InputType.coordinates,
        ...props
    })
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
    }, children)
}
