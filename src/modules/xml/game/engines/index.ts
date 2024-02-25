import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElements } from '../xml-with-templates'
import Engine from './engine'

export { default as Engine } from './engine'

/** Рутовый тег файла класса двигателей */
export default class Engines extends XMLWithTemplates {
  static override async fromFile(file: File): Promise<Engines | undefined> {
    const rootSelector = 'EngineVariants'
    const root = await XMLElement.fromFile(file)
    const element = root?.select(rootSelector)
    if (!root || !element) return

    return new this(
      element,
      await XMLTemplates.fromXML(root),
      rootSelector,
      root
    )
  }

  @innerElements(Engine, 'Engine')
  get Engines(): Engine[] { return [] }
}
