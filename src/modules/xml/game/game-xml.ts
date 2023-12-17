import type { File } from '../../renderer'
import { Dirs } from '../../renderer'
import type { AttrValue } from '../xml-element'
import XMLElement from '../xml-element'
import type Limit from './limit'
import type { PosLimits } from './position'
import Position from './position'

import { boolToStr, hasItems, strToBool } from '/utils/renderer'

export type FileInfo = {
  dlc?: string
  mod?: string
  isBackup?: boolean
}

export default class GameXML extends XMLElement {
  constructor(element: XMLElement, selector = '', baseElement = element) {
    super(element.toCheerio(), selector, baseElement.toCheerio())
  }

  protected files(folder: string, nameGetter: () => string | undefined) {
    const getter = async ({ dlc, isBackup, mod }: FileInfo): Promise<File[]> => {
      const names = nameGetter()?.split(',')
      if (!names || !hasItems(names)) return []
      if (names.at(-1) === '') names.pop()

      const files: File[] = []
      for (const name of names) {
        const classesDir = isBackup ? Dirs.backupInitialData.dir('[media]\\classes') : Dirs.classes
        const dlcDir = isBackup ? Dirs.backupInitialData.dir('[media]\\_dlc') : Dirs.dlc
        const trimmed = name.trim()
        const maybe = [
          ...(mod ? [Dirs.modsTemp.file(mod, `classes/${folder}/${trimmed}.xml`)] : []),
          ...(dlc ? [dlcDir.file(dlc, `classes/${folder}/${trimmed}.xml`)] : []),
          classesDir.file(`${folder}/${trimmed}.xml`)
        ]
        for (const file of maybe) {
          if (await file.exists()) files.push(file)
        }
      }

      return files
    }

    return getter
  }

  protected file(folder: string, nameGetter: () => string | undefined) {
    const getter = async ({ dlc, isBackup, mod }: FileInfo): Promise<File | undefined> => {
      const name = nameGetter()?.trim()
      if (!name) return
  
      const classesDir = isBackup ? Dirs.backupInitialData.dir('[media]\\classes') : Dirs.classes
      const dlcDir = isBackup ? Dirs.backupInitialData.dir('[media]\\_dlc') : Dirs.dlc
      const maybe = [
        ...(mod ? [Dirs.modsTemp.file(mod, `classes/${folder}/${name}.xml`)] : []),
        ...(dlc ? [dlcDir.file(dlc, `classes/${folder}/${name}.xml`)] : []),
        classesDir.file(`${folder}/${name}.xml`)
      ]
      for (const file of maybe) {
        if (await file.exists()) return file
      }
    }

    return getter
  }

  protected filesElements<T extends typeof GameXML>(Class: T, filesGetter: ReturnType<typeof this.files>) {
    const getter = async (info: FileInfo): Promise<InstanceType<T>[]> => {
      const files = await filesGetter(info)
      if (!files || !hasItems(files)) return []

      const elements: InstanceType<T>[] = []
      for (const file of files) {
        elements.push(await Class.fromFile(file) as InstanceType<T>)
      }

      return elements
    }

    return getter
  }

  protected fileElement<T extends typeof GameXML>(Class: T, fileGetter: ReturnType<typeof this.file>) {
    const getter = async (info: FileInfo): Promise<InstanceType<T> | undefined> => {
      const file = await fileGetter(info)
      if (!file) return

      return await Class.fromFile(file) as InstanceType<T>
    }

    return getter
  }

  protected procAttr(attrName: string, value?: string | number | boolean | null, limit?: Limit): AttrValue | undefined {
    switch (value) {
      case undefined: {
        return this.getAttr(attrName)
      }
      case null: {
        this.removeAttr(attrName)
        break
      }
      default: {
        this.setAttr(attrName, limit?.lim(value as number) ?? value)
      }
    }
  }
}

export function innerElement<T extends typeof GameXML>(Class: T, tagName?: string, canAdd?: boolean) {
  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.get = function(this: This) {
      const target = tagName ?? key
      let element = this.select(target)
      const innerSelector = this.selector ? `${this.selector} > ${target}` : target
      if (!element && canAdd) {
        element = this.append(`<${target} />`).select(target)
      }
      if (!element) return
      return new Class(element, innerSelector) as InstanceType<T>
    }
  }
}

export function innerElements<T extends typeof GameXML>(Class: T, selector?: string) {
  type Value = InstanceType<T>[]

  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.get = function(this: This) {
      const target = selector ?? key
      const elements = this.selectAll(target)
      if (!hasItems(elements)) return []
      return elements.map((element, index) => {
        const innerSelector = this.selector ? `${this.selector} > ${target}:nth-of-type(${index + 1})` : undefined
        return new Class(element, innerSelector) as Value[number]
      })
    }
  }
}

export function strAttr<T extends string>() {
  type Value = T | undefined

  return <This extends GameXML>(
    _target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.()

    descriptor.get = function(this: This) {
      return this.procAttr(key)?.str as Value ?? defaultVal
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, value ?? null)
    }
  }
}

export function strUtils<T extends string>() {
  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const name = key.split('$')[1]

    descriptor.get = function(this: This) {
      return {
        name, selector: this.selector,
        get: () => this[name],
        set: value => this[name] = value
      } satisfies StrUtils<T>
    }
  }
}

