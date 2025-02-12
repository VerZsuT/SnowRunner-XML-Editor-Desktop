import type { Cheerio } from 'cheerio'
import { load } from 'cheerio'

import { File } from '/mods/files/renderer'
import { hasItems, isString } from '/utils/checks/renderer'

import xmlFormat from 'xml-formatter'

/** Объект DOM элемента */
export default class XMLElement {
  /** Является ли аргумент `XMLElement` */
  static isXMLElement(other: any): other is XMLElement {
    return other instanceof XMLElement
  }

  /** Создать из строки */
  static async from(str: string): Promise<XMLElement | undefined>
  /** Создать из содержимого файла */
  static async from(file: File): Promise<XMLElement | undefined>
  static async from(source: File | string): Promise<XMLElement | undefined> {
    const data = File.isFile(source) ? (await source.read()) : source
    const xml = load(data || '', { xml: true })

    if (!data || !xml.xml()) return
    return new this(xml.root())
  }

  constructor(
    private readonly element: Cheerio<any>,
    public readonly selector = '',
    private readonly baseElement: Cheerio<any> = element
  ) {}

  /** Имя тега */
  get tagName(): string {
    return this.element.get(0)?.['tagName']
  }

  /** Родительский элемент */
  get parent() {
    return new XMLElement(this.element.parent())
  }


  /** Строковое представление элемента */
  get xml() {
    let attrs: string[] | undefined

    if (this.hasAttrs()) {
      attrs = []
      for (const [name, value] of Object.entries(this.element.attr()!)) {
        attrs.push(`${name}="${value}"`)
      }
    }
    if (this.tagName) {  
      const xml = this.innerXML
        ? `<${this.tagName}${attrs && hasItems(attrs) ? ` ${attrs.join(' ')}` : ''}>\n\t${this.innerXML}\n</${this.tagName}>`
        : `<${this.tagName}${attrs && hasItems(attrs) ? ` ${attrs.join(' ')}` : ''} />`

      try {
        return xmlFormat(xml)
      }
      catch {
        return xml
      }
    }

    return this.baseXML
  }

  
  /** Строковое представление элемента вместе с базовым тегом */
  get baseXML() {
    function format(str: string) {
      return xmlFormat(str, {
        whiteSpaceAtEndOfSelfclosingTag: true,
        forceSelfClosingEmptyTag: true,
        indentation: '  '
      })
    }

    try {
      const cloned = this.baseElement.clone()
      const templates = cloned.find('_templates').eq(0)
      let templatesText = ''

      if (templates.length === 1) {
        const Include = templates.attr('Include')
        const templatesXML = `<_templates${Include ? ` Include="${Include}"` : ''}>${templates.html()!}</_templates>`
        templatesText = `${format(templatesXML)}\r\n`
        templates.remove()
      }
      
      const mainText = format(cloned.html()!.replace('&#xfeff;', ''))
      return templatesText + mainText
    }
    catch {
      return this.baseElement.html()!
    }
  }

  /** Строковое представление содержимого элемента */
  get innerXML() {
    return this.element.html() ?? ''
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

  /** Приведение к `Cheerio` элементу */
  toCheerio() {
    return this.element
  }
}

/** Значение атрибута */
export class AttrValue {
  /** Строковое значение */
  get str() { return this.value }
  /** Целочисленное значение */
  get int() { return Number.parseInt(this.value) }
  /** Значение с плавающей точкой */
  get float() { return Number.parseFloat(this.value) }
  /** Логическое значение */
  get bool() { return this.value === 'true' }

  constructor(
    private value: string
  ) {}
}
