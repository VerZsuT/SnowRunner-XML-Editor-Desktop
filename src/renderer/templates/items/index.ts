import Input from './Input'
import Template from './Template'

import { InputType, NumberType, TemplateType } from '#enums'
import type { IDefaultInputProps, IFileProps, NumberProps, TemplateItems } from '#types'

export { default as Group } from './Group'
export { default as Select } from './Select'
export { default as Template } from './Template'

/** Кнопки для редактирования файла. */
export class File extends Input {
  constructor(props: IFileProps) {
    super({
      attribute: props.attribute,
      selector: props.selector,
      type: InputType.file,
      fileType: props.type,
      label: '',
      addMissedTag: false
    })
  }
}

/** Числовое поле ввода. */
export class Num extends Input {
  constructor(props: NumberProps) {
    super({
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
}

export class Int extends Num {
  constructor(props: Omit<NumberProps, 'type'>) {
    super({ type: NumberType.integer, ...props })
  }
}

export class Float extends Num {
  constructor(props: Omit<NumberProps, 'type'>) {
    super({ type: NumberType.float, ...props })
  }
}

/** Текстовое поле ввода. */
export class Text extends Input {
  constructor(props: IDefaultInputProps) {
    super({ type: InputType.text, ...props })
  }
}

/** Поля ввода координат. */
export class Coords extends Input {
  constructor(props: IDefaultInputProps) {
    super({ type: InputType.coordinates, ...props })
  }
}

/**
 * Итерация по всем элементам с данным селектором.
 */
export class ForEach extends Template {
  constructor(selector: string, ...children: TemplateItems[]) {
    super({
      type: TemplateType.multiply,
      itemSelector: selector
    }, ...children)
  }
}
