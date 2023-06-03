import { SELECTOR_ID_PREFIX, SELECTOR_SEPARATOR } from '../service'

import type { IInputBaseProps } from '#g/types'

export default class Helpers {
  /** Возвращает ID селектора после `SELECTOR_ID` */
  static getSelectorID(selector: string | undefined): string | undefined {
    if (!selector) return
    return selector.split(SELECTOR_SEPARATOR)[0].split(SELECTOR_ID_PREFIX)[1]
  }

  /** Возвращает базовые свойства поля ввода */
  static getInputBaseProps(props: IInputBaseProps) {
    return {
      attribute: props.attribute,
      label: props.label,
      addMissedTag: props.addMissedTag,
      selector: this.getSelectorID(props.selector)
    }
  }
}
