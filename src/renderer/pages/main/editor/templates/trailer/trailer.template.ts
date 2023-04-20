import { createSelectors, forEach, selector } from '../helpers'
import { Float, ForEach, Group, Int, Template } from '../items'
import $ from './trailer.texts'

import type { IXMLTemplate } from '#g/types'

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

const trailerTemplate: IXMLTemplate = {
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
}

export default trailerTemplate
