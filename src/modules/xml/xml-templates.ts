import type { Cheerio } from 'cheerio'
import XMLElement from './xml-element'
import type { File } from '/mods/files/renderer'
import { Dirs } from '/mods/files/renderer'

/** Шаблоны `_templates`. */
export default class XMLTemplates extends XMLElement {
  /** Название тега шаблонов. */
  private static readonly tagName = '_templates'

  /** Название атрибута с включающим шаблоном. */
  private static readonly includeAttr = 'Include'

  /** Название атрибута с именем шаблона. */
  private static readonly attrName = '_template'

  /** Включающий шаблон. */
  private readonly include: XMLTemplates | undefined

  /** Создать из элемента. */
  static override async from(xml: XMLElement): Promise<XMLTemplates | undefined>
  /** Создать из строки. */
  static override async from(str: string): Promise<XMLTemplates | undefined>
  /** Создать из содержимого файла. */
  static override async from(file: File): Promise<XMLTemplates | undefined>
  static override async from(source: string | File | XMLElement): Promise<XMLTemplates | undefined> {
    if (this.isXMLElement(source)) {
      return this.fromXML(source)
    }

    const res = await this.from(source as File)

    return res
      ? this.fromXML(res)
      : undefined
  }

  /** Найти `_templates` и создать объект. */
  private static async fromXML(xml: XMLElement) {
    const templates = xml.clone().select(this.tagName)

    if (!templates) {
      return
    }

    const includeAttr = templates.getAttr(this.includeAttr)
    let include: XMLTemplates | undefined

    if (includeAttr) {
      const templatesElement = await Dirs.templates.file(`${includeAttr.str}.xml`).readFromXML()

      if (templatesElement) {
        include = new XMLTemplates(templatesElement.toCheerio())
      }
    }

    return new XMLTemplates(templates.toCheerio(), include)
  }

  constructor(element: Cheerio<any>, include?: XMLTemplates) {
    super(element)
    this.include = include
  }

  /** Получить значение из шаблона. */
  getValue(element: XMLElement, attrName: string): string | undefined {
    const template = this.getTemplate(element)

    return template
      ? this.getFromTemplate(element, template, attrName)
      : undefined
  }

  /** Получить значение из шаблона */
  private getFromTemplate(element: XMLElement, template: XMLElement, attrName: string): string | undefined {
    if (template.parent.tagName === element.tagName) {
      const value = template.getAttr(attrName)?.str

      if (value !== undefined) {
        return value
      }

      const extraTemplate = this.getExtraTemplate(template)

      return extraTemplate
        ? this.getFromTemplate(element, extraTemplate, attrName)
        : undefined
    }

    const templateElement = template.select(`${element.tagName}`)

    if (templateElement) {
      const value = templateElement.getAttr(attrName)?.str

      if (value) {
        return value
      }
    }

    const extraTemplate = this.getExtraTemplate(template)

    return extraTemplate
      ? this.getFromTemplate(element, extraTemplate, attrName)
      : undefined
  }

  /** Найти дополнительный шаблон. */
  private getExtraTemplate(template: XMLElement): XMLElement | undefined {
    return template.getAttr(XMLTemplates.attrName)
      ? this.getTemplate(template)
      : undefined
  }

  /** Найти шаблон. */
  private getTemplate(element: XMLElement): XMLElement | undefined {
    let selector: string | undefined

    for (let target = element; target.exists(); target = target.parent) {
      const templateName = target.getAttr(XMLTemplates.attrName)?.str

      if (templateName) {
        selector = target === element
          ? `${target.tagName} ${templateName}`
          : `${target.tagName} ${templateName} ${element.tagName}`

          break
      }
    }
    
    return selector
      ? this.select(selector) ?? this.include?.getTemplate(element)
      : undefined
  }
}
