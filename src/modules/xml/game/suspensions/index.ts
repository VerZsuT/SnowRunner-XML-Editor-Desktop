import type { File } from '../../../renderer'
import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElements } from '../xml-with-templates'
import SuspensionSet from './suspension-set'

export * from './suspension-set'
export { default as SuspensionSet } from './suspension-set'

export default class Suspensions extends XMLWithTemplates {
  static override async fromFile(file: File): Promise<Suspensions | undefined> {
    const rootSelector = 'SuspensionSetVariants'
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

  @innerElements(SuspensionSet, 'SuspensionSet')
  get Sets(): SuspensionSet[] { return [] }
}
