import { ForEach, Group, Num, Template } from '../items'
import { unlockGroup } from '../presets/unlockGroup'
import { forEach, forEachBy, initSelectors, selector } from '../service'
import {
  BROKEN_SUSPENSION_MAX,
  CRITICAL_DAMAGE_THRESHOLD,
  DAMAGE_CAPACITY,
  DAMPING,
  HEIGHT,
  STRENGTH,
  SUSPENSION,
  SUSPENSION_MAX,
  SUSPENSION_MIN
} from './texts'

import { NameType, NumberType } from '#enums'
import type { IXMLTemplate } from '#types'

class Selectors {
  @selector suspensionSet = `SuspensionSetVariants.SuspensionSet${forEach}`
  @selector suspensionSetText = `${this.suspensionSet}.GameData.UiDesc`
  @selector suspension = `${this.suspensionSet}.Suspension${forEachBy(2)}`
  @selector gameData = `${this.suspensionSet}.GameData`
}

const selectors = initSelectors(new Selectors())

export const suspensionTemplate = {
  selector: 'SuspensionSetVariants',
  template: new Template({ ...selectors }, [
    new ForEach(selectors.suspensionSet, [
      new Group({
        label: {
          type: NameType.computed,
          attribute: ['UiName', 'Name'],
          selector: [selectors.suspensionSetText, selectors.suspensionSet]
        },
        provided: selectors.suspensionSet
      }, [
        new Num({
          attribute: 'CriticalDamageThreshold',
          label: CRITICAL_DAMAGE_THRESHOLD,
          max: 0.999,
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
            yellow: [[1000, 10000]],
            red: [[10001, Infinity]]
          }
        }),
        new ForEach(selectors.suspension, [
          new Group({
            label: SUSPENSION,
            provided: selectors.suspension,
            addCounter: true
          }, [
            new Num({
              attribute: 'Height',
              label: HEIGHT,
              max: 1000,
              min: -1000,
              areas: {
                yellow: [[-2, -1], [1, 2]],
                red: [[-1000, -2.1], [2.1, 1000]]
              }
            }),
            new Num({
              attribute: 'Strength',
              label: STRENGTH,
              step: 0.01,
              areas: {
                yellow: [[0.5, 1.5]],
                red: [[1.6, Infinity]]
              }
            }),
            new Num({
              attribute: 'Damping',
              label: DAMPING,
              max: 1000,
              areas: {
                yellow: [[1, 3]],
                red: [[3, 1000]]
              }
            }),
            new Num({
              attribute: 'SuspensionMin',
              label: SUSPENSION_MIN,
              max: 1000,
              min: -1000,
              step: 0.01,
              areas: {
                yellow: [[-5, -2], [2, 5]],
                red: [[-1000, -5.1], [5.1, 1000]]
              }
            }),
            new Num({
              attribute: 'SuspensionMax',
              label: SUSPENSION_MAX,
              max: 1000,
              min: -1000,
              step: 0.01,
              default: 1,
              areas: {
                yellow: [[-5, -2], [2, 5]],
                red: [[-1000, -5.1], [5.1, 1000]]
              }
            }),
            new Num({
              attribute: 'BrokenSuspensionMax',
              label: BROKEN_SUSPENSION_MAX,
              max: 1000,
              min: -1000,
              step: 0.01,
              areas: {
                yellow: [[-5, -2], [2, 5]],
                red: [[-1000, -5.1], [5.1, 1000]]
              }
            })
          ])
        ]),
        unlockGroup(selectors.gameData)
      ])
    ])
  ])
} as IXMLTemplate
