import { ForEach, Group, Num, Select, Template } from '../items'
import { unlockGroup } from '../presets/unlockGroup'
import { forEach, initSelectors, selector } from '../service'
import { BODY_FRICTION, BODY_FRICTION_ASPHALT, IGNORE_ICE, NO, SUBSTANCE_FRICTION, YES } from './texts'

import { NameType } from '#enums'
import type { IXMLTemplate } from '#types'

class Selectors {
  @selector truckWheels = 'TruckWheels'
  @selector truckTire = `${this.truckWheels}.TruckTires.TruckTire${forEach}`
  @selector truckTireText = `${this.truckTire}.GameData.UiDesc`
  @selector wheelFriction = `${this.truckTire}.WheelFriction`
  @selector gameData = `${this.truckTire}.GameData`
}

const selectors = initSelectors(new Selectors())

export const wheelsTemplate = {
  selector: 'TruckWheels',
  template: new Template({ ...selectors }, [
    new ForEach(selectors.truckTire, [
      new Group({
        label: {
          type: NameType.computed,
          attribute: ['UiName', 'Name'],
          selector: [selectors.truckTireText, selectors.truckTire]
        },
        provided: selectors.wheelFriction
      }, [
        new Num({
          attribute: 'BodyFriction',
          label: BODY_FRICTION,
          max: 10,
          default: 1,
          areas: {
            yellow: [[7, 8]],
            red: [[8.1, 10]]
          },
          addMissedTag: true
        }),
        new Num({
          attribute: 'BodyFrictionAsphalt',
          label: BODY_FRICTION_ASPHALT,
          max: 10,
          default: 1,
          areas: {
            yellow: [[7, 8]],
            red: [[8.1, 10]]
          },
          addMissedTag: true
        }),
        new Num({
          attribute: 'SubstanceFriction',
          label: SUBSTANCE_FRICTION,
          max: 10,
          default: 1,
          areas: {
            yellow: [[7, 8]],
            red: [[8.1, 10]]
          },
          addMissedTag: true
        }),
        new Select({
          attribute: 'IsIgnoreIce',
          label: IGNORE_ICE,
          addMissedTag: true,
          options: {
            true: YES,
            false: NO
          },
          default: 'false'
        }),
        unlockGroup(selectors.gameData)
      ])
    ])
  ])
} as IXMLTemplate
