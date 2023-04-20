import { createSelectors, forEach, selector } from '../helpers'
import { Float, ForEach, Group, Select, Template } from '../items'
import unlockGroup from '../presets/unlock-group.preset'
import $ from './wheels.texts'

import type { IXMLTemplate } from '#g/types'

class Selectors {
  @selector truckWheels = 'TruckWheels'
  @selector truckTire = `${this.truckWheels}.TruckTires.TruckTire${forEach}`
  @selector truckTireText = `${this.truckTire}.GameData.UiDesc`
  @selector wheelFriction = `${this.truckTire}.WheelFriction`
  @selector gameData = `${this.truckTire}.GameData`
}

const selectors = createSelectors(Selectors)

const wheelsTemplate: IXMLTemplate = {
  selector: 'TruckWheels',
  template: Template({ ...selectors },
    ForEach(selectors.truckTire,
      Group({
        label: {
          selector: [selectors.truckTireText, selectors.truckTire],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.wheelFriction
      },
        Float({
          attribute: 'BodyFriction',
          label: $.BODY_FRICTION,
          max: 10,
          default: 1,
          areas: {
            yellow: [7, 8],
            red: [8.1, 10]
          },
          addMissedTag: true
        }),
        Float({
          attribute: 'BodyFrictionAsphalt',
          label: $.BODY_FRICTION_ASPHALT,
          max: 10,
          default: 1,
          areas: {
            yellow: [7, 8],
            red: [8.1, 10]
          },
          addMissedTag: true
        }),
        Float({
          attribute: 'SubstanceFriction',
          label: $.SUBSTANCE_FRICTION,
          max: 10,
          default: 1,
          areas: {
            yellow: [7, 8],
            red: [8.1, 10]
          },
          addMissedTag: true
        }),
        Select({
          attribute: 'IsIgnoreIce',
          label: $.IGNORE_ICE,
          addMissedTag: true,
          options: [
            ['true', $.YES],
            ['false', $.NO]
          ],
          default: 1
        }),
        unlockGroup(selectors.gameData)
      )
    )
  )
}

export default wheelsTemplate
