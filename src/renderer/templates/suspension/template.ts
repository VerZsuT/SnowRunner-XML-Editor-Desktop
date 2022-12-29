import { Float, ForEach, Group, Int, Template } from '../items'
import unlockGroup from '../presets/unlockGroup'
import { createSelectors, forEach, forEachBy, selector } from '../service'
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

import type { IXMLTemplate } from '#types'

class Selectors {
  @selector suspensionSet = `SuspensionSetVariants.SuspensionSet${forEach}`
  @selector suspensionSetText = `${this.suspensionSet}.GameData.UiDesc`
  @selector suspension = `${this.suspensionSet}.Suspension${forEachBy(2)}`
  @selector gameData = `${this.suspensionSet}.GameData`
}

const selectors = createSelectors(Selectors)

export default {
  selector: 'SuspensionSetVariants',
  template: new Template({ ...selectors },
    new ForEach(selectors.suspensionSet,
      new Group({
        label: {
          selector: [selectors.suspensionSetText, selectors.suspensionSet],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.suspensionSet
      },
        new Float({
          attribute: 'CriticalDamageThreshold',
          label: CRITICAL_DAMAGE_THRESHOLD,
          max: 0.999,
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
            yellow: [1000, 10000],
            red: [10001, Infinity]
          }
        }),
        new ForEach(selectors.suspension,
          new Group({
            label: SUSPENSION,
            provided: selectors.suspension,
            addCounter: true
          },
            new Float({
              attribute: 'Height',
              label: HEIGHT,
              max: 1000,
              min: -1000,
              areas: {
                yellow: [
                  [-2, -1],
                  [1, 2]
                ],
                red: [
                  [-1000, -2.1],
                  [2.1, 1000]
                ]
              }
            }),
            new Float({
              attribute: 'Strength',
              label: STRENGTH,
              step: 0.01,
              areas: {
                yellow: [0.5, 1.5],
                red: [1.6, Infinity]
              }
            }),
            new Float({
              attribute: 'Damping',
              label: DAMPING,
              max: 1000,
              areas: {
                yellow: [1, 3],
                red: [3, 1000]
              }
            }),
            new Float({
              attribute: 'SuspensionMin',
              label: SUSPENSION_MIN,
              max: 1000,
              min: -1000,
              step: 0.01,
              areas: {
                yellow: [
                  [-5, -2],
                  [2, 5]
                ],
                red: [
                  [-1000, -5.1],
                  [5.1, 1000]
                ]
              }
            }),
            new Float({
              attribute: 'SuspensionMax',
              label: SUSPENSION_MAX,
              max: 1000,
              min: -1000,
              step: 0.01,
              default: 1,
              areas: {
                yellow: [
                  [-5, -2],
                  [2, 5]
                ],
                red: [
                  [-1000, -5.1],
                  [5.1, 1000]
                ]
              }
            }),
            new Float({
              attribute: 'BrokenSuspensionMax',
              label: BROKEN_SUSPENSION_MAX,
              max: 1000,
              min: -1000,
              step: 0.01,
              areas: {
                yellow: [
                  [-5, -2],
                  [2, 5]
                ],
                red: [
                  [-1000, -5.1],
                  [5.1, 1000]
                ]
              }
            })
          )
        ),
        unlockGroup(selectors.gameData)
      )
    )
  )
} as IXMLTemplate
