import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElements } from '../xml-with-templates'
import Winch from './winch'

import { type File } from '/mods/renderer'

export { default as Winch } from './winch'

export default class WinchVariants extends XMLWithTemplates {
  static override async fromFile(file: File) {
    const rootSelector = 'WinchVariants'
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

  @innerElements(Winch, 'Winch')
  get Winches(): Winch[] { return [] }
}
