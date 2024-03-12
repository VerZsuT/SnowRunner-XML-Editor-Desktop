import type { File } from '/mods/files/renderer'
import { Dirs } from '/mods/files/renderer'

import type { AttrValue } from '../xml-element'
import XMLElement from '../xml-element'
import type Limit from './limit'
import type { PosLimits } from './position'
import Position from './position'

import DLCs from '/mods/dlcs/renderer'
import { boolToStr, hasItems, lastItem, strToBool } from '/utils/renderer'

/** Информация о файле */
export type FileInfo = {
  /** Название DLC, к которому относится файл */
  dlc?: string
  /** Название мода, к котрому относится файл */
  mod?: string
  /** Относится ли файл к бэкапу перед распаковкой */
  isBackup?: boolean
}

/** XML элемент из файлов игры */
export default class GameXML extends XMLElement {
  constructor(element: XMLElement, selector = '', baseElement = element) {
    super(element.toCheerio(), selector, baseElement.toCheerio())
  }

  /**
   * Получить геттер файлов
   * @param folder - название папки в `classes`
   * @param namesGetter - геттер имени файлов
   */
  protected files(folder: string, namesGetter: () => string | undefined) {
    return async (info: FileInfo): Promise<File[]> => {
      const names = namesGetter()?.split(',') ?? []
      if (lastItem(names) === '') names.pop()

      return (await Promise.all(
        names.map(async name => this.file(folder, () => name)(info))
      )).filter(Boolean) as File[]
    }
  }

  /**
   * Получить геттер файла
   * @param folder - название папки в `classes`
   * @param nameGetter - геттер имени файла
   */
  protected file(folder: string, nameGetter: () => string | undefined) {
    return async (info: FileInfo): Promise<File | undefined> => {
      const name = nameGetter()?.trim()
      if (name) return this.getFile(folder, name, info)
    }
  }

  /**
   * Получить геттер элементов из файлов
   * @param Class - класс, который будет создаваться из файлов
   * @param filesGetter - геттер файлов
   */
  protected filesElements<T extends GameXML>(
    Class: { from: typeof GameXML['from'] },
    filesGetter: ReturnType<typeof this.files>
  ) {
    return async (info: FileInfo): Promise<T[]> => {
      const files = await filesGetter(info)

      return (await Promise.all(
        files.map(async file => this.fileElement(Class, async () => file)(info))
      )).filter(Boolean) as T[]
    }
  }

  /**
   * Получить геттер элемента из файла
   * @param Class - класс, который будет создаваться из файла
   * @param fileGetter - геттер файла
   */
  protected fileElement<T extends GameXML>(
    Class: { from: typeof GameXML['from'] },
    fileGetter: ReturnType<typeof this.file>
  ) {
    return async (info: FileInfo): Promise<T | undefined> => {
      const file = await fileGetter(info)
      if (file) return await Class.from(file) as T
    }
  }

  /**
   * Запрос к атрибуту
   * 
   * Если `value=null`, то удаляет атрибут  
   * Если `value=undefined`, то возвращает значение атрибута
   * @param attrName - имя атрибута
   * @param value - устанавливаемое значение
   * @param limit - лимит числового значения
   */
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
        if (limit) value = limit.lim(Number.parseFloat(String(value)))
        this.setAttr(attrName, value)
        break
      }
    }
  }

  /**
   * Получить файл
   * @param folder - папка в `classes` 
   * @param name - имя файла
   * @param info - информация о файле
   */
  private async getFile(folder: string, name: string, info: FileInfo): Promise<File | undefined> {
    const { isBackup, mod } = info

    const classesDir = isBackup ? Dirs.backupInitialData.dir('[media]\\classes') : Dirs.classes
    const dlcDir = isBackup ? Dirs.backupInitialData.dir('[media]\\_dlc') : Dirs.dlc
    const modFile = mod ? Dirs.modsTemp.file(mod, `classes/${folder}/${name}.xml`) : undefined

    const maybe = [
      ...modFile ? [modFile] : [],
      classesDir.file(`${folder}/${name}.xml`)
    ]

    for (const dlc of DLCs.get()) {
      if (!await dlcDir.dir(dlc.name).exists()) continue
      maybe.push(dlcDir.file(dlc.name, `classes/${folder}/${name}.xml`))
    }

    for (const file of maybe) {
      if (await file.exists()) return file
    }
  }
}

/**
 * Внутренний элемент
 * @param Class - класс, который будет создан для элемента
 * @param tagName - название тега необходимого элемента
 * @param canAdd - добавить тег при его отсутствии
 */
export function innerElement<T extends typeof GameXML>(Class: T, tagName?: string, canAdd?: boolean) {
  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.get = function(this: This) {
      const target = tagName ?? key
      const innerSelector = this.selector ? `${this.selector} > ${target}` : target
      let element = this.select(target)

      if (!element && canAdd) {
        element = this.append(`<${target} />`).select(target)
      }

      if (element) return new Class(element, innerSelector) as InstanceType<T>
    }
  }
}

/**
 * Внутренние элементы
 * @param Class - класс, который будет создан для каждого элемента
 * @param selector - селектор необходимых элементов
 */
