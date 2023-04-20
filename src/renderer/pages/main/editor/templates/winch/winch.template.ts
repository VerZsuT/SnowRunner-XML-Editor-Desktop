import { createSelectors, forEach, selector } from '../helpers'
import { Float, ForEach, Group, Int, Select, Template } from '../items'
import unlockGroup from '../presets/unlock-group.preset'
import $ from './winch.texts'

import type { IXMLTemplate } from '#g/types'

class Selectors {
  @selector winch = `WinchVariants.Winch${forEach}`
  @selector winchText = `${this.winch}.GameData.UiDesc`
  @selector gameData = `${this.winch}.GameData`
}

const selectors = createSelectors(Selectors)

const winchTemplate: IXMLTemplate = {
  selector: 'WinchVariants',
  template: Template({ ...selectors },
    ForEach(selectors.winch,
      Group({
        label: {
          selector: [selectors.winchText, selectors.winch],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.winch
      },
        Int({
          attribute: 'Length',
          label: $.LENGTH,
          max: 100,
          default: 14,
          areas: {
            yellow: [30, 50],
            red: [51, 100]
          }
        }),
        Float({
          attribute: 'StrengthMult',
          label: $.STRENGTH_MULT,
          max: 10,
          default: 1,
          areas: {
            yellow: [2, 5],
            red: [5.1, 10]
          }
        }),
        Select({
          attribute: 'IsEngineIgnitionRequired',
          label: $.IS_ENGINE_IGNITION_REQUIRED,
          options: [
            ['true', $.ENGINE],
            ['false', $.BATTERY]
          ],
          default: 0
        }),
        unlockGroup(selectors.gameData)
      )
    )
  )
}

export default winchTemplate
