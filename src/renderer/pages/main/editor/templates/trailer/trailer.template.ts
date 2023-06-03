import { createSelectors, forEach, selector } from '../helpers'
import { Float, ForEach, Group, Int, Template } from '../items'
import $ from './trailer.texts'

import type { IXMLTemplate } from '#g/types'

const selectors = createSelectors(class {
  @selector static truckData = 'Truck.TruckData' as const
  @selector static wheels = `${this.truckData}.Wheels` as const
  @selector static wheel = `${this.wheels}.Wheel${forEach}` as const
  @selector static modelBody = 'Truck.PhysicsModel.Body' as const
  @selector static fuelMass = 'Truck.FuelMass.Body' as const
  @selector static gameData = 'Truck.GameData' as const
  @selector static addonSlots = `${this.gameData}.AddonSlots` as const
})

export default {
  selector: 'Truck[Type="Trailer"]',
  template: Template({ ...selectors },
    Group({
      label: $.INNER,
      provided: selectors.truckData
    },
      Int({
        attribute: 'FuelCapacity',
        label: $.FUEL_CAPACITY,
        max: 64000,
        step: 10,
        default: 0,
        areas: {
          yellow: [1000, 5000],
          red: [5001, Infinity]
        }
      }),
      Int({
        attribute: 'RepairsCapacity',
        label: $.REPAIRS_CAPACITY,
        default: 0,
        areas: {
          yellow: [1000, 5000],
          red: [5001, Infinity]
        }
      }),
      Int({
        attribute: 'WheelRepairsCapacity',
        label: $.WHEEL_REPAIRS_CAPACITY,
        default: 0,
        areas: {
          yellow: [100, 500],
          red: [501, Infinity]
        }
      }),
      Int({
        attribute: 'Quantity',
        selector: selectors.addonSlots,
        label: $.QUANTITY
      })
    ),
    Group($.MASS,
      Int({
        attribute: 'Mass',
        selector: selectors.modelBody,
        label: $.TRAILER_MASS
      }),
      Int({
        attribute: 'Mass',
        selector: selectors.fuelMass,
        label: $.FUEL_MASS
      })
    ),
    Group($.WHEELS,
      ForEach(selectors.wheel,
        Group({
          label: $.WHEEL,
          provided: selectors.wheel,
          addCounter: true
        },
          Float({
            attribute: 'SuspensionHeight',
            label: $.SUSP_HEIGHT
          }),
          Float({
            attribute: 'SuspensionStrength',
            label: $.SUSP_STRENGTH
          })
        )
      )
    ),
    Group({
      label: $.OTHER,
      provided: selectors.gameData
    },
      Int({
        attribute: 'Price',
        label: $.PRICE
      })
    )
  )
} satisfies IXMLTemplate
