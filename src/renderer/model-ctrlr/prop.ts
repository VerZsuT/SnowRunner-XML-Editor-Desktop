import type ViewModel from './ViewModel'

/** Инициализирует свойством из `props` */
export default function prop<Props extends object>(key: keyof Props) {
  return <This extends ViewModel<any>, Type>(
    _: undefined,
    context: ClassFieldDecoratorContext<This, Type>
  ) => {
    const name = String(context.name)

    return function (this: This, value: Type) {
      Object.defineProperty(this, name, {
        get: () => this.props[key] ?? value,
        set: () => undefined,
        enumerable: true
      })

      return value
    }
  }
}
