import type { FileInfo, IFile, Limit } from '../../renderer'
import type XMLElement from '../xml-element'
import { AttrValue } from '../xml-element'
import XMLTemplates from '../xml-templates'
import GameXML from './game-xml'

export default class XMLWithTemplates extends GameXML {
  /** Элемент шаблонов. */
  readonly templates?: XMLTemplates

  /** Создать из строки. */
  static override async from(str: string): Promise<XMLWithTemplates | undefined>
  /** Создать из содержимого файла. */
  static override async from(file: IFile): Promise<XMLWithTemplates | undefined>
  static override async from(source: string | IFile): Promise<XMLWithTemplates | undefined> {
    const element = await super.from(source as IFile)

    if (element) {
      return new XMLWithTemplates(element, await XMLTemplates.from(source as IFile))
    }
  }

  constructor(element: XMLElement, templates?: XMLTemplates, selector = '', baseElement = element) {
    super(element, selector, baseElement)
    this.templates = templates
  }

  /**
   * Получить геттер элементов из файлов.
   * @param Class Класс, который будет создаваться из файлов.
   * @param filesGetter Геттер файлов.
   */
  protected filesElementsWithTemplates<T extends XMLWithTemplates>(
    Class: { from: typeof XMLWithTemplates['from'] },
    filesGetter: ReturnType<typeof this.files>
  ): (info: FileInfo) => Promise<T[]> {
    return super.filesElements<T>(Class, filesGetter)
  }

  /**
   * Получить геттер элемента из файла.
   * @param Class Класс, который будет создаваться из файла.
   * @param fileGetter Геттер файла.
   */
  protected fileElementWithTemplates<T extends XMLWithTemplates>(
    Class: { from: typeof XMLWithTemplates['from'] },
    fileGetter: ReturnType<typeof this.file>
  ): (info: FileInfo) => Promise<T | undefined> {
    return super.fileElement(Class, fileGetter)
  }

  /**
   * Получить значение атрибута.
   * @param name Имя атрибута.
   */
  getAttrWT(name: string): AttrValue | undefined {
    const fromElement = this.getAttr(name)

    if (fromElement) {
      return fromElement
    }

    const fromTemplates = this.templates?.getValue(this, name)

    if (fromTemplates) {
      return new AttrValue(fromTemplates)
    }
  }

  override procAttr(attrName: string, value?: string | number | boolean | null, limit?: Limit): AttrValue | undefined {
    switch (value) {
      case undefined:
        return this.getAttrWT(attrName)
      default:
        super.procAttr(attrName, value, limit)
    }
  }
}

/**
 * Внутренний элемент.
 * @param ClassOrFactory Класс, который будет создан для элемента.
 * @param tagName Название тега необходимого элемента.
 * @param canAdd Добавить тег при его отсутствии.
 */
export function innerElement<T extends typeof XMLWithTemplates>(
  ClassOrFactory: T | (() => T),
  tagName?: string,
  canAdd?: boolean
) {
  type Value = InstanceType<T> | undefined

  return function<This extends XMLWithTemplates>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    const name = context.name.toString()
    
    context.addInitializer(function(this: This) {
      Object.defineProperty(this, name, {
        get(this: This) {
          const target = tagName ?? name
          const innerSelector = this.selector
            ? `${this.selector} > ${target}`
            : target
          let element = this.select(target)
    
          if (!element && canAdd) {
            element = this.appendTag(target).select(target)
          }
    
          if (!element) {
            return
          }

          const Class: T = typeof ClassOrFactory === 'function' && !ClassOrFactory.name
            // @ts-expect-error
            ? ClassOrFactory()
            : ClassOrFactory

          return new Class(element, this.templates, innerSelector) as Value
        },
        enumerable: true,
        configurable: true
      })
    })
  }
}

/**
 * Внутренние элементы.
 * @param ClassOrFactory Класс, который будет создан для каждого элемента.
 * @param selector Селектор необходимых элементов.
 */
export function innerElements<T extends typeof XMLWithTemplates>(ClassOrFactory: T | (() => T), selector?: string) {
  type Value = InstanceType<T>[]

  return function<This extends XMLWithTemplates>(
    _target: unknown,
    context: ClassFieldDecoratorContext<This, Value>
  ) {
    const name = context.name.toString()
    
    context.addInitializer(function(this: This) {
      Object.defineProperty(this, name, {
        get(this: This) {
          const target = selector ?? name
          const elements = this.selectAll(target)
          const Class: T = typeof ClassOrFactory === 'function' && !ClassOrFactory.name
              // @ts-expect-error
              ? ClassOrFactory()
              : ClassOrFactory

          return elements.map((element, index) => new Class(
            element,
            this.templates,
            this.selector
              ? `${this.selector} > ${target}:nth-of-type(${index + 1})`
              : undefined
          )) as Value
        },
        enumerable: true,
        configurable: true
      })
    })
  }
}
