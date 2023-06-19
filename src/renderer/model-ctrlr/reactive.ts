import { useState } from 'react-afc'

/** Делает свойство реактивным */
export default function reactive<This, Type>(
  _: undefined,
  context: ClassFieldDecoratorContext<This, Type>
) {
  const name = String(context.name)

  return function (this: This, value: Type) {
    const state = useState(value)

    Object.defineProperty(this, name, {
      get: () => state[0].val,
      set: val => state[1](val),
      enumerable: true
    })

    return value
  }
}
