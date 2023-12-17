import type { File } from '/mods/files/renderer'
import { Dirs } from '/mods/files/renderer'

import XMLElement from './xml-element'

import type { AnyNode, Cheerio } from 'cheerio'

export default class XMLTemplates extends XMLElement {
  private static readonly TAG_NAME = '_templates'
  private static readonly INCLUDE_ATTR = 'Include'
  private static readonly ATTR_NAME = '_template'

  private readonly include: XMLTemplates | undefined

  static override async fromFile(file: File): Promise<XMLTemplates | undefined> {
    const res = await super.fromFile(file)
    if (!res) return
    return await this.fromXML(res)
  }

  /** Найти `_templates` и создать объект */
  static async fromXML(xml: XMLElement) {
    xml = xml.clone()
    const templates = xml.select(this.TAG_NAME)
    if (!templates) return

    let include: XMLTemplates | undefined
    const includeAttr = templates.getAttr(this.INCLUDE_ATTR)
    if (includeAttr) {
      const templatesElement = await Dirs.templates.file(`${includeAttr.str}.xml`).readFromXML()
      if (templatesElement) include = new XMLTemplates(templatesElement.toCheerio())
    }
    return new XMLTemplates(templates.toCheerio(), include)
  }

  private constructor(element: Cheerio<AnyNode>, include?: XMLTemplates) {
    super(element)
    this.include = include
  }

  getValue(element: XMLElement, attrName: string): string | undefined {
    const template = this.getTemplate(element)
    if (!template) return
    return this.getFromTemplate(element, template, attrName)
  }

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

  private getExtraTemplate(template: XMLElement): XMLElement | undefined {
    const templateAttr = template.getAttr(XMLTemplates.ATTR_NAME)
    if (!templateAttr) return

    const extraTemplate = this.getTemplate(template)
    if (extraTemplate) return extraTemplate
  }

  private getTemplate(element: XMLElement): XMLElement | undefined {
    let selector: string | undefined
    for (let target = element; target.exists(); target = target.parent) {
      const templateName = target.getAttr(XMLTemplates.ATTR_NAME)?.str
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
