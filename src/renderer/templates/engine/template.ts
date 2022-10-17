import { ForEach, Group, Num, Template } from '../items'
import { unlockGroup } from '../presets/unlockGroup'
import { forEach, initSelectors, selector } from '../service'
import {
  BRAKES_DELAY,
  CRITICAL_DAMAGE_THRESHOLD,
  DAMAGE_CAPACITY,
  DAMAGED_CONSUMPTION_MODIFIER,
  DAMAGED_MAX_TORQUE_MODIFIER,
  DAMAGED_MIN_TORQUE_MODIFIER,
  FUEL_CONSUMPTION,
  MAX_DELTA_ANG_VEL,
  RESPONSIVENESS,
  TORQUE
} from './texts'

import { NameType, NumberType } from '#enums'
import type { IXMLTemplate } from '#types'

class Selectors {
  @selector engine = `EngineVariants.Engine${forEach}`
  @selector engineText = `${this.engine}.GameData.UiDesc`
  @selector engineGameData = `${this.engine}.GameData`
}

const selectors = initSelectors(new Selectors())

export const engineTemplate = {
  selector: 'EngineVariants',
  template: new Template({ ...selectors }, [
    new ForEach(selectors.engine, [
      new Group({
        label: {
          type: NameType.computed,
          attribute: ['UiName', 'Name'],
          selector: [selectors.engineText, selectors.engine]
        },
        provided: selectors.engine
      }, [
        new Num({
          attribute: 'CriticalDamageThreshold',
          label: CRITICAL_DAMAGE_THRESHOLD,
          max: 0.990,
          min: 0,
          step: 0.01,
          default: 0.7
        }),
        new Num({
          attribute: 'DamageCapacity',
          type: NumberType.integer,
          label: DAMAGE_CAPACITY,
          max: 64000,
          step: 10,
          default: 0,
          areas: {
            yellow: [[1001, 5000]],
            red: [[5001, Infinity]]
          }
        }),
        new Num({
          attribute: 'DamagedConsumptionModifier',
          label: DAMAGED_CONSUMPTION_MODIFIER,
          max: 32,
          default: 1
        }),
        new Num({
          attribute: 'EngineResponsiveness',
          label: RESPONSIVENESS,
          max: 1,
          min: 0.01,
          step: 0.01,
          default: 0.04,
          areas: {
            yellow: [[0.1, 0.5]],
            red: [[0.5, 1]]
          }
        }),
        new Num({
          attribute: 'FuelConsumption',
          label: FUEL_CONSUMPTION,
          max: 100.0,
          default: 0.5
        }),
        new Num({
          attribute: 'Torque',
          type: NumberType.integer,
          label: TORQUE,
          max: 1000000,
          step: 100,
          default: 0,
          areas: {
            yellow: [[700000, 800000]],
            red: [[800001, Infinity]]
          }
        }),
        new Num({
          attribute: 'DamagedMinTorqueMultiplier',
          label: DAMAGED_MIN_TORQUE_MODIFIER,
          max: 1,
          min: 0,
          step: 0.01,
          default: 0
        }),
        new Num({
          attribute: 'DamagedMaxTorqueMultiplier',
          label: DAMAGED_MAX_TORQUE_MODIFIER,
          max: 1,
          min: 0,
          step: 0.01,
          default: 0
        }),
        new Num({
          attribute: 'BrakesDelay',
          label: BRAKES_DELAY,
          max: 1,
          min: 0,
          default: 0
        }),
        new Num({
          attribute: 'MaxDeltaAngVel',
          label: MAX_DELTA_ANG_VEL,
          max: 1000000,
          min: 0,
          default: 0
        }),
        unlockGroup(selectors.engineGameData)
      ])
    ])
  ])
} as IXMLTemplate
