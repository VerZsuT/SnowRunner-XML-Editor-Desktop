import type ViewModel from './ViewModel'

/** Инициализирует свойством из `props` */
function prop<Props extends object>(key: keyof Props) {
  return <This extends ViewModel<any>, Type>(
    _: undefined,
    context: ClassFieldDecoratorContext<This, Type>
  ) => {
    const name = String(context.name)

    return function (this: This, value: Type) {
      Object.defineProperty(this, name, {
        get: () => this.props[key],
        set: () => undefined,
        enumerable: true
      })

      return value
    }
  }
}

export default prop