export function strArrAttr<T extends string>(parser?: (str: string) => T | undefined, preserve = false) {
  type Value = T[]

  return <This extends GameXML>(
    _target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.() ?? []

    function fromStr(str?: string): Value {
      if (!str) return defaultVal
      const values = str.split(',').map(val => val.trim())
      if (values.at(-1) === '') values.pop()
      if (!hasItems(values)) return defaultVal
      return (parser ? values.map(parser).filter(Boolean) : values) as Value
    }
    function toString(val: Value): string {
      return val.join(',')
    }

    descriptor.get = function(this: This) {
      return fromStr(this.procAttr(key)?.str)
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, hasItems(value) ? toString(value) : (preserve ? '' : null))
    }
  }
}

export function strArrUtils<T extends string>(parser?: (str: string) => T | undefined, preserve = false) {
  type Value = T[]

  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const name = key.split('$')[1]
    let defaultVal: Value
    
    function fromStr(str?: string): Value {
      if (!str) return defaultVal
      const values = str.split(',').map(val => val.trim())
      if (values.at(-1) === '') values.pop()
      if (!hasItems(values)) return defaultVal
      return (parser ? values.map(parser).filter(Boolean) : values) as Value
    }
    function toString(val: Value): string {
      return val.join(',')
    }

    descriptor.get = function(this: This) {
      defaultVal ??= this[name]
      const selector = this.selector
      return {
        get: () => this[name],
        set: value => this[name] = value,
        getStr: () => toString(this[name]),
        setStr: value => this[name] = value ? fromStr(value) : (preserve ? [] : undefined),
        selector, name
      } satisfies StrArrUtils<T>
    }
  }
}

export function posAttr(limit?: PosLimits) {
  type Value = Position | undefined

  return <This extends GameXML>(
    target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.()

    descriptor.get = function(this: This) {
      const res = this.procAttr(key)
      if (!res?.str) return defaultVal
      return Position.fromStr(res.str, limit)
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, value?.toString() ?? null)
    }
    
    setLimit(target, key, limit)
  }
}

export function posUtils() {
  return <This extends GameXML>(
    target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const name = key.split('$')[1]
    const limit = getLimit<PosLimits>(target, name)

    descriptor.get = function(this: This) {
      const selector = this.selector
      return {
        get: () => this[name],
        set: value => this[name] = value,
        getStr: () => this[name].toString(),
        setStr: value => this[name] = value ? Position.fromStr(value) : undefined,
        name, limit, selector
      } satisfies PosUtils
    }
  }
}

export function intAttr(limit?: Limit) {
  type Value = number | undefined

  return <This extends GameXML>(
    target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.()

    descriptor.get = function(this: This) {
      return this.procAttr(key)?.int ?? defaultVal
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, value ?? null, limit)
    }

    setLimit(target, key, limit)
  }
}

export function numUtils() {
  return <This extends GameXML>(
    target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const name = key.split('$')[1]
    const limit = getLimit(target, name)

    descriptor.get = function(this: This) {
      return {
        name, limit, selector: this.selector,
        get: () => this[name],
        set: value => this[name] = value
      } satisfies NumUtils
    }
  }
}

export function floatAttr(limit?: Limit) {
  type Value = number | undefined

  return <This extends GameXML>(
    target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.()

    descriptor.get = function(this: This) {
      return this.procAttr(key)?.float ?? defaultVal
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, value ?? null, limit)
    }

    setLimit(target, key, limit)
  }
}

export function boolAttr() {
  type Value = boolean | undefined

  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.()

    descriptor.get = function(this: This) {
      return this.procAttr(key)?.bool ?? defaultVal
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, value ?? null)
    }
  }
}

export function boolUtils() {
  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const name = key.split('$')[1]

    descriptor.get = function(this: This) {
      const selector = this.selector
      return {
        get: () => this[name],
        set: value => this[name] = value,    
        getStr: () => boolToStr(this[name]),
        setStr: value => this[name] = value ? strToBool(value) : undefined,
        selector, name
      } satisfies BoolUtils
    }
  }
}

const LIMITS_KEY = '__ATTR_LIMITS__'
type LimitsMap = Record<string, Limit | PosLimits | undefined>

function getLimit<L = Limit>(target: any, name: string): L | undefined {
  return target[LIMITS_KEY]?.[name]
}
function setLimit(target: any, name: string, limit?: Limit | PosLimits) {
  (<LimitsMap>(target[LIMITS_KEY] ??= {}))[name] = limit
}

export type Utils<T> = {
  get(): T | undefined
  set(value?: T): void
  name: string
  selector: string
}

export type UtilsWithLimit<T, L> = Utils<T> & {
  limit?: L
}

export type StrConvertUtils<T> = Utils<T> & {
  getStr(): string | undefined
  setStr(value?: string): void
}

export type StrUtils<T extends string = string> = Utils<T>
export type StrArrUtils<T extends string = string> = StrConvertUtils<T[]>

export type PosUtils = StrConvertUtils<Position> & {
  limit?: PosLimits
}

export type NumUtils = UtilsWithLimit<number, Limit>

export type BoolUtils = StrConvertUtils<boolean>