import type { IInputBaseProps } from '#types'

class Helpers {
  /** Возвращает ID селектора после `SELECTOR_ID` */
  getSelectorID(selector: string | undefined): string | undefined {
    if (!selector) return
    return selector.split('||')[0].split('SELECTOR_ID:')[1]
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

export const helpers = new Helpers()
