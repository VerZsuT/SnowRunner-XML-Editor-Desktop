import type GameXML from './game-xml'
import type Limit from './limit'
import type { PosLimits } from './position'
import Position from './position'
import { arrayToString, boolToString, hasItems, numberToString, stringToArray, stringToBoolean, stringToNumber } from '/utils/renderer'

const LIMITS_PROPERTY = Symbol('limits property')
type LimitsProperty = {
  [name: string]: Limit | PosLimits
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

        return Position.from(str, this[LIMITS_PROPERTY]?.[name])
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
        this.procAttr(name, value ?? null, this[LIMITS_PROPERTY]?.[name])
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
        this.procAttr(name, value ?? null, this[LIMITS_PROPERTY]?.[name])
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

/**
 * Лимитировать значение.
 * @param limit Лимит значения.
 */
export function limit(limit: Limit | PosLimits) {
  return function<This, Value>(
    _target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = context.name

    return {
      init(value) {
        (this[LIMITS_PROPERTY] ??= {} satisfies LimitsProperty)[name] = limit

        return value
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
>(name: string, instance: This, defaultValue?: Value): IStringAttrDescriptor<Value> {
  return {
    attrType: 'string',
    ...createBaseStringConvertAttrDescriptor(
      name,
      instance,
      defaultValue,
      str => str as Value,
      str => str ?? ''
    )
  }
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
): IStringArrayAttrDescriptor<Value> {
  const baseDescriptor = createBaseAttrDescriptor<Value[]>(name, instance, defaultValue)

  return {
    ...baseDescriptor,
    attrType: 'stringArray',
    getStr: () => arrayToString(baseDescriptor.get()),
    setStr: value => baseDescriptor.set(
      value
        ? stringToArray(value, parser)
        : preserve
            ? []
            : undefined
    )
  }
}

/**
 * Создать дескриптор атрибута с позицией.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Дескриптор атрибута с позицией.
 */
function createPositionAttrDescriptor<
  This extends GameXML
>(name: string, instance: This, defaultValue?: Position): IPositionAttrDescriptor {
  return {
    attrType: 'position',
    ...createBaseStringConvertAttrDescriptor(
      name,
      instance,
      defaultValue,
      str => Position.from(str),
      pos => pos?.toString() ?? ''
    )
  }
}

/**
 * Создать дескриптор числового атрибута.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Дескриптор числового атрибута.
 */
function createNumberAttrDescriptor<
  This extends GameXML
>(name: string, instance: This, defaultValue?: number): INumberAttrDescriptor {
  return {
    attrType: 'number',
    ...createBaseStringConvertAttrDescriptor(name, instance, defaultValue, stringToNumber, numberToString)
  }
}

/**
 * Создать дескриптор логического атрибута.
 * @param name Имя атрибута.
 * @param instance Экземпляр элемента.
 * @returns Дескриптор логического атрибута.
 */
function createBooleanAttrDescriptor<
  Instance extends GameXML
>(name: string, instance: Instance, defaultValue?: boolean): IBooleanAttrDescriptor {
  return {
    attrType: 'boolean',
    ...createBaseStringConvertAttrDescriptor(name, instance, defaultValue, stringToBoolean, boolToString)
  }
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
): IStringConvertAttrDescriptor<Value> {
  const baseDescriptor = createBaseAttrDescriptor<Value>(name, instance, defaultValue)

  return {
    ...baseDescriptor,
    getStr: () => toString(baseDescriptor.get()),
    setStr: value => baseDescriptor.set(
      value
        ? fromString(value)
        : undefined
    )
  }
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
    get limit() { return instance[LIMITS_PROPERTY]?.[name] },
    get: () => instance[name],
    set: value => instance[name] = value
  }
}

/** Дескриптор атрибута. */
export interface IAttrDescriptor<Value = unknown> {
  /** Имя атрибута. */
  name: string

  /** Селектор элемента, который имеет данный атрибут. */
  selector: string

  /** Ограничение значения. */
  limit?: Value extends Position ? PosLimits : Limit

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
