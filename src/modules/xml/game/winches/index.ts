import XMLElement from '../../xml-element'
import XMLTemplates from '../../xml-templates'
import XMLWithTemplates, { innerElements } from '../xml-with-templates'
import Winch from './winch'

import { type File } from '/mods/renderer'

export { default as Winch } from './winch'

/** Варианты лебёдок. */
export default class WinchVariants extends XMLWithTemplates {
  static override async from(str: string): Promise<WinchVariants | undefined>
  static override async from(file: File): Promise<WinchVariants | undefined>
  static override async from(source: string | File): Promise<WinchVariants | undefined> {
    const rootSelector = 'WinchVariants'
    const root = await XMLElement.from(source as File)
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

  /** Лебёдки. */
  @innerElements(Winch, 'Winch')
  readonly Winches: Winch[] = []
}
