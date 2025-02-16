import type { EventUnsubscribe, HasSnapshotClass } from 'emr-bridge/renderer'
import { Bridge } from 'emr-bridge/renderer'
import type { Reactive } from 'vue'
import { reactive, ref, toRaw, watch } from 'vue'
import { getPublicName } from './helpers'

const bridge = Bridge.as<object>()

/** Название свойства с main методами. */
const MAIN_METHODS_PROPERTY = Symbol('main methods')

/** Название свойства с main полями. */
const MAIN_FIELDS_PROPERTY = Symbol('main fields')

/** Название обработчика изменения. */
const CHANGE_HANDLER = Symbol('on change')

/** Название свойства с перечислением обновляемых из main процесса. */
const UPDATE_FROM_MAIN = Symbol('update from main')

/** Свойство с публичными методами. */
type MainMethodsProperty = {
  /** Название метода. */
  name: string

  /** Класс возвращаемого значения метода. */
  returns?: HasSnapshotClass
}[]

/** Свойство с публичными полями. */
type MainFieldsProperty = {
  /** Название поля. */
  name: string
}[]

/** Обновляемые из main процесса. */
type UpdateFromMain = Set<string>

/**
 * Свойство с публичными методами.
 * @param name Название поля.
 * @param value Значение поля.
 */
type ChangeHandler = (name: string, value: any) => void

/** Инициализировать main методы и поля класса. */
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

/**
 * Добавить main метод класса.
 * @param returns Класс возвращаемого значения метода.
 */
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

/** Добавить main ref поле класса. */
export function mainRefField() {
  return function<This, Value>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    context.addInitializer(getMainRefFieldInitializer(context.name.toString()))
  }
}

/** Добавить main ref поле класса. */
export function mainRefAccessor() {
  return function<This, Value>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    context.addInitializer(getMainRefFieldInitializer(context.name.toString()))

    return target
  }
}

/** Добавить main object поле класса. */
export function mainObjectField() {
  return function<This, Value extends object>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    context.addInitializer(getMainObjectFieldInitializer(context.name.toString()))
  }
}

/** Добавить main object поле класса. */
export function mainObjectAccessor() {
  return function<This, Value extends object>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    context.addInitializer(getMainObjectFieldInitializer(context.name.toString()))

    return target
  }
}

/** Добавить main array поле класса. */
export function mainArrayField() {
  return function<This, Value extends Array<unknown>>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    context.addInitializer(getMainArrayFieldInitializer(context.name.toString()))
  }
}

/** Добавить main array поле класса. */
export function mainArrayAccessor() {
  return function<This, Value extends Array<unknown>>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    context.addInitializer(getMainArrayFieldInitializer(context.name.toString()))

    return target
  }
}

/**
 * Получить инициализатор ref поля.
 * @param name Название ref поля.
 * @returns Инициализатор ref поля.
 */
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

/**
 * Получить инициализатор object поля.
 * @param name Название object поля.
 * @returns Инициализатор object поля.
 */
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

/**
 * Получить инициализатор array поля.
 * @param name Название array поля.
 * @returns Инициализатор array поля.
 */
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

/**
 * Инициализировать реактивное значение.
 * @param value Нереактивное значение.
 * @param onChange Обработчик изменения значения.
 * @returns Реактивное значение.
 */
function initReactive<Value extends object>(value: Value, onChange: (newValue: Value) => void) {
  const reactiveValue = reactive(value)

  watch(reactiveValue, value => onChange(toRaw(value) as Value), { flush: 'sync' })

  return reactiveValue
}

/**
 * Выполнить действие с учётом что поле было изменено в main процессе.
 * @param target Экземпляр класса.
 * @param name Название поля.
 * @param func Действие.
 */
function withUpdateFromMain(target: any, name: string, func: () => void): void {
  getUpdateFromMain(target).add(name)
  func()
  getUpdateFromMain(target).delete(name)
}

/**
 * Получить список обновляемых из main процесса.
 * @param target Экземпляр класса.
 * @returns Список обновляемых из main процесса.
 */
function getUpdateFromMain(target: any): UpdateFromMain {
  return target[UPDATE_FROM_MAIN] ??= new Set<string>() satisfies UpdateFromMain
}

/**
 * Получить обработчик изменения.
 * @param target Экземпляр класса.
 * @param className Название класса.
 * @returns Обработчик изменения.
 */
function getChangeHandler(target: any, className?: string): ChangeHandler {
  return target[CHANGE_HANDLER] ??= ((name: string, value: any) => {
    emitRendererChangeEvent(getPublicName(className!, name), value)
  }) satisfies ChangeHandler
}

/**
 * Вызвать событие изменения поля.
 * @param name Название поля.
 * @param value Значение поля.
 */
function emitRendererChangeEvent(name: string, value: any): void {
  bridge.emit(`${name}/renderer-change-event`, value)
}

/**
 * Обработать изменение поля из main процесса.
 * @param name Название поля.
 * @param handler Обработчик.
 * @returns Функция отписки.
 */
function onMainChangeEvent(name: string, handler: (value: any) => void): EventUnsubscribe {
  return bridge.on(`${name}/main-change-event`, handler)
}

/**
 * Получить main поля.
 * @param target Экземпляр класса.
 * @returns Main поля.
 */
function getMainFields(target: any): MainFieldsProperty {
  return target[MAIN_FIELDS_PROPERTY] ??= [] satisfies MainFieldsProperty
}

/**
 * Получить main методы.
 * @param target Экземпляр класса.
 * @returns Main методы.
 */
function getMainMethods(target: any): MainMethodsProperty {
  return target[MAIN_METHODS_PROPERTY] ??= [] satisfies MainMethodsProperty
}
