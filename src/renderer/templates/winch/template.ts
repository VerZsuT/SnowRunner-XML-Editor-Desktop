import { ForEach, Group, Num, Select, Template } from '../items'
import { unlockGroup } from '../presets/unlockGroup'
import { forEach, initSelectors, selector } from '../service'
import { BATTERY, ENGINE, IS_ENGINE_IGNITION_REQUIRED, LENGTH, STRENGTH_MULT } from './texts'

import { NameType, NumberType } from '#enums'
import type { IXMLTemplate } from '#types'

class Selectors {
  @selector winch = `WinchVariants.Winch${forEach}`
  @selector winchText = `${this.winch}.GameData.UiDesc`
  @selector gameData = `${this.winch}.GameData`
}

const selectors = initSelectors(new Selectors())

export const winchTemplate = {
  selector: 'WinchVariants',
  template: new Template({ ...selectors }, [
    new ForEach(selectors.winch, [
      new Group({
        label: {
          type: NameType.computed,
          attribute: ['UiName', 'Name'],
          selector: [selectors.winchText, selectors.winch]
        },
        provided: selectors.winch
      }, [
        new Num({
          attribute: 'Length',
          type: NumberType.integer,
          label: LENGTH,
          max: 100,
          default: 14,
          areas: {
            yellow: [[30, 50]],
            red: [[51, 100]]
          }
        }),
        new Num({
          attribute: 'StrengthMult',
          label: STRENGTH_MULT,
          max: 10,
          default: 1,
          areas: {
            yellow: [[2, 5]],
            red: [[5.1, 10]]
          }
        }),
        new Select({
          attribute: 'IsEngineIgnitionRequired',
          label: IS_ENGINE_IGNITION_REQUIRED,
          options: {
            true: ENGINE,
            false: BATTERY
          },
          default: 'true'
        }),
        unlockGroup(selectors.gameData)
      ])
    ])
  ])
} as IXMLTemplate
