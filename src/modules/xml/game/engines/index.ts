import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElements } from '../xml-with-templates'
import Engine from './engine'

export { default as Engine } from './engine'

/** Рутовый тег файла класса двигателей */
export default class Engines extends XMLWithTemplates {
  static override async from(str: string): Promise<Engines | undefined>
  static override async from(file: File): Promise<Engines | undefined>
  static override async from(source: string | File): Promise<Engines | undefined> {
    const rootSelector = 'EngineVariants'
    const root = await XMLElement.from(source as File)
    const element = root?.select(rootSelector)

    if (root && element) return new this(
      element,
      await XMLTemplates.from(root),
      rootSelector,
      root
    )
  }

  /** Двигатели */
  @innerElements(Engine, 'Engine')
  get Engines(): Engine[] { return [] }
}
