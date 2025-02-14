import type GameXML from './game-xml'
import type Limit from './limit'
import type { PosLimits } from './position'
import Position from './position'
import type { IInputAreas } from '/rend/pages/general/editor/types'
import { arrayToString, boolToString, hasItems, numberToString, stringToArray, stringToBoolean, stringToNumber } from '/utils/renderer'

const PROPERTIES = Symbol('properties')

type AttributeProperties = Record<string | symbol, IBaseAttributeProperties>

interface IBaseAttributeProperties<Value = unknown> {
  label?: string
  desc?: string
  limit?: Value extends XmlValue<Position>
    ? PosLimits
    : Limit
  step?: number
  areas?: IInputAreas
}

/** Строковый атрибут. */
export function stringAttr<T extends string>() {
  type Value = T | undefined
  
  return function<This extends GameXML>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name.toString()
    let defaultValue: Value 
  
    return {
      init(value) {
        defaultValue = value
        Object.defineProperty(this, `$${name}`, {
          value: createStringAttrDescriptor(name, this, defaultValue),
          enumerable: true,
          writable: false
        })
    
        return value
      },
      get() {
        return this.procAttr(name)?.str as Value ?? defaultValue
      },
      set(value) {
        this.procAttr(name, value ?? null)
      }
    }
  }
}

/**
 * Атрибут с массивом строк.  
 * Пример - `First, Second, Third`.
 * @param parser Функция-преобразователь.
 * @param preserve Не удалять атрибут при пустом значении (`false`).
 */
export function stringArrayAttr<T extends string>(
  parser = (str: string) => str as T | undefined,
  preserve = false
) {
  type Value = T[]

  return function<This extends GameXML>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name.toString()
    let defaultValue: Value

    return {
      init(value) {
        defaultValue = value ?? []
        Object.defineProperty(this, `$${name}`, {
          value: createStringArrayAttrDescriptor(name, this, defaultValue, parser, preserve),
          enumerable: true,
          writable: false
        })

        return value
      },
      get() {
        return stringToArray(this.procAttr(name)?.str, parser) ?? defaultValue
      },
      set(value) {
        this.procAttr(name, hasItems(value)
          ? arrayToString(value)
          : (preserve ? '' : null)
        )
      }
    }
  }
}

/** Атрибут с позицией. */
export function positionAttr() {
  type Value = Position | undefined

  return function<This extends GameXML>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name.toString()
    let defaultValue: Value

    return {
      init(value) {
        defaultValue = value
        Object.defineProperty(this, `$${name}`, {
          value: createPositionAttrDescriptor(name, this, defaultValue),
          enumerable: true,
          writable: false
        })

        return value
      },
      get() {
        const str = this.procAttr(name)?.str

        if (!str) {
          return defaultValue
        }

        return Position.from(str, this[PROPERTIES]?.[name]?.limit)
      },
      set(value) {
        this.procAttr(name, value?.toString() ?? null)
      }
    }
  }
}

/** Целочисленный атрибут. */
export function integerAttr() {
  type Value = number | undefined

  return function<This extends GameXML>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name.toString()
    let defaultValue: Value

    return {
      init(value) {
        defaultValue = value
        Object.defineProperty(this, `$${name}`, {
          value: createNumberAttrDescriptor(name, this, defaultValue),
          enumerable: true,
          writable: false
        })

        return value
      },
      get() {
        return this.procAttr(name)?.int ?? defaultValue
      },
      set(value) {
        this.procAttr(name, value ?? null, this[PROPERTIES]?.[name]?.limit)
      }
    }
  }
}

/** Атрибут с плавающей точкой. */
export function floatAttr() {
  type Value = number | undefined

  return function<This extends GameXML>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name.toString()
    let defaultValue: Value

    return {
      init(value) {
        defaultValue = value
        Object.defineProperty(this, `$${name}`, {
          value: createNumberAttrDescriptor(name, this, defaultValue),
          enumerable: true,
          writable: false
        })

        return value
      },
      get() {
        return this.procAttr(name)?.float ?? defaultValue
      },
      set(value) {
        this.procAttr(name, value ?? null, this[PROPERTIES]?.[name]?.limit)
      }
    }
  }
}

