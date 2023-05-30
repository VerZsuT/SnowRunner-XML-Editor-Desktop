import GroupElement from './group.item'
import InputElement from './input.item'
import SelectElement from './select.item'
import TemplateElement from './template.item'

import { InputType, NumberType, TemplateType } from '#g/enums'
import type { GroupTypedProps, IDefaultInputProps, IFileProps, NumberProps, SelectOptions, SelectProps, TemplateItems, TemplateSelectors, TemplateTypedProps } from '#g/types'

export function Select<T extends SelectOptions>(props: SelectProps<T>): SelectElement<T> {
  return new SelectElement(props)
}

/** Объединение параметров в раскрывающуюся группу */
export function Group(name: string, ...children: TemplateItems[]): GroupElement
/** Объединение параметров в раскрывающуюся группу */
export function Group(props: GroupTypedProps, ...children: TemplateItems[]): GroupElement
export function Group(props: string | GroupTypedProps, ...children: TemplateItems[]): GroupElement {
  return new GroupElement(props, ...children)
}

/** Шаблон таблицы параметров. Может иметь вложенные под-шаблоны */
export function Template(props: TemplateTypedProps, ...children: TemplateItems[]): TemplateElement
/** Шаблон таблицы параметров. Может иметь вложенные под-шаблоны */
export function Template(props: TemplateSelectors, ...children: TemplateItems[]): TemplateElement
export function Template(props: TemplateSelectors | TemplateTypedProps, ...children: TemplateItems[]): TemplateElement {
  return new TemplateElement(props, ...children)
}

/** Кнопки для редактирования файла */
export function File(props: IFileProps): InputElement {
  return new InputElement({
    attribute: props.attribute,
    selector: props.selector,
    type: InputType.file,
    fileType: props.type,
    label: '',
    addMissedTag: false
  })
}

/** Поле ввода числа */
export function Num(props: NumberProps): InputElement {
  return new InputElement({
    ...props,
    numberType: props.type,
    type: InputType.number
  })
}

/** Поле ввода целого числа */
export function Int(props: Omit<NumberProps, 'type'>): InputElement {
  return Num({ type: NumberType.integer, ...props })
}

/** Поле ввода дробного числа */
export function Float(props: Omit<NumberProps, 'type'>): InputElement {
  return Num({ type: NumberType.float, ...props })
}

/** Поле ввода текста */
export function Text(props: IDefaultInputProps): InputElement {
  return new InputElement({ type: InputType.text, ...props })
}

/** Поля ввода координат */
export function Coords(props: IDefaultInputProps): InputElement {
  return new InputElement({ type: InputType.coordinates, ...props })
}

/** Итерация по всем элементам с данным селектором */
export function ForEach(selector: string, ...children: TemplateItems[]): TemplateElement {
  return new TemplateElement({
    type: TemplateType.multiply,
    itemSelector: selector
  }, ...children)
}
