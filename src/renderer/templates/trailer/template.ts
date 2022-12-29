import { Float, ForEach, Group, Int, Template } from '../items'
import { createSelectors, forEach, selector } from '../service'
import {
  FUEL_CAPACITY,
  FUEL_MASS,
  INNER,
  MASS,
  OTHER,
  PRICE,
  QUANTITY,
  REPAIRS_CAPACITY,
  SUSP_HEIGHT,
  SUSP_STRENGTH,
  TRAILER_MASS,
  WHEEL, WHEELS, WHEEL_REPAIRS_CAPACITY
} from './texts'

import type { IXMLTemplate } from '#types'

class Selectors {
  @selector truckData = 'Truck.TruckData'
  @selector wheels = `${this.truckData}.Wheels`
  @selector wheel = `${this.wheels}.Wheel${forEach}`
  @selector modelBody = 'Truck.PhysicsModel.Body'
  @selector fuelMass = 'Truck.FuelMass.Body'
  @selector gameData = 'Truck.GameData'
  @selector addonSlots = `${this.gameData}.AddonSlots`
}

const selectors = createSelectors(Selectors)

export default {
  selector: 'Truck[Type="Trailer"]',
  template: new Template({ ...selectors },
    new Group({
      label: INNER,
      provided: selectors.truckData
    },
      new Int({
        attribute: 'FuelCapacity',
        label: FUEL_CAPACITY,
        max: 64000,
        step: 10,
        default: 0,
        areas: {
          yellow: [1000, 5000],
          red: [5001, Infinity]
        }
      }),
      new Int({
        attribute: 'RepairsCapacity',
        label: REPAIRS_CAPACITY,
        default: 0,
        areas: {
          yellow: [1000, 5000],
          red: [5001, Infinity]
        }
      }),
      new Int({
        attribute: 'WheelRepairsCapacity',
        label: WHEEL_REPAIRS_CAPACITY,
        default: 0,
        areas: {
          yellow: [100, 500],
          red: [501, Infinity]
        }
      }),
      new Int({
        attribute: 'Quantity',
        selector: selectors.addonSlots,
        label: QUANTITY
      })
    ),
    new Group(MASS,
      new Int({
        attribute: 'Mass',
        selector: selectors.modelBody,
        label: TRAILER_MASS
      }),
      new Int({
        attribute: 'Mass',
        selector: selectors.fuelMass,
        label: FUEL_MASS
      })
    ),
    new Group(WHEELS,
      new ForEach(selectors.wheel,
        new Group({
          label: WHEEL,
          provided: selectors.wheel,
          addCounter: true
        },
          new Float({
            attribute: 'SuspensionHeight',
            label: SUSP_HEIGHT
          }),
          new Float({
            attribute: 'SuspensionStrength',
            label: SUSP_STRENGTH
          })
        )
      )
    ),
    new Group({
      label: OTHER,
      provided: selectors.gameData
    },
      new Int({
        attribute: 'Price',
        label: PRICE
      })
    )
  )
} as IXMLTemplate
