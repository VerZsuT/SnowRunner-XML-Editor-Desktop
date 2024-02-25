import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElements } from '../xml-with-templates'
import Gearbox from './gearbox'

export * from './gearbox'
export { default as Gearbox } from './gearbox'

/** Рутовый тег файла класса коробки передач */
export default class Gearboxes extends XMLWithTemplates {
  static override async fromFile(file: File): Promise<Gearboxes | undefined> {
    const rootSelector = 'GearboxVariants'
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

  /** Коробки передач */
  @innerElements(Gearbox, 'Gearbox')
  get Gearboxes(): Gearbox[] { return [] }
}
