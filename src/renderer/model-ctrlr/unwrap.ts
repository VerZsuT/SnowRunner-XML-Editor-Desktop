/** Позволяет использовать свойство без обращения к `val` (применимо с `localize`) */
function unwrap<This, Type>(
  _: undefined,
  context: ClassFieldDecoratorContext<This, Type>
) {
  const name = String(context.name)

  return function (this: This, value: Type) {
    const val = { temp: value }

    Object.defineProperty(this, name, {
      get: () => val.temp?.['val'],
      set: (value: any) => val.temp = value,
      enumerable: true
    })

    return value
  }
}

export default unwrap
