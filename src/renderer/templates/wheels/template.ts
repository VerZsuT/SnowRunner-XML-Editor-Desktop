import { Float, ForEach, Group, Select, Template } from '../items'
import unlockGroup from '../presets/unlockGroup'
import { createSelectors, forEach, selector } from '../service'
import { BODY_FRICTION, BODY_FRICTION_ASPHALT, IGNORE_ICE, NO, SUBSTANCE_FRICTION, YES } from './texts'

import type { IXMLTemplate } from '#types'

class Selectors {
  @selector truckWheels = 'TruckWheels'
  @selector truckTire = `${this.truckWheels}.TruckTires.TruckTire${forEach}`
  @selector truckTireText = `${this.truckTire}.GameData.UiDesc`
  @selector wheelFriction = `${this.truckTire}.WheelFriction`
  @selector gameData = `${this.truckTire}.GameData`
}

const selectors = createSelectors(Selectors)

export default {
  selector: 'TruckWheels',
  template: new Template({ ...selectors },
    new ForEach(selectors.truckTire,
      new Group({
        label: {
          selector: [selectors.truckTireText, selectors.truckTire],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.wheelFriction
      },
        new Float({
          attribute: 'BodyFriction',
          label: BODY_FRICTION,
          max: 10,
          default: 1,
          areas: {
            yellow: [7, 8],
            red: [8.1, 10]
          },
          addMissedTag: true
        }),
        new Float({
          attribute: 'BodyFrictionAsphalt',
          label: BODY_FRICTION_ASPHALT,
          max: 10,
          default: 1,
          areas: {
            yellow: [7, 8],
            red: [8.1, 10]
          },
          addMissedTag: true
        }),
        new Float({
          attribute: 'SubstanceFriction',
          label: SUBSTANCE_FRICTION,
          max: 10,
          default: 1,
          areas: {
            yellow: [7, 8],
            red: [8.1, 10]
          },
          addMissedTag: true
        }),
        new Select({
          attribute: 'IsIgnoreIce',
          label: IGNORE_ICE,
          addMissedTag: true,
          options: [
            ['true', YES],
            ['false', NO]
          ],
          default: 1
        }),
        unlockGroup(selectors.gameData)
      )
    )
  )
} as IXMLTemplate
