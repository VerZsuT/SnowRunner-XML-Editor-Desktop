import type { EventUnsubscribe, HasSnapshotClass } from 'emr-bridge/renderer'
import { Bridge } from 'emr-bridge/renderer'
import type { Reactive } from 'vue'
import { reactive, ref, toRaw, watch } from 'vue'
import { getPublicName } from './helpers'

const bridge = Bridge.as<object>()

const MAIN_METHODS_PROPERTY = Symbol('main methods')
const MAIN_FIELDS_PROPERTY = Symbol('main fields')
const CHANGE_HANDLER = Symbol('on change')
const UPDATE_FROM_MAIN = Symbol('update from main')

type MainMethodsProperty = {
  name: string
  returns?: HasSnapshotClass
}[]
type MainFieldsProperty = {
  name: string
}[]
type UpdateFromMain = Set<string>
type ChangeHandler = (name: string, value: any) => void

export function initMain() {
  return function<Class extends new (...args: any) => any>(
    target: Class,
    context: ClassDecoratorContext<Class>
  ) {
    const className = context.name ?? ''

    return class extends target {
      constructor(...args: any[]) {
        super(...args)

        for (const {name, returns} of getMainMethods(this)) {
          const publicName = getPublicName(className, name)
  
          this[name] = function(this: Class, ...args: any[]) {
            return returns
              ? bridge.call(bridge[publicName], returns, args)
              : bridge[publicName](...args)
          }
        }

        for (const {name} of getMainFields(this)) {
          const publicName = getPublicName(className, name)
          
          withUpdateFromMain(this, name, () => this[name] = bridge[publicName])
          onMainChangeEvent(publicName, value => {
            withUpdateFromMain(this, name, () => this[name] = value)
          })
        }

        getChangeHandler(this, className)
      }
    }
  }
}

export function mainMethod(returns?: HasSnapshotClass) {
  return function<This, Value>(
    target: Value,
    context: ClassFieldDecoratorContext<This>
  ) {
    context.addInitializer(function(this: This) {
      getMainMethods(this).push({
        name: context.name.toString(),
        returns
      })
    })

    return target
  }
}

export function mainRefField() {
  return function<This, Value>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    context.addInitializer(getMainRefFieldInitializer(context.name.toString()))
  }
}

export function mainRefAccessor() {
  return function<This, Value>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    context.addInitializer(getMainRefFieldInitializer(context.name.toString()))

    return target
  }
}

export function mainObjectField() {
  return function<This, Value extends object>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    context.addInitializer(getMainObjectFieldInitializer(context.name.toString()))
  }
}

export function mainObjectAccessor() {
  return function<This, Value extends object>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    context.addInitializer(getMainObjectFieldInitializer(context.name.toString()))

    return target
  }
}

export function mainArrayField() {
  return function<This, Value extends Array<unknown>>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    context.addInitializer(getMainArrayFieldInitializer(context.name.toString()))
  }
}

export function mainArrayAccessor() {
  return function<This, Value extends Array<unknown>>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    context.addInitializer(getMainArrayFieldInitializer(context.name.toString()))

    return target
  }
}

function getMainRefFieldInitializer(name: string) {
  return function<This, Value>(this: This) {
    const sourceRefValue = ref<Value>()

    getMainFields(this).push({ name })
    Object.defineProperty(this, name, {
      get() {
        return sourceRefValue.value
      },
      set(newValue) {
        sourceRefValue.value = newValue

        if (!getUpdateFromMain(this).has(name)) {
          getChangeHandler(this)(name, newValue)
        }
      },
      enumerable: true
    })
  }
}

function getMainObjectFieldInitializer(name: string) {
  return function<This, Value extends object>(this: This) {
    let sourceObject: Reactive<Value>

    getMainFields(this).push({ name })
    Object.defineProperty(this, name, {
      get() {
        return sourceObject
      },
      set(value) {
        sourceObject ??= initReactive({...value}, newValue => {
          if (!getUpdateFromMain(this).has(name)) {
            getChangeHandler(this)(name, newValue)
          }
        })

        Object.assign(sourceObject, value)
      },
      enumerable: true
    })
  }
}

function getMainArrayFieldInitializer(name: string) {
  return function<This, Value extends Array<unknown>>(this: This) {
    let sourceArray: Reactive<Value>

    getMainFields(this).push({ name })
    Object.defineProperty(this, name, {
      get() {
        return sourceArray
      },
      set(value) {
        sourceArray ??= initReactive([...value] as Value, newValue => {
          if (!getUpdateFromMain(this).has(name)) {
            getChangeHandler(this)(name, newValue)
          }
        })

        sourceArray.length = 0
        sourceArray.push(...value)
      },
      enumerable: true
    })
  }
}

function initReactive<Value extends object>(value: Value, onChange: (newValue: Value) => void) {
  const reactiveValue = reactive(value)

  watch(reactiveValue, value => onChange(toRaw(value) as Value), { flush: 'sync' })

  return reactiveValue
}

function withUpdateFromMain(target: any, name: string, func: () => void): void {
  getUpdateFromMain(target).add(name)
  func()
  getUpdateFromMain(target).delete(name)
}

function getUpdateFromMain(target: any): UpdateFromMain {
  return target[UPDATE_FROM_MAIN] ??= new Set<string>() satisfies UpdateFromMain
}

function getChangeHandler(target: any, className?: string): ChangeHandler {
  return target[CHANGE_HANDLER] ??= ((name: string, value: any) => {
    emitRendererChangeEvent(getPublicName(className!, name), value)
  }) satisfies ChangeHandler
}

function emitRendererChangeEvent(name: string, value: any): void {
  bridge.emit(`${name}/renderer-change-event`, value)
}

function onMainChangeEvent(name: string, handler: (value: any) => void): EventUnsubscribe {
  return bridge.on(`${name}/main-change-event`, handler)
}

function getMainFields(target: any): MainFieldsProperty {
  return target[MAIN_FIELDS_PROPERTY] ??= [] satisfies MainFieldsProperty
}

function getMainMethods(target: any): MainMethodsProperty {
  return target[MAIN_METHODS_PROPERTY] ??= [] satisfies MainMethodsProperty
}
