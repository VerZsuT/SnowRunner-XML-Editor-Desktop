import type { AnyNode, Cheerio, CheerioAPI } from 'cheerio'
import { load } from 'cheerio'

import system from '../services/system.service'

import type { IXMLElement } from '#g/types'
import { hasItems, isString } from '#g/utils'

enum SourceType {
  path,
  xmlString
}

export class XMLDOM implements IXMLElement {
  private DOM: CheerioAPI

  private constructor(source: SourceType, content: string) {
    switch (source) {
      case SourceType.path:
        this.DOM = load(system.readFileSync(content), { xmlMode: true })
        break
      case SourceType.xmlString:
        this.DOM = load(content, { xmlMode: true })
        break
    }
  }

  get exists(): boolean {
    return hasItems(this.DOM.root())
  }

  parent(): XMLElement {
    return new XMLElement(this.DOM('no_exists'))
  }

  getAttr(name: string): string | undefined {
    return this.DOM.root().attr(name)
  }

  setAttr(name: string, value: string): XMLDOM {
    this.DOM.root().attr(name, value)
    return this
  }

  removeAttr(name: string): XMLDOM {
    this.DOM.root().removeAttr(name)
    return this
  }

  hasAttrs(): boolean {
    return Boolean(this.DOM.root().attr())
  }

  remove(): void {
    this.DOM.root().remove()
  }

  appendTag(tagName: string): XMLDOM {
    this.DOM.root().append(`<${tagName}></${tagName}>`)
    return this
  }

  append(xmlString: string): XMLDOM {
    this.DOM.root().append(xmlString)
    return this
  }

  after(child: string | XMLElement): XMLDOM {
    new XMLElement(this.DOM.root()).after(child)
    return this
  }

  clone(): XMLElement {
    return new XMLElement(this.DOM.root().clone())
  }

  static fromPath(filePath: string): XMLDOM {
    return new XMLDOM(SourceType.path, filePath)
  }

  static fromString(xmlString: string): XMLDOM {
    return new XMLDOM(SourceType.xmlString, xmlString)
  }

  has(selector: string): boolean {
    return hasItems(this.DOM(selector))
  }

  select(selector: string): XMLElement {
    return new XMLElement(this.DOM(selector).eq(0))
  }

  /** Возвращает элемент по CheerioNode */
  private selectByNode(node: AnyNode): XMLElement {
    return new XMLElement(this.DOM(node).eq(0))
  }

  selectAll(selector: string): XMLElement[] {
    const result: XMLElement[] = []
    this.DOM(selector).each((_, el) => void result.push(this.selectByNode(el)))
    return result
  }

  toHTML(): string {
    return this.DOM.html()
  }
}

export class XMLElement implements IXMLElement {
  get exists(): boolean {
    return hasItems(this.element)
  }

  constructor(
    private element: Cheerio<AnyNode>
  ) { }

  parent(): IXMLElement {
    return new XMLElement(this.element.parent())
  }

  getAttr(name: string): string | undefined {
    return this.element.attr(name)
  }

  setAttr(name: string, value?: string): XMLElement {
    this.element.attr(name, value)
    return this
  }

  removeAttr(name: string): XMLElement {
    this.element.removeAttr(name)
    return this
  }

  remove(): void {
    this.element.remove()
  }

  hasAttrs(): boolean {
    return Boolean(this.element.attr())
  }

  appendTag(tagName: string): XMLElement {
    this.element.append(`<${tagName}></${tagName}>`)
    return this
  }

  append(xmlString: string): XMLElement {
    this.element.append(xmlString)
    return this
  }

  after(child: string | XMLElement): XMLElement {
    if (isString(child)) {
      this.element.after(child)
    }
    else {
      this.element.after(child.element)
    }
    return this
  }

  select(selector: string): XMLElement {
    return new XMLElement(this.element.find(selector))
  }

  selectAll(selector: string): XMLElement[] {
    const elements: XMLElement[] = []
    this.element.find(selector).each((_, el) => void elements.push(new XMLElement(this.element.find(el).eq(0))))
    return elements
  }

  has(selector: string): boolean {
    return hasItems(this.element.find(selector))
  }

  clone(): IXMLElement {
    return new XMLElement(this.element.clone())
  }

  toHTML(): string | null {
    return this.element.html()
  }
}
