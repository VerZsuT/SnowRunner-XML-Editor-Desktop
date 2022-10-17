import { ForEach, Group, Num, Template } from '../items'
import { forEach, initSelectors, selector } from '../service'
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
  WHEEL,
  WHEEL_REPAIRS_CAPACITY,
  WHEELS
} from './texts'

import { NumberType } from '#enums'
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

const selectors = initSelectors(new Selectors())

export const trailerTemplate = {
  selector: 'Truck[Type="Trailer"]',
  template: new Template({ ...selectors }, [
    new Group({
      label: INNER,
      provided: selectors.truckData
    }, [
      new Num({
        attribute: 'FuelCapacity',
        type: NumberType.integer,
        label: FUEL_CAPACITY,
        max: 64000,
        step: 10,
        default: 0,
        areas: {
          yellow: [[1000, 5000]],
          red: [[5001, Infinity]]
        }
      }),
      new Num({
        attribute: 'RepairsCapacity',
        type: NumberType.integer,
        label: REPAIRS_CAPACITY,
        default: 0,
        areas: {
          yellow: [[1000, 5000]],
          red: [[5001, Infinity]]
        }
      }),
      new Num({
        attribute: 'WheelRepairsCapacity',
        type: NumberType.integer,
        label: WHEEL_REPAIRS_CAPACITY,
        default: 0,
        areas: {
          yellow: [[100, 500]],
          red: [[501, Infinity]]
        }
      }),
      new Num({
        attribute: 'Quantity',
        type: NumberType.integer,
        selector: selectors.addonSlots,
        label: QUANTITY
      })
    ]),
    new Group(MASS, [
      new Num({
        attribute: 'Mass',
        type: NumberType.integer,
        selector: selectors.modelBody,
        label: TRAILER_MASS
      }),
      new Num({
        attribute: 'Mass',
        type: NumberType.integer,
        selector: selectors.fuelMass,
        label: FUEL_MASS
      })
    ]),
    new Group(WHEELS, [
      new ForEach(selectors.wheel, [
        new Group({
          label: WHEEL,
          provided: selectors.wheel,
          addCounter: true
        }, [
          new Num({
            attribute: 'SuspensionHeight',
            label: SUSP_HEIGHT
          }),
          new Num({
            attribute: 'SuspensionStrength',
            label: SUSP_STRENGTH
          })
        ])
      ])
    ]),
    new Group({
      label: OTHER,
      provided: selectors.gameData
    }, [
      new Num({
        attribute: 'Price',
        type: NumberType.integer,
        label: PRICE
      })
    ])
  ])
} as IXMLTemplate
