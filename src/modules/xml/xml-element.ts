import type { AnyNode, Cheerio } from 'cheerio'
import { load } from 'cheerio'

import type { File } from '/mods/files/renderer'
import { hasItems, isString } from '/utils/checks/renderer'

/** Объект DOM элемента */
export default class XMLElement {
  /** Создать из содержимого файла */
  static async fromFile(file: File): Promise<XMLElement | undefined> {
    const data = await file.read()
    const xml = load(data || '', { xmlMode: true })
    if (!data || !xml.xml()) return
    return new this(xml.root())
  }

  /** Создать из содержимого строки */
  static fromString(str: string): XMLElement | undefined {
    const xml = load(str || '', { xmlMode: true })
    if (!str || !xml.xml()) return
    return new this(xml.root())
  }

  protected constructor(
    private element: Cheerio<AnyNode>,
    public selector = '',
    private baseElement: Cheerio<AnyNode> = element
  ) {}

  get tagName(): string {
    return this.element.get(0)?.['tagName']
  }

  /** Возвращает родительский элемент */
  get parent() {
    return new XMLElement(this.element.parent())
  }

  /** Возвращает строковое представление элемента */
  get xml() {
    const string = this.element.html() || ''
    let attrs: string[] | undefined
    if (this.hasAttrs()) {
      attrs = []
      for (const [name, value] of Object.entries(this.element.attr()!)) {
        attrs.push(`${name}="${value}"`)
      }
    }
    if (this.tagName) {
      return `<${this.tagName}${attrs && hasItems(attrs) ? ` ${attrs.join(' ')}` : ''}>\n${string}\n</${this.tagName}>`
    }
    return load(string, { xmlMode: true }).xml()
  }
  
  get baseXML() {
    return load(this.baseElement.html() || '', { xmlMode: true }).xml()
  }

  /** Существует ли элемент */
  exists() {
    return hasItems(this.element)
  }

  /** Получает значение атрибута по имени */
  getAttr(name: string): AttrValue | undefined {
    const val = this.element.attr(name)
    return val ? new AttrValue(val) : undefined
  }

  /** Устанавливает значение атрибут */
  setAttr(name: string, value?: string | number | boolean) {
    this.element.attr(name, String(value))
    return this
  }

  /** Удаляет атрибут */
  removeAttr(name: string) {
    this.element.removeAttr(name)
    return this
  }

  /** Удаляет элемент */
  remove() {
    this.element.remove()
  }

  /** Имеются ли атрибуты у элемента */
  hasAttrs() {
    return Boolean(this.element.attr())
  }

  /** Добавляет тег в элемент */
  appendTag(tagName: string) {
    this.element.append(`<${tagName}></${tagName}>`)
    return this
  }

  /** Добавляет содержимое строки в элемент */
  append(str: string) {
    this.element.append(str)
    return this
  }

  /**
   * Добавляет все элементы по селектору
   *
   * _Селектор обязан быть без обобщений._
   * _Каждый элемент должен быть разделён символом '>'_
   */
  appendBySelector(selector: string) {
    if (!this.has(selector)) {
      const array = selector.split('>').map(value => value.trim())
      const name = array[0].includes('[') ? array[0].split('[')[0] : array[0]
      const rootSelector = array.join('>')

      let element = rootSelector ? this.select(rootSelector) : this
      if (!element) {
        this.appendBySelector(rootSelector)
        element = this.select(rootSelector)!
      }
      element.appendTag(name)
    }

    return this
  }

  /** Добавляет новый элемент после данного элемента */
  after(child: string | XMLElement) {
    if (isString(child)) {
      this.element.after(child)
    }
    else {
      this.element.after(child.element)
    }
    return this
  }

  /** Возвращает элемент по селектору */
  select(selector: string): XMLElement | undefined {
    const element = new XMLElement(this.element.find(selector).eq(0))
    if (!element.exists()) return
    return element
  }

  /** Возвращает элементы по селектору */
  selectAll(selector: string) {
    const elements: XMLElement[] = []
    this.element.find(selector).each((_, element) => { elements.push(new XMLElement(this.element.find(element).eq(0))) })
    return elements
  }

  /** Имеется ли элемент с селектором */
  has(selector: string) {
    return hasItems(this.element.find(selector))
  }

  /** Возвращает копию элемента */
  clone() {
    return new XMLElement(this.element.clone())
  }

  toCheerio() {
    return this.element
  }
}

export class AttrValue {
  get str() { return this.value }
  get int() { return Number.parseInt(this.value) }
  get float() { return Number.parseFloat(this.value) }
  get bool() { return this.value === 'true' }

  constructor(
    private value: string
  ) {}
}
