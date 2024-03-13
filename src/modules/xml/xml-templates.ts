import type { File } from '/mods/files/renderer'
import { Dirs } from '/mods/files/renderer'

import XMLElement from './xml-element'

import type { AnyNode, Cheerio } from 'cheerio'

/** Шаблоны `_templates` */
export default class XMLTemplates extends XMLElement {
  /** Название тега шаблонов */
  private static readonly tagName = '_templates'
  /** Название атрибута с включающим шаблоном */
  private static readonly includeAttr = 'Include'
  /** Название атрибута с именем шаблона */
  private static readonly attrName = '_template'

  /** Включающий шаблон */
  private readonly include: XMLTemplates | undefined

  /** Создать из элемента */
  static override async from(xml: XMLElement): Promise<XMLTemplates | undefined>
  /** Создать из строки */
  static override async from(str: string): Promise<XMLTemplates | undefined>
  /** Создать из содержимого файла */
  static override async from(file: File): Promise<XMLTemplates | undefined>
  static override async from(source: string | File | XMLElement): Promise<XMLTemplates | undefined> {
    if (this.isXMLElement(source)) {
      return this.fromXML(source)
    }

    const res = await this.from(source as File)
    if (res) return this.fromXML(res)
  }

  /** Найти `_templates` и создать объект */
  private static async fromXML(xml: XMLElement) {
    xml = xml.clone()

    const templates = xml.select(this.tagName)
    if (!templates) return

    const includeAttr = templates.getAttr(this.includeAttr)
    let include: XMLTemplates | undefined

    if (includeAttr) {
      const templatesElement = await Dirs.templates.file(`${includeAttr.str}.xml`).readFromXML()
      if (templatesElement) include = new XMLTemplates(templatesElement.toCheerio())
    }

    return new XMLTemplates(templates.toCheerio(), include)
  }

  constructor(element: Cheerio<AnyNode>, include?: XMLTemplates) {
    super(element)
    this.include = include
  }

  /** Получить значение из шаблона */
  getValue(element: XMLElement, attrName: string): string | undefined {
    const template = this.getTemplate(element)
    if (!template) return

    return this.getFromTemplate(element, template, attrName)
  }

  /** Получить значение из шаблона */
  private getFromTemplate(element: XMLElement, template: XMLElement, attrName: string): string | undefined {
    if (template.parent.tagName === element.tagName) {
      const value = template.getAttr(attrName)?.str
      if (value) return value

      const extraTemplate = this.getExtraTemplate(template)
      if (!extraTemplate) return

      return this.getFromTemplate(element, extraTemplate, attrName)
    }
    else {
      const templateElement = template.select(`${element.tagName}`)

      if (templateElement) {
        const value = templateElement.getAttr(attrName)?.str
        if (value) return value
      }

      const extraTemplate = this.getExtraTemplate(template)
      if (!extraTemplate) return

      return this.getFromTemplate(element, extraTemplate, attrName)
    }
  }

  /** Найти дополнительный шаблон */
  private getExtraTemplate(template: XMLElement): XMLElement | undefined {
    const templateAttr = template.getAttr(XMLTemplates.attrName)
    if (!templateAttr) return

    const extraTemplate = this.getTemplate(template)
    if (extraTemplate) return extraTemplate
  }

  /** Найти шаблон */
  private getTemplate(element: XMLElement): XMLElement | undefined {
    let selector: string | undefined

    for (let target = element; target.exists(); target = target.parent) {
      const templateName = target.getAttr(XMLTemplates.attrName)?.str

      if (templateName) {
        if (target === element) {
          selector = `${target.tagName} ${templateName}`
          break
        }
        selector = `${target.tagName} ${templateName} ${element.tagName}`
        break
      }
    }
    
    if (!selector) return

    const mainTemplate = this.select(selector)
    if (mainTemplate) return mainTemplate

    const includedTemplate = this.include?.getTemplate(element)
    if (includedTemplate) return includedTemplate
  }
}