/** Логический атрибут. */
export function booleanAttr() {
  type Value = boolean | undefined

  return function<This extends GameXML>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name.toString()
    let defaultValue: Value

    return {
      init(value) {
        defaultValue = value
        Object.defineProperty(this, `$${name}`, {
          value: createBooleanAttrDescriptor(name, this, defaultValue),
          enumerable: true,
          writable: false
        })

        return value
      },
      get() {
        return this.procAttr(name)?.bool ?? defaultValue
      },
      set(value) {
        this.procAttr(name, value ?? null)
      }
    }
  }
}

/** Ленивое получение значения. */
export function lazy<This, Value>(
  target: () => Value,
  context: ClassGetterDecoratorContext<This, Value>
) {
  const name = context.name.toString()

  return function(this: This): Value {
    return Object.defineProperty(this, name, {
      value: target.call(this),
      writable: false,
      enumerable: true
    })[name]
  }
}

export function properties<This, Value>(
  properties: IBaseAttributeProperties<NoInfer<Value>> & { default?: NoInfer<Value> }
) {
  return function(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name

    return {
      init(value) {
        (this[PROPERTIES] ??= {} satisfies AttributeProperties)[name] = properties

        return properties.default ?? value
      }
    }
  }
}

/**
 * Создать дескриптор строкового атрибута.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Дескриптор строкового атрибута.
 */
function createStringAttrDescriptor<
  This extends GameXML,
  Value extends string = string
>(name: string, instance: This, defaultValue?: Value) {
  const baseDescriptor = createBaseStringConvertAttrDescriptor(
    name,
    instance,
    defaultValue,
    str => str as Value,
    str => str ?? ''
  )

  return mixDescriptors<
    typeof baseDescriptor,
    IStringAttrDescriptor<Value>
  >(baseDescriptor, {
    attrType: 'string'
  })
}

/**
 * Создать дескриптор атрибута с массивом строк.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @param parser Функция-преобразователь.
 * @param preserve Не удалять атрибут при пустом значении (`false`).
 * @returns Дескриптор атрибута с массивом строк.
 */
function createStringArrayAttrDescriptor<
  This extends GameXML,
  Value extends string = string
>(
  name: string,
  instance: This,
  defaultValue?: Value[],
  parser = (str: string) => str as Value | undefined,
  preserve = false
) {
  const baseDescriptor = createBaseAttrDescriptor<Value[]>(
    name,
    instance,
    defaultValue
  )

  return mixDescriptors<
    typeof baseDescriptor,
    IStringArrayAttrDescriptor<Value>
  >(baseDescriptor, {
    attrType: 'stringArray',
    getStr: () => arrayToString(baseDescriptor.get()),
    setStr: value => baseDescriptor.set(
      value
        ? stringToArray(value, parser)
        : preserve
            ? []
            : undefined
    )
  })
}

/**
 * Создать дескриптор атрибута с позицией.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Дескриптор атрибута с позицией.
 */
function createPositionAttrDescriptor<
  This extends GameXML
>(name: string, instance: This, defaultValue?: Position) {
  const baseDescriptor = createBaseStringConvertAttrDescriptor(
    name,
    instance,
    defaultValue,
    str => Position.from(str),
    pos => pos?.toString() ?? ''
  )

  return mixDescriptors<
    typeof baseDescriptor,
    IPositionAttrDescriptor
  >(baseDescriptor, {
    attrType: 'position'
  })
}

/**
 * Создать дескриптор числового атрибута.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Дескриптор числового атрибута.
 */
function createNumberAttrDescriptor<
  This extends GameXML
>(name: string, instance: This, defaultValue?: number) {
  const baseDescriptor = createBaseStringConvertAttrDescriptor(
    name,
    instance,
    defaultValue,
    stringToNumber,
    numberToString
  )

  return mixDescriptors<
    typeof baseDescriptor,
    INumberAttrDescriptor
  >(baseDescriptor, {
    attrType: 'number'
  })
}

/**
 * Создать дескриптор логического атрибута.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Дескриптор логического атрибута.
 */
function createBooleanAttrDescriptor<
  Instance extends GameXML
>(name: string, instance: Instance, defaultValue?: boolean) {
  const baseDescriptor = createBaseStringConvertAttrDescriptor(
    name,
    instance,
    defaultValue,
    stringToBoolean,
    boolToString
  )

  return mixDescriptors<
    typeof baseDescriptor,
    IBooleanAttrDescriptor
  >(baseDescriptor, {
    attrType: 'boolean'
  })
}

