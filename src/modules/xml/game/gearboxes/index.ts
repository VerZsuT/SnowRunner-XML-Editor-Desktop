import type { IFile } from '@modules/files/renderer'
import { XMLElement } from '../../xml-element'
import { XMLTemplates } from '../../xml-templates'
import type { XmlElements } from '../attributes'
import { XMLWithTemplates, innerElements } from '../xml-with-templates'
import { Gearbox } from './gearbox'

export * from './gearbox'

/** Рутовый тег файла класса коробки передач. */
export class Gearboxes extends XMLWithTemplates {
  static override async from(str: string): Promise<Gearboxes | undefined>
  static override async from(file: IFile): Promise<Gearboxes | undefined>
  static override async from(source: string | IFile): Promise<Gearboxes | undefined> {
    const rootSelector = 'GearboxVariants'
    const root = await XMLElement.from(source as IFile)
    const element = root?.select(rootSelector)

    if (root && element) {
      return new this(
        element,
        await XMLTemplates.from(root),
        rootSelector,
        root
      )
    }
  }

  /** Коробки передач. */
  @innerElements(Gearbox, 'Gearbox')
  readonly Gearboxes!: XmlElements<Gearbox>
}
