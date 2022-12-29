import { Float, ForEach, Group, Int, Template } from '../items'
import unlockGroup from '../presets/unlockGroup'
import { createSelectors, forEach, selector } from '../service'
import {
  BRAKES_DELAY,
  CRITICAL_DAMAGE_THRESHOLD, DAMAGED_CONSUMPTION_MODIFIER,
  DAMAGED_MAX_TORQUE_MODIFIER,
  DAMAGED_MIN_TORQUE_MODIFIER, DAMAGE_CAPACITY, FUEL_CONSUMPTION,
  MAX_DELTA_ANG_VEL,
  RESPONSIVENESS,
  TORQUE
} from './texts'

import type { IXMLTemplate } from '#types'

class Selectors {
  @selector engine = `EngineVariants.Engine${forEach}`
  @selector engineText = `${this.engine}.GameData.UiDesc`
  @selector engineGameData = `${this.engine}.GameData`
}

const selectors = createSelectors(Selectors)

export default {
  selector: 'EngineVariants',
  template: new Template({ ...selectors },
    new ForEach(selectors.engine,
      new Group({
        label: {
          selector: [selectors.engineText, selectors.engine],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.engine
      },
        new Float({
          attribute: 'CriticalDamageThreshold',
          label: CRITICAL_DAMAGE_THRESHOLD,
          max: 0.990,
          min: 0,
          step: 0.01,
          default: 0.7
        }),
        new Int({
          attribute: 'DamageCapacity',
          label: DAMAGE_CAPACITY,
          max: 64000,
          step: 10,
          default: 0,
          areas: {
            yellow: [1001, 5000],
            red: [5001, Infinity]
          }
        }),
        new Float({
          attribute: 'DamagedConsumptionModifier',
          label: DAMAGED_CONSUMPTION_MODIFIER,
          max: 32,
          default: 1
        }),
        new Float({
          attribute: 'EngineResponsiveness',
          label: RESPONSIVENESS,
          max: 1,
          min: 0.01,
          step: 0.01,
          default: 0.04,
          areas: {
            yellow: [0.1, 0.5],
            red: [0.5, 1]
          }
        }),
        new Float({
          attribute: 'FuelConsumption',
          label: FUEL_CONSUMPTION,
          max: 100.0,
          default: 0.5
        }),
        new Int({
          attribute: 'Torque',
          label: TORQUE,
          max: 1000000,
          step: 100,
          default: 0,
          areas: {
            yellow: [700000, 800000],
            red: [800001, Infinity]
          }
        }),
        new Float({
          attribute: 'DamagedMinTorqueMultiplier',
          label: DAMAGED_MIN_TORQUE_MODIFIER,
          max: 1,
          min: 0,
          step: 0.01,
          default: 0
        }),
        new Float({
          attribute: 'DamagedMaxTorqueMultiplier',
          label: DAMAGED_MAX_TORQUE_MODIFIER,
          max: 1,
          min: 0,
          step: 0.01,
          default: 0
        }),
        new Float({
          attribute: 'BrakesDelay',
          label: BRAKES_DELAY,
          max: 1,
          min: 0,
          default: 0
        }),
        new Float({
          attribute: 'MaxDeltaAngVel',
          label: MAX_DELTA_ANG_VEL,
          max: 1000000,
          min: 0,
          default: 0
        }),
        unlockGroup(selectors.engineGameData)
      )
    )
  )
} as IXMLTemplate