export function innerElements<T extends typeof GameXML>(Class: T, selector?: string) {
  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.get = function(this: This) {
      const target = selector ?? key
      const elements = this.selectAll(target)

      return elements.map((element, index) => {
        const innerSelector = this.selector ? `${this.selector} > ${target}:nth-of-type(${index + 1})` : undefined
        return new Class(element, innerSelector)
      })
    }
  }
}

/** Строковый атрибут */
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

/** Утилиты для строкового атрибута */
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

/**
 * Атрибут с массивом строк  
 * Пример - `First, Second, Third`
 * @param parser - функция-преобразователь
 * @param preserve - не удалять атрибут при пустом значении (`false`)
 */
export function strArrAttr<T extends string>(
  parser = (str: string) => str as T | undefined,
  preserve = false
) {
  type Value = T[]

  return <This extends GameXML>(
    _target: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.() ?? []

    descriptor.get = function(this: This) {
      return strToArr(this.procAttr(key)?.str, parser) ?? defaultVal
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, hasItems(value) ? arrToStr(value) : (preserve ? '' : null))
    }
  }
}

/**
 * Утилиты для атрибут с массивом строк  
 * Пример - `First, Second, Third`
 * @param parser - функция-преобразователь
 * @param preserve - не удалять атрибут при пустом значении (`false`)
 */
export function strArrUtils<T extends string>(
  parser = (str: string) => str as T | undefined,
  preserve = false
) {
  type Value = T[]

  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const name = key.split('$')[1]
    let defaultVal: Value

    descriptor.get = function(this: This) {
      const selector = this.selector
      defaultVal ??= this[name]
      
      return {
        get: () => this[name],
        set: value => this[name] = value,
        getStr: () => arrToStr(this[name]),
        setStr: value => this[name] = value ? strToArr(value, parser) : (preserve ? [] : undefined),
        selector, name
      } satisfies StrArrUtils<T>
    }
  }
}

/**
 * Преобразовать строку в массив строк. Разделитель - `,`
 * @param str - строка для преобразования
 * @param parser - функция-преобразователь
 */
function strToArr<T extends string>(
  str?: string,
  parser = (str: string) => str as T | undefined
): T[] | undefined {
  const values = str?.split(',').map(val => val.trim()) ?? []

  if (lastItem(values) === '') values.pop()
  if (!hasItems(values)) return

  return values.map(parser).filter(Boolean) as T[]
}

/**
 * Преобразовать массив в строку, разделив запятой
 * @param arr - массив для преобразования
 */
function arrToStr<T extends string>(arr: T[]): string {
  return arr.join(',')
}

/**
 * Атрибут-позиция
 * @param limit - лимит позиции
 */
export function posAttr(limit?: PosLimits) {
  type Value = Position | undefined

  return <This extends GameXML>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    const defaultVal: Value = descriptor.get?.()

    descriptor.get = function(this: This) {
      const str = this.procAttr(key)?.str
      if (!str) return defaultVal

      return Position.from(str, limit)
    }
    descriptor.set = function(this: This, value: Value) {
      this.procAttr(key, value?.toString() ?? null)
    }
  }
}

/** Утилиты для атрибута-позиции */
export function posUtils() {
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
        getStr: () => this[name]?.toString() ?? '',
        setStr: value => this[name] = value ? Position.from(value) : undefined,
        name, selector
      } satisfies PosUtils
    }
  }
}

/**
 * Целочисленный атрибут
 * @param limit - лимит значения
 */
export function intAttr(limit?: Limit) {
  type Value = number | undefined

  return <This extends GameXML>(
    _: This,
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
  }
}

/** Утилиты числового атрибута */
export function numUtils() {
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
      } satisfies NumUtils
    }
  }
}

/**
 * Атрибут с плавающей точкой
 * @param limit - лимит значения
 */
export function floatAttr(limit?: Limit) {
  type Value = number | undefined

  return <This extends GameXML>(
    _: This,
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
  }
}

/** Логический атрибут */
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

/** Утилиты логического атрибута */
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

/** Утилиты атрибута */
export type Utils<T> = {
  /** Получить значение атрибута */
  get(): T | undefined
  /** Установить значение атрибута */
  set(value?: T): void
  /** Имя атрибута */
  name: string
  /** Селектор элемента, который имеет данный атрибут */
  selector: string
}

/** Утилиты атрибута с возможностью конвертации в строку */
export type StrConvertUtils<T> = Utils<T> & {
  /** Получить строковое значение */
  getStr(): string | undefined
  /** Установить значение из строки */
  setStr(value?: string): void
}

/** Строковые утилиты */
export type StrUtils<T extends string = string> = Utils<T>
/** Утилиты массива строк */
export type StrArrUtils<T extends string = string> = StrConvertUtils<T[]>

/** Утилиты позиции */
export type PosUtils = StrConvertUtils<Position> & {
  /** Лимит позиции */
  limit?: PosLimits
}

/** Утилиты числового значения */
export type NumUtils = Utils<number>

/** Утилиты логического значения */
export type BoolUtils = StrConvertUtils<boolean>
