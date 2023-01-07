import { Float, ForEach, Group, Int, Select, Template } from '../items'
import unlockGroup from '../presets/unlockGroup'
import { createSelectors, forEach, selector } from '../service'
import $ from './texts'

import type { IXMLTemplate } from '#types'

class Selectors {
  @selector winch = `WinchVariants.Winch${forEach}`
  @selector winchText = `${this.winch}.GameData.UiDesc`
  @selector gameData = `${this.winch}.GameData`
}

const selectors = createSelectors(Selectors)

export default {
  selector: 'WinchVariants',
  template: new Template({ ...selectors },
    new ForEach(selectors.winch,
      new Group({
        label: {
          selector: [selectors.winchText, selectors.winch],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.winch
      },
        new Int({
          attribute: 'Length',
          label: $.LENGTH,
          max: 100,
          default: 14,
          areas: {
            yellow: [30, 50],
            red: [51, 100]
          }
        }),
        new Float({
          attribute: 'StrengthMult',
          label: $.STRENGTH_MULT,
          max: 10,
          default: 1,
          areas: {
            yellow: [2, 5],
            red: [5.1, 10]
          }
        }),
        new Select({
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
} as IXMLTemplate
