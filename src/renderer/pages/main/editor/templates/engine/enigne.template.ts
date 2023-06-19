import { createSelectors, forEach, selector } from '../helpers'
import { Float, ForEach, Group, Int, Template } from '../items'
import unlockGroup from '../presets/unlock-group.preset'
import $ from './engine.texts'

import type { IXMLTemplate } from '#g/types'

const selectors = createSelectors(class {
  @selector static engine = `EngineVariants.Engine${forEach}` as const
  @selector static engineText = `${this.engine}.GameData.UiDesc` as const
  @selector static engineGameData = `${this.engine}.GameData` as const
})

export default {
  selector: 'EngineVariants',
  template: Template({ ...selectors },
    ForEach(selectors.engine,
      Group({
        label: {
          selector: [selectors.engineText, selectors.engine],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.engine
      },
        Float({
          attribute: 'CriticalDamageThreshold',
          label: $.CRITICAL_DAMAGE_THRESHOLD,
          max: 0.990,
          min: 0,
          step: 0.01,
          default: 0.7
        }),
        Int({
          attribute: 'DamageCapacity',
          label: $.DAMAGE_CAPACITY,
          max: 64000,
          step: 10,
          default: 0,
          areas: {
            yellow: [1001, 5000],
            red: [5001, Infinity]
          }
        }),
        Float({
          attribute: 'DamagedConsumptionModifier',
          label: $.DAMAGED_CONSUMPTION_MODIFIER,
          max: 32,
          default: 1
        }),
        Float({
          attribute: 'EngineResponsiveness',
          label: $.RESPONSIVENESS,
          max: 1,
          min: 0.01,
          step: 0.01,
          default: 0.04,
          areas: {
            yellow: [0.1, 0.5],
            red: [0.5, 1]
          }
        }),
        Float({
          attribute: 'FuelConsumption',
          label: $.FUEL_CONSUMPTION,
          max: 100.0,
          default: 0.5
        }),
        Int({
          attribute: 'Torque',
          label: $.TORQUE,
          max: 1000000,
          step: 100,
          default: 0,
          areas: {
            yellow: [700000, 800000],
            red: [800001, Infinity]
          }
        }),
        Float({
          attribute: 'DamagedMinTorqueMultiplier',
          label: $.DAMAGED_MIN_TORQUE_MODIFIER,
          max: 1,
          min: 0,
          step: 0.01,
          default: 0
        }),
        Float({
          attribute: 'DamagedMaxTorqueMultiplier',
          label: $.DAMAGED_MAX_TORQUE_MODIFIER,
          max: 1,
          min: 0,
          step: 0.01,
          default: 0
        }),
        Float({
          attribute: 'BrakesDelay',
          label: $.BRAKES_DELAY,
          max: 1,
          min: 0,
          default: 0
        }),
        Float({
          attribute: 'MaxDeltaAngVel',
          label: $.MAX_DELTA_ANG_VEL,
          max: 1000000,
          min: 0,
          default: 0
        }),
        unlockGroup(selectors.engineGameData)
      )
    )
  )
} satisfies IXMLTemplate
