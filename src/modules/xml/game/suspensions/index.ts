import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElements } from '../xml-with-templates'
import SuspensionSet from './suspension-set'

export * from './suspension-set'
export { default as SuspensionSet } from './suspension-set'

/** Подвески */
export default class Suspensions extends XMLWithTemplates {
  static override async from(str: string): Promise<Suspensions | undefined>
  static override async from(file: File): Promise<Suspensions | undefined>
  static override async from(source: string | File): Promise<Suspensions | undefined> {
    const rootSelector = 'SuspensionSetVariants'
    const root = await XMLElement.from(source as File)
    const element = root?.select(rootSelector)

    if (root && element) return new this(
      element,
      await XMLTemplates.from(root),
      rootSelector,
      root
    )
  }

  /** Наборы подвесок */
  @innerElements(SuspensionSet, 'SuspensionSet')
  get Sets(): SuspensionSet[] { return [] }
}