/**
 * Создать базовый дескриптор атрибута.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Базовый дескриптор атрибута.
 */
function createBaseStringConvertAttrDescriptor<Value>(
  name: string,
  instance: GameXML,
  defaultValue: Value | undefined,
  fromString: (value: string) => Value,
  toString: (value?: Value) => string
) {
  const baseDescriptor = createBaseAttrDescriptor<Value>(name, instance, defaultValue)

  return mixDescriptors<
    typeof baseDescriptor,
    IStringConvertAttrDescriptor<Value>
  >(baseDescriptor, {
    getStr: () => toString(baseDescriptor.get()),
    setStr: value => baseDescriptor.set(
    value
      ? fromString(value)
      : undefined
    )
  })
}

/**
 * Создать базовый дескриптор атрибута.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Базовый дескриптор атрибута.
 */
function createBaseAttrDescriptor<Value>(
  name: string,
  instance: GameXML,
  defaultValue: Value | undefined
): IAttrDescriptor<Value> {
  return {
    name,
    selector: instance.selector,
    default: defaultValue,
    get limit() { return instance[PROPERTIES]?.[name]?.limit },
    get step() { return instance[PROPERTIES]?.[name]?.step },
    get areas() { return instance[PROPERTIES]?.[name]?.areas },
    get label() { return instance[PROPERTIES]?.[name]?.label },
    get desc() { return instance[PROPERTIES]?.[name]?.desc },
    get: () => instance[name],
    set: value => instance[name] = value
  }
}

function mixDescriptors<
  Base extends object,
  Child extends Base
>(baseDescriptor: Base, mixin: Omit<Child, keyof Base>) {
  return new Proxy({...baseDescriptor, ...mixin}, {
    get(target, key) {
      return key in baseDescriptor
        ? baseDescriptor[key]
        : target[key]
    }
  })
}

export type XmlValue<T> = T | undefined
export type XmlArrayValue<T> = T[]
export type XmlElement<T extends GameXML> = T | undefined
export type XmlElements<T extends GameXML> = T[]

/** Дескриптор атрибута. */
export interface IAttrDescriptor<Value = unknown> {
  /** Имя атрибута. */
  name: string

  /** Селектор элемента, который имеет данный атрибут. */
  selector: string

  /** Ограничение значения. */
  limit?: Value extends Position
    ? PosLimits
    : Limit

  step?: number
  areas?: IInputAreas
  label?: string
  desc?: string

  /** Стандартное значение. */
  default?: Value

  /**
   * Получить значение атрибута.
   * @returns Значение атрибута.
   */
  get(): Value | undefined

  /**
   * Установить значение атрибута.
   * @param newValue Новое значение.
   */
  set(newValue?: Value): void
}

/** Дескриптор атрибута с возможностью конвертации в строку. */
export interface IStringConvertAttrDescriptor<T> extends IAttrDescriptor<T> {
  /**
   * Получить строковое значение.
   * @returns Строковое значение.
   */
  getStr(): string | undefined

  /**
   * Установить строковое значение атрибута.
   * @param newValue Новое значение атрибута.
   */
  setStr(newValue?: string): void
}

/** Дескриптор строкового атрибута. */
export interface IStringAttrDescriptor<T extends string = string> extends IStringConvertAttrDescriptor<T> {
  /** Тип атрибута. */
  attrType: 'string'
}

/** Дескриптор массива строк. */
export interface IStringArrayAttrDescriptor<T extends string = string> extends IStringConvertAttrDescriptor<T[]> {
  /** Тип атрибута. */
  attrType: 'stringArray'
}

/** Дескриптор атрибута с позицией. */
export interface IPositionAttrDescriptor extends IStringConvertAttrDescriptor<Position> {
  /** Тип атрибута. */
  attrType: 'position'
}

/** Дескриптор числового атрибута. */
export interface INumberAttrDescriptor extends IStringConvertAttrDescriptor<number> {
  /** Тип атрибута. */
  attrType: 'number'
}

/** Дескриптор логического атрибута. */
export interface IBooleanAttrDescriptor extends IStringConvertAttrDescriptor<boolean> {
  /** Тип атрибута. */
  attrType: 'boolean'
}
