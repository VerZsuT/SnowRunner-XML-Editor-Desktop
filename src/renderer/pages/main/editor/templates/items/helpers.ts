import { SELECTOR_ID_PREFIX, SELECTOR_SEPARATOR } from '../service'

import type { IInputBaseProps } from '#g/types'

class Helpers {
  /** Возвращает ID селектора после `SELECTOR_ID` */
  getSelectorID(selector: string | undefined): string | undefined {
    if (!selector) return
    return selector.split(SELECTOR_SEPARATOR)[0].split(SELECTOR_ID_PREFIX)[1]
  }

  /** Возвращает базовые свойства поля ввода */
  getInputBaseProps(props: IInputBaseProps) {
    return {
      attribute: props.attribute,
      label: props.label,
      addMissedTag: props.addMissedTag,
      selector: this.getSelectorID(props.selector)
    }
  }
}

const helpers = new Helpers()

export default helpers
