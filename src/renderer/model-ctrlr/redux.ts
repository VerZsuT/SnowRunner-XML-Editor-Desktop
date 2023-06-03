import { useRedux } from 'react-afc'
import type { ReduxSelectors } from 'react-afc/types'

/** Инициализирует свойством из `redux` */
export default function redux(selector: ReduxSelectors[string]) {
  return <This, Type>(
    _: undefined,
    context: ClassFieldDecoratorContext<This, Type>
  ) => {
    const name = String(context.name)

    return function (this: This, value: Type) {
      const store = useRedux({ value: selector })

      Object.defineProperty(this, name, {
        get: () => store.value,
        set: () => undefined,
        enumerable: true
      })

      return value
    }
  }
}
