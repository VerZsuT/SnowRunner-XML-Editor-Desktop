import { createSelectors, forEach, forEachBy, selector } from '../helpers'
import { Float, ForEach, Group, Int, Template } from '../items'
import unlockGroup from '../presets/unlock-group.preset'
import $ from './suspension.texts'

import type { IXMLTemplate } from '#g/types'

class Selectors {
  @selector suspensionSet = `SuspensionSetVariants.SuspensionSet${forEach}`
  @selector suspensionSetText = `${this.suspensionSet}.GameData.UiDesc`
  @selector suspension = `${this.suspensionSet}.Suspension${forEachBy(2)}`
  @selector gameData = `${this.suspensionSet}.GameData`
}

const selectors = createSelectors(Selectors)

const suspensionTemplate: IXMLTemplate = {
  selector: 'SuspensionSetVariants',
  template: Template({ ...selectors },
    ForEach(selectors.suspensionSet,
      Group({
        label: {
          selector: [selectors.suspensionSetText, selectors.suspensionSet],
          attribute: ['UiName', 'Name']
        },
        provided: selectors.suspensionSet
      },
        Float({
          attribute: 'CriticalDamageThreshold',
          label: $.CRITICAL_DAMAGE_THRESHOLD,
          max: 0.999,
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
            yellow: [1000, 10000],
            red: [10001, Infinity]
          }
        }),
        ForEach(selectors.suspension,
          Group({
            label: $.SUSPENSION,
            provided: selectors.suspension,
            addCounter: true
          },
            Float({
              attribute: 'Height',
              label: $.HEIGHT,
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
            Float({
              attribute: 'Strength',
              label: $.STRENGTH,
              step: 0.01,
              areas: {
                yellow: [0.5, 1.5],
                red: [1.6, Infinity]
              }
            }),
            Float({
              attribute: 'Damping',
              label: $.DAMPING,
              max: 1000,
              areas: {
                yellow: [1, 3],
                red: [3, 1000]
              }
            }),
            Float({
              attribute: 'SuspensionMin',
              label: $.SUSPENSION_MIN,
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
            Float({
              attribute: 'SuspensionMax',
              label: $.SUSPENSION_MAX,
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
            Float({
              attribute: 'BrokenSuspensionMax',
              label: $.BROKEN_SUSPENSION_MAX,
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
}

export default suspensionTemplate
