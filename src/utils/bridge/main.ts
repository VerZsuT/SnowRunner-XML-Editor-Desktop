import type { EventUnsubscribe, HasSnapshotClass } from 'emr-bridge/main'
import { emitEvent, on, publishFunction, publishVariable } from 'emr-bridge/main'
import { getPublicName } from './helpers'

const PUBLIC_METHODS_PROPERTY = Symbol('public methods')
const PUBLIC_FIELDS_PROPERTY = Symbol('public fields')
const CHANGE_HANDLER = Symbol('on change')

type PublicMethodsProperty = {
  name: string
  receives?: HasSnapshotClass[]
}[]
type PublicFieldsProperty = {
  name: string
}[]
type ChangeHandler = (name: string, value: any) => void

/** Класс, имеющий публичные свойства / методы */
export abstract class HasPublic {
  constructor() {
    this.initPublic()
  }

  /** Инициализация публичных объектов/методов */
  protected abstract initPublic(): void
}

export function providePublic() {
  return function<Class extends new (...args: any) => any>(
    target: Class,
    context: ClassDecoratorContext<Class>
  ) {
    const className = context.name ?? ''

    return class extends target {
      constructor(...args: any[]) {
        super(...args)

        for (const {name, receives} of getPublicMethods(this)) {
          publishFunction(getPublicName(className, name), this[name].bind(this), receives)
        }

        for (const {name} of getPublicFields(this)) {
          const publicName = getPublicName(className, name)
          
          onRendererChangeEvent(publicName, value => this[name] = value)
          publishVariable(publicName, {
            get: () => this[name],
            set: value => this[name] = value
          })
        }

        getChangeHandler(this, className)
      }
    }
  }
}

export function publicMethod(receives?: HasSnapshotClass[]) {
  return function<This, Method extends (this: This, ...args: any[]) => any>(
    target: Method,
    context: ClassMethodDecoratorContext<This, Method>
  ) {
    context.addInitializer(function(this: This) {
      getPublicMethods(this).push({
        name: context.name.toString(),
        receives
      })
    })

    return target
  }
}

export function publicField() {
  return function<This, Value>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name.toString()

    return {
      init(value) {
        getPublicFields(this).push({name})

        return value
      },
      get() {
        return target.get.call(this)
      },
      set(value) {
        target.set.call(this, value)
        getChangeHandler(this)(name, value)
      }
    }
  }
}

function getChangeHandler(target: any, className?: string): ChangeHandler {
  return target[CHANGE_HANDLER] ??= ((name: string, value: any) => {
    emitMainChangeEvent(getPublicName(className!, name), value)
  }) satisfies ChangeHandler
}

function emitMainChangeEvent(name: string, value: any): void {
  emitEvent(`${name}/main-change-event`, value)
}

function onRendererChangeEvent(name: string, handler: (value: any) => void): EventUnsubscribe {
  return on(`${name}/renderer-change-event`, handler)
}

function getPublicFields(target: any): PublicFieldsProperty {
  return target[PUBLIC_FIELDS_PROPERTY] ??= [] satisfies PublicFieldsProperty
}

function getPublicMethods(target: any): PublicMethodsProperty {
  return target[PUBLIC_METHODS_PROPERTY] ??= [] satisfies PublicMethodsProperty
}
