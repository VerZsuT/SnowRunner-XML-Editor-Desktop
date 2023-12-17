import type { File, FileInfo, Limit } from '../../renderer'
import XMLElement, { AttrValue } from '../xml-element'
import XMLTemplates from '../xml-templates'
import GameXML from './game-xml'

import { hasItems } from '/utils/renderer'

export default class XMLWithTemplates extends GameXML {
  readonly templates?: XMLTemplates

  static override async fromFile(file: File) {
    const element = await XMLElement.fromFile(file)
    if (!element) return
    return new XMLWithTemplates(element, await XMLTemplates.fromFile(file))
  }

  constructor(element: XMLElement, templates?: XMLTemplates, selector = '', baseElement = element) {
    super(element, selector, baseElement)
    this.templates = templates
  }

  protected filesElementsWithTemplates<
    T extends typeof XMLWithTemplates
  >(Class: T, filesGetter: ReturnType<typeof this.files>): (info: FileInfo) => Promise<InstanceType<T>[]> {
    return super.filesElements(Class as any, filesGetter)
  }

  protected fileElementWithTemplates<
    T extends typeof XMLWithTemplates
  >(Class: T, fileGetter: ReturnType<typeof this.file>): (info: FileInfo) => Promise<InstanceType<T> | undefined> {
    return super.fileElement(Class as any, fileGetter)
  }

  getAttrWT(name: string): AttrValue | undefined {
    const fromElement = this.getAttr(name)
    if (fromElement) return fromElement

    const fromTemplates = this.templates?.getValue(this, name)
    if (fromTemplates) return new AttrValue(fromTemplates)
  }

  protected procAttr(attrName: string, value?: string | number | boolean | null, limit?: Limit): AttrValue | undefined {
    switch (value) {
      case undefined: {
        return this.getAttrWT(attrName)
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

export function innerElement<T extends typeof XMLWithTemplates>(Class: T, tagName?: string, canAdd?: boolean) {
  return <This extends XMLWithTemplates>(
    _: This,
    key: string,
    descriptor: PropertyDescriptor
  ) => {
    descriptor.get = function(this: This) {
      const target = tagName ?? key
      let element = this.select(target)
      const innerSelector = this.selector ? `${this.selector} > ${target}` : target

      if (!element && canAdd) {
        element = this.appendTag(target).select(target)
      }
      if (!element) return
      return new Class(element, this.templates, innerSelector) as InstanceType<T>
    }
  }
}

export function innerElements<T extends typeof XMLWithTemplates>(Class: T, selector?: string) {
  type Value = InstanceType<T>[]

  return <This extends XMLWithTemplates>(
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
        return new Class(element, this.templates, innerSelector) as Value[number]
      })
    }
  }
}
